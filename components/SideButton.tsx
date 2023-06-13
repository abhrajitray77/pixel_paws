
import Link from "next/link";
import React from "react";

type SideButtonProps = {
  name: string;
  children: React.ReactNode;
  path: string;
};

const SideButton = ({ name, children, path }: SideButtonProps) => {
  return (
    <>
      <Link href={path} scroll={false}>
        <button
          className="text-indigo-200 hover:text-indigo-300 px-4 py-2
        flex space-x-4 transition-all duration-300 
        ease-in-out hover:scale-105 text-sm items-center font-semibold"
        >
          {children}
          <h2 className="text-gray-400 hover:text-gray-200
          transition-colors duration-300">{name}</h2>
        </button>
      </Link>
    </>
  );
};

export default SideButton;
