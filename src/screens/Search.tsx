import React from "react";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container } from "../components/shared";

type Props = NativeStackScreenProps<any, "Search">;

function Search({}: Props): JSX.Element {
    return (
        <Container>
            <Text>Search</Text>
        </Container>
    );
}

export default Search;
