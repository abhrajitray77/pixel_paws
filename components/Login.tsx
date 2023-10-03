'use client'
import { account } from "@/utils/appwrite";
import { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "../public/imgs/nekored.webp";
import { BsDiscord } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppwriteException, ID } from "appwrite";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  //For discord OAuth
  const oAuthLogin = () => {
    try {
      account.createOAuth2Session(
        "discord",
        "https://pixelpaws.vercel.app/dashboard",
        "https://pixelpaws.vercel.app"
    } catch (error) {
      console.error("OAuth login error:", error);
    }
  };

  // For standard email login
  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // signup
        if (signupDetails.password !== signupDetails.confirmPassword) {
          toast.error("Passwords do not match!");
        }
        if (signupDetails.password.length < 8) {
          toast.error("Password must be at least 8 characters long!");
        }
        await account.create(
          ID.unique(),
          signupDetails.email,
          signupDetails.password,
          signupDetails.name
        ).then(() => {
        toast.success(
          "Account created successfully!"
        )}).then(() => {
          account.createEmailSession(
          signupDetails.email,
          signupDetails.password
        ).then(() => {
          toast.success("Logged in via email!");
          router.push("/dashboard");
        }).catch((error) => {
          console.error("Error logging in:", error);
        });
      }).catch((error) => {
        console.error("Error creating account:", error);
      });

      } else {
        // login
        await account.createEmailSession(
          userDetails.email,
          userDetails.password
        );
        console.log("Logged in via email!");
        router.push("/dashboard");
      }
    } catch (AppwriteException: any) {
      toast.error(AppwriteException.type);
    }
  };

  // For forgot password functionality
  const forgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await account.createRecovery(
        userDetails.email,
        "https://pixelpaws.vercel.app/resetPass"
      );
      toast.success("Please check your email for password reset instructions.");
    } catch (AppwriteException: any) {
      toast.error(AppwriteException);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (isSignup) {
      setSignupDetails({
        ...signupDetails,
        [name]: value,
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const toggleIsSignup = () => {
    setIsSignup(!isSignup);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-shrink items-center justify-center">
      <div className="flex flex-col mx-auto items-center 
      space-y-6 bg-red-100 p-8 rounded-3xl">
        {/* Logo */}
        <div className="h-40 w-40 drop-shadow-xl">
          <Image
            className="rounded-full"
            src={logo}
            alt="Neko logo"
            height={400}
            width={400}
          />
        </div>
        {/* Email and password login */}
        {!isSignup ? (
          <form
            className="flex flex-col text-indigo-950 space-y-4"
            onSubmit={loginUser}
          >
            <input
              className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              type="email"
              placeholder="Email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button className="px-6 py-3 bg-[#5865f2] text-white rounded-lg 
            shadow-lg hover:scale-110 transition-all duration-300 ease-in-out font-semibold"
            type="submit"
            >
              Login
            </button>
            <button
              className="text-red-600 font-semibold my-4"
              onClick={() => setIsPasswordReset(true)}
              type="button"
            >
              Forgot your password?
            </button>
          </form>
        ) : (
          <form
            className="flex flex-col text-indigo-950 space-y-4"
            onSubmit={loginUser}
          >
            <input
              className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              type="text"
              placeholder="Full name"
              name="name"
              value={signupDetails.name}
              onChange={handleInputChange}
            />
            <input
              className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              type="email"
              placeholder="Email"
              name="email"
              value={signupDetails.email}
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={signupDetails.password}
                onChange={handleInputChange}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <input
              className="px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signupDetails.confirmPassword}
              onChange={handleInputChange}
            />
            <button className="px-6 py-3 bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110 transition-all duration-300 ease-in-out font-semibold">
              Sign up
            </button>
          </form>
        )}

        <div>
          <h1 className="text-gray-600 text-sm">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-red-600 hover:text-red-500 transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={toggleIsSignup}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <span
                  className="text-red-600 hover:text-red-500 transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={toggleIsSignup}
                >
                  Sign up
                </span>
              </>
            )}
          </h1>
        </div>

        <button
          className="px-6 py-3 flex bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110 transition-all duration-300 ease-in-out font-semibold items-center justify-between space-x-2 mt-4"
          onClick={() => oAuthLogin()}
        >
          <BsDiscord />
          <h1>Login with Discord</h1>
        </button>
      </div>

      {isPasswordReset && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800/20 bg-opacity-90 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
            <form className="flex flex-col space-y-2 mt-4" onSubmit={forgotPassword}>
              <input
                className="px-4 py-2 rounded-lg shadow-lg focus:outline-none 
                focus:ring-2 focus:ring-red-600 text-gray-900"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
              <button className="px-6 py-3 bg-[#5865f2] text-white rounded-lg shadow-lg hover:scale-110 transition-all duration-300 ease-in-out
               font-semibold"
               type="submit"
               >
                Send E-mail
              </button>
              <button
                type="button"
                className="text-gray-700 font-semibold my-4"
                onClick={() => setIsPasswordReset(false)}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
