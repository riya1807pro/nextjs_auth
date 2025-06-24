import nodemailer from "nodemailer"
import  User  from "@/models/userModels";
import bcryptjs from "bcryptjs"
import toast from "react-hot-toast";

export async function SendMail({email, emailType, userId}:any) {
    try {
        //  create hashed token
        const hashed_token = await bcryptjs.hash(userId.toString(), 10)

        // Verify email
        if (emailType==="VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    VerifyToken: hashed_token,
                    VerifyTokenExpiry: Date.now() + 3600000, 
                }
            )
        }


        // reset password
        else if (emailType==="RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    VerifyToken: hashed_token,
                    VerifyTokenExpiry: Date.now() + 3600000, 
                }
            )
        }

      var transport = nodemailer.createTransport({
             host: "sandbox.smtp.mailtrap.io",
             port: 2525,
             auth: {
               user: "7aef39e28604f5",
               pass: "a8b3033c0968fe"
             }
      });

    //   mails options
    const mailOPtions={
        from: "riya@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html:`<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashed_token}">
        here</a> to${emailType === "VERIFY" ? "verify your email" : "reset your password"}
           or copy-paste in your browser.
    ${process.env.DOMAIN}/verifyEmail?token=${hashed_token}</p>`
    };

    // send email
    const mailResponse = await transport.sendMail(mailOPtions) 
    return mailResponse;
        }
     catch (error: any) {
        console.log("error in sending mail...", error);
        // toast.error("error sending email", error.message)
    }
}