import express from "express";
import { 
  placeOrder, 
  getAllOrders, 
  deleteOrder, 
  clearAllOrders 
} from "../controller/orderController.js";

const orderRouter = express.Router();

// Public facing path used by client Collection cards
orderRouter.post("/", placeOrder);

// Dashboard path used by administrative user tracking grid
orderRouter.get("/", getAllOrders);

// Clear collection path setup (Must sit above /:id dynamic parameter hook)
orderRouter.delete("/clear", clearAllOrders);

// Single object removal parameter target
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;