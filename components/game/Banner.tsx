import Image from 'next/image';
import React from 'react'

type BannerProps = {
    bannerImg: string;
    gameName: string;
    gameRating: number;
    gameReleaseDate: string;
    gameGenres: {name: string}[]
}

const Banner = ({
    bannerImg,
    gameName,
    gameRating,
    gameReleaseDate,
    gameGenres
}: BannerProps) => {
  return (
    <div>
        <div className="relative">
            <div className="absolute inset-0">
                <Image
                    className="w-full h-full object-cover object-top"
                    src={bannerImg}
                    alt="gameImg"
                    fill
                />
                <div
                    className="absolute inset-0 bg-gradient-to-r
                    from-black to-transparent"
                />
            </div>
            <div className="relative max-w-7xl px-8 pt-24 pb-8 md:pt-32 lg:pt-40">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {gameName}
                </h1>
                <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                    {gameGenres.map((genre) => genre.name).join(", ")}
                </p>
                <h2 className='mt-1 text-xl text-indigo-100 max-w-3xl'>
                    Metacritic Rating: { gameRating } 
                </h2>
                <h2 className='mt-1 text-md text-indigo-100 max-w-3xl'>
                    Release Date: { gameReleaseDate }
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Banner