import React from 'react';
import db from '@/utils/db';
import { Movie } from '../../types';
import MoviePoster from '@/components/MoviePoster/page';

const Page = async () => {
  const dbInstance = await db;
  const movieCollection = dbInstance
    .db("sample_mflix")
    .collection("embedded_movies");

  // Fetch movies with a limit (to avoid excessive data fetching)
  const allMovies = await movieCollection.find<Movie>({}).limit(50).toArray();
  console.log(allMovies);


  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {allMovies.map((movie) => (
        <MoviePoster key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default Page;
