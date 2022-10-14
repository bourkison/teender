import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '@/nav/Navigator';

const Options = ({}: StackScreenProps<MainStackParamList, 'Options'>) => {
    return (
        <View>
            <Text>Options</Text>
        </View>
    );
};

export default Options;
