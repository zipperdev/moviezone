import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import MediaList from "../components/MediaList";
import { TvShowsResponse } from "../api/types";
import fetchers from "../api/fetchers";

type Props = NativeStackScreenProps<any, "TvShows">;

function TvShows({}: Props): JSX.Element {
    const queryClient = useQueryClient();
    const airingTodayResult = useQuery<TvShowsResponse>(
        ["tv", "airingToday"],
        fetchers.tvShows.airingToday
    );
    const topRatedResult = useQuery<TvShowsResponse>(
        ["tv", "topRated"],
        fetchers.tvShows.topRated
    );
    const trendingResult = useQuery<TvShowsResponse>(
        ["tv", "trending"],
        fetchers.tvShows.trending
    );

    const loading =
        airingTodayResult.isLoading ||
        topRatedResult.isLoading ||
        trendingResult.isLoading;
    const refreshing =
        airingTodayResult.isRefetching ||
        topRatedResult.isRefetching ||
        trendingResult.isRefetching;

    const onRefresh = () => {
        queryClient.refetchQueries(["tv"]);
    };

    if (loading) return <Loading />;
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 5, paddingBottom: 20 }}
        >
            <MediaList
                title="유행중인 TV 쇼"
                data={trendingResult.data?.results}
            />
            <MediaList
                title="방영할 TV 쇼"
                data={airingTodayResult.data?.results}
            />
            <MediaList
                title="높은 평점 TV 쇼"
                data={topRatedResult.data?.results}
            />
        </ScrollView>
    );
}

export default TvShows;
