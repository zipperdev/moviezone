import React from "react";
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { MainStackParamList, RootScreenProps } from "./types";

type Props = RootScreenProps<"Stack">;
const NativeStack = createNativeStackNavigator<MainStackParamList>();

function MainStack({}: Props): JSX.Element {
    const screenOptions: NativeStackNavigationOptions = {
        headerTitleAlign: "center",
        headerShadowVisible: false,
        animation: "fade_from_bottom",
    };

    return (
        <NativeStack.Navigator screenOptions={screenOptions}>
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    );
}

export default MainStack;
