/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useContext } from "react";
import logo from "../public/imgs/nekored.webp";
import { signOut, useSession } from "next-auth/react";
import SeachBar from "./SeachBar";
import { SidebarContext } from "@/utils/SidebarContext";

const Navbar = () => {
  const { data: session, status } = useSession();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex flex-col space-y-1/2 bg-black">
      <div className="flex justify-between items-center">
        <div className="p-2 pl-0 w-20 flex items-center space-x-6">
          <Image
            onClick={handleLogoClick}
            className="rounded-e-full"
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            priority
          />
          <div className="hidden md:block">
            <SeachBar />
          </div>
          <div className="flex flex-col space-x-2 md:hidden font-bold">
            <h1 className="text-2xl text-indigo-300">
              PixelPaws
            </h1>
            <h1 className="text-gray-600 hover:text-red-500 transition
            duration-300 hover:scale-105 text-xs cursor-pointer">
              RAWG x Appwrite
            </h1>
          </div>
        </div>

        <ul className="flex space-x-10 mr-4 text-gray-100 items-center">
          <li className="hidden md:block">
            <h2 className="font-semibold text-xl">
              Welcome, {session?.user?.name}!
            </h2>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="cursor-pointer hover:ring-4 rounded-full
              transition-all ring-red-500 duration-300 ease-in"
              aria-label="Logout"
              name="Logout"
              title="Logout"
            >
              <img
                className="rounded-full w-12 h-12"
                src={`${session?.user?.image}`}
                alt="Profile"
                width={50}
                height={50}
                loading="lazy"
              />
            </button>
          </li>
        </ul>
      </div>
      <span className="bg-red-600 h-1.5"></span>
    </nav>
  );
};

export default Navbar;
