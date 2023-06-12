'use client'

import Login from "@/components/Login";
import { getSessionData } from "@/utils/appwrite";
import { get } from "http";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSessionData().then((data) => {
      if (data) {
        setLoggedIn(true);
        router.push("/dashboard");
      }
      else {
        setLoggedIn(false);
      }
    }).catch((error) => {
      console.log(error);
    }
    )
  }, [])
  return (
    <div className="text-white">
      <h1>Landing Page</h1>
      <Login />
    </div>
  );
}

export default Landing;
