import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: String,
  productCategory: String,
  productSubCategory: String,
  selectedImage: String,
  customer: {
    fullName: String,
    address: String,
    phone: String,
    date: String,
    time: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
