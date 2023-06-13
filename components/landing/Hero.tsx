import React from "react";
import Login from "../Login";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 bg-black/40
    md:p-8 lg:p-10 rounded-3xl">
      <div className="flex flex-col items-center md:items-start space-y-6">
        <h1
          className="text-[3rem] md:text-[4rem] lg:text-[5rem]
             font-extrabold text-red-100 drop-shadow-lg
             py-4 md:py-0"
        >
          PixelPaws
        </h1>
        <h2
          className="text-[1.5rem] md:text-[2rem] lg:text-[3rem]
                font-semibold  text-indigo-200 drop-shadow-lg
                hidden md:block"
        >
          All your
          <span className=""> favourite games </span>
          in one place!
        </h2>
      </div>
      <div className="">
        <Login />
      </div>
      <div className="flex flex-col items-center md:items-start space-y-6
      md:hidden py-6 text-center">
        <h2
          className="text-[1.5rem] md:text-[2rem] lg:text-[3rem]
                font-semibold  text-indigo-200 drop-shadow-lg px-5"
        >
          All your
          <span className=""> favourite games </span>
          in one place!
        </h2>
      </div>
    </div>
  );
};

export default Hero;
