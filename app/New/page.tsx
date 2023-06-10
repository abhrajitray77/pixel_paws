/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Grid from "@/components/Grid";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import getPrice from "@/rawg/getPrice";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

const NewR = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(false); //TO DO: add loading animation react spinner
  const [pageNo, setPageNo] = useState(1);

  //function to load games
  useEffect(() => {
    console.log("pageNo", pageNo);
    const loadGames = async () => {
      setLoading(true);
      const response = await gameList({
        pageIndex: 1,
        page: pageNo,
        ordering: "-released",
      });
      let { results } = response;

      //  results = results.filter((game) => game.ratings_count > 10);
      results.forEach((game) => (game.price = getPrice(game)));
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      try {
        setGames(
          games ? [...games, ...(await loadGames())] : await loadGames()
        );
        setLoading(false);
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, [pageNo]);

  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 text-3xl font-bold">New Releases</h1>
      <div className="flex flex-col justify-center items-center">
        {games ? (
          games.length ? (
            <div className="pb-4">
              <Grid games={games} />
              {pageNo < 3 && loading === false? (
                <div className="flex flex-col my-4 justify-center items-center">
                  <button
                    className="bg-red-500 p-2 px-4 rounded hover:scale-105 transition-transform
                    duration-300 ease-in-out font-semibold text-gray-100"
                    onClick={() => {
                      pageNo < 3 && setPageNo(pageNo + 1);
                    }}
                  >
                    Load More
                  </button>
                </div>
              ) : (
/*                 <span className="text-gray-100 font-semibold my-2 flex justify-center ">
                  No more games found.
                </span> */
               <PacmanLoader className="flex mx-auto my-2" color="#ffa600" size={20} loading={loading} />
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
      <Toaster />
    </div>
  );
};

export default NewR;
