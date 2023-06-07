/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import logo from "../public/imgs/nekored.webp";
import { signOut, useSession } from "next-auth/react";
import SeachBar from "./SeachBar";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex flex-col space-y-1/2 bg-black">
      <div className="flex justify-between items-center">
        <div className="p-2 pl-0 w-20 flex items-center space-x-2">
          <Image
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
