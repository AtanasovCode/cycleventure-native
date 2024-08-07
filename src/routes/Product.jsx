import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getRating, width, height, formatMoney } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import Loading from "../components/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Product = ({ navigation }) => {

    const session = useStore((state) => state.session);
    const products = useStore((state) => state.products);
    const selectedProduct = useStore((state) => state.selectedProduct);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const setCart = useStore((state) => state.setCart);
    const cart = useStore((state) => state.cart);



    const addToCart = async () => {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const cartItem = {
                user_id: session?.user.id,
                product_id: selectedProduct.id,
                quantity: 1,
            };

            const { error } = await supabase.from('carts').insert(cartItem);

            if (error) {
                throw error;
            }

            // Update local cart state
            const product = products.find(item => item.id === selectedProduct.id);
            setCart([...cart, { ...cartItem, product }]);

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (products.length > 0) {
            getCart();
        }
    }, [products, cart]);

    async function getCart() {
        try {
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
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
        }
    }

    return (
        <ScrollView
            className="flex-1 bg-background py-6"
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'start' }}
        >
            <TouchableOpacity
                className="absolute top-[7%] left-[7%]"
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Image
                source={{ uri: selectedProduct.image }}
                style={{ width: width * 0.8, height: height * 0.4 }}
                className=""
                resizeMode="contain"
                onError={(error) => console.log('Error loading image:', error)}
            />

            <Text className="text-text text-center font-extrabold text-3xl mb-3">
                {selectedProduct.name}
            </Text>
            <View
                className=""
                style={{ width: width * 0.5 }}
            >
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-slate-400 mr-6">Category:</Text>
                    <Text className="text-slate-400">{selectedProduct.category}</Text>
                </View>
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-slate-400 mr-6">Brand:</Text>
                    <Text className="text-slate-400">{selectedProduct.brand}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-slate-400 mr-6">Rating:</Text>
                    <Text className="text-slate-400">{getRating(selectedProduct.rating, 16)}</Text>
                </View>
            </View>
            <View className="items-center justify-center mt-16">
                <View className="flex-row items-center justify-center">
                    <Text className="text-text font-bold text-xl mr-4">{formatMoney(selectedProduct.price)}</Text>
                    <View className="flex-row items-center justify-center">
                        <Text className="text-slate-400 mr-2">Available</Text>
                        <FontAwesome name="check-circle" size={16} color="lime" />
                    </View>
                </View>
            </View>
            <View
                className="mt-6 items-center justify-center"
                style={{ width: width * 0.8 }}
            >
                <Text className="text-text text-center">
                    {selectedProduct.description}
                </Text>
                <TouchableOpacity
                    style={{ width: width * 0.65 }}
                    className={`items-center justify-center p-2 mt-12 rounded-xl
                        ${cart && cart.find((item) => item.product.id === selectedProduct.id) ? 'bg-[#1f889f]' : 'bg-accent'}
                        `}
                    onPress={() => {
                        addToCart();
                    }}
                    disabled={loading || cart && cart.find((item) => item.product.id === selectedProduct.id) ? true : false}
                >
                    <View className="flex-row items-center justify-center gap-3">
                        {
                            loading ?
                                <View className="">
                                    <Loading 
                                        iconWidth={30} 
                                        iconHeight={30} 
                                        fullScreen={false} 
                                        theme="dark"
                                    />
                                </View>
                                :
                                <Entypo name="shopping-cart" size={22} color="black" />
                        }
                        {
                            cart && cart.find((item) => item.product.id === selectedProduct.id) ?
                                <Text className="text-background font-bold">Item in Cart</Text>
                                :
                                <Text className="text-background font-bold">Add to Cart</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Product;