import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected at host - ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error:", error instanceof Error ? error.message : "Unknown error occurred");
        process.exit(1);
    }
};

export default connectDb;