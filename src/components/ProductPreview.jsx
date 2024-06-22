import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { formatMoney } from "../Utils";


const ProductPreview = ({ item }) => {
    return (
        <TouchableOpacity
            className="mb-7 items-center justify-center bg-[#06151e] pb-6 rounded-2xl"
        >
            <Image
                source={{ uri: item.image }}
                style={{ width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.25 }}
                resizeMode="contain"
                onError={(error) => console.log('Error loading image:', error)}
            />

            <Text className="text-text text-center font-bold text-2xl mb-3">
                {item.name}
            </Text>
            <Text className="text-text">
                {formatMoney(item.price)}
            </Text>
        </TouchableOpacity>
    );
}

export default ProductPreview;