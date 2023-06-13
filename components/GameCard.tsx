import { Game } from "@/gameTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AddButton from "./AddButton";

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  const { slug, id, name, released, background_image, platforms, genres } =
    game;

  const releasedDate = new Date(released).toLocaleDateString();
  const genreList = genres.map((genre) => genre.name).join(", ");
  const platformList = platforms
    .map((platform) => platform.platform.slug)
    .join(", ");
  const router = useRouter();

  return (
    <div
      className="block rounded-3xl h-max cursor-pointer 
      hover:scale-105 transition-all duration-300 ease-in-out
      "
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex "
        onClick={() => {
          router.push(`/game/${slug}`);
        }}
      >
        <Image
          src={background_image}
          alt={name}
          width={800}
          height={400}
          placeholder="blur"
          blurDataURL={background_image}
          className="rounded-t-3xl"
        />
      </div>
      <div
        className="px-4 py-2 rounded-b-3xl space-y-2
       backdrop-blur-sm backdrop-brightness-50 "
      >
        <div className="flex justify-between">
          <AddButton collection="mylib" gameId={id} gameName={name} />
          <AddButton
            collection="wishlist"
            gameId={id}
            gameName={name}
          />
        </div>

        <div
          className="space-y-1 flex justify-between"
          onClick={() => {
            router.push(`/game/${slug}`);
          }}
        >
          <div className="text-sm font-medium text-gray-200 space-y-1">
            <h3 className="font-extrabold text-sm">{name}</h3>
            <p className="">{releasedDate}</p>
            <p className="text-xs">{genreList}</p>
          </div>
          {/*         <div className="text-sm font-medium text-gray-300">
            <p className="">{platformList}</p>
        </div>  */}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
