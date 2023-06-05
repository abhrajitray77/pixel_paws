'use client'
import { database, databaseId, userdataCol } from "@/utils/appwrite";
import { Databases, ID, Query } from "appwrite";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function Home() {
  const { data: session, status } = useSession<boolean>();
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
                console.log(response);
                toast.success("Welcome to GameNeko!");
              },
              function (error) {
                console.log(error);
                toast.error("Something went wrong!");
              }
            );
          } else {
            // Username and email already exist, do something else
            toast.success("Welcome back to GameNeko!");
          }
        },
        function (error) {
          console.log(error);
          toast.error("Something went wrong!");
        }
      );
    }
  }, [session, usr, emid]);

  return <div className="text-white">DashBoard</div>;
}

export default Home;
