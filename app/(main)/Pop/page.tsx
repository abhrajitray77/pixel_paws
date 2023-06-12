"use client"
import Grid from '@/components/Grid';
import { Game } from '@/gameTypes';
import { gameList } from '@/rawg';
import getPrice from '@/rawg/getPrice';
import React, { useEffect, useState } from 'react'

const Mpop = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);  //TO DO: add loading animation react spinner

  //function to load games
  useEffect(() => {
    const loadGames = async () => {
      const response = await gameList({ pageIndex: 0, page: 1, pageSize: 10 });
      let { results } = response;
     // results = results.filter((game) => game.ratings_count > 10);
      results.forEach((game) => (game.price = getPrice(game)));
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      try {
        setGames(await loadGames());
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, []);


  return (
    <div className="">
      {games ? (
        games.length ? (
          <Grid games={games}/>
        ) : (
          <span className="NoGames">No games found.</span>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Mpop