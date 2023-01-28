import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Options from '@/screens/Options/Options';
import {
    AppInfoHeader,
    DeletedProductsHeader,
    OptionsHeader,
    UpdateDetailHeader,
    HEADER_HEIGHT_W_STATUS_BAR,
} from '@/nav/Headers';
import DeletedProducts from '@/screens/Options/DeletedProducts';
import AppInfo from '@/screens/Options/AppInfo';
import UpdateDetail from '@/screens/Options/UpdateDetail';

export type OptionsStackParamList = {
    OptionsHome: undefined;
    DeletedProducts: undefined;
    AppInfo: undefined;
    UpdateDetail: undefined;
};

const OptionsStack = createStackNavigator<OptionsStackParamList>();

const OptionsNavigator = () => {
    return (
        <OptionsStack.Navigator
            initialRouteName="OptionsHome"
            screenOptions={{
                headerStyle: {
                    height: HEADER_HEIGHT_W_STATUS_BAR,
                },
            }}>
            <OptionsStack.Screen
                name="OptionsHome"
                component={Options}
                options={{
                    gestureDirection: 'horizontal-inverted',
                    header: OptionsHeader,
                }}
            />
            <OptionsStack.Screen
                name="DeletedProducts"
                component={DeletedProducts}
                options={{
                    header: DeletedProductsHeader,
                }}
            />
            <OptionsStack.Screen
                name="AppInfo"
                component={AppInfo}
                options={{
                    header: AppInfoHeader,
                }}
            />
            <OptionsStack.Screen
                name="UpdateDetail"
                component={UpdateDetail}
                options={{
                    header: UpdateDetailHeader,
                }}
            />
        </OptionsStack.Navigator>
    );
};

export default OptionsNavigator;
