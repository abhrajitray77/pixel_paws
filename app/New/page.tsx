"use client";
import Grid from "@/components/Grid";
import LoadMore from "@/components/LoadMore";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import getPrice from "@/rawg/getPrice";
import React, { useEffect, useState } from "react";

const NewR = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(false); //TO DO: add loading animation react spinner
  const [pageNo, setPageNo] = useState(1);

  //function to load games
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const response = await gameList({
        pageIndex: 1,
        page: pageNo,
        ordering: "released",
      });
      let { results } = response;
      //  results = results.filter((game) => game.ratings_count > 10);
      results.forEach((game) => (game.price = getPrice(game)));
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      try {
        setGames(games ? [...games, ...(await loadGames())] : await loadGames());
        setLoading(false);
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, [pageNo, games]);
  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 text-3xl font-bold">New Releases</h1>
      <div className="">
        {games ? (
          games.length ? (
            <Grid games={games} />
          ) : (
            <span className="NoGames">No games found.</span>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div
      className="flex justify-center"
       onClick={() => setPageNo(pageNo + 1)}>
        <LoadMore playAnim={loading} />
      </div>
    </div>
  );
};

export default NewR;
