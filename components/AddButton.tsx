import { HeartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

type AddButtonProps = {
  collection: string;
  gameId: number;
  gameName: string;
};

const AddButton = ({ collection, gameId, gameName }: AddButtonProps) => {

    const addToCollection = async () => {
        
    }
  return (
    <button>
      {collection === "lib" ? (
        <PlusCircleIcon className="h-6 w-6 text-white" />
      ) : (
        <HeartIcon className="h-6 w-6 text-white" />
      )}
    </button>
  );
};

export default AddButton;
