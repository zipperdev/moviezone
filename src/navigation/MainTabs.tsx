import React from "react";
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import TvShows from "../screens/TvShows";
import useDarkMode from "../hooks/useDarkMode";
import { darkColors, lightColors } from "../themes/colors";
import createTabBarIcon from "./createTabBarIcon";
import { MainTabsParamList, RootScreenProps } from "./types";

type Props = RootScreenProps<"Tabs">;
const Tabs = createBottomTabNavigator<MainTabsParamList>();

const shadowOptions = {
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
};

function MainTabs({}: Props): JSX.Element {
    const theme = useTheme();
    const isDarkMode = useDarkMode();

    const screenOptions: BottomTabNavigationOptions = {
        unmountOnBlur: true,
        headerTitleAlign: "center",
        headerShadowVisible: true,
        headerStyle: {
            ...shadowOptions,
        },
        tabBarStyle: {
            height: 54,
            ...shadowOptions,
        },
        tabBarInactiveTintColor: isDarkMode
            ? darkColors.inactive
            : lightColors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
            marginTop: -8,
            marginBottom: 7,
            fontSize: 11,
            fontWeight: "600",
        },
    };

    return (
        <Tabs.Navigator
            screenOptions={screenOptions}
            sceneContainerStyle={{ backgroundColor: theme.background }}
        >
            <Tabs.Screen
                name="Movies"
                component={Movies}
                options={{
                    title: "영화",
                    tabBarIcon: createTabBarIcon("film"),
                }}
            />
            <Tabs.Screen
                name="Search"
                component={Search}
                options={{
                    title: "탐색",
                    tabBarIcon: createTabBarIcon("compass"),
                }}
            />
            <Tabs.Screen
                name="TvShows"
                component={TvShows}
                options={{
                    title: "TV",
                    tabBarIcon: createTabBarIcon("tv"),
                }}
            />
        </Tabs.Navigator>
    );
}

export default MainTabs;
