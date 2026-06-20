import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: String, default: "" }, 
  productName: { type: String, required: true },
  productCategory: { type: String, default: "" },
  productSubCategory: { type: String, default: "" },
  selectedImage: { type: String, default: "" },
  status: { type: String, default: "pending", enum: ["pending", "completed", "cancelled"] },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;