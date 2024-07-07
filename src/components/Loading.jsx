import React, { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import Animated, {
    withTiming,
    Easing,
    withRepeat,
    withSpring,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { width, height } from '../Utils';
import { useSharedValue } from 'react-native-reanimated';

const Loading = ({
    iconWidth,
    iconHeight,
    fullScreen,
    theme,
}) => {

    const loadingIcon = require('../assets/loading.png');
    const loadingIconDark = require('../assets/loading-dark.png');
    const loadingIconLight = require('../assets/loading-light.png');

    const spin = useSharedValue(0);

    const spinAnimation = () => {
        spin.value = withRepeat(
            withTiming(360, {
                duration: 2000,
                easing: Easing.linear,
            }),
            -1
        );
    }

    const springAnimation = () => {
        spin.value = withRepeat(
            withSpring(360, {
                mass: 1,
                damping: 10,
                stiffness: 70,
            }),
            -1
        )
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${spin.value}deg` }]
        };
    })

    useEffect(() => {
        spinAnimation();
    }, [])

    const getIconSource = () => {
        if (theme === 'light') {
            return loadingIconLight;
        } else if (theme === 'dark') {
            return loadingIconDark;
        } else {
            return loadingIcon;
        }
    };

    return (
        <View
            className={
                fullScreen ?
                    "flex-1 bg-background absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
                    :
                    ""
            }
        >
            <Animated.Image
                source={getIconSource()}
                style={[animatedStyle, { width: iconWidth, height: iconHeight }]}
            />
        </View>
    );
}

export default Loading;