import { Game } from "@/gameTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import AddButton from "../AddButton";

type CarouselCardProps = {
  game: Game;
};

const CarouselCard = ({ game }: CarouselCardProps) => {
  const { slug, id, name, released, background_image, platforms } = game;

  const releasedDate = new Date(released).toLocaleDateString();
  const platformList = platforms
    .map((platform) => platform.platform.name)
    .join(", ");
  const router = useRouter();

  return (
    <div
      className="relative block rounded-3xl h-max cursor-pointer 
      hover:scale-105 transition-all duration-300 ease-in-out"
      onClick={() => {
        router.push(`/game/${slug}`);
      }}
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-96 h-52 ">
        <Image
          src={background_image}
          alt={name}
          width={800}
          height={400}
          className="rounded-t-3xl"
        />
      </div>
      <div
        className="px-4 py-2 space-y-1 flex justify-between rounded-b-3xl
       backdrop-blur-sm backdrop-brightness-50 "
      >
        <div className="text-sm font-medium text-gray-200 space-y-2">
          <h3 className="font-extrabold text-sm">{name}</h3>
          <p className="">{releasedDate}</p>
        </div>
{/*         <div className="flex">
          <AddButton collection="wishlist" gameId={id} gameName={name} />
        </div> */}
{/*         <div className="flex justify-between">
          {/*           <div className="text-sm font-medium text-gray-300">
            <p className="">{platformList}</p>
          </div> 
        </div> */}
      </div>
    </div>
  );
};

export default CarouselCard;
