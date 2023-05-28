import React, { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { loadFonts, loadImages } from "./functions/loadAssets";
import { darkColors, lightColors } from "./themes/colors";
import {
    navDarkTheme,
    navLightTheme,
    styledDarkTheme,
    styledLightTheme,
} from "./themes/themes";
import useDarkMode from "./hooks/useDarkMode";
import RootStack from "./navigation/RootStack";
import queryClient from "./api/query";

SplashScreen.preventAutoHideAsync().catch(() => {});

function App() {
    const isDarkMode = useDarkMode();
    const navTheme = isDarkMode ? navDarkTheme : navLightTheme;
    const styledTheme = isDarkMode ? styledDarkTheme : styledLightTheme;

    const preload = async () => {
        try {
            // Preload Assets
            const fonts = loadFonts([Ionicons.font, Feather.font]);
            const images = loadImages([require("./assets/blank.png")]);
            await Promise.all([...fonts, ...images]);
        } catch (e) {
            console.warn(e);
        } finally {
            await SplashScreen.hideAsync();
        }
    };

    useEffect(() => {
        (async () => {
            await preload();
        })();
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={styledTheme}>
                <NavigationContainer theme={navTheme}>
                    <StatusBar
                        backgroundColor={
                            isDarkMode
                                ? darkColors.background
                                : lightColors.background
                        }
                    />
                    <RootStack />
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
