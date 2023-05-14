import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import Loading from "../components/Loading";
import HorizontalMedia from "../components/HorizontalMedia";
import MediaList from "../components/MediaList";
import { VerticalSeparator } from "../components/shared";
import { Movie, MoviesResponse } from "../api/types";
import fetchers from "../api/fetchers";

type Props = NativeStackScreenProps<any, "Movies">;

const SCREEN_HEIGHT = Dimensions.get("window").height;

function Movies({}: Props): JSX.Element {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const nowPlayingResult = useQuery<MoviesResponse>(
        ["movies", "nowPlaying"],
        fetchers.movies.nowPlaying
    );
    const trendingResult = useQuery<MoviesResponse>(
        ["movies", "trending"],
        fetchers.movies.trending
    );
    const upcomingResult = useQuery<MoviesResponse>(
        ["movies", "upcoming"],
        fetchers.movies.upcoming
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
    const extractListKey = (item: Movie) => String(item.id);
    const renderUpcomingMovie = ({ item }: { item: Movie }) => (
        <HorizontalMedia
            title={item.title}
            overview={item.overview}
            releaseDate={item.release_date}
            posterPath={item.poster_path}
        />
    );

    if (loading) return <Loading />;
    return (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
            ListHeaderComponent={() => (
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
                            <Slide
                                key={movie.id}
                                title={movie.title}
                                overview={movie.overview}
                                voteAverage={movie.vote_average}
                                backdropPath={movie.backdrop_path}
                                posterPath={movie.poster_path}
                            />
                        ))}
                    </Swiper>
                    <MediaList
                        title="유행중인 영화"
                        data={trendingResult.data?.results}
                    />
                    <MediaList title="곧 개봉하는 영화" />
                </>
            )}
            data={upcomingResult.data?.results}
            keyExtractor={extractListKey}
            renderItem={renderUpcomingMovie}
            ItemSeparatorComponent={VerticalSeparator}
        />
    );
}

export default Movies;
