import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    lastLogin: Date;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpiresAt?: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
  }

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    // advance auth
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;