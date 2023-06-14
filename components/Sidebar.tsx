"use client";
import React, { useContext } from "react";
import SideButton from "./SideButton";
import {
  FireIcon,
  FolderIcon,
  GiftIcon,
  SparklesIcon,
  HomeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { SidebarContext } from "@/utils/SidebarContext";
import SeachBar from "./SeachBar";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";

//TODO: add animated colour buttons on hover?

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <div className="h-screen">
      <nav
        className="hidden relative md:flex md:flex-col py-4 px-5 space-y-2
      "
      >
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
        <div className="">
          <SideButton name="Genres" path="/genres">
            <IoGameController className="w-6 h-6" />
          </SideButton>
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
          <div className="">
            <SideButton name="Genres" path="/genres">
              <IoGameController className="w-6 h-6" />
            </SideButton>
          </div>
        </div>
        <div className=" text-center flex flex-col justify-center items-center space-y-2 pt-20">
          <div
            className="text-indigo-500 font-medium text-xs flex flex-col
          items-center"
          >
            <h2>Built with </h2>
            <span>
              <HeartIcon className="w-2 h-2 text-red-500" />
            </span>
            <h2>by Abhrajit Ray</h2>
          </div>
          <div className="flex space-x-2">
            <Link href="https://github.com/abhrajitray77" target="_blank">
              <BsGithub
                className="w-6 h-6 text-gray-600 hover:text-gray-100 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
            <Link href="https://twitter.com/ray_abhrajit" target="_blank">
              <BsTwitter
                className="w-6 h-6 text-gray-600 hover:text-cyan-500 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/abhrajit-ray-b6a97721a/"
              target="_blank"
            >
              <BsLinkedin
                className="w-6 h-6 text-gray-600 hover:text-blue-500 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* footer */}
      <div
        className="absolute md:flex flex-col pt-10 hidden font-bold
        items-center bottom-10 left-10 group "
      >
        <h1
          className="text-2xl text-gray-500 group-hover:text-gray-400
        transition-all duration-300"
        >
          PixelPaws
        </h1>
        <div className="text-xs text-gray-600 flex space-x-1">
          <Link href="https://rawg.io/" target="_blank">
            <h1
              className="text-gray-600 hover:text-gray-100 transition
            duration-300 hover:scale-105 cursor-pointer"
            >
              RAWG
            </h1>
          </Link>
          <h2>x</h2>
          <Link href="https://appwrite.io/" target="_blank">
            <h1
              className="text-gray-600 hover:text-red-500 transition
            duration-300 hover:scale-105 cursor-pointer"
            >
              Appwrite
            </h1>
          </Link>
        </div>
        {/*socials */}
        <div className=" text-center space-y-2 mt-2">
          <div
            className="text-indigo-500 text-xs flex flex-col
          items-center"
          >
            <h2>Built with </h2>
            <span>
              <HeartIcon className="w-2 h-2 text-red-500" />
            </span>
            <h2>by Abhrajit Ray</h2>
          </div>
          <div className="flex space-x-2">
            <Link href="https://github.com/abhrajitray77" target="_blank">
              <BsGithub
                className="w-6 h-6 text-gray-600 hover:text-gray-100 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
            <Link href="https://twitter.com/ray_abhrajit" target="_blank">
              <BsTwitter
                className="w-6 h-6 text-gray-600 hover:text-cyan-500 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/abhrajit-ray-b6a97721a/"
              target="_blank"
            >
              <BsLinkedin
                className="w-6 h-6 text-gray-600 hover:text-blue-500 transition
            duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
