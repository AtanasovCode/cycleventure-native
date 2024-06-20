import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";

const Home = () => {
    return (
        <SafeAreaView className="bg-background flex-1 items-center justify-center">
            <StatusBar style="light" />
            <Text className="text-text text-center font-bold ">Cycleventure.</Text>
        </SafeAreaView>
    );
}

export default Home;