export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    Headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
    }
}

export const fetchMovie = async ({ query }: { query: string }) => {
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers

    })

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;

}

export const fetchMovieDetails = async (movieId: string) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchCastCrew = async (movieId: string) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits?language=en-US`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch cast crew: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchTrailers = async (movieId: string) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/videos?language=en-US`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch trailers: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.results.find((video: any) => video.type === 'Trailer')?.key;
}