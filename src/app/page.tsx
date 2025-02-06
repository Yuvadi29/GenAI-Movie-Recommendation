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
    <div className="flex items-center justify-center pb-24 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allMovies.map((movie) => (
          <MoviePoster key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Page;
