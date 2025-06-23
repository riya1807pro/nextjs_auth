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

   return(
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
        <h1 className="flex p-4 m-4 justify-center items-center " >Profile Page</h1>
        <p className="text-4px" > welcome to the profile section</p>
        <hr/>
        <h1 className="text-black">{data==="nothing"?"nOTHING HERE ":
         <Link href={'/profile/{data}'}>{data}</Link> }</h1>
        <hr/>
        <button
         className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
         onClick={logout}
        >Logout</button>
        <button
         className="mt-4 px-4 py-2 bg-green-800 text-black rounded hover:bg-green-900"
         onClick={getUserData}
        >GetUserData</button>
    </div>
   )
}