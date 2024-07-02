import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { formatMoney } from "../Utils";
import { useStore } from "../../useStore";
import { height, width } from "../Utils";


const ProductPreview = ({ item, navigation }) => {

    const selectProduct = useStore((state) => state.selectProduct);

    return (
        <TouchableOpacity
            className="mb-4 items-center justify-center bg-[#06151e] pb-6 rounded-2xl"
            onPress={() => {
                selectProduct(item.id)
                navigation.navigate("Product")
            }}
        >
            <View 
                className="bg-slate-200 px-4 mb-4 rounded-xl items-center justify-center"
                style={{height: height * .24}}
            >
                <Image
                    source={{ uri: item.image }}
                    className="w-[65%] aspect-square"
                    resizeMode="contain"
                    onError={(error) => console.log('Error loading image:', error)}
                />
            </View>
            <View className="items-center justify-center">
                <Text className="text-text text-center font-bold text-2xl mb-3">
                    {item.name}
                </Text>
                <Text className="text-text">
                    {formatMoney(item.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ProductPreview;