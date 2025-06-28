import connect from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse ,NextRequest} from "next/server";
import bcryptjs from "bcryptjs";  
import { SendMail } from "@/helpers/mailer";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log("reqBody:", reqBody);


        // Check if the user already exists
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash user
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash
        (password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save();
        console.log("saveUser: ",saveUser);

        // send Verify email
        const sending_mail = await SendMail({email, emailType: "Verify", userId: saveUser._id});
        console.log("Verification email sent to:", email);
        console.log("Mail response:", sending_mail);


         return NextResponse.json({
            message: "User created successfully ",
            success: true,
            saveUser,
            sending_mail,
        })


    } catch (error) {
            console.error("Error in POST /api/Signup:", error);
            return NextResponse.json(
            { error: "Internal Server Error in POST function" }, 
            { status: 500 }
        );    
    };
}