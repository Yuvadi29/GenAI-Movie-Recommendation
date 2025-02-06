import React from 'react'
import db from '@/utils/db'
import { Movie } from '../../types';

const page = async () => {

  const movies = db.collection("movie_reviews")
  console.log(movies);

  const allMovies = await movies.find({}, {}).toArray() as Movie[];
  console.log(allMovies);


  return (
    <div>
      {allMovies.map((movie, index) => (
        <div key={index}>
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page;