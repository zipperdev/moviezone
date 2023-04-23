import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, TvShow } from "../api/types";
import { HorizontalSeparator } from "./shared";
import VerticalMedia from "./VerticalMedia";

interface Props {
    title: string;
    data?: Movie[] | TvShow[];
}

const Container = styled.View`
    margin-top: 30px;
`;

const Title = styled.Text`
    font-size: 19px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 12px;
    color: ${(props) => props.theme.text};
`;

function MediaList({ title, data }: Props): JSX.Element {
    const extractListKey = (item: Movie | TvShow) => String(item.id);
    const renderListItem = ({ item }: { item: Movie | TvShow }) => (
        <VerticalMedia
            title={"name" in item ? item.name : item.title}
            voteAverage={item.vote_average}
            posterPath={item.poster_path}
        />
    );

    return (
        <Container>
            <Title>{title}</Title>
            {data ? (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    keyExtractor={extractListKey}
                    data={data}
                    renderItem={renderListItem}
                    ItemSeparatorComponent={HorizontalSeparator}
                />
            ) : null}
        </Container>
    );
}

export default MediaList;
