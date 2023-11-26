import React from 'react';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';

import {
    ACTION_THRESHOLD,
    ActionType,
    MAX_ROTATION,
    OPACITY_MINIMUM,
} from '@/constants/animations';
import {AnimatedProductContext} from '@/context/animatedProduct';

type AnimatedProductProviderProps = {
    children: React.JSX.Element;
};

const AnimatedProductProvider = ({children}: AnimatedProductProviderProps) => {
    const action = useSharedValue<ActionType>('idle');
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const context = useSharedValue({x: 0, y: 0});

    const rotation = useDerivedValue<number>(() => {
        let percentageToActionX = offsetX.value / ACTION_THRESHOLD;

        if (percentageToActionX > 1) {
            percentageToActionX = 1;
        } else if (percentageToActionX < -1) {
            percentageToActionX = -1;
        }

        return percentageToActionX * MAX_ROTATION;
    });

    const calculateOpacity = (
        x: number,
        y: number,
        act: ActionType,
    ): ActionType => {
        'worklet';

        const percentageToActionX = Math.max(
            Math.min(x / ACTION_THRESHOLD, 1),
            -1,
        ); // Clamp between -1 and 1
        const percentageToActionY = Math.min(-y / ACTION_THRESHOLD, 1);

        if (
            act === 'buy' ||
            (act === 'idle' &&
                percentageToActionY > Math.abs(percentageToActionX) &&
                percentageToActionY > OPACITY_MINIMUM)
        ) {
            return 'buy';
        }

        if (
            act === 'save' ||
            (act === 'idle' &&
                percentageToActionX > percentageToActionY &&
                percentageToActionX > OPACITY_MINIMUM)
        ) {
            return 'save';
        }

        if (
            act === 'delete' ||
            (act === 'idle' &&
                percentageToActionX < -percentageToActionY &&
                percentageToActionX < -OPACITY_MINIMUM)
        ) {
            return 'delete';
        }

        return 'idle';
    };

    const buyOpacity = useDerivedValue<number>(() => {
        if (
            calculateOpacity(offsetX.value, offsetY.value, action.value) !==
            'buy'
        ) {
            return 0;
        }

        return Math.min(-offsetY.value / ACTION_THRESHOLD, 1); // percentageToActionY
    });

    const saveOpacity = useDerivedValue<number>(() => {
        if (
            calculateOpacity(offsetX.value, offsetY.value, action.value) !==
            'save'
        ) {
            return 0;
        }

        return Math.min(offsetX.value / ACTION_THRESHOLD, 1);
    });

    const deleteOpacity = useDerivedValue<number>(() => {
        if (
            calculateOpacity(offsetX.value, offsetY.value, action.value) !==
            'delete'
        ) {
            return 0;
        }

        return Math.min(-offsetX.value / ACTION_THRESHOLD, 1);
    });

    return (
        <AnimatedProductContext.Provider
            value={{
                offsetX,
                offsetY,
                rotation,
                context,
                action,
                buyOpacity,
                saveOpacity,
                deleteOpacity,
            }}>
            {children}
        </AnimatedProductContext.Provider>
    );
};

export default AnimatedProductProvider;
