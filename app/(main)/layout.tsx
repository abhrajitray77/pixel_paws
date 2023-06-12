"use client";
import { account, getMyLib, getSessionData, getWishlist } from "@/utils/appwrite";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/utils/SidebarContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getSessionData()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      getMyLib()
      getWishlist()
  }, []);
  return (
    <>
    {loggedIn && (
      <SidebarProvider>
        <div className="h-screen flex flex-col">
          <Navbar />
          <div className=" flex overflow-hidden">
            <div className="md:border-r-[2px] md:my-4 md:border-r-red-600 w-auto">
              {/* Sidebar */}
              <Sidebar />
            </div>

            <div
              className="flex-1 p-6 py-0 my-10 w-auto overflow-y-scroll scrollbar-track-transparent
                scrollbar-thumb-gray-600 scrollbar-thin"
            >
              <div className="max-h-full">{children}</div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )}
    </>
  );
}
