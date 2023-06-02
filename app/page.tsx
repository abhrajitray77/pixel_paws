"use client";

import Grid from "@/components/Grid";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg/gameList";
import getPrice from "@/rawg/getPrice";
import { useEffect, useState } from "react";

const minCardWidth = 300;

function Home() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [columnsCount, setColumnsCount] = useState(1);
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  useEffect(() => {
    const loadGames = async () => {
      const response = await gameList({ page_size: 50 });
      let { results } = response;
      results = results.filter((game) => game.ratings_count > 10);
      results.forEach((game) => (game.price = getPrice(game)));
      return results;
    };
    (async () => {
      try {
        setGames(await loadGames());
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, []);

  useEffect(() => {
    setColumnsCount(Math.floor(windowWidth / minCardWidth) || 1);
  }, [windowWidth]);

  return (
    <div className="">
      {games ? (
        games.length ? (
          <Grid games={games} columnsCount={columnsCount} />
        ) : (
          <span className="NoGames">No games found.</span>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Home;
