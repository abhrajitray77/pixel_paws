"use client";
import Banner from "@/components/game/Banner";
import { Game } from "@/gameTypes";
import { gameDetails } from "@/rawg";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

type GamePageProps = {
  params: {
    slug: string;
  };
};

const GamePage = ({ params: { slug } }: GamePageProps) => {
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
        <Banner
          bannerImg={game.background_image}
          gameName={game.name}
          gameRating={game.ratings_count}
          gameReleaseDate={game.released}
          gameGenres={game.genres}
        />
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

export default GamePage;
