import { QueryKey, UseQueryOptions } from "react-query";

const API_KEY = "7633a8bbbc602917153dc162e10ee81a";
const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_QUERY = `api_key=${API_KEY}&language=ko-KR&page=1&timezone=Asia/Seoul&region=KR`;
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
        createFetcher(`${BASE_URL}/movie/now_playing?${DEFAULT_QUERY}`),
    upcoming: () =>
        createFetcher(`${BASE_URL}/movie/upcoming?${DEFAULT_QUERY}`),
    trending: () =>
        createFetcher(`${BASE_URL}/trending/movie/week?${DEFAULT_QUERY}`),
    search: ({ queryKey }: UseQueryOptions) => {
        const query = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/search/movie?${DEFAULT_QUERY}&query=${query}`
        );
    },
};
const tvShowsFetchers = {
    trending: () => createFetcher(`${BASE_URL}/trending/tv/week?${TV_QUERY}`),
    airingToday: () => createFetcher(`${BASE_URL}/tv/airing_today?${TV_QUERY}`),
    topRated: () => createFetcher(`${BASE_URL}/tv/top_rated?${TV_QUERY}`),
    search: ({ queryKey }: UseQueryOptions) => {
        const query = getQueryKeyItem(queryKey, 1);
        return createFetcher(
            `${BASE_URL}/search/tv?${TV_QUERY}&query=${query}`
        );
    },
};

const fetchers = {
    movies: moviesFetchers,
    tvShows: tvShowsFetchers,
};

export default fetchers;
