import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Loading from "../components/Loading";
import MediaList from "../components/MediaList";
import getNextPageParam from "../functions/getNextPageParam";
import { TabsScreenProps } from "../navigation/types";
import { TvShowsResponse } from "../api/types";
import fetchers from "../api/fetchers";

type Props = TabsScreenProps<"TvShows">;

function TvShows({}: Props): JSX.Element {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const airingTodayResult = useInfiniteQuery<TvShowsResponse>(
        ["tv", "airingToday"],
        fetchers.tvShows.airingToday,
        { getNextPageParam }
    );
    const topRatedResult = useInfiniteQuery<TvShowsResponse>(
        ["tv", "topRated"],
        fetchers.tvShows.topRated,
        { getNextPageParam }
    );
    const trendingResult = useInfiniteQuery<TvShowsResponse>(
        ["tv", "trending"],
        fetchers.tvShows.trending,
        { getNextPageParam }
    );

    const loading =
        airingTodayResult.isLoading ||
        topRatedResult.isLoading ||
        trendingResult.isLoading;

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
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
                data={trendingResult.data}
                hasNextPage={trendingResult.hasNextPage}
                fetchNextPage={trendingResult.fetchNextPage}
                isFetchingNextPage={trendingResult.isFetchingNextPage}
            />
            <MediaList
                title="방영할 TV 쇼"
                data={airingTodayResult.data}
                hasNextPage={airingTodayResult.hasNextPage}
                fetchNextPage={airingTodayResult.fetchNextPage}
                isFetchingNextPage={airingTodayResult.isFetchingNextPage}
            />
            <MediaList
                title="높은 평점 TV 쇼"
                data={topRatedResult.data}
                hasNextPage={topRatedResult.hasNextPage}
                fetchNextPage={topRatedResult.fetchNextPage}
                isFetchingNextPage={topRatedResult.isFetchingNextPage}
            />
        </ScrollView>
    );
}

export default TvShows;
