import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';
import Loading from "../components/Loading";
import Cart from "../components/Cart";
import ListHeader from "../components/ListHeader";
import FilterModal from "../components/FilterModal";

import ProductPreview from "../components/ProductPreview";

const Products = ({ navigation }) => {

    const session = useStore((state) => state.session)
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);

    const setShowCart = useStore((state) => state.setShowCart);
    const localCart = useStore((state) => state.localCart);
    const setCart = useStore((state) => state.setCart);

    const products = useStore((state) => state.products);
    const saveProducts = useStore((state) => state.saveProducts);
    const filteredProducts = useStore((state) => state.filteredProducts);
    const saveFilteredProducts = useStore((state) => state.saveFilteredProducts);
    const showFilter = useStore((state) => state.showFilter);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('bikes')
                .select(`*`)


            if (error && status !== 406) {
                throw error
            }

            if (data) {
                saveProducts(data);
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (products.length > 0) {
            getCart();
        }
    }, [products, localCart]);

    async function getCart() {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from('carts')
                .select('*')
                .eq("user_id", session?.user.id);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                const cartItems = data.map((cartItem) => {
                    const product = products.find(item => item.id === cartItem.product_id);
                    return { ...cartItem, product };
                });
                setCart(cartItems);

                console.log('Cart Items:', JSON.stringify(cartItems, null, 2));
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="p-6 flex-row items-center justify-center">
                <Text className="font-black text-text text-3xl">cycleventure.</Text>
                <TouchableOpacity
                    className="absolute right-6"
                    onPress={() => setShowCart(true)}
                >
                    <Entypo name="shopping-cart" size={27} color="white" />
                </TouchableOpacity>
                <View className="w-full bg-slate-700 h-1 absolute bottom-0"></View>
            </View>
            {
                loading ?
                    <Loading iconWidth={86} iconHeight={86} fullScreen={true} />
                    :
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductPreview item={item} navigation={navigation} />}
                        keyExtractor={(item) => item.id.toString()}
                        ListHeaderComponent={<ListHeader />}
                    />
            }
            <Cart />
            {showFilter && <FilterModal />}
        </SafeAreaView>
    );
}

export default Products;