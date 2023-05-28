import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import Loading from "../components/Loading";
import HorizontalMedia from "../components/HorizontalMedia";
import MediaList from "../components/MediaList";
import { VerticalSeparator } from "../components/shared";
import getNextPageParam from "../functions/getNextPageParam";
import { TabsScreenProps } from "../navigation/types";
import { Movie, MoviesResponse } from "../api/types";
import fetchers from "../api/fetchers";

type Props = TabsScreenProps<"Movies">;

const SCREEN_HEIGHT = Dimensions.get("window").height;

function Movies({}: Props): JSX.Element {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const nowPlayingResult = useQuery<MoviesResponse>(
        ["movies", "nowPlaying"],
        fetchers.movies.nowPlaying
    );
    const trendingResult = useInfiniteQuery<MoviesResponse>(
        ["movies", "trending"],
        fetchers.movies.trending,
        { getNextPageParam }
    );
    const upcomingResult = useInfiniteQuery<MoviesResponse>(
        ["movies", "upcoming"],
        fetchers.movies.upcoming,
        { getNextPageParam }
    );

    const loading =
        nowPlayingResult.isLoading ||
        trendingResult.isLoading ||
        upcomingResult.isLoading;

    const onRefresh = () => {
        setRefreshing(true);
        queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
    };
    const onEndReached = () => {
        if (upcomingResult.hasNextPage) {
            upcomingResult.fetchNextPage();
        }
    };
    const extractListKey = (item: Movie) => String(item.id);
    function renderListHeaderComponent() {
        return (
            <>
                <Swiper
                    loop
                    timeout={6}
                    controlsEnabled={false}
                    springConfig={{ tension: 50, friction: 50 }}
                    containerStyle={{
                        marginBottom: 5,
                        width: "100%",
                        height: SCREEN_HEIGHT / 3.5,
                    }}
                >
                    {nowPlayingResult.data?.results.map((movie) => (
                        <Slide key={movie.id} data={movie} />
                    ))}
                </Swiper>
                <MediaList
                    title="유행중인 영화"
                    data={trendingResult.data}
                    hasNextPage={trendingResult.hasNextPage}
                    fetchNextPage={trendingResult.fetchNextPage}
                    isFetchingNextPage={trendingResult.isFetchingNextPage}
                />
                <MediaList title="곧 개봉하는 영화" />
            </>
        );
    }
    const renderUpcomingMovie = ({ item }: { item: Movie }) => (
        <HorizontalMedia data={item} />
    );

    if (loading) return <Loading />;
    return (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            removeClippedSubviews
            onEndReachedThreshold={2}
            disableVirtualization={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
            ListHeaderComponent={renderListHeaderComponent()}
            ListFooterComponent={() =>
                upcomingResult.isFetchingNextPage ? (
                    <Loading
                        containerStyle={{ marginTop: 10, marginBottom: -5 }}
                    />
                ) : null
            }
            data={upcomingResult.data?.pages.map((page) => page.results).flat()}
            /** 
                pages.map(page => page.results) => [ [Movie, Movie], [Movie, Movie, Movie] ]
                pages.map(page => page.results).flat() => [ Movie, Movie, Movie, Movie, Movie ]
            */
            keyExtractor={extractListKey}
            renderItem={renderUpcomingMovie}
            ItemSeparatorComponent={VerticalSeparator}
        />
    );
}

export default Movies;
