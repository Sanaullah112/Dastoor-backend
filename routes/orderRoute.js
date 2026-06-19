import express from "express";
import orderModel from "../models/orderModel.js";

const router = express.Router();

// Get all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    next(err);
  }
});

// Delete single order
router.delete("/:id", async (req, res, next) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    next(err)
  }
});

// Clear all orders
router.delete("/clear", async (req, res, next) => {
  try {
    await orderModel.deleteMany({});
    res.json({ message: "All orders cleared" });
  } catch (err) {
    console.error("Error clearing all orders:", err);
    next(err)
  }
});

export default router; // ✅ Important line
