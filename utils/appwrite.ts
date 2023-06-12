import { Client, Account, ID, Databases, Avatars, Query, Models } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const userdataCol = process.env.NEXT_PUBLIC_APPWRITE_USERDATA_COLLECTION!;
export const mylibCol = process.env.NEXT_PUBLIC_APPWRITE_MYLIB_COLLECTION!;
export const wishlistCol = process.env.NEXT_PUBLIC_APPWRITE_WISHLIST_COLLECTION!;
export let userID: string;
export let myLibData: Models.Document[];
export let wishlistData: Models.Document[];

//fetching account data
export const getSessionData = async () => {
  try {
    const data = await account.get()
    console.log("Session data:", data)
    userID = data.$id;
    return data;
  } catch (error: unknown) {
    console.error("Error getting session data:", error);
  }
};

export const getWishlist = () => {
  database.listDocuments(
    `${databaseId}`,
    `${wishlistCol}`,
    [Query.equal("user_id", userID)]
  ).then((response) => {
    console.log("Wishlist:", response.documents);
    wishlistData = response.documents;
  }
  ).catch((error) => {
    console.error("Error getting wishlist:", error);
  }
  );
};
export const getMyLib = () => {
  database.listDocuments(
    `${databaseId}`,
    `${mylibCol}`,
    [Query.equal("user_id", userID)]
  ).then((response) => {
    console.log("My library:", response.documents);
    myLibData = response.documents;
  }
  ).catch((error) => {
    console.error("Error getting mylib:", error);
  }
  );
};
