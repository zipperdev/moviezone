import { NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, TvShow } from "../api/types";

export type RootStackParamList = {
    Tabs: NavigatorScreenParams<MainTabsParamList>;
    Stack: NavigatorScreenParams<MainStackParamList>;
};
export type MainTabsParamList = {
    Movies: undefined;
    Search: undefined;
    TvShows: undefined;
};
export type MainStackParamList = {
    Detail: Movie | TvShow;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;
export type TabsScreenProps<T extends keyof MainTabsParamList> =
    BottomTabScreenProps<MainTabsParamList, T>;
export type StackScreenProps<T extends keyof MainStackParamList> =
    NativeStackScreenProps<MainStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
