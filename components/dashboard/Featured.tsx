"use client";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import React, { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
// To do later, when doing ui/ux. use framer motion to animate the carousel
const spotlightTime: number = 5;

const spotArray = (array: unknown[]) => {
  const newArray = [...array];
  newArray.push(newArray.shift());
  return newArray;
};

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
    let interval: number;
    const loadGames = async () => {
      const response = await gameList({ pageIndex: 0, page: 1, pageSize: 10 });
      let { results } = response;
      results = results.filter((game) => game.metacritic > 50);
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      const loadedGames = await loadGames();
      const games = getSpotlightItems(loadedGames, 3) as Game[];
      setGames(games);
      interval = window.setInterval(() => {
        setGames((games) => spotArray(games as Game[]) as Game[]);
      }, spotlightTime * 1000);
    })();

    return () => {
      // Clear the interval when the component is unmounted or the dependency changes
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1 className="text-gray-100 text-xl md:text-3xl font-bold">Featured</h1>
      {games ? (
        games.length ? (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <CarouselCard game={games[0]} />
            </div>

            <div className="flex">
              {games.slice(1).map((game) => (
                <div key={game.id} className="">
                  <CarouselCard game={game} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-100">No games found</p>
        )
      ) : (
        <p className="text-gray-100">Loading...</p>
      )}
    </div>
  );
};

export default Featured;
