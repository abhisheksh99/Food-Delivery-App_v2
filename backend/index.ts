import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connectDb";
import userRoutes from "./routes/userRoute";
import restaurantRoutes from "./routes/restaurantRoute";
import menuRoutes from "./routes/menuRoute";
import orderRoutes from "./routes/orderRoute";
import { stripeWebhook } from "./controllers/orderController";

// Load environment variables
dotenv.config();

// Initialize express
const app: Application = express();

//Database connection
connectDb();



app.post(
  "/api/v1/order/webhook",
  express.raw({ type: 'application/json' }),
  stripeWebhook as any
);

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

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
