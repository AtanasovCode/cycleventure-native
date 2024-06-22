import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import { width, height } from '../Utils';

const Loading = () => {
    const loadingIcon = require('../assets/loading.png');
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );
        spinAnimation.start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View
            className="flex-1 bg-background absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
        >
            <Animated.Image
                source={loadingIcon}
                className="w-32 h-32"
                style={{ transform: [{ rotate: spin }] }}
            />
        </View>
    );
}

export default Loading;