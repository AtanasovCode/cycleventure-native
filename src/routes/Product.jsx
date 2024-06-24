import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import { supabase } from "../../supabase";
import { useStore } from "../../useStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getRating, width, height, formatMoney } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import Loading from "../components/Loading";

const Product = ({ navigation }) => {

    const session = useStore((state) => state.session);
    const selectedProduct = useStore((state) => state.selectedProduct);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);

    const addToCart = async () => {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const cart = {
                user_id: session?.user.id,
                product_id: selectedProduct.id,
                quantity: 1,
            }

            const { error } = await supabase.from('carts').insert(cart);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
            console.log("Saved to cart")
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
                    <Text className="text-slate-400">{getRating(selectedProduct.rating)}</Text>
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
                    className="items-center justify-center bg-secondary p-2 mt-12 rounded-xl"
                    onPress={() => {
                        addToCart();
                    }}
                >
                    <View className="flex-row items-center justify-center gap-3">
                        <Entypo name="shopping-cart" size={18} color="white" />
                        <Text className="text-text font-semibold">Add to cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {loading && <Loading />}
        </ScrollView>
    );
}

export default Product;