import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Movie } from "../api/types";
import ReleaseDate from "./bases/ReleaseDate";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    data: Movie;
}

const Container = styled.View`
    padding: 0 20px;
    flex-direction: row;
`;

const ContentColumn = styled.View`
    width: 80%;
    margin-left: 15px;
`;

const Title = styled.Text`
    width: 80%;
    font-size: 16px;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: -2px;
    color: ${(props) => props.theme.text};
`;

const Overview = styled.Text`
    width: 80%;
    font-size: 14px;
    margin-top: 7px;
    color: ${(props) => props.theme.text + "dd"};
`;

function HorizontalMedia({ data }: Props): JSX.Element {
    const navigation = useNavigation();

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
                <ContentColumn>
                    <Title numberOfLines={1}>{data.title}</Title>
                    {data.vote_average ? (
                        <Votes voteAverage={data.vote_average} />
                    ) : data.release_date ? (
                        <ReleaseDate releaseDate={data.release_date} />
                    ) : null}
                    <Overview numberOfLines={4}>{data.overview}</Overview>
                </ContentColumn>
            </Container>
        </TouchableOpacity>
    );
}

export default React.memo(HorizontalMedia);
