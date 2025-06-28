"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/resetPassword", { token, password });
      setSuccess(true);
        router.push("/resetPassword");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-black/40 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {success ? (
          <div className="text-green-600 text-center">Password reset! Redirecting to login...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 rounded border"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Reset Password
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}