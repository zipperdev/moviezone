import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import styled, { useTheme } from "styled-components/native";
import Loading from "../components/Loading";
import MediaList from "../components/MediaList";
import { TabsScreenProps } from "../navigation/types";
import getNextPageParam from "../functions/getNextPageParam";
import { MoviesResponse, TvShowsResponse } from "../api/types";
import fetchers from "../api/fetchers";

type Props = TabsScreenProps<"Search">;

const ScrollContainer = styled.ScrollView``;

const SearchBar = styled.TextInput`
    width: 90%;
    margin: 20px auto 10px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: ${(props) =>
        props.theme.isDarkMode ? props.theme.accent : props.theme.secondary};
`;

const NotifyText = styled.Text`
    margin: 0 auto;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.accent};
    opacity: 0.9;
`;

function Search({}: Props): JSX.Element {
    const theme = useTheme();
    const [query, setQuery] = useState("");
    const searchMoviesResult = useInfiniteQuery<MoviesResponse>(
        ["searchMovies", query],
        fetchers.movies.search,
        {
            enabled: false,
            getNextPageParam,
        }
    );
    const searchTvShowsResult = useInfiniteQuery<TvShowsResponse>(
        ["searchTvShows", query],
        fetchers.tvShows.search,
        {
            enabled: false,
            getNextPageParam,
        }
    );

    const loading =
        searchMoviesResult.isLoading || searchTvShowsResult.isLoading;

    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
        if (query === "") return;
        searchMoviesResult.refetch();
        searchTvShowsResult.refetch();
    };

    return (
        <ScrollContainer
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
        >
            <SearchBar
                returnKeyType="search"
                placeholder="영화나 TV 쇼를 검색해 보세요"
                selectionColor={theme.accent}
                placeholderTextColor={theme.inactive}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {loading ? <Loading containerStyle={{ marginTop: 30 }} /> : null}
            {!loading &&
            (!searchMoviesResult.data || !searchTvShowsResult.data) ? (
                <NotifyText style={{ marginTop: 40 }}>
                    검색하여 더 많은 콘텐츠를{"\n"}탐색해보세요!
                </NotifyText>
            ) : !loading ? (
                <>
                    <MediaList
                        title="영화"
                        data={searchMoviesResult.data}
                        hasNextPage={searchMoviesResult.hasNextPage}
                        fetchNextPage={searchMoviesResult.fetchNextPage}
                        isFetchingNextPage={
                            searchMoviesResult.isFetchingNextPage
                        }
                    />
                    {!searchMoviesResult.data?.pages[0].results[0] ? (
                        <NotifyText>검색한 영화가 없어요</NotifyText>
                    ) : null}
                    <MediaList
                        title="TV 쇼"
                        data={searchTvShowsResult.data}
                        hasNextPage={searchTvShowsResult.hasNextPage}
                        fetchNextPage={searchTvShowsResult.fetchNextPage}
                        isFetchingNextPage={
                            searchTvShowsResult.isFetchingNextPage
                        }
                    />
                    {!searchTvShowsResult.data?.pages[0].results[0] ? (
                        <NotifyText>검색한 TV 쇼가 없어요</NotifyText>
                    ) : null}
                </>
            ) : null}
        </ScrollContainer>
    );
}

export default Search;
