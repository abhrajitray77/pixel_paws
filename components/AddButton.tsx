'use client'
import {
  database,
  databaseId,
  mylibCol,
  userID,
  wishlistCol,
} from "@/utils/appwrite";
import {
  CheckCircleIcon,
  HeartIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";
import { ID, Query } from "appwrite";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { BsHeartbreakFill } from "react-icons/bs";
import { GameAddedContext, GameAddedContextType } from "@/utils/GameAddedContext";

type AddButtonProps = {
  collection: string;
  gameId: number;
  gameName: string;
};

const AddButton = ({ collection, gameId, gameName }: AddButtonProps) => {
  //checking if game is present in wishlist and mylib
  const [gamePresent, setGamePresent] = useState<boolean>(false);
  const { gameAdded, setGameAdded } = useContext<GameAddedContextType>(GameAddedContext);
  const [documentId, setDocumentId] = useState<string>("");

  useEffect(() => {
    const checkGame = () => {
      console.log("checking game");
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
            setGameAdded(true);
            setDocumentId(response.documents[0].$id);
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
            setGameAdded(true);
            setDocumentId(response.documents[0].$id);
          }
        });
      }
    };
    checkGame();
  }, [collection, gameId, gameName, setGameAdded]);

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
          setGamePresent(true);
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
          toast.success("Added to Wishlist!");
          setGamePresent(true);
          setGameAdded(true);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  const removeFromCollection = () => {
    if (collection === "mylib") {
      const deletePromise = database.deleteDocument(
        `${databaseId}`,
        `${mylibCol}`,
        `${documentId}`
      );
      deletePromise.then(
        function (response) {
          toast.success("Removed from Library!");
          setGameAdded(false);
        },
        function (error) {
          console.log(error);
        }
      );
    } else if (collection === "wishlist") {
      const deletePromise = database.deleteDocument(
        `${databaseId}`,
        `${wishlistCol}`,
        `${documentId}`
      );
      deletePromise.then(
        function (response) {
          toast.success("Removed from Wishlist!");
          setGameAdded(false);
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
          <MinusCircleIcon
            className="h-6 w-6 text-red-500 cursor-pointer
            hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={removeFromCollection}
          />
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
          <BsHeartbreakFill
            className="h-6 w-6 text-red-500  cursor-pointer
            hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={removeFromCollection}
          />
        ) : (
          <div
            className="flex text-gray-400 space-x-2 font-semibold justify-between
          hover:text-red-500 transition-colors duration-300 ease-in-out"
            aria-label="Add to Wishlist"
          >
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
