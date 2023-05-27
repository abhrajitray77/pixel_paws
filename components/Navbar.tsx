/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import logo from "../public/imgs/nekored.webp";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex flex-col space-y-1/2 bg-black">
      <div className="flex justify-between items-center">
        <div className="p-2 pl-0 w-20">
          <Image
            className="rounded-e-full"
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <ul className="mr-4">
          <li>
            <button
              onClick={() => signOut()}
              className="cursor-pointer"
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
