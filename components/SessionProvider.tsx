"use client"

import { database, databaseId, userdataCol } from "@/utils/appwrite";
import { ID, Query } from "appwrite";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
    children: React.ReactNode;
    session: Session | null;
}
export let userID: string;

const SessionProvider = ({ children, session}: Props) => {
//for creating the userdata document
//for getting userID from appwrite
  const usr: string  = session?.user?.name!;
  const emid: string = session?.user?.email!;

  useEffect(() => {
    if (session) {
      // Check if the username and email exist in the document
      const searchPromise = database.listDocuments(
        `${databaseId}`,
        `${userdataCol}`,
        [
          Query.equal("username", usr),
          Query.equal("email", emid),
        ]
      );

      searchPromise.then(
        function (response) {
          if (response.documents.length === 0) {
            // Username and email do not exist, create a new document
            const createPromise = database.createDocument(
              `${databaseId}`,
              `${userdataCol}`,
              ID.unique(),
              {
                username: usr,
                email: emid,
              }
            );

            createPromise.then(
              function (response) {
                toast.success("Welcome to GameNeko!");
              },
              function (error) {
                console.log(error);
                toast.error("Something went wrong!");
              }
            );
          } else {
            // Username and email already exist, do something else
            userID = response.documents[0].$id;

          }
        },
        function (error) {
          console.log(error);
          toast.error("Something went wrong!");
        }
      );
    }
  }, [session, usr, emid]);

  return (
    <Provider>
        {children}
    </Provider>
  )
}

export default SessionProvider