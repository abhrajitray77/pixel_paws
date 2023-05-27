"use client";
import React from "react";
import { client, account } from "../utils/appwrite";
import { signIn } from "next-auth/react";

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
    <>
      <button
      className="p-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
       onClick={()=> signIn("discord") }>Login with discord</button>
    </>
  );
};

export default Login;
