"use client";
import GenreCards from "@/components/genres/GenreCards";

import { GameDataType, genreList } from "@/rawg/genreList";
import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const Genre = () => {
  const [genre, setGenre] = useState<GameDataType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const newGenre = await genreList();
        setGenre(newGenre?.results!);
        setLoading(false);
      } catch (error) {
        console.error("Error loading genre:", error);
      }
    };
    getGenre();
  }, []);
  return (
    <div className="relative space-y-8">
      <h1 className="text-gray-300 text-3xl font-bold">Genres</h1>
        {genre ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-2 md:gap-4 place-items-center">
            {genre?.map((genres) => (
              <GenreCards
                key={genres?.id!}
                name={genres?.name!}
                image={genres?.image_background!}
                listSlug={genres?.slug!}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <PacmanLoader color="#ffa600" size={20} loading={true} />
          </div>
        )}
    </div>
  );
};

export default Genre;
