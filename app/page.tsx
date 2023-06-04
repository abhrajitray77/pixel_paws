"use client";

import { database, databaseId } from "@/utils/appwrite";
import { Databases, ID } from "appwrite";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function Home() {
  const { data: session, status } = useSession<boolean>();

  useEffect(() => {
    if (session) {
      const promise = database.createDocument(
        `${databaseId}`,
        "647bf4bab275c6bd9de0",
        ID.unique(),
        {
          username: `${session?.user?.name!}`,
          email: `${session?.user?.email!}`,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          toast.success("Welcome to GameNeko!");
        },
        function (error) {
          console.log(error);
          toast.error("Something went wrong!");
        }
      );
    }
  }, [session]);

  return <div className="text-white"> DashBoard</div>;
}

export default Home;
