import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menuModel";
import Restaurant from "../models/restaurantModel";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    // Ensure an image file is provided
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload the image to Cloudinary and get the URL
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    // Create a new menu item in the database
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    // Check if the restaurant exists and update its menus array
    const restaurant = await Restaurant.findOneAndUpdate(
      { user: req.id }, // Query to find the restaurant by the user ID
      { $push: { menus: menu._id } }, // Append the new menu ID to the menus array
      { new: true} 
    );

    // If the restaurant is not found, return an error
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Respond with success message and the created menu
    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
    }
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};