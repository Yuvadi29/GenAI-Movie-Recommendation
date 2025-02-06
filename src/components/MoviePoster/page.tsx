import React from 'react'
import { Movie } from '../../../types'
import Image from 'next/image';

const MoviePoster = ({ index, movie }: { index?: number, movie: Movie; }) => {
    return (
        <>
            <div className='relative'>
                <Image
                    className='min-w-64 max-w-64 h-96 object-cover rounded-lg shadow-lg'
                    src={movie?.poster}
                    alt={movie?.title}
                    width={350}
                    height={450}
                />

                {index && (
                    <div className="absolute text-gray-100 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-black">
                        {index}
                    </div>
                )}
            </div>

            <div className="py-2">
                <p className='text-lg font-semibold line-clamp-1 w-64'>{movie?.title}</p>
                <p className='text-gray-500 line-clamp-1'>{movie?.genres}</p>
            </div>
        </>
    )
}

export default MoviePoster;