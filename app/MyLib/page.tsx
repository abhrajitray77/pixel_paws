/* eslint-disable react-hooks/exhaustive-deps */
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
  let gameIds: number[] = [];
  let gameDetailsPromises: Promise<Game>[];

  //function to load games
  useEffect(() => {
    /*     const getGameIds = async () => {
      try {
        const response = await database.listDocuments(
          `${databaseId}`,
          `${mylibCol}`,
          [Query.equal("user_id", userID)]
        );
        const gameIds: number[] = response.documents.map((game) => game.game_id);
        console.log(gameIds);
        return gameIds;
      } catch (error) {
        console.error("Error fetching game IDs:", error);
        return [];
      }
    }; */
    const getGameIds = () => {
      const searchPromise = database.listDocuments(
        `${databaseId}`,
        `${mylibCol}`,
        [Query.equal("user_id", userID)]
      );
      searchPromise.then(function (response) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        gameIds = response.documents.map((game) => game.game_id);
        console.log("first", gameIds);
        
        gameDetailsPromises = gameIds.map((gameId) => gameDetails({id: gameId}));
        console.log("second", gameDetailsPromises);
        Promise.all(gameDetailsPromises).then((games) => { 
          console.log("third", games);
          setGames(games);
        }
        );
      });
    };
    getGameIds();
  }, []);

  return (
    <div className="">
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
