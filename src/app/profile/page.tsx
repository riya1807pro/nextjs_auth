"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";



export default function ProfilePage() {
   const router = useRouter();

   const [data, setData] = useState("nothing");

   const logout = ()=>{
      try {
         const response = axios.get("/api/logout");
         console.log("Logout response:", response);
         toast.success("Logout successful!");
         router.push("/login");
      } catch (error) {
         console.error("Logout failed:", error);
         toast.error("Logout failed. Please try again.");
      }
   }

   const getUserData = async () => {
      try {
         const res = await axios.get("/api/me");

         console.log("User data:", res.data.data._id);
         setData(res.data.data._id)

      } catch (error:any) {
         console.error("Error fetching user data:", error);
         toast.error("Failed to fetch user data.");
      }
   }

 return (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Profile Page</h1>

    <p className="text-sm mb-4">Welcome to the profile section</p>

    <hr className="w-2/3 border-gray-400 dark:border-gray-600 mb-4" />

    <h1 className="text-lg mb-2">
      {data === "nothing" ? "NOTHING HERE" : (
        <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">
          {data}
        </Link>
      )}
    </h1>

    <hr className="w-2/3 border-gray-400 dark:border-gray-600 my-2" />

    <button
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
      onClick={logout}
    >
      Logout
    </button>

    <button
      className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition-all duration-200"
      onClick={getUserData}
    >
      GetUserData
    </button>
  </div>
);

}