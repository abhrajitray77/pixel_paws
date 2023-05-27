"use client";
import React from "react";
import { client, account } from "../utils/appwrite";
import { signIn } from "next-auth/react";
import logo from "../public/imgs/nekored.webp";
import Image from "next/image";

const Login = () => {
  /*   const [isLogged, setIsLogged] = React.useState(false);

  const loginHandler = async () => {
    account.createOAuth2Session("discord");
    const data = await account.getSession("current");
    if (data) {
        setIsLogged(true);
    } else {
        console.log("not logged in")
    }
  };

  const logoutHandler = async () => {
    await account.deleteSession("current");
    setIsLogged(false);
  };
 */
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col mx-auto items-center space-y-10 bg-red-100 p-8
      rounded-3xl">
        <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-lg">GameNeko</h1>
        <div className="h-40 w-40 drop-shadow-xl">
          <Image
            className="rounded-full"
            src={logo}
            alt="Neko logo"
            height={400}
            width={400}
          />
        </div>
        <button
          className="px-6 py-3 bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110
       transition-all duration-300 ease-in-out font-semibold"
          onClick={() => signIn("discord")}
        >
          Login with discord
        </button>
      </div>
    </div>
  );
};

export default Login;
