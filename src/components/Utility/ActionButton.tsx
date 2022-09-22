import React, {useMemo} from 'react';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useAppDispatch} from '@/store/hooks';
import {COMMENCE_ANIMATE} from '@/store/slices/product';
import {Entypo, AntDesign, Feather} from '@expo/vector-icons';

type ActionButtonProps = {
    type: 'save' | 'buy' | 'delete';
    radius: number;
    style?: ViewStyle;
};

const PRESSED_SCALE = 0.97;

const ActionButton: React.FC<ActionButtonProps> = ({type, radius, style}) => {
    const scale = useSharedValue(1);
    const dispatch = useAppDispatch();

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value,
                },
            ],
            zIndex: 1,
        };
    });

    const actionPress = () => {
        dispatch(COMMENCE_ANIMATE(type));
    };

    const touchGesture = Gesture.Tap()
        .maxDuration(250)
        .onTouchesDown(() => {
            scale.value = withTiming(PRESSED_SCALE, {
                duration: 100,
            });
        })
        .onTouchesUp(() => {
            runOnJS(actionPress)();
        })
        .onFinalize(() => {
            scale.value = withTiming(1, {
                duration: 100,
            });
        });

    const icon = useMemo(() => {
        switch (type) {
            case 'save':
                return (
                    <Entypo
                        name="heart"
                        size={Math.floor(radius * 0.6)}
                        color="green"
                    />
                );
            case 'buy':
                return (
                    <AntDesign
                        name="shoppingcart"
                        size={Math.floor(radius * 0.6)}
                        color="blue"
                    />
                );
            case 'delete':
                return (
                    <Feather
                        name="x"
                        size={Math.floor(radius * 0.6)}
                        color="red"
                    />
                );
        }
    }, [type]);

    return (
        <Animated.View
            style={[
                styles.buttonContainer,
                {
                    width: radius,
                    height: radius,
                    borderRadius: radius / 2,
                },
                style,
                rStyle,
            ]}>
            <GestureDetector gesture={touchGesture}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}>
                    {icon}
                </View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        shadowColor: '#1a1f25',
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.2,
        backgroundColor: '#f3fcf0',
        zIndex: 1,
    },
});

export default ActionButton;
