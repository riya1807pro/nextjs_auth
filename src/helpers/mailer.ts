/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer"
import  User  from "@/models/userModels";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function SendMail({email, emailType, userId}: any) {
    try {
        // Generate a plain random token
        const token = crypto.randomBytes(32).toString("hex");

        await User.findByIdAndUpdate(userId, {
            VerifyToken: token,
            VerifyTokenExpiry: Date.now() + 3600000,
        });

      const transport = nodemailer.createTransport({
             host: "sandbox.smtp.mailtrap.io",
             port: 2525,
             auth: {
               user: "7aef39e28604f5",
               pass: "a8b3033c0968fe"
             }
      });

    //   mails options
    const mailOptions={
        from: "riya@gmail.com",
        to: email,
        subject: emailType === "Verify" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/VerifyEmail?token=${token}">here</a> to Verify your email.</p>`
    };

    // send email
    const mailResponse = await transport.sendMail(mailOptions) 
    return mailResponse;
        }
     catch (error: any) {
        console.log("Error in VerifyEmail:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}