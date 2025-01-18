import mongoose, { Document} from "mongoose";

interface IMenu extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuSchema = new mongoose.Schema<IMenu>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model<IMenu>("Menu", menuSchema);

export default Menu;