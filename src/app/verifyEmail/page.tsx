"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function verifyEmailPage(){

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [verified,setVerified] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const UrlToken = params.get("token");
        setToken(UrlToken || "");
    }, []);

    const verifyEmail = async () => {
        setLoading(true);
        try {
            await axios.post("/api/verifyEmail", { token });
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            setVerified(false);
            console.log("error in verify email page", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(token.length > 0){
            verifyEmail();
        }
    },[token])

  return (
    <div className="flex justify-center items-center text-black">
      <h2>Verify Email</h2>
        {loading && <p>Loading...</p>}
        <button className="bg-red-400 text-black p-3px m-2"> {token ?` ${token}` : "No token"} </button>

        {verified && (
            <div className="flex bg-blue-300 text-black ">
              <h2>Email Verified ! </h2>
                <Link href="/login" className="bg-red-400 text-black p-3px m-2">
                    Login </Link>
            </div>
        )}

        {error && (
            <div className="flex bg-red-300 text-black ">
              <h2 className="p-2px m-5 bg-green-400">Email cannot verifies . Try Again ! </h2>
            </div>
        )}

    </div>
  )

}