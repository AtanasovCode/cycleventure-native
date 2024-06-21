import React from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Home = () => {
    return (
        <SafeAreaView className="bg-background flex-1">
            <StatusBar style="light" />
            <View className="p-6 flex-row items-center justify-center">
                <Text className="font-black text-text text-3xl">cycleventure.</Text>
            </View>
            <View className="mt-16 items-center justify-center">
                <Text className="text-text font-extrabold text-2xl text-center">Explore, Enjoy Life</Text>
                <Text className="text-text text-center mt-6" style={{width: width * .7}}>
                    We offer the best road bikes and ebikes for your 
                    to enjoy and explore the world on! We have 
                    partnered with top brands to give you what you deserve!
                </Text>
            </View>
            <View className="mt-12 relative">
                <ImageBackground
                    source={require('../assets/cycle-hill.jpg')}
                    style={{width: width, height: height * 0.4}}
                    className="items-center justify-end p-8"
                >
                    <TouchableOpacity className="px-16 py-3 rounded-xl bg-primary">
                        <Text className="text-background font-extrabold">Explore</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default Home;