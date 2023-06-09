import { Game } from "@/gameTypes";
import Image from "next/image";
import React from "react";

type InfoProps = {
  game: Game;
};

const Info = ({
  game
}: {game: Game}) => {
  const {
    description_raw,
    platforms,
    developers,
    publishers,
    short_screenshots
  } = game;
  return (
    <div>
      <div className="flex flex-col lg:flex-row space-y-10
      lg:space-y-0
      lg:space-x-4 pt-6 ">
        {/*Description*/}
        <article className=" flex-1 p-6 space-y-4 bg-indigo-900/30">
          <h1 className="text-lg md:text-xl lg:text-2xl text-gray-200
          font-semibold">
            Description
          </h1>
          {description_raw.split("###").map((p, index) => (
            <p key={index} 
            className="text-gray-400 h-40 md:h-60 overflow-y-scroll
            scrollbar-thin">
              {p}
            </p>
          ))}
        </article>

        {/*Details*/}
        <div className=" p-6 space-y-4 bg-indigo-900/30 lg:max-w-md">
            <div>
              <h1 className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold">
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
              <h1 className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold">
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
              <h1 className="text-md md:text-lg lg:text-xl text-gray-200
              font-semibold">
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
      <div>
        <h1 className="text-md md:text-lg lg:text-xl text-gray-200
        font-semibold text-center mt-6">
          Screenshots
        </h1>
        <div className="flex flex-wrap justify-center">
          {short_screenshots?.map((screenshot) => (
            <div key={screenshot.id} className="text-white">
              {screenshot.image}
              </div>
/*             <Image
              key={screenshot.id}
              src={screenshot.image}
              alt={screenshot.id.toString()}
              className="w-1/2 md:w-1/3 lg:w-1/4 h-48 md:h-60 lg:h-72 object-cover"
            /> */
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
