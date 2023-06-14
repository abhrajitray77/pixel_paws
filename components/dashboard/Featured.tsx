"use client";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import React, { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import { PacmanLoader } from "react-spinners";
// To do later, when doing ui/ux. use framer motion to animate the carousel

const getSpotlightItems = (items: unknown[], length: number) => {
  const randomItems: unknown[] = [];
  while (randomItems.length < length) {
    const index = Math.floor(Math.random() * items.length);
    if (!randomItems.includes(items[index])) {
      randomItems.push(items[index]);
    }
  }
  return randomItems;
};

const Featured = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      const pageNo = Math.floor(Math.random() * 3) + 1;
      const response = await gameList({
        pageIndex: 0,
        page: pageNo,
        pageSize: 30,
      });
      let { results } = response;
      results = results.filter((game) => game.metacritic > 40);
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      const loadedGames = await loadGames();
      const games = getSpotlightItems(loadedGames, 3) as Game[];
      setGames(games);
    })();
  }, []);

  return (
    <div className="">
      <h1
        className="text-gray-100 text-xl md:text-3xl font-bold
      "
      >
        Featured
      </h1>
      {games ? (
        games.length ? (
          <div className="flex justify-center my-4">
            <div
              className="grid grid-cols-1 md:grid-cols-2
           gap-4 place-items-center"
            >
              <div className="flex items-center">
                <CarouselCard game={games[0]} />
              </div>

              <div
                className="flex md:flex-col gap-2 md:gap-4
            md:max-w-[384px]"
              >
                {games.slice(1).map((game) => (
                  <CarouselCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-100">No games found</p>
        )
      ) : (
        <div className="flex justify-center items-center">
          <PacmanLoader color="#ffa600" size={20} loading={true} />
        </div>
      )}
    </div>
  );
};

export default Featured;
