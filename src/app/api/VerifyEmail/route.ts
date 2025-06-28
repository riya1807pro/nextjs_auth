import connect from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse ,NextRequest} from "next/server";


connect();

export async function POST(request:NextRequest) {

    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("reqBody token:", token);

        // Verify use by token 
        const user = await User.findOne({
            VerifyToken: token, 
            VerifyTokenExpiry: {$gt: Date.now()}
        });

        if(!user){
            console.log("Invalid or expired token");
            return NextResponse.json(
                {error: "Invalid or expired token"},
                {status: 400});
        }console.log("User found:", user);


        user.isVerified = true;
        user.VerifyToken = undefined;
        user.VerifyTokenExpiry = undefined;
        await user.save();
        console.log("User verified successfully:");

        // NextResponse.redirect("/Login");

        return NextResponse.json({
            message: "User verified successfully",
            success: true,
        });


    } catch (error) {
        console.log("Error in VerifyEmail:", error);
    }
}