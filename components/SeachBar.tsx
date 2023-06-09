"use client";
import { Game } from "@/gameTypes";
import { Search } from "@/rawg/search";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import placeholderImg from "../public/imgs/imgPlaceholder.jpg"
import Image from "next/image";
import { useRouter } from "next/navigation";


const SeachBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchedGames, setSearchedGames] = useState<Game[] | null>(null);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement | null>(null);

  //function to search games
  useEffect(() => {
    const getSearchedGame = async (searchTerm: string) => {
      const response = await Search({ term: searchTerm });
      let { results } = response;
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

  const keyboardCloseHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchTerm("");
    }
  };
  //Handling outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div className="w-52 md:min-w-min relative z-50"
    ref={searchRef}
    >
      <form
        onFocus={() => setIsSearchOpen(true)}
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
          onKeyDown={keyboardCloseHandler}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search.."
          name="search"
        />
      </form>
      {searchedGames && searchTerm && isSearchOpen ? (
        <>
          {searchedGames.length ? (
            <div className="absolute bg-slate-800/70
             max-h-[400px] w-full overflow-y-scroll scrollbar-thin
             scrollbar-thumb-gray-700 backdrop-blur-lg">
              {searchedGames.map((game) => (
                <div key={game.slug}
                onClick={() => {
                  router.push(`/game/${game.slug}`)
                  setIsSearchOpen(false)
                }}
                className="flex items-center space-x-4 hover:bg-slate-900/60
                transition duration-300 cursor-pointer p-4">
                  {game.background_image && (
                  <Image
                  src={game.background_image || placeholderImg }
                  alt="game cover"
                  width={50}
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
            <div className="p-4 absolute w-full  bg-slate-800 text-gray-100">
              No results found
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SeachBar;
