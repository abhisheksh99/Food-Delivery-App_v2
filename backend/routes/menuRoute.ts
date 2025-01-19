import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer";
import { addMenu, editMenu } from "../controllers/menuController";

const router = express.Router();

router.route("/").post(isAuthenticated as any, upload.single("image") as any, addMenu as any);
router.route("/:id").put(isAuthenticated as any, upload.single("image") as any, editMenu as any);

export default router;