interface BaseResponse {
    page: number;
    total_results: number;
    total_pages: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export interface TvShow {
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    origin_country: string[];
    vote_average: number;
    vote_count: number;
}

export interface MoviesResponse extends BaseResponse {
    results: Movie[];
}
export interface TvShowsResponse extends BaseResponse {
    results: TvShow[];
}
