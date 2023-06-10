"use client";
import GameCard from "@/components/GameCard";
import Grid from "@/components/Grid";
import { userID } from "@/components/SessionProvider";
import { Game } from "@/gameTypes";
import { gameDetails, gameList } from "@/rawg";
import { get } from "@/rawg/api";
import getPrice from "@/rawg/getPrice";
import { database, databaseId, mylibCol } from "@/utils/appwrite";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";

const MyLib = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true); //TO DO: add loading animation react spinner


  //function to load games
  useEffect(() => {
    let gameIds: number[] = [];
    let gameDetailsPromises: Promise<Game>[];

    const getGameIds = () => {
      const searchPromise = database.listDocuments(
        `${databaseId}`,
        `${mylibCol}`,
        [Query.equal("user_id", userID)]
      );
      searchPromise.then(function (response) {
        gameIds = response.documents.map((game) => game.game_id);
        //getting game details for each game id
        gameDetailsPromises = gameIds.map((gameId) =>
          gameDetails({ id: gameId })
        );
        //setting games
        Promise.all(gameDetailsPromises).then((games) => {
          setGames(games);
        });
      });
    };
    //TO-DO: temporary fix for reload userID undefined issue
    setTimeout(() => {
      getGameIds();
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 font-extrabold text-3xl">My Library</h1>
      {games ? (
        games.length ? (
          <Grid games={games} />
        ) : (
          <span className="text-white">No games found.</span>
        )
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

export default MyLib;
