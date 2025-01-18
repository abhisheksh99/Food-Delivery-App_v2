import mongoose, { Document } from "mongoose";

interface IRestaurant extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId;
}

const restaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    menus: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    }],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;