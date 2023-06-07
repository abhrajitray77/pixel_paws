import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

//const getSearchedGame

const SeachBar = () => {
  return (
    <div>
      <form
        className="flex bg-slate-900 p-2 px-4
        rounded-lg space-x-4 "
        autoComplete="off"
        action="#"
        aria-label="Search"
      >
        <MagnifyingGlassIcon
          className="h-6 w-6
         text-red-500"
        />
        <input
          className="bg-transparent text-red-500
            focus:outline-none "
          id="search"
          //value={}
          type="text"
          placeholder="Search.."
          name="search"
        />
      </form>
    </div>
  );
};

export default SeachBar;
