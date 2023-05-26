"use client"
import React from "react";
import { client, account } from "../../lib/appwrite"

const Login = () => {

  const loginHandler = async () => {
   await account.createOAuth2Session('discord', 'http://localhost:3000/')
  }

  return(
    <div>
      <button onClick={loginHandler} className="bg-gray-200 p-4">Login</button>


    </div>
  )
};

export default Login;
