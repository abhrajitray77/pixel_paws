/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Grid from "@/components/Grid";
import { Game } from "@/gameTypes";
import { genreGames } from "@/rawg/genreGames";
import { GameDataType, genreList } from "@/rawg/genreList";
import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

interface loadGamesOptions {
  pageNo: number;
}
//target page
type GenrePageProps = {
  params: {
    slug: string;
  };
};

const GenrePage = ({params: {slug}}: GenrePageProps) => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [genre, setGenre] = useState<GameDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState(true);
//for genre name
  const loadGenre = async () => {
    setLoading(true);
    const response = await genreList();
    let { results } = response;
    //filtering the results to get the genre with the slug
    const data = results.reduce((acc: GameDataType | null, genre: GameDataType) => {
      if (genre.slug === slug) {
        acc = genre;
      }
      return acc;
    }, null);
    return data;
  };
//for loading of games 
  const loadGames = async ({ pageNo }: loadGamesOptions) => {
    setLoading(true);

    const response = await genreGames({
      page: pageNo,
      ordering: "popularity",
      pageSize: 20,
      genreSlug: slug,
    });
    let { results } = response;
    //results.forEach((game) => (game.price = getPrice(game)));
    return results || [];
  };
//setting the page number to the next page
  const handleFetchNextPage = async () => {
    setPageNo(pageNo + 1);
  };
//for loading of games belonging to the genre
  useEffect(() => {
    (async () => {
      try {
        const newGames = await loadGames({ pageNo });
        setGames(games ? [...games, ...newGames] : newGames || []);
        setLoading(false);
        if (newGames?.length === 0) {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, [pageNo]);
//for loading of genre name
  useEffect(() => {
    (async () => {
      try {
        const newGenre = await loadGenre();
        setGenre(newGenre);
        setLoading(false);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      { genre ? (
      <h1 className="text-gray-300 text-3xl font-bold">{genre?.name!}</h1>
      ) : (
      <div>
        <PacmanLoader color="#ffa600" size={20} loading={loading} />
      </div>
      )}
      <div className="flex flex-col justify-center items-center">
        {games ? (
          games?.length > 19 ? (
            <div className="pb-4">
              <Grid games={games} />
              {hasNextPage && (
                <div className="flex flex-col my-4 justify-center items-center">
                  <button
                    className="bg-red-500 p-2 px-4 rounded hover:scale-105 transition-transform
                    duration-300 ease-in-out font-semibold text-gray-100"
                    onClick={handleFetchNextPage}
                  >
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Load More</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-100 font-semibold">No games found.</span>
          )
        ) : (
          <div>
            <PacmanLoader color="#ffa600" size={20} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;