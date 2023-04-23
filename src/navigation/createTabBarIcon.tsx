import React from "react";
import { Ionicons } from "@expo/vector-icons";

type TabBarIconProps = {
    focused: boolean;
    color: string;
    size: number;
};

const createTabBarIcon = (name: string) => {
    return ({ focused, color, size }: TabBarIconProps): React.ReactNode => {
        return (
            <Ionicons
                name={(name + (!focused ? "-outline" : "")) as any}
                size={size}
                color={color}
            />
        );
    };
};

export default createTabBarIcon;
