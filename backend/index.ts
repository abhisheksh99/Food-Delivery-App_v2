import express, { Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


// Load environment variables
dotenv.config();

// Initialize express
const app: Application = express();


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);





// Server
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;