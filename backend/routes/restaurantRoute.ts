import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer"
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controllers/restaurantController";

const router = express.Router();

router.route("/").post(isAuthenticated as any, upload.single("imageFile") as any, createRestaurant as any).get(isAuthenticated as any, getRestaurant as any).put(isAuthenticated as any, upload.single("imageFile") as any, updateRestaurant as any);
router.route("/order").get(isAuthenticated as any, getRestaurantOrder as any);
router.route("/order/:orderId/status").put(isAuthenticated as any, updateOrderStatus as any);
router.route("/search/:searchText").get(isAuthenticated as any, searchRestaurant as any);
router.route("/:id").get(isAuthenticated as any, getSingleRestaurant as any);

export default router;