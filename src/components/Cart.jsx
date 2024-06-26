import {
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
} from "react-native";
import { width, height } from "../Utils";
import { useStore } from "../../useStore";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const Cart = () => {

    const showCart = useStore((state) => state.showCart);
    const setShowCart = useStore((state) => state.setShowCart);

    return (
        <Modal
            animationType="none"
            visible={showCart}
            onRequestClose={() => setShowCart(false)}
            transparent={true}
        >
            <View
                style={{ backgroundColor: "rgba(0, 0, 0, 0.57)" }}
                className="items-end justify-center flex-1"
            >
                <View
                    className="bg-background p-6"
                    style={{ width: width * 0.75, height: height }}
                >
                    <View className="flex-row items-center justify-center gap-3">
                        <TouchableOpacity 
                            className="absolute left-2"
                            onPress={() => setShowCart(false)}
                        >
                            <EvilIcons name="close" size={32} color="white" />
                        </TouchableOpacity>
                        <Entypo name="shopping-cart" size={27} color="white" />
                        <Text className="text-text text-center font-bold text-xl">CART</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default Cart;