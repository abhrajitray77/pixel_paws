import { database, databaseId, mylibCol, wishlistCol } from "@/utils/appwrite";
import {
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { ID, Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { userID } from "./SessionProvider";
import { Toaster, toast } from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type AddButtonProps = {
  collection: string;
  gameId: number;
  gameName: string;
};

const AddButton = ({ collection, gameId, gameName }: AddButtonProps) => {
  //checking if game is present in wishlist and mylib
  const [gamePresent, setGamePresent] = useState<boolean>(false);
  const [gameAdded, setGameAdded] = useState<boolean>(false);

  useEffect(() => {
    const checkGame = () => {
      if (collection === "mylib") {
        const searchPromise = database.listDocuments(
          `${databaseId}`,
          `${mylibCol}`,
          [Query.equal("user_id", userID), Query.equal("game_id", gameId)]
        );
        searchPromise.then(function (response) {
          if (response.documents.length === 0) {
            setGamePresent(false);
          } else {
            setGamePresent(true);
          }
        });
      } else if (collection === "wishlist") {
        const searchPromise = database.listDocuments(
          `${databaseId}`,
          `${wishlistCol}`,
          [Query.equal("user_id", userID), Query.equal("game_id", gameId)]
        );
        searchPromise.then(function (response) {
          if (response.documents.length === 0) {
            setGamePresent(false);
          } else {
            setGamePresent(true);
          }
        });
      }
    };
    checkGame();
  }, [collection, gameId, gameName, gameAdded]);

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
          console.log(response);
          toast.success("Added to Library!");
          setGameAdded(true);
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
          console.log(response);
          toast.success("Added to Wishlist!");
          setGameAdded(true);
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
            <h3 className="text-gray-400">Add to Library</h3>
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
          hover:text-red-500 transition-colors duration-300 ease-in-out">
            <h3 className="">Add to Wishlist</h3>
            <HeartIcon
              className="h-6 w-6 cursor-pointer hover:scale-110
              transition-transform duration-300 ease-in-out"
              onClick={addToCollection}
            />
          </div>
        )
      ) : null}
      <Toaster />
    </div>
  );
};

export default AddButton;
