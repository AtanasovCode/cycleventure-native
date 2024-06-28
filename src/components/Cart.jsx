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
import { width, height } from "../Utils";
import { supabase } from '../../supabase';
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
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
        <View className="flex-row items-center justify-start gap-6 mb-8">
            <View>
                <Image
                    source={{ uri: item.product.image }}
                    className="w-20 h-10"
                    
                />
            </View>
            <View>
                <Text className="text-text font-bold">{item.product.name}</Text>
                <Text className="text-text">${item.product.price}</Text>
                <Text className="text-text">Quantity: {item.quantity}</Text>
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
                    className="bg-background p-6"
                    style={[{ width: width * 0.8, height: height }]}
                >
                    <View className="flex-row items-center justify-center gap-3">
                        <TouchableOpacity
                            className="absolute left-2"
                            onPress={() => {
                                setShowCart(false);
                            }}
                        >
                            <EvilIcons name="close" size={32} color="white" />
                        </TouchableOpacity>
                        <Entypo name="shopping-cart" size={27} color="white" />
                        <Text className="text-text text-center font-bold text-xl">CART</Text>
                    </View>
                    <View className="mt-16">
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
