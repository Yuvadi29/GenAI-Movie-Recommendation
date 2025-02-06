import db from '@/utils/db';
import { notFound } from 'next/navigation';
import React from 'react';
import { Movie, SimilarMovie } from '../../../../types';
import MoviePoster from '@/components/MoviePoster/page';
import { ObjectId } from 'mongodb';
import ImageHolder from '@/components/ImageHolder/page';

async function MoviePage({ params: { id } }: { params: { id: string } }) {
    const dbInstance = await db;
    const movieCollection = dbInstance
        .db("sample_mflix")
        .collection("embedded_movies");

    const search = movieCollection.find({ _id: new ObjectId(id) });

    if (!(await search.hasNext())) {
        return notFound();
    }

    const result = await search.next();
    if (!result) {
        return notFound();
    }
    const movie = result as unknown as Movie;

    // Get similar movies using vector search
    const similarMovies = await movieCollection
        .aggregate<Movie>([
            {
                $vectorSearch: {
                    index: "vector_index", // Ensure this index exists in MongoDB Atlas
                    path: "embedded_movies",     // The vector field
                    numCandidates: 25,
                    queryVector: movie.plot_embedding,
                    limit: 10, // Return top 10 results
                },
            },
            { $project: { plot_embedding: 0 } }, // Exclude embeddings from results
        ])
        .toArray() as SimilarMovie[];

    // Remove the first result if it's the same movie
    similarMovies.shift();

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
                {/* Conditionally render the Image only if movie.poster is non-empty */}
                {movie?.poster ? (
                    <ImageHolder
                        src={movie.poster}
                        alt={movie?.title || "Movie Poster"}
                        // width={300}
                        // height={450}
                        className="shrink-0 rounded-lg"
                    />
                ) : (
                    // Optionally render a placeholder or nothing at all
                    <div className="w-[300px] h-[450px] flex items-center justify-center bg-gray-300 rounded-lg">
                        <span className="text-gray-700">No Image Available</span>
                    </div>
                )}

                <div className="px-2 md:px-10 flex flex-col gap-y-2">
                    <h1 className="text-6xl font-bold">{movie?.title}</h1>
                    <p className="text-gray-600">{movie?.genres?.join(', ')}</p>
                    <p className="font-light">{movie?.$vectorize}</p>

                    <div className="mt-auto grid grid-cols-2">
                        <div className="font-semibold">
                            <p>Directed by</p>
                            <p>Featuring</p>
                            <p>RunTime:</p>
                            <p>Released:</p>
                            {/* <p>IMDB Rating:</p> */}
                            <p>Language:</p>
                            <p>Country:</p>
                        </div>
                        <div>
                            <p>{movie?.directors?.join(', ')}</p>
                            <p>{movie?.cast?.join(', ')}</p>
                            <p>{movie?.runtime}</p>
                            <p>{movie?.released ? new Date(movie.released).toLocaleDateString() : 'Unknown'}</p>
                            {/* <p>{movie?.imdb}</p> */}
                            <p>{movie?.languages?.join(', ')}</p>
                            <p>{movie?.countries?.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <h2 className="text-3xl pt-10 pl-10 font-bold ">
                    Similar Films you may like
                </h2>
                <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
                    {similarMovies.map((movie, i) => (
                        <MoviePoster
                            key={movie._id}
                            index={i + 1}
                            // similarityRating={Number(movie.$similarity.toFixed(2)) * 100}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
