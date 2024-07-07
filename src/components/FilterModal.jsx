import React, { useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { useStore } from "../../useStore";
import { height, width } from "../Utils";
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
    withTiming,
    Easing,
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
} from "react-native-reanimated";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const FilterModal = () => {

    const filter = useStore((state) => state.filter);
    const showFilter = useStore((state) => state.showFilter);
    const toggleShowFilter = useStore((state) => state.toggleShowFilter);
    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);

    const fade = useSharedValue(0);

    const fadeAnimation = () => {
        fade.value = withTiming(1, {
            duration: 300,
            easing: Easing.inOut(Easing.quad),
        })
    }

    const closeAnimation = () => {
        fade.value = withTiming(0, {
            duration: 150,
            easing: Easing.inOut(Easing.quad),
        }, (isFinished) => {
            if (isFinished) {
                runOnJS(toggleShowFilter)(false)
            }
        })
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fade.value
        }
    })

    useEffect(() => {
        fadeAnimation();
    }, [showFilter])

    return (
        <Modal
            visible={showFilter}
            onRequestClose={() => toggleShowFilter(false)}
            transparent={true}
        >
            <View
                className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
                style={{ backgroundColor: showFilter ? "rgba(0, 0, 0, .7)" : "rgba(0, 0, 0, 0)" }}
            >
                <Animated.View
                    className="bg-gray-800 p-4 rounded-xl"
                    style={[animatedStyle, { width: width * 0.66 }]}
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
                                            w-full flex-row items-center justify-start mb-4 p-1 rounded-xl gap-2
                                            ${filter === item ? 'bg-secondary' : 'bg-transparent'}
                                        `}
                                        onPress={() => {
                                            setFilter(item)
                                            toggleShowFilter(false);
                                        }}
                                    >
                                        {item === "Position" && <MaterialIcons name="numbers" size={20} color="white" />}
                                        {item === "Best Selling" && <FontAwesome name="ticket" size={20} color="white" />}
                                        {item === "Price (High to Low)" && <Ionicons name="pricetag-sharp" size={20} color="white" />}
                                        {item === "Price (Low to High)" && <Ionicons name="pricetags-sharp" size={20} color="white" />}
                                        <Text className="text-text font-semibold text-md">{item}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

export default FilterModal;