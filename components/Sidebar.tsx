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
        className={`z-50 absolute bg-black/70 flex flex-col h-screen py-4 space-y-2
       transition-all duration-300 ease-in-out backdrop-blur-md
      ${isSidebarOpen ? "left-[-30%]" : "left-0"}`}
      >
        <div onClick={() => setIsSidebarOpen(true)}>
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
