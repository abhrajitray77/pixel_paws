"use client";
import React, { useContext } from "react";
import SideButton from "./SideButton";
import {
  FireIcon,
  GiftIcon,
  SparklesIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { SidebarContext } from "@/utils/SidebarContext";
import SeachBar from "./SeachBar";

//TODO: add animated colour buttons on hover?

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <div className="">
      <nav className="hidden md:flex md:flex-col h-screen py-4 px-5 space-y-2">
        <div className="">
          <SideButton name="Dashboard" path="/">
            <WalletIcon className="w-6 h-6" />
          </SideButton>
        </div>
        <div className="">
          <SideButton name="My Library" path="/MyLib">
            <WalletIcon className="w-6 h-6" />
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
            <SideButton name="Dashboard" path="/">
              <WalletIcon className="w-6 h-6" />
            </SideButton>
          </div>
          <div className="">
            <SideButton name="My Library" path="/MyLib">
              <WalletIcon className="w-6 h-6" />
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
