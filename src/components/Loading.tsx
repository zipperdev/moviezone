import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "../components/shared";

interface Props {}

function Loading({}: Props): JSX.Element {
    const theme = useTheme();

    return (
        <Container>
            <ActivityIndicator color={theme.primary} size={30} />
        </Container>
    );
}

export default Loading;
