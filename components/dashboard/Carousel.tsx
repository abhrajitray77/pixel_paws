"use client";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

import { Game } from "@/gameTypes";
import GameCard from "../GameCard";

type Props = {
  games: Game[];
};

const Carousel = ({ games }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute fill-slate-200 top-0 bottom-0 left-2 z-40
        m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100
        ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 scrollbar-hide md:p-2"
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute fill-slate-200 top-0 bottom-0 right-2 z-40
        m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Carousel;
