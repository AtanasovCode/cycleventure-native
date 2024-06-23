import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { width, height } from "../Utils";
import { useStore } from "../../useStore";
import { supabase } from "../../supabase";
import { TouchableOpacity } from "react-native";

const Auth = () => {

    const email = useStore((state) => state.email);
    const saveEmail = useStore((state) => state.saveEmail);
    const password = useStore((state) => state.password);
    const savePassword = useStore((state) => state.savePassword);


    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="p-6 flex-row items-center justify-center">
                <Text className="font-black text-text text-3xl">cycleventure.</Text>
                <View className="w-full bg-slate-700 h-1 absolute bottom-0"></View>
            </View>
            <View
                className="flex-1 items-center justify-center"
                style={{ marginHorizontal: width * 0.1 }}
            >
                <View
                    className="items-center justify-start w-full mb-8"
                >
                    <Text className="text-text text-left w-full">E-Mail</Text>
                    <TextInput
                        placeholder="mail@example.com"
                        placeholderTextColor={"#aaa8a8"}
                        className="w-full p-3 bg-slate-800 rounded-lg mt-3 text-text"
                        value={email}
                        onTextInput={(value) => saveEmail(value)}
                    />
                </View>
                <View
                    className="items-center justify-start w-full"
                >
                    <Text className="text-text text-left w-full">Password</Text>
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={"#aaa8a8"}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        className="w-full p-3 bg-slate-800 rounded-lg mt-3 text-text"
                        value={password}
                        onTextInput={(value) => savePassword(value)}
                    />
                </View>
                <View className="mt-12 w-full">
                    <TouchableOpacity
                        className="w-full rounded-lg bg-accent items-center justify-center p-4"
                    >
                        <Text className="text-text">Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-full rounded-lg mt-6 bg-primary items-center justify-center p-4"
                    >
                        <Text className="text-background">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Auth;