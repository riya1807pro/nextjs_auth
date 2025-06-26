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
    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7aef39e28604f5",
        pass: "a8b3033c0968fe"
      }
    });

    const resetUrl = `${process.env.DOMAIN}/resetPassword?token=${token}`;
    await transporter.sendMail({
      from: "no-reply@example.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`
    });

    return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}