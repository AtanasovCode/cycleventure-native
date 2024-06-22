import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';

import ProductPreview from "../components/ProductPreview";

const Products = ({ navigation }) => {

    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const products = useStore((state) => state.products);
    const saveProducts = useStore((state) => state.saveProducts);

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

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="p-6 flex-row items-center justify-center mb-10">
                <Text className="font-black text-text text-3xl">cycleventure.</Text>
                <View className="absolute right-6">
                    <Entypo name="shopping-cart" size={27} color="white" />
                </View>
                <View className="w-full bg-slate-700 h-1 absolute bottom-0"></View>
            </View>
            <Text className="text-text text-center font-extrabold text-2xl mb-8">Products</Text>
            {
                loading ?
                    <Text className="text-text">Loading...</Text>
                    :
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductPreview item={item} />}
                        keyExtractor={(item) => item.id.toString()} // Corrected keyExtractor
                    />
            }
        </SafeAreaView>
    );
}

export default Products;