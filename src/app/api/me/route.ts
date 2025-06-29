import { getDataFromToken } from "@/helpers/getInfoFromToken";

import { NextResponse, NextRequest } from "next/server";
import connect from "@/dbconfig/dbConfig";
import User from "@/models/userModels";

connect();

export async function GET(request: NextRequest) {
    try {
        const UserData = await getDataFromToken(request);
        const user = await User.findOne({ _id: UserData?.id})
        .select("-password");
        return NextResponse.json({
            message : "User data retrieved successfully",
            data: user,
        })

    } catch (error) {
        console.error("Error in GET /api/me:", error);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}