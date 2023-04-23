import React from "react";
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import MainStack from "./MainStack";

const NativeStack = createNativeStackNavigator();

function RootStack(): JSX.Element {
    const screenOptions: NativeStackNavigationOptions = {
        headerShown: false,
        presentation: "modal",
        animation: "fade_from_bottom",
    };

    return (
        <NativeStack.Navigator screenOptions={screenOptions}>
            <NativeStack.Screen name="Tabs" component={MainTabs} />
            <NativeStack.Screen name="Stack" component={MainStack} />
        </NativeStack.Navigator>
    );
}

export default RootStack;
