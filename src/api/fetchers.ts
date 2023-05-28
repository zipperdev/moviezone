import { QueryFunctionContext, QueryKey } from "react-query";

const API_KEY = "7633a8bbbc602917153dc162e10ee81a";
const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_QUERY = `api_key=${API_KEY}&language=ko-KR&timezone=Asia/Seoul&region=KR`;
const TV_QUERY =
    DEFAULT_QUERY +
    "&watch_region=KR&with_watch_monetization_types=flatrate|rent|buy|ads|free";

const createFetcher = (url: string) => fetch(url).then((res) => res.json());
const getQueryKeyItem = (queryKey: QueryKey | undefined, index: number) => {
    let query = "";
    if (queryKey) {
        if (queryKey[index]) query = String(queryKey[index]);
    }
    return query;
};

const moviesFetchers = {
    nowPlaying: () =>
        createFetcher(`${BASE_URL}/movie/now_playing?${DEFAULT_QUERY}&page=1`),
    upcoming: ({ pageParam }: QueryFunctionContext) =>
        createFetcher(
            `${BASE_URL}/movie/upcoming?${DEFAULT_QUERY}&page=${pageParam ?? 1}`
        ),
    trending: ({ pageParam }: QueryFunctionContext) =>
        createFetcher(
            `${BASE_URL}/trending/movie/week?${DEFAULT_QUERY}&page=${
                pageParam ?? 1
            }`
        ),
    search: ({ queryKey, pageParam }: QueryFunctionContext) => {
        const query = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/search/movie?${DEFAULT_QUERY}&page=${
                pageParam ?? 1
            }&query=${query}`
        );
    },
    detail: ({ queryKey }: QueryFunctionContext) => {
        const id = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/movie/${id}?${DEFAULT_QUERY}&append_to_response=videos,images`
        );
    },
};
const tvShowsFetchers = {
    trending: ({ pageParam }: QueryFunctionContext) =>
        createFetcher(
            `${BASE_URL}/trending/tv/week?${TV_QUERY}&page=${pageParam ?? 1}`
        ),
    airingToday: ({ pageParam }: QueryFunctionContext) =>
        createFetcher(
            `${BASE_URL}/tv/airing_today?${TV_QUERY}&page=${pageParam ?? 1}`
        ),
    topRated: ({ pageParam }: QueryFunctionContext) =>
        createFetcher(
            `${BASE_URL}/tv/top_rated?${TV_QUERY}&page=${pageParam ?? 1}`
        ),
    search: ({ queryKey, pageParam }: QueryFunctionContext) => {
        const query = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/search/tv?${TV_QUERY}&page=${
                pageParam ?? 1
            }&query=${query}`
        );
    },
    detail: ({ queryKey }: QueryFunctionContext) => {
        const id = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/tv/${id}?${TV_QUERY}&append_to_response=videos,images`
        );
    },
};

const fetchers = {
    movies: moviesFetchers,
    tvShows: tvShowsFetchers,
};

export default fetchers;
