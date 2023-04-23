import React from "react";
import { Text } from "react-native";
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Container } from "../components/shared";

const newScreen = (title: string) => (): JSX.Element =>
    (
        <Container>
            <Text>{title}</Text>
        </Container>
    );

const NativeStack = createNativeStackNavigator();

function MainStack(): JSX.Element {
    const screenOptions: NativeStackNavigationOptions = {
        headerTitleAlign: "center",
        headerShadowVisible: false,
        animation: "fade_from_bottom",
    };

    return (
        <NativeStack.Navigator screenOptions={screenOptions}>
            <NativeStack.Screen name="One" component={newScreen("One")} />
            <NativeStack.Screen name="Two" component={newScreen("Two")} />
            <NativeStack.Screen name="Three" component={newScreen("Three")} />
        </NativeStack.Navigator>
    );
}

export default MainStack;
