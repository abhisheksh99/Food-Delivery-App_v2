import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";


dotenv.config();
 
export const client = new MailtrapClient({token: process.env.MAILTRAP_API_TOKEN  as string });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Flavour Fiesta - Abhishek Sharma",
};