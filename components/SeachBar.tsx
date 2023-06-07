"use client";
import { Game } from "@/gameTypes";
import { Search } from "@/rawg/search";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import React, { ChangeEvent, useEffect, useState } from "react";
import placeholderImg from "../public/imgs/imgPlaceholder.jpg"
import Image from "next/image";


const SeachBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchedGames, setSearchedGames] = useState<Game[] | null>(null);

  //function to search games
  useEffect(() => {
    const getSearchedGame = async (searchTerm: string) => {
      const response = await Search({ term: searchTerm });
      let { results } = response;
      console.log(results);
      return results;
    };
    (async () => {
      try {
        setSearchedGames(await getSearchedGame(searchTerm));
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, [searchTerm]);

  return (
    <div className="">
      <form
        className="flex bg-slate-900 p-2 px-4
        rounded-lg space-x-4"
        autoComplete="off"
        action="#"
        aria-label="Search"
      >
        <MagnifyingGlassIcon
          className="h-6 w-6
         text-red-500"
        />
        <input
          className="bg-transparent text-red-500
            focus:outline-none "
          id="search"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search.."
          name="search"
        />
      </form>
      {searchedGames && searchTerm ? (
        <>
          {searchedGames.length ? (
            <div className="absolute p-4 bg-slate-800 space-y-2
             max-h-[400px] w-max overflow-y-scroll scrollbar-thin
             scrollbar-thumb-gray-700">
              {searchedGames.map((game) => (
                <div key={game.slug}
                className="flex items-center space-x-4">
                  {game.background_image && (
                  <Image
                  src={game.background_image || placeholderImg }
                  alt="game cover"
                  width={30}
                  height={50}
                  />
                  )}
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-gray-100 font-semibold">
                      {game.name}
                    </h1>
                    <h2 className="text-gray-400 text-sm">
                      {game.released}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-slate-800 text-gray-100">
              No results found
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SeachBar;
