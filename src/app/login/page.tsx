"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Login response:", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error: any) {
            console.error("Error during login:", error);
            toast.error(error.message || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length <= 0 || user.password.length <= 0) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);

   return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 absolute inset-0 bg-black/20 backdrop-blur-sm"
      style={{ backgroundImage: "url('/abstract-bg.png')" }}
    >
      <div className="backdrop-blur-sm bg-black/40 border border-white/30 shadow-2xl text-white rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
          Welcome Back 👋
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2.5 rounded-md bg-white/80 text-black placeholder-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2.5 rounded-md bg-white/80 text-black placeholder-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`mt-6 w-full py-2.5 rounded-md font-semibold transition text-black ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-200">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-400 hover:text-green-300 underline">
            Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
