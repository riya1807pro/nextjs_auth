"use client";
import { Axios } from "axios";
import Link, { LinkProps } from "next/link";
import React from "react";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        Username: "",
        Password: "",
        Email: ""
    });
    const onSignUp =()=>{
        console.log("User signup:", user);
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 m-10 p-4">
            <h1>SignUp Page</h1>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                value={user.Username}
                onChange={(e) => setUser({ ...user, Username: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                placeholder="Enter your email"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="Password"
                placeholder="Enter your Password"
                required
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onSignUp}
            >SignUp</button>
            <Link href="/login">Visit login Page</Link>
        </div>
    )
}