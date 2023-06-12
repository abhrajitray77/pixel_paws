'use client'
import { database, databaseId, getMyLib, getWishlist, myLibData, mylibCol, userID, wishlistCol, wishlistData } from "@/utils/appwrite";
import {
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { ID, Query } from "appwrite";
import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { get } from "http";

type AddButtonProps = {
  collection: string;
  gameId: number;
  gameName: string;
};

const AddButton = ({ collection, gameId, gameName }: AddButtonProps) => {
  //checking if game is present in wishlist and mylib
  const [gamePresent, setGamePresent] = useState<boolean>(false);

  useEffect(() => {
    const checkGame = () => {
      if (collection === "mylib") {
        const result = myLibData?.find((game) => game.game_id === gameId);
        if (result) {
          setGamePresent(true);
        }
        else {
          setGamePresent(false);
        }
      } else if (collection === "wishlist") {
        const result = wishlistData?.find((game) => game.game_id === gameId);
        if (result) {
          setGamePresent(true);
        }
        else {
          setGamePresent(false);
        }
      }
    };
    checkGame();
  }, [collection, gameId]);

  const addToCollection = () => {
    if (collection === "mylib") {
      const createPromise = database.createDocument(
        `${databaseId}`,
        `${mylibCol}`,
        ID.unique(),
        {
          user_id: userID,
          game_id: gameId,
          game_name: gameName,
        }
      );
      createPromise.then(
        function (response) {
          toast.success("Added to Library!");
          setGamePresent(true)
          //updating mylib
          getMyLib()
        },
        function (error) {
          console.log(error);
        }
      );
    } else if (collection === "wishlist") {
      const createPromise = database.createDocument(
        `${databaseId}`,
        `${wishlistCol}`,
        ID.unique(),
        {
          user_id: userID,
          game_id: gameId,
          game_name: gameName,
        }
      );
      createPromise.then(
        function (response) {
          toast.success("Added to Wishlist!");
          setGamePresent(true)
          //updating wishlist
          getWishlist()
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  return (
    <div>
      {collection === "mylib" ? (
        gamePresent ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        ) : (
          <div className="flex space-x-2 font-semibold justify-between">
            <PlusCircleIcon
              className="h-6 w-6 text-green-500 cursor-pointer
              hover:scale-110
              transition-transform duration-300 ease-in-out"
              onClick={addToCollection}
            />
          </div>
        )
      ) : collection === "wishlist" ? (
        gamePresent ? (
          <HeartIcon className="h-6 w-6 text-red-500" />
        ) : (
          <div className="flex text-gray-400 space-x-2 font-semibold justify-between
          hover:text-red-500 transition-colors duration-300 ease-in-out"
          aria-label="Add to Wishlist">
            <HeartIcon
              className="h-6 w-6 cursor-pointer hover:scale-110
              transition-transform duration-300 ease-in-out"
              onClick={addToCollection}
            />
          </div>
        )
      ) : null}
    </div>
  );
};

export default AddButton;
