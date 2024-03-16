import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    selled: { type: Number },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
