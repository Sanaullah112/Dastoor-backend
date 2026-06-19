import express from "express";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/user_model.js";

const router = express.Router();

router.get("/stats", async (req, res, next) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const pendingOrders = await orderModel.countDocuments({ status: "pending" });
    const totalCustomers = await userModel.countDocuments();

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalCustomers,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    next(err)
  }
});

export default router;
