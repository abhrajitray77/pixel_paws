"use client";

import Login from "@/components/Login";
import { getSessionData } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSessionData()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          router.push("/dashboard");
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);
  return (
    <>
      {!loggedIn && (
      <div className="h-screen flex justify-center items-center">
      <PacmanLoader color="#ffa600" size={20} loading={true} />
      </div>
      )}
    </>
  );
}

export default Landing;
