"use client";
import axios from "axios";
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
    const [loading, setLoading]= useState(false);

    const onLogin= async()=>{
        try {
            setLoading(true);
            const response =  await axios.post("/api/login", user);
            console.log("Login response:", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error:any) {
        console.error("Error during login:", error);
            toast.error(error.message || "An error occurred during login");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length<=0 || user.password.length<=0){
            setButtonDisabled(true);
        }
    },[user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-5 m-10">
            <h1>Login Page</h1>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="Password"
                placeholder="Enter your Password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
            />
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded"
              onClick={onLogin}
            >{!buttonDisabled? "processing": "Login"}</button>
        </div>
    );
}

export default login;