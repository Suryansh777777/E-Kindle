import mongoose from "mongoose";
import { config } from "./config";
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        mongoose.connection.on("error", (error) => {
            console.error("Failed to connect to MongoDB", error);
        });
        await mongoose.connect(config.databaseURL as string);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
