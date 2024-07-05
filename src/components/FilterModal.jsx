import {
    Modal,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { useStore } from "../../useStore";
import { height, width } from "../Utils";
import { MaterialIcons } from '@expo/vector-icons';


const FilterModal = () => {

    const filter = useStore((state) => state.filter);
    const showFilter = useStore((state) => state.showFilter);
    const toggleShowFilter = useStore((state) => state.toggleShowFilter);
    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);

    return (
        <Modal
            visible={showFilter}
            onRequestClose={() => toggleShowFilter(false)}
            transparent={true}
        >
            <View
                className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
                style={{ backgroundColor: "rgba(0, 0, 0, .4)" }}
            >
                <View
                    className="bg-background p-4 rounded-xl"
                    style={{ width: width * 0.66 }}
                >
                    <View className="flex-row items-center justify-center gap-2 mb-4">
                        <MaterialIcons name="filter-alt" size={20} color="white" />
                        <Text className="text-text font-semibold text-lg">Filter</Text>
                    </View>
                    <View>
                        {
                            filters.map((item) => {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        className={`
                                            w-full items-center justify-center mb-4 p-2 rounded-xl
                                            ${filter === item ? 'bg-secondary' : 'bg-transparent'}
                                        `}
                                        onPress={() => {
                                            setFilter(item)
                                            toggleShowFilter(false);
                                        }}
                                    >
                                        <Text className="text-text font-semibold text-md">{item}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default FilterModal;