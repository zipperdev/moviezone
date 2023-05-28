import { MoviesResponse, TvShowsResponse } from "../api/types";

const getNextPageParam = (lastPage: MoviesResponse | TvShowsResponse) => {
    const nextPage = lastPage.page + 1;
    return nextPage > lastPage.total_pages ? null : nextPage;
    // Validating if this page is the last page.
};

export default getNextPageParam;
