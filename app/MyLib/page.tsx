'use client'
import GameCard from '@/components/GameCard'
import Grid from '@/components/Grid';
import { userID } from '@/components/SessionProvider';
import { Game } from '@/gameTypes';
import { gameList } from '@/rawg';
import { get } from '@/rawg/api';
import getPrice from '@/rawg/getPrice';
import { database, databaseId, mylibCol } from '@/utils/appwrite';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react'

const MyLib = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);  //TO DO: add loading animation react spinner

  //function to load games
  useEffect(() => {
    const getGameId = () => {
      const searchPromise = database.listDocuments(
        `${databaseId}`,
        `${mylibCol}`,
        [Query.equal("user_id", userID)]
      );
      searchPromise.then(function (response) {
        const gameIds = response.documents.map((game) => game.game_id);
        console.log(gameIds);
        return gameIds;
      });
    };
    const gameId = getGameId();


  }, []);
  return (
    <div className="">
      {games ? (
        games.length ? (
          <Grid games={games}/>
        ) : (
          <span className="text-white">No games found.</span>
        )
      ) : (
        <div className='text-white'>Loading...</div>
      )}
    </div>
  )
}

export default MyLib