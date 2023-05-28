import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Movie, TvShow } from "../api/types";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    data: Movie | TvShow;
}

const Container = styled.View`
    width: 95px;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin-top: 7px;
    color: ${(props) => props.theme.text};
`;

function VerticalMedia({ data }: Props): JSX.Element {
    const navigation = useNavigation();
    const title = "name" in data ? data.name : data.title;

    const navigateToDetail = () =>
        navigation.navigate("Stack", {
            screen: "Detail",
            params: {
                ...data,
            },
        });

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={navigateToDetail}>
            <Container>
                <Poster path={data.poster_path} />
                <Title numberOfLines={1}>{title}</Title>
                <Votes voteAverage={data.vote_average} isCenter />
            </Container>
        </TouchableOpacity>
    );
}

export default React.memo(VerticalMedia);
