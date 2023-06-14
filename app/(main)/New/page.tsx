/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Grid from "@/components/Grid";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import getPrice from "@/rawg/getPrice";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

interface loadGamesOptions {
  pageNo: number;
}

const NewR = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadGames = async ({ pageNo }: loadGamesOptions) => {
    setLoading(true);

    const response = await gameList({
      pageIndex: 1,
      page: pageNo,
      ordering: "-released",
      pageSize: 20,
    });
    let { results } = response;
    console.log(results);
    //results.forEach((game) => (game.price = getPrice(game)));
    return results || [];
  };

  const handleFetchNextPage = async () => {
    setPageNo(pageNo + 1);
  };

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

  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 text-3xl font-bold">New and Upcoming</h1>
      <div className="flex flex-col justify-center items-center">
        {games ? (
          games?.length > 9 ? (
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

export default NewR;