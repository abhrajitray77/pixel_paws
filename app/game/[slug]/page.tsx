"use client";
import Banner from "@/components/game/Banner";
import Info from "@/components/game/Info";
import { Game } from "@/gameTypes";
import { gameDetails } from "@/rawg";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

type GamePageProps = {
  params: {
    slug: string;
  };
};

const GamePage = ({ params: { slug } }: GamePageProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  //function for getting game details
  useEffect(() => {
    const getGame = async () => {
      try {
        setGame(await gameDetails({ slug: slug }));
        setLoading(false);
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };
    getGame();
  }, [slug]);

  return (
    <div>
      <div className="absolute inset-0 -z-50
      opacity-10 blur-sm">
        <Image
        src={game?.background_image!}
        alt="bg"
        fill
         />
      </div>
      {game ? (
        <div>
          <Banner
            bannerImg={game.background_image}
            gameName={game.name}
            gameRating={game.ratings_count}
            gameReleaseDate={game.released}
            gameGenres={game.genres}
          />
          <Info 
          game = {game}
           />
        </div>
      ) : (
        <PacmanLoader
          className="flex mx-auto my-2"
          color="#ffa600"
          size={20}
          loading={loading}
        />
      )}
    </div>
  );
};

export default GamePage;
