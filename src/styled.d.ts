import "styled-components/native";

declare module "styled-components/native" {
    export interface DefaultTheme {
        isDarkMode: boolean;
        background: string;
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        inactive: string;
    }
}
