export type Movie = {
    _id: string;
    title: string;
    year: number;
    released: string;
    genres: string[];
    directors: string[];
    writers: string[];
    languages: string[];
    countries: string[];
    awards: Record<string, any>; // Assuming it's an object
    poster: string;
    imdb: {
        [key: string]: any; // Define more specifically if needed
    };
    type: string;
    runtime: number;
    cast: string[];
    num_mflix_comments: number;
    plot: string;
    fullplot: string;
    lastupdated: string;
    tomatoes: Record<string, any>; // Assuming it's an object
    $vectorize: string;
    plot_embedding: number[];
};

export type SimilarMovie = {
    $similarity: number;
} & Movie;
