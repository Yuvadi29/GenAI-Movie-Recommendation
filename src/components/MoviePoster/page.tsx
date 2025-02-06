import React from 'react'
import { Movie } from '../../../types'
import ImageHolder from '../ImageHolder/page';
import Link from 'next/link';

const MoviePoster = ({ index, movie }: { index?: number, movie: Movie; }) => {
    return (
        <>
            <Link key={movie._id} href={`/movie/${movie._id}`} className="">
                <div className='relative'>
                    <ImageHolder
                        className='min-w-64 max-w-64 h-96 object-cover rounded-lg shadow-lg'
                        src={movie?.poster}
                        alt={movie?.title}
                    />

                    {/* {index && ( */}
                    <div className="absolute text-black-100 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-black">
                        {index}
                    </div>
                    {/* )} */}
                </div>

                <div className="py-2">
                    <p className='text-lg font-semibold line-clamp-1 w-64'>{movie?.title}</p>
                    <p className='text-gray-500 line-clamp-1'>{movie?.genres}</p>
                </div>
            </Link>
        </>
    )
}

export default MoviePoster;