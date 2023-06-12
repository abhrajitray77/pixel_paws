"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { database, databaseId, getSession, userdataCol } from "./appwrite";
import { PacmanLoader } from "react-spinners";
import { ID, Query } from "appwrite";
import { toast } from "react-hot-toast";

interface SessionContextProps {
  loggedIn: boolean;
  sessionData: any;
}

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext<SessionContextProps>({
  loggedIn: false,
  sessionData: null,
});

export let userID: string;

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  //for creating the userdata document
  //for getting userID from appwrite

  useEffect(() => {
    const checkSess = async () => {
      try {
        const session = await getSession();
        if (session) {
          setSessionData(session);
          setLoggedIn(true);
        } else {
          console.log("No session found");
          setLoggedIn(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Session checking error:", error);
        setLoading(false);
      }
    };

    checkSess();

    if (sessionData) {
      // Check if the username and email exist in the document
      const searchPromise = database.listDocuments(
        `${databaseId}`,
        `${userdataCol}`,
        [Query.equal("username", sessionData?.then((data:any) => data?.name!) ),
         Query.equal("email", sessionData?.then((data:any) => data?.email!) )]
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
                username: sessionData?.then((data:any) => data?.name!),
                email: sessionData?.then((data:any) => data?.email!),
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
  }, [sessionData]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PacmanLoader color="#ffa600" size={20} loading={loading} />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ loggedIn, sessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
