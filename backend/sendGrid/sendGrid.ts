import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// Sender configuration
export const sender = {
  email: "abhishek.fall2023@gmail.com",
  name: "Flavour Fiesta - Abhishek Sharma",
};

export default sgMail;
