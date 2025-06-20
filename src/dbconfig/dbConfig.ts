import mongoose from "mongoose";

export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("mongoose connects successfully!");
        })
        connection.on("error",(error)=>{
            console.error("mongoose connection error! Please check if it working properly " + error);
            process.exit()
        })
    } catch (error) {
        console.error("Database connection error:", error);
    }
}