"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [verified,setVerified] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const UrlToken = params.get("token");
        setToken(UrlToken || "");
    }, []);

    const VerifyEmail = async () => {
        setLoading(true);
        try {
            await axios.post("/api/VerifyEmail", { token });
            setVerified(true);
            setError(false);
        } catch (error) {
            setError(true);
            setVerified(false);
            console.log("error in Verify email page", error);
        } finally {
            setLoading(false);
        }
    };
    console.log(VerifyEmail)

    useEffect(() => {
        const VerifyEmail = async () => {
            setLoading(true);
            try {
                await axios.post("/api/VerifyEmail", { token });
                setVerified(true);
                setError(false);
            } catch (error) {
                setError(true);
                setVerified(false);
                console.log("error in Verify email page", error);
            } finally {
                setLoading(false);
            }
        };

        if (token.length > 0) {
            VerifyEmail();
        }
    }, [token]);

 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4">
    <h2 className="text-2xl font-semibold mb-4">Verify Email</h2>

    {loading && <p className="text-sm mb-4">Loading...</p>}

    <button className="bg-red-400 text-black px-4 py-2 rounded mb-4">
      {token ? `${token}` : "No token"}
    </button>

    {verified && (
      <div className="bg-blue-300 text-black px-6 py-4 rounded shadow mb-4 text-center">
        <h2 className="text-lg font-medium mb-2">Email Verified!</h2>
        <Link
          href="/Login"
          className="inline-block bg-red-400 text-black px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Login
        </Link>
      </div>
    )}

    {error && (
      <div className="bg-red-300 text-black px-6 py-4 rounded shadow text-center">
        <h2 className="bg-green-400 text-sm px-3 py-1 rounded">
          Email cannot be verified. Try Again!
        </h2>
      </div>
    )}
  </div>
);

}