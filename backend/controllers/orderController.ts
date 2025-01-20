import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel";
import Restaurant from "../models/restaurantModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    contact: string;
    country: string;
  };
  restaurantId: string;
};

type Menu = {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user")
      .populate("restaurant");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)
      .populate<{ menus: Menu[] }>("menus");

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const totalAmount = checkoutSessionRequest.cartItems.reduce((total, item) => 
      total + item.price * item.quantity, 0);

    const order: any = new Order({
      restaurant: restaurant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
      totalAmount: Math.round(totalAmount * 100), // Store in cents
    });

    const lineItems = await createLineItems(checkoutSessionRequest, restaurant.menus);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(restaurant.menus.map((menu: Menu) => menu.image)),
      },
    });

    if (!session.url) {
      return res.status(400).json({ success: false, message: "Error while creating session" });
    }

    await order.save();
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  let event;
  try {
    const signature = req.headers["stripe-signature"];
    
    // Important: Use the raw request body, not JSON.stringify
    const payload = req.body;
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;
    
    // Construct event from raw body
    event = stripe.webhooks.constructEvent(payload, signature as string, secret);
    
    if (event.type === "checkout.session.completed") {
      try {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await Order.findById(session.metadata?.orderId);
        
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
        
        if (session.amount_total) {
          order.totalAmount = session.amount_total;
        }
        
        order.status = "confirmed";
        await order.save();
      } catch (error) {
        console.error("Error handling event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    
    res.status(200).send();
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
};

export const createLineItems = async (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: Menu[]
) => {
  return checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error(`Menu item id not found`);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: Math.round(menuItem.price * 100),
      },
      quantity: cartItem.quantity,
    };
  });
}