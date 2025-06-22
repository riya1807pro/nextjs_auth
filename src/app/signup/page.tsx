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

const SignUp= async()=>{
    try {
        setLoading(true);
          const payload = {
            username: user.Username,
            email: user.Email,
            password: user.Password,
        };
        const response = await axios.post("api/signup",payload);
        console.log("Signup response:", response.data);
        router.push("/login");
        toast.success("Signup successful! Please login.");
        console.log("please login");
        
    } catch (error: any) {
        console.error("Error during signup:", error);
        toast.error(error.message || "An error occurred during signup");
    }finally{
        setLoading(false);
    }
}
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 m-10 p-4">
            <h1>{loading?"Processing...":"SignUp page"}</h1>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
                value={user.Username}
                onChange={(e) => setUser({ ...user, Username: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                placeholder="Enter your email"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="Password"
                placeholder="Enter your Password"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded"
              onClick={SignUp}
            >{buttonDisabled?"Can't SignUp":"SignUp"}</button>
            <Link href="/login">Visit login Page</Link>
        </div>
    )
}