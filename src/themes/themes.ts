import { Theme } from "@react-navigation/native";
import { darkColors, lightColors } from "./colors";

export const navLightTheme: Theme = {
    dark: false,
    colors: {
        background: lightColors.background,
        border: lightColors.secondary,
        card: lightColors.background,
        notification: lightColors.background,
        primary: lightColors.primary,
        text: lightColors.text,
    },
};

export const navDarkTheme: Theme = {
    dark: true,
    colors: {
        background: darkColors.background,
        border: darkColors.background,
        card: darkColors.background,
        notification: darkColors.background,
        primary: darkColors.primary,
        text: darkColors.primary,
    },
};

export const styledLightTheme = {
    isDarkMode: false,
    background: lightColors.background,
    text: lightColors.text,
    primary: lightColors.primary,
    secondary: lightColors.secondary,
    accent: lightColors.accent,
    inactive: lightColors.inactive,
};

export const styledDarkTheme = {
    isDarkMode: true,
    background: darkColors.background,
    text: darkColors.text,
    primary: darkColors.primary,
    secondary: darkColors.secondary,
    accent: darkColors.accent,
    inactive: darkColors.inactive,
};
