import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decoded.userId as string;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    console.error("Error in isAuthenticated middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};