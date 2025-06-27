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
            verifyToken: token,
            verifyTokenExpiry: Date.now() + 3600000,
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
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${token}">here</a> to verify your email.</p>`
    };

    // send email
    const mailResponse = await transport.sendMail(mailOptions) 
    return mailResponse;
        }
     catch (error: any) {
        console.log("Error in verifyEmail:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}