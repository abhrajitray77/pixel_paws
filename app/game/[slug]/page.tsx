"use client";
import { Game } from "@/gameTypes";
import { gameDetails } from "@/rawg";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

type GamePageProps = {
  params: {
    slug: string;
  };
};

const GamePage = ({ params: {slug} }: GamePageProps) => {
  const [game, setGame] = useState<Game | null>(null);
  //function for getting game details
  useEffect(() => {
    console.log(slug);
    const getGame = async () => {
      try {
        setGame(await gameDetails({ slug: slug }));
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };
    getGame();
  }, [slug]);

  return (
    <div>
      {game ? (
        <div>
          <h1 className="text-gray-300 font-extrabold text-3xl">{game.name}</h1>
          <Image
            src={game.background_image}
            alt={game.name}
            height={600}
            width={800}
          />
          <p className="text-gray-300">{game.description_raw}</p>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

export default GamePage;
