
import { database, databaseId, mylibCol, wishlistCol } from "@/utils/appwrite";
import { HeartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ID } from "appwrite";
import React from "react";
import { userID } from "./SessionProvider";

type AddButtonProps = {
  collection: string;
  gameId: number;
  gameName: string;
};

const AddButton = ({ collection, gameId, gameName }: AddButtonProps) => {

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
        )
        createPromise.then(
          function (response) {
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
      }
      else if (collection === "wishlist") {
        const createPromise = database.createDocument(
          `${databaseId}`,
          `${wishlistCol}`,
          ID.unique(),
          {
            user_id: userID,
            game_id: gameId,
            game_name: gameName,
          }
        )
        createPromise.then(
          function (response) {
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
      }
  }
    
    
  return (
    <button onClick={addToCollection}>
      {collection === "mylib" ? (
        <div className="flex space-x-2 font-semibold text-gray-400">
          <h3>Add to Library</h3>
          <PlusCircleIcon className="h-6 w-6 text-white" />
        </div>
      ) : (
        <HeartIcon className="h-6 w-6 text-white" />
      )}
    </button>
  );
};

export default AddButton;
