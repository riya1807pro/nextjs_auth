"use client"

import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server"
import Link from "next/link"

export default async function forgetPassword() {
    return(
        <div className="flex justify-center items-center bg-blue-500 text-xl text-white">
            <h1>Forget Password</h1>
            <br/>
            <p>pages for forgetting Password</p>
        </div>
    )
}