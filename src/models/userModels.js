import mongoose from "mongoose";
import { type } from "os";

export const userSchema =  new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],  
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;