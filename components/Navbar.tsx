import Image from "next/image";
import React from "react";
import logo from "../public/imgs/nekored.webp"

const Navbar = () => {
  return (
    <nav className="flex flex-col space-y-1/2 bg-black ">
      <div className="p-2 pl-0 w-20">
        <Image
        className="rounded-e-full"
        src={logo}
        alt="Logo"
        width={100}
        height={100}
        />
      </div>
      <ul></ul>
      <span className="bg-red-600 h-1.5"></span>
    </nav>
  );
};

export default Navbar;
