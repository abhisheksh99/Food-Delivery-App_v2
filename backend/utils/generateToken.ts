import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/userModel";

export const generateToken = (res: Response, user: IUser) => {
  // Ensure that the JWT secret is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};