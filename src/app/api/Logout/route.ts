import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json(
            { message: "Logput successful!" },
            { status: 200 });
         console.log("Logput response :", response);

        //set the response in the cookies
        response.cookies.set("token","",
            {
                httpOnly: true,
                expires: new Date(0),
            }
        )
        return response;

    } catch (error) {
        console.error("Logput failed:", error);
        return NextResponse.json(
            { message: "Logput failed. Please try again." }, 
            { status: 500 });   
    }
}