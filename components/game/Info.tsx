import React from "react";

type InfoProps = {
  gameDesc: string;
  gamePlatforms?: string[];
  gamePublishers?: string[];
  gameDevelopers?: string[];
  gameWebsite?: string;
  gamePrice?: string;
};

const Info = ({
  gameDesc,
  gamePlatforms,
  gamePublishers,
  gameDevelopers,
  gameWebsite,
  gamePrice,
}: InfoProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex space-y-10
      pt-6">
        {/*Description*/}
        <article className=" p-6 space-y-4 bg-indigo-900/30">
          <h1 className="text-lg md:text-xl lg:text-2xl text-gray-200
          font-semibold">
            Description
          </h1>
          <p className=" text-gray-400">
          {gameDesc.split("###").map((p, index) => (
            <p key={index}>{p}</p>
          ))}
          </p>
        </article>

        {/*Details*/}
        <div></div>
      </div>

      {/*Screenshots*/}
      <div></div>
    </div>
  );
};

export default Info;
