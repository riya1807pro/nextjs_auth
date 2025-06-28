import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connect from "@/dbconfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    console.log("AFTER FORGET: ", user);

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
try {
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 3600000);
  await user.save();
  console.log("User updated with resetToken:", user);
} catch (err) {
  console.error("Error saving user:", err);
}
    // Send email
    const transporter = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
             port: 2525,
             auth: {
               user: "7aef39e28604f5",
               pass: "a8b3033c0968fe"
             }
    });

    const resetUrl = `${process.env.DOMAIN}/ResetPassword?token=${token}`;
    await transporter.sendMail({
      from: "no-reply@example.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`
    });

    return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    console.error("Error in ForgetPassword:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}