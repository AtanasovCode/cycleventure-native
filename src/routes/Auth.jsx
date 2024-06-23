import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { width, height } from "../Utils";
import { useStore } from "../../useStore";
import { supabase } from "../../supabase";
import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";

const Auth = () => {

    const email = useStore((state) => state.email);
    const saveEmail = useStore((state) => state.saveEmail);
    const password = useStore((state) => state.password);
    const savePassword = useStore((state) => state.savePassword);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);


    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }


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
                        placeholderTextColor={"#c7b9b9"}
                        className="w-full p-3 bg-slate-700 rounded-lg mt-3 text-text"
                        value={email}
                        onChangeText={(value) => {
                            saveEmail(value)
                        }}
                    />
                </View>
                <View
                    className="items-center justify-start w-full"
                >
                    <Text className="text-text text-left w-full">Password</Text>
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={"#c7b9b9"}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        className="w-full p-3 bg-slate-700 rounded-lg mt-3 text-text"
                        value={password}
                        onChangeText={(value) => savePassword(value)}
                    />
                </View>
                <View className="mt-12 w-full">
                    <TouchableOpacity
                        className="w-full rounded-lg bg-accent items-center justify-center p-4"
                        disabled={loading}
                        onPress={() => signInWithEmail()}
                    >
                        <Text className="text-text">Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-full rounded-lg mt-6 bg-primary items-center justify-center p-4"
                        disabled={loading}
                        onPress={() => signUpWithEmail()}
                    >
                        <Text className="text-background">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {loading && <Loading />}
        </SafeAreaView>
    );
}

export default Auth;