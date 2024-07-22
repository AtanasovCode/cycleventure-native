import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { formatMoney } from "../Utils";
import { useStore } from "../../useStore";
import { height, width, getRating } from "../Utils";
import { AntDesign } from '@expo/vector-icons';


const ProductPreview = ({ item, navigation }) => {

    const selectProduct = useStore((state) => state.selectProduct);

    return (
        <TouchableOpacity
            className="mb-4 items-center justify-center bg-[#1e1e1e] py-4 rounded-2xl"
            onPress={() => {
                selectProduct(item.id)
                navigation.navigate("Product")
            }}
        >
            <View
                className="mb-4 rounded-xl items-center justify-center"
                style={{ height: height * .24 }}
            >
                <Image
                    source={{ uri: item.image }}
                    className="w-[70%] aspect-square"
                    resizeMode="contain"
                    onError={(error) => console.log('Error loading image:', error)}
                />
            </View>
            <View className="items-start justify-center">
                <Text className="text-text text-center font-bold text-2xl mb-1">
                    {item.name}
                </Text>
                <View className="flex-row items-center justify-center gap-2 mt-1">
                    <Text>
                        {getRating(item.rating, 15)}
                    </Text>
                    <Text className="text-slate-400 text-sm text-center">
                        {item.sold} sold
                    </Text>
                </View>
                <View className="flex-row items-start justify-center gap-2 mt-1">
                    <Text className="text-text font-bold text-xl">
                        {formatMoney(item.price)}
                    </Text>
                    <View className="flex-row items-center justify-center gap-1">
                        <Text className="text-slate-400 font-sm">In stock</Text>
                        <AntDesign name="checkcircle" size={13} color="#37d837" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ProductPreview;