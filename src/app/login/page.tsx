"use client";
import { Axios } from "axios";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import React from "react";

export default function login() {
    const [user, setUser] = React.useState({
        Password: "",
        Email: ""
    });
    const onLogin =()=>{}
    return(
        <div>
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onLogin}
            >SignUp</button>
            <Link href="/signup">Visit SignUp Page</Link>
        </div>
    )
}