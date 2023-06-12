"use client";
import React from "react";
import logo from "../public/imgs/nekored.webp";
import Image from "next/image";
import { account } from "@/utils/appwrite";
import { BsDiscord } from "react-icons/bs";

const Login = () => {
  const oAuthLogin = () => {
    try {
      account.createOAuth2Session("discord", "http://localhost:3000/dashboard");
    } catch (error) {
      console.error("OAuth login error:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div
        className="flex flex-col mx-auto items-center space-y-6 bg-red-100 p-8
      rounded-3xl"
      >
        <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-lg">
          PixelPaws
        </h1>
        <div className="h-40 w-40 drop-shadow-xl">
          <Image
            className="rounded-full"
            src={logo}
            alt="Neko logo"
            height={400}
            width={400}
          />
        </div>
        {/* email and password login */}
        <form className="flex flex-col space-y-4">
          <input
            className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            type="email"
            placeholder="Email"
          />
          <input
            className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            type="password"
            placeholder="Password"
          />
          <button
            className="px-6 py-3 bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110
        transition-all duration-300 ease-in-out font-semibold"
          >
            Login
          </button>
        </form>

        <button
          className="px-6 py-3 flex bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110
       transition-all duration-300 ease-in-out font-semibold items-center justify-between space-x-2"
          onClick={() => oAuthLogin()}
        >
          <BsDiscord /> 
         <h1>Login with Discord</h1>
        </button>
      </div>
    </div>
  );
};

export default Login;
