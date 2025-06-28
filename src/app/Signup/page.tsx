"use client";
import axios, { Axios } from "axios";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        Username: "",
        Password: "",
        Email: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        if(user.Email.length<=0 || user.Password.length<=0 || user.Username.length<=0){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[user])

const Signup= async()=>{
    try {
        setLoading(true);
          const payload = {
            username: user.Username,
            email: user.Email,
            password: user.Password,
        };
        const response = await axios.post("api/Signup",payload);
        console.log("Signup response:", response.data);
        router.push("/Login");
        toast.success("Signup successful! Please Login.");
        console.log("please Login");
        
    } catch (error: any) {
        console.error("Error during Signup:", error);
        toast.error(error.message || "An error occurred during Signup");
    }finally{
        setLoading(false);
    }
}
    return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 absolute inset-0 bg-black/30 backdrop-blur-sm"
      style={{ backgroundImage: "url('/abstract-bg.png')" }}
    >
      <div className="relative z-10 backdrop-blur-sm bg-black/20 border border-white/30 shadow-2xl text-white rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
          {loading ? "Processing..." : "Signup Page"}
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              className="w-full p-2.5 rounded-md bg-white/80 text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
              value={user.Username}
              onChange={(e) => setUser({ ...user, Username: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-2.5 rounded-md bg-white/80 text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
              value={user.Email}
              onChange={(e) => setUser({ ...user, Email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="Password"
              placeholder="Enter your password"
              required
              className="w-full p-2.5 rounded-md bg-white/80 text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
              value={user.Password}
              onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />
          </div>
        </div>

        <button
          className={`mt-6 w-full py-2.5 rounded-md font-semibold transition text-black ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={Signup}
        >
          {buttonDisabled ? "Can't Signup" : "Signup"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-200">
          Already have an account?{" "}
          <Link href="/Login" className="text-yellow-400 hover:text-yellow-300 underline">
            Visit Login Page
          </Link>
        </div>
      </div>
    </div>
  );

}