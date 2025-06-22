"use client";
import Link from "next/link";
import React from "react";

export default function login() {
    const [user, setUser] = React.useState({
        Password: "",
        Email: ""
    });
    const onLogin =()=>{
        console.log("User login:", user);
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-5 m-10">
            <h1>Login Page</h1>
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
              className="bg-yellow-500 text-black px-4 py-2 rounded"
              onClick={onLogin}
            >SignUp</button>
            <Link href="/signup">Visit SignUp Page</Link>
        </div>
    )
}