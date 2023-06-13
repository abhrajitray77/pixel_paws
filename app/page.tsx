"use client";

import Login from "@/components/Login";
import Hero from "@/components/landing/Hero";
import { getSessionData } from "@/utils/appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import bgTop from "../public/imgs/layeredpeaks1.svg"

function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSessionData()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          router.push("/splash");
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);
  return (
    <main>
      {!loggedIn && (
        <div className="relative">
          {/* Background */}
            <Image
            src={bgTop}
            alt="Backgroundtop"
            width={1920}
            height={1080}
            className="absolute -z-30 top-0 blur-3xl opacity-70
            "
            />

          <div
            className="fixed -z-50 top-0 left-0 w-72 h-72 bg-purple-300 
        rounded-full blur-3xl opacity-70"
          ></div>
          <div
            className="fixed -z-50 top-0 right-0 w-[400px] h-[400px] bg-teal-500
          rounded-full  blur-3xl opacity-70 "
          ></div>
          <div
            className="fixed bottom-0 left-0 -z-50 w-[500px] h-[500px] bg-[#ff00b391]
        rounded-full blur-3xl opacity-70"
          ></div>
          <div
            className="fixed -z-50 -inset-y-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px]
        bg-[#29d1e7f1] dark:bg-[#7300d1a8] top-40 left-80 right-80 bottom-80
        rounded-full blur-2xl opacity-70"
          ></div>
          <div
            className="fixed -z-50 right-0 bottom-0 w-80 h-80 bg-[#7300d1a8]
          rounded-full blur-3xl opacity-80"
          ></div>
          <section className="p-5 lg:p-16">
            <Hero />
            
          </section>
        </div>
      )}
      {loggedIn && (
        <div className="h-screen flex justify-center items-center">
          <PacmanLoader color="#ffa600" size={20} loading={true} />
        </div>
      )}
    </main>
  );
}

export default Landing;
