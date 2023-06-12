/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import logo from "../public/imgs/nekored.webp";
import SeachBar from "./SeachBar";
import { SidebarContext } from "@/utils/SidebarContext";
/* import { SessionContext } from "@/utils/SessionContext"; */
import { account, avatar, getSessionData } from "@/utils/appwrite";
import { AppwriteException } from "appwrite";
import { useRouter } from "next/navigation";

const Navbar = () => {
/*   const { sessionData } = useContext(SessionContext); */
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const oAuthLogout = () => {
      console.log("Logging out...")
      try {
        account.deleteSession("current");
        console.log("Logged out!")
        router.push("/");
      } catch (AppwriteException) {
        console.error("OAuth logout error:", AppwriteException);
      }
    };

  useEffect (() => {
    ( async () => {
    setSession(await getSessionData());
    })();
  }, []);
  
    

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
              Welcome, {session?.name!}!
            </h2>
          </li>
          <li>
            <button
              onClick={() => oAuthLogout()}
              className="cursor-pointer hover:ring-4 rounded-full
              transition-all ring-red-500 duration-300 ease-in text-white"
              aria-label="Logout"
              name="Logout"
              title="Logout"
            >
              <img
                className="rounded-full w-12 h-12"
                src={`${avatar.getInitials()}`}
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
