"use client";
import Grid from "@/components/Grid";
import { Game } from "@/gameTypes";
import { gameDetails, gameList } from "@/rawg";
import { GameAddedContext } from "@/utils/GameAddedContext";

import { database, databaseId, mylibCol, userID } from "@/utils/appwrite";
import { Query } from "appwrite";
import React, { useContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const MyLib = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const { gameAdded } = useContext(GameAddedContext);



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

    setTimeout(() => {
      getGameIds();
    }, 1000);
  }, [gameAdded]);

  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 font-extrabold text-3xl">My Library</h1>
      {games ? (
        games.length ? (
          <Grid games={games} />
        ) : (
          <div className="text-white mt-10">No games found.</div>
        )
      ) : (
        <div className="flex justify-center items-center">
          <PacmanLoader color="#ffa600" size={20} loading={true} />
        </div>
      )}
    </div>
  );
};

export default MyLib;