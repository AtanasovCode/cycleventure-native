import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";


const ProductPreview = ({ item }) => {
    return (
        <TouchableOpacity
            className="mb-8"
        >
            <Image
                source={{ uri: item.image }}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.25 }}
                resizeMode="contain"
                onError={(error) => console.log('Error loading image:', error)}
            />

            <Text className="text-text text-center font-bold text-2xl">
                {item.name}
            </Text>
        </TouchableOpacity>
    );
}

export default ProductPreview;