import React, { useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
} from "react-native";
import { width, height, formatMoney } from "../Utils";
import { supabase } from '../../supabase';
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Animated from "react-native-reanimated";
import Loading from './Loading';

const Cart = () => {

    const session = useStore((state) => state.session);
    const products = useStore((state) => state.products);
    const showCart = useStore((state) => state.showCart);
    const setShowCart = useStore((state) => state.setShowCart);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const setCart = useStore((state) => state.setCart);
    const cart = useStore((state) => state.cart);

    useEffect(() => {
        if (products.length > 0) {
            getCart();
        }
    }, [products]);

    useEffect(() => {
        console.log(`cart: ${JSON.stringify(cart, null, 2)}`);
    }, [cart]);

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

    const renderCartItem = ({ item }) => (
        <View className="flex-row items-center justify-start gap-3 rounded-xl mb-6 bg-slate-800 p-2">
            <View>
                <Image
                    source={{ uri: item.product.image }}
                    className="w-24 h-12"

                />
            </View>
            <View className="flex-1">
                <Text className="text-text font-bold text-lg mb-2">{item.product.name}</Text>
                <Text className="text-text">{formatMoney(item.product.price)}</Text>
                <View className="flex-row justify-between items-center mt-2 bg-slate-700 p-2 rounded-xl">
                    <TouchableOpacity>
                        <AntDesign name="minus" size={16} color="white" />
                    </TouchableOpacity>
                    <Text className="text-red-300 mx-4">{item.quantity}</Text>
                    <TouchableOpacity>
                        <AntDesign name="plus" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <Modal
            animationType="none"
            visible={showCart}
            onRequestClose={() => setShowCart(false)}
            transparent={true}
        >
            <View
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="items-end justify-center flex-1"
            >
                <Animated.View
                    className="bg-background p-2"
                    style={[{ width: width * 0.85, height: height }]}
                >
                    <View className="relative flex-row items-center justify-center gap-4 mt-4">
                        <TouchableOpacity
                            className="absolute top-0 left-0 right-0 bottom-0 items-start justify-center"
                            onPress={() => {
                                setShowCart(false);
                            }}
                        >
                            <EvilIcons name="close" size={32} color="white" />
                        </TouchableOpacity>
                        <Entypo name="shopping-cart" size={27} color="white" />
                        <Text className="text-text font-bold text-xl">CART</Text>
                    </View>
                    <View className="mt-8">
                        {loading ? (
                            <Loading />
                        ) : (
                            cart && cart.length > 0 ? (
                                <FlatList
                                    data={cart}
                                    renderItem={renderCartItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            ) : (
                                <Text className="text-text font-bold text-xl">Cart is empty</Text>
                            )
                        )}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

export default Cart;
