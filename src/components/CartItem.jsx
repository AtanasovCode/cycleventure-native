import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import Loading from "./Loading";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { formatMoney } from "../Utils";
import { useStore } from "../../useStore";


const CartItem = ({ item, deleteItem, key }) => {

    const loading = useStore((state) => state.loading);

    return (
        <View key={key} className="flex-row items-center justify-start gap-3 rounded-xl mb-6 bg-slate-800 p-2">
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
                        onPress={() => {
                            console.log(item.product.id);
                            deleteItem(item.product.id)
                        }}
                        disabled={loading}
                    >
                        <FontAwesome5 name="trash" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CartItem;