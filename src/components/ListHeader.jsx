import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useStore } from "../../useStore";

const ListHeader = () => {

    const showFilter = useStore((state) => state.showFilter);
    const toggleShowFilter = useStore((state) => state.toggleShowFilter);

    return (
        <View className="items-center justify-center my-8">
            <Text className="text-text font-bold text-xl">
                Products
            </Text>
            <TouchableOpacity 
                className="pr-8 absolute top-0 left-0 right-0 bottom-0 items-end justify-center"
                onPress={() => {
                    toggleShowFilter(!showFilter)
                }}
            >
                <MaterialIcons name="filter-alt" size={26} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default ListHeader;
