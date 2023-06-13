"use client";
import React, { useContext } from "react";
import SideButton from "./SideButton";
import {
  FireIcon,
  FolderIcon,
  GiftIcon,
  SparklesIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { SidebarContext } from "@/utils/SidebarContext";
import SeachBar from "./SeachBar";
import Link from "next/link";

//TODO: add animated colour buttons on hover?

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <div className="">
      <nav className="hidden md:flex md:flex-col h-screen py-4 px-5 space-y-2
      ">
        <div className="">
          <SideButton name="Dashboard" path="/dashboard">
            <HomeIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="">
          <SideButton name="My Library" path="/MyLib">
            <FolderIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="">
          <SideButton name="Wishlist" path="/Wish">
            <GiftIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="">
          <SideButton name="New Releases" path="/New">
            <SparklesIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="">
          <SideButton name="Most Popular" path="/Pop">
            <FireIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="md:flex flex-col space-x-2 hidden font-bold
        items-center pt-20">
            <h1 className="text-2xl text-indigo-300">PixelPaws</h1>
            <div className="text-xs text-gray-600 flex space-x-1">
              <Link href="https://rawg.io/" target="_blank">
              <h1
                className="text-gray-600 hover:text-gray-100 transition
            duration-300 hover:scale-105 cursor-pointer"
              >
                RAWG
              </h1>
              </Link>
              <h2>
              x
              </h2>
              <Link href="https://appwrite.io/" target="_blank">
              <h1
                className="text-gray-600 hover:text-red-500 transition
            duration-300 hover:scale-105 cursor-pointer"
              >
                Appwrite
              </h1>
              </Link>
            </div>
          </div>
      </nav>

      {/* mobile nav  */}
      <nav
        className={`z-50 absolute md:hidden bg-black/80 py-4 h-[80vh]
       transition-all duration-300 ease-in-out backdrop-blur-lg
       border-r-2 border-red-500  rounded-r-3xl my-6 space-y-2
      ${isSidebarOpen ? "left-[-100%]" : "left-0"}`}
      >
        <div className="px-4">
          <SeachBar />
        </div>
        <div onClick={() => setIsSidebarOpen(true)} className="space-y-2">
          <div className="">
            <SideButton name="Dashboard" path="/dashboard">
              <HomeIcon className="w-6 h-6" />
            </SideButton>
          </div>
          <div className="">
            <SideButton name="My Library" path="/MyLib">
              <FolderIcon className="w-6 h-6" />
            </SideButton>
          </div>
          <div className="">
            <SideButton name="Wishlist" path="/Wish">
              <GiftIcon className="w-6 h-6" />
            </SideButton>
          </div>
          <div className="">
            <SideButton name="New Releases" path="/New">
              <SparklesIcon className="w-6 h-6" />
            </SideButton>
          </div>
          <div className="">
            <SideButton name="Most Popular" path="/Pop">
              <FireIcon className="w-6 h-6" />
            </SideButton>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
