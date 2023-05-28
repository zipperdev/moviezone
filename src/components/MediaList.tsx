import React from "react";
import { InfiniteData } from "react-query";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, MoviesResponse, TvShow, TvShowsResponse } from "../api/types";
import { HorizontalSeparator } from "./shared";
import VerticalMedia from "./VerticalMedia";
import Loading from "./Loading";

interface Props {
    title: string;
    data?: InfiniteData<MoviesResponse | TvShowsResponse>;
    hasNextPage?: boolean;
    fetchNextPage?: () => unknown;
    isFetchingNextPage?: boolean;
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

function MediaList({
    title,
    data,
    hasNextPage,
    fetchNextPage = () => {},
    isFetchingNextPage,
}: Props): JSX.Element {
    const onEndReached = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };
    const extractListKey = (item: Movie | TvShow, index: number) =>
        item.id + index.toString();
    const renderListItem = ({ item }: { item: Movie | TvShow }) => (
        <VerticalMedia data={item} />
    );

    return (
        <Container>
            <Title>{title}</Title>
            {data ? (
                <FlatList
                    horizontal
                    onEndReached={onEndReached}
                    onEndReachedThreshold={2}
                    removeClippedSubviews
                    disableVirtualization={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    ListFooterComponent={() =>
                        isFetchingNextPage ? (
                            <Loading
                                containerStyle={{
                                    marginBottom: 10,
                                    marginLeft: 18,
                                    marginRight: -4,
                                }}
                            />
                        ) : null
                    }
                    data={data.pages?.map((page) => page.results).flat()}
                    keyExtractor={extractListKey}
                    renderItem={renderListItem}
                    ItemSeparatorComponent={HorizontalSeparator}
                />
            ) : null}
        </Container>
    );
}

export default MediaList;
