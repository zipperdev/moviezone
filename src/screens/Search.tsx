import React, { useState } from "react";
import { useQuery } from "react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled, { useTheme } from "styled-components/native";
import Loading from "../components/Loading";
import fetchers from "../api/fetchers";
import MediaList from "../components/MediaList";

type Props = NativeStackScreenProps<any, "Search">;

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
`;

function Search({}: Props): JSX.Element {
    const theme = useTheme();
    const [query, setQuery] = useState("");
    const searchMoviesResult = useQuery(
        ["searchMovies", query],
        fetchers.movies.search,
        {
            enabled: false,
        }
    );
    const searchTvShowsResult = useQuery(
        ["searchTvShows", query],
        fetchers.tvShows.search,
        {
            enabled: false,
        }
    );

    const loading =
        searchMoviesResult.isLoading || searchTvShowsResult.isLoading;

    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
        if (query === "") return;
        searchMoviesResult.refetch();
        searchTvShowsResult.refetch();
        console.log(
            searchMoviesResult.data?.results.length,
            searchTvShowsResult.data
        );
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
            {loading ? <Loading /> : null}
            {!loading &&
            (!searchMoviesResult.data || !searchTvShowsResult.data) ? (
                <NotifyText style={{ marginTop: 40 }}>
                    검색하여 더 많은 콘텐츠를{"\n"}탐색해보세요!
                </NotifyText>
            ) : !loading ? (
                <>
                    <MediaList
                        title="영화"
                        data={searchMoviesResult.data?.results}
                    />
                    {!searchMoviesResult.data?.results[0] ? (
                        <NotifyText>검색한 영화가 없어요</NotifyText>
                    ) : null}
                    <MediaList
                        title="TV 쇼"
                        data={searchTvShowsResult.data?.results}
                    />
                    {!searchTvShowsResult.data?.results[0] ? (
                        <NotifyText>검색한 TV 쇼가 없어요</NotifyText>
                    ) : null}
                </>
            ) : null}
        </ScrollContainer>
    );
}

export default Search;
