"use client";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const ResetPass = () => {
  const router = useRouter();
  const [password, setPassword] = useState({
    newPassword: "",
    repeatedPassword: "",
  });

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (password.newPassword !== password.repeatedPassword) {
      toast.error("Passwords do not match!");
    } else if (password.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
    } else {
      try {
        await account.updateRecovery(
          userId!,
          secret!,
          password.newPassword,
          password.repeatedPassword
        );
        router.push("/");
        toast.success("Password reset successfully!");
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error("Error resetting password!");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setPassword({
      ...password,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-6
      p-6 bg-red-100 rounded-3xl">
        <h1 className="text-2xl font-bold text-red-600">Reset Password</h1>
        <form
          onSubmit={changePassword}
          className="flex flex-col items-center justify-center"
        >
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="p-2 m-2 border-2 border-gray-200 rounded-md"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="repeatedPassword"
            placeholder="Confirm Password"
            className="p-2 m-2 border-2 border-gray-200 rounded-md"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-2 m-2 bg-red-500 rounded-md text-white
            hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
