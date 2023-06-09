import { Game } from "@/gameTypes";
import { Screenshot, ScreenshotItem } from "@/rawg/gameScreenshots";
import Image from "next/image";
import React from "react";
import imgPlace from "../../public/imgs/imgPlaceholder.jpg";

type InfoProps = {
  game: Game;
  screenshots: ScreenshotItem[];
};

const Info = ({ game, screenshots }: InfoProps) => {
  const { description_raw, platforms, developers, publishers } = game;
  return (
    <div>
      <div
        className="flex flex-col lg:flex-row space-y-10
      lg:space-y-0
      lg:space-x-4 pt-6 "
      >
        {/*Description*/}
        <article className=" flex-1 p-6 space-y-4 bg-indigo-900/30">
          <h1
            className="text-lg md:text-xl lg:text-2xl text-gray-200
          font-semibold"
          >
            Description
          </h1>
          <div
            className="text-gray-400 h-40 md:h-60 overflow-y-scroll
            scrollbar-thin"
          >
            {description_raw.split("###").map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </article>

        {/*Details*/}
        <div className=" p-6 space-y-4 bg-indigo-900/30 lg:max-w-md">
          <div>
            <h1
              className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold"
            >
              Platforms
            </h1>
            <ul className="flex flex-wrap">
              {platforms?.map((platform, index) => (
                <li
                  key={index}
                  className="bg-indigo-900/50 text-gray-200 px-2 py-1 
                    rounded-md mr-2 mt-2"
                >
                  {platform.platform.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1
              className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold"
            >
              Developers
            </h1>
            <ul className="flex flex-wrap">
              {developers?.map((developer, index) => (
                <li
                  key={index}
                  className="bg-indigo-900/50 text-gray-200 px-2 py-1
                    rounded-md mr-2 mt-2"
                >
                  {developer.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1
              className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold"
            >
              Publishers
            </h1>
            <ul className="flex flex-wrap">
              {publishers?.map((publisher, index) => (
                <li
                  key={index}
                  className="bg-indigo-900/50 text-gray-200 px-2 py-1
                    rounded-md mr-2 mt-2"
                >
                  {publisher.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*Screenshots*/}
      <div className="space-y-4">
        <h1
          className="text-lg md:text-xl lg:text-2xl text-gray-200
        font-semibold mt-6"
        >
          Screenshots
        </h1>
        <div
          className="grid grid-cols-1 md:grid-cols-2
        drop-shadow-lg gap-4 h-80 overflow-y-scroll scrollbar-thin
        "
        >
          {screenshots?.map((screenshot) => (
            <Image
              key={screenshot.id}
              src={screenshot?.image ? screenshot.image : imgPlace}
              alt={screenshot.id.toString()}
              width={screenshot.width}
              height={screenshot.height}
              className="w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
