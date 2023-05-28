import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "../components/shared";

interface Props {
    containerStyle?: StyleProp<ViewStyle>;
}

function Loading({ containerStyle }: Props): JSX.Element {
    const theme = useTheme();

    return (
        <Container style={containerStyle}>
            <ActivityIndicator color={theme.primary} size={30} />
        </Container>
    );
}

export default Loading;
