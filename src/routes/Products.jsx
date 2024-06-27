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

import ProductPreview from "../components/ProductPreview";

const Products = ({ navigation }) => {

    const session = useStore((state) => state.session)
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);

    const cart = useStore((state) => state.cart);
    const setCart = useStore((state) => state.setCart);

    const setShowCart = useStore((state) => state.setShowCart);

    const products = useStore((state) => state.products);
    const saveProducts = useStore((state) => state.saveProducts);

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        getCart();
    }, [products])

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

    async function getCart() {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from('carts')
                .select('*')
                .eq("user_id", session?.user.id)

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                // Find the corresponding products for each cart item
                const cartItems = data.map(cartItem => {
                    const product = products.find(item => item.id === cartItem.product_id);
                    return { ...cartItem, product };
                });
                setCart(cartItems);
                console.log(`CART: ${cartItems}`);
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
            <View className="p-6 flex-row items-center justify-center mb-10">
                <Text className="font-black text-text text-3xl">cycleventure.</Text>
                <TouchableOpacity
                    className="absolute right-6"
                    onPress={() => setShowCart(true)}
                >
                    <Entypo name="shopping-cart" size={27} color="white" />
                </TouchableOpacity>
                <View className="w-full bg-slate-700 h-1 absolute bottom-0"></View>
            </View>
            <Text className="text-text text-center font-extrabold text-2xl mb-8">Products</Text>
            {
                loading ?
                    <Loading />
                    :
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductPreview item={item} navigation={navigation} />}
                        keyExtractor={(item) => item.id.toString()} // Corrected keyExtractor
                    />
            }
            <Cart />
        </SafeAreaView>
    );
}

export default Products;