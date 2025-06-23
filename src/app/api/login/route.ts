import connect from "@/dbconfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = request.json();
        const { email, password } = await reqBody;
        console.log("reqBody:", reqBody);

        // /check if the user already exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                { error: "User does not exist" }, 
                { status: 400 }
            );
        };

        // check for valid password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){return NextResponse.json(
            { error: "Invalid password" }, 
            { status: 400 }
        )
        };


        // create token data 
        const tokenData ={
            id : user._id,
            username: user.username,
            email: user.email
        }
        console.log("tokenData:", tokenData);

        // create token
        const token  = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!,{
            expiresIn: "1d"
        })
        console.log("token:", token);

        const response = NextResponse.json(
            {
                message: "User logged in successfully",
                success: true,
            }
        )
        
        // setting response in cookies
        response.cookies.set("token",token,{
            httpOnly: true,
        })
        console.log("user response : ", response);
        return response;
      } catch (error) {
        console.error("Error in POST /api/login:", error);
        return NextResponse.json(
            { error: "Internal Server Error in POST function" }, 
            { status: 500 }
        );
        
    }
}