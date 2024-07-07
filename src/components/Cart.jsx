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
import Animated, { withTiming, Easing, isFinished, runOnJS } from "react-native-reanimated";
import { useSharedValue } from 'react-native-reanimated';
import Loading from './Loading';
import { FontAwesome5 } from '@expo/vector-icons';

const Cart = () => {

    const session = useStore((state) => state.session);
    const showCart = useStore((state) => state.showCart);
    const setShowCart = useStore((state) => state.setShowCart);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const cart = useStore((state) => state.cart);
    const setCart = useStore((state) => state.setCart);

    async function deleteItem(productId) {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('carts')
                .delete()
                .match({ user_id: session?.user.id, product_id: productId })

            if (error) {
                console.error('Error deleting item from carts:', error)
                return false
            }

        } catch (error) {
            console.error('Unexpected error:', error)
            return false
        } finally {
            setLoading(false);
        }
    }

    const renderCartItem = ({ item }) => (
        <View className="flex-row items-center justify-start gap-3 rounded-xl mb-6 bg-slate-800 p-2">
            <View className="w-[35%] items-center justify-center bg-white px-2 rounded-lg relative">
                <Image
                    source={{ uri: item.product.image }}
                    className="w-[100%] aspect-square"
                    resizeMode='contain'
                />
            </View>
            <View className="flex-1">
                <Text className="text-text font-bold text-lg mb-2">{item.product.name}</Text>
                <Text className="text-text">{formatMoney(item.product.price)}</Text>
                <View className="flex-row mt-2 items-center justify-center pr-2">
                    <View className="bg-slate-700 flex-1 mr-6 flex-row justify-between items-center p-2 rounded-xl">
                        <TouchableOpacity>
                            <AntDesign name="minus" size={16} color="white" />
                        </TouchableOpacity>
                        <Text className="text-red-300 mx-4">{item.quantity}</Text>
                        <TouchableOpacity>
                            <AntDesign name="plus" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => deleteItem(item.product.id)}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <Loading
                                    iconWidth={30} 
                                    iconHeight={30} 
                                    fullScreen={false}
                                    theme="light"
                                />
                                :
                                <FontAwesome5 name="trash" size={18} color="white" />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const translateX = useSharedValue(width * .85);

    const onOpenCart = () => {
        translateX.value = withTiming(0, {
            duration: 300,
            easing: Easing.inOut(Easing.quad),
        });
    }

    const onCloseCart = () => {
        translateX.value = withTiming(width * 0.85, {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
        }, (isFinished) => {
            if (isFinished) {
                runOnJS(setShowCart)(false);
            }
        });
    };

    useEffect(() => {
        showCart ? onOpenCart() : onCloseCart();
    }, [showCart])

    return (
        <Modal
            animationType="none"
            visible={showCart}
            onRequestClose={() => {
                onCloseCart();
            }}
            transparent={true}
        >
            <View
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                className="items-end justify-center flex-1"
            >
                <Animated.View
                    className="bg-background p-2"
                    style={[
                        {
                            width: width * 0.85, height: height,
                            transform: [{ translateX }]
                        }
                    ]}
                >
                    <View className="relative flex-row items-center justify-center gap-4 mt-4">
                        <TouchableOpacity
                            className="absolute top-0 left-0 right-0 bottom-0 items-start justify-center"
                            onPress={() => {
                                onCloseCart(false);
                            }}
                        >
                            <EvilIcons name="close" size={32} color="white" />
                        </TouchableOpacity>
                        <Entypo name="shopping-cart" size={27} color="white" />
                        <Text className="text-text font-bold text-xl">CART</Text>
                    </View>
                    <View className="mt-8">
                        {
                            cart && cart.length > 0 ?
                                (
                                    <FlatList
                                        data={cart}
                                        renderItem={renderCartItem}
                                        keyExtractor={(item) => item.id.toString()}
                                    />
                                ) : (
                                    <View className="h-full items-center justify-center">
                                        <Text className="text-slate-400 font-bold text-md">Cart is empty</Text>
                                    </View>)
                        }
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

export default Cart;
