import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            throw new Error("No token found");
        }  

         const decodeToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as TokenPayload;
         return decodeToken

    } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please log in again.");
    }
}