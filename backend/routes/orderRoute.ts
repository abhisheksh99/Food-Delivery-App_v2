import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controllers/orderController";

const router = express.Router();


router.route("/").get(isAuthenticated as any, getOrders as any);
router.route("/checkout/create-checkout-session").post(isAuthenticated as any, createCheckoutSession as any);
router.route("/webhook").post(express.raw({ type: 'application/json' }) as any, stripeWebhook as any);

export default router;