import orderModel from "../models/orderModel.js"; // Adjust filepath to your configuration

// @desc    Place a direct Instant Quick Order
// @route   POST /api/orders
// @access  Public
const placeOrder = async (req, res) => {
  try {
    const { productName, productCategory, productSubCategory, selectedImage, status, customer } = req.body;

    // Validate necessary inputs
    if (!productName || !customer || !customer.fullName || !customer.phone) {
      return res.status(400).json({ success: false, message: "Missing required order information fields." });
    }

    const newOrder = new orderModel({
      productName,
      productCategory,
      productSubCategory,
      selectedImage,
      status: status || "pending",
      customer
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error in placeOrder controller:", error);
    res.status(500).json({ success: false, message: "Internal server fallback error failed to log order." });
  }
};

// @desc    Get all active customer orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    // Sorted descending (-1) so the newest orders show up first on your UI dashboard
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getAllOrders controller:", error);
    res.status(500).json({ success: false, message: "Failed to pull orders dataset from database." });
  }
};

// @desc    Delete a single order by ID
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Target order record could not be located." });
    }

    res.status(200).json({ success: true, message: "Order records purged successfully." });
  } catch (error) {
    console.error("Error in deleteOrder controller:", error);
    res.status(500).json({ success: false, message: "Failed to complete deletion process." });
  }
};

// @desc    Wipe/Clear all existing entries in order records collection
// @route   DELETE /api/orders/clear
// @access  Private/Admin
const clearAllOrders = async (req, res) => {
  try {
    await orderModel.deleteMany({});
    res.status(200).json({ success: true, message: "All order entries successfully purged from MongoDB database." });
  } catch (error) {
    console.error("Error in clearAllOrders controller:", error);
    res.status(500).json({ success: false, message: "Database failure occurred while wiping data registers." });
  }
};

export { placeOrder, getAllOrders, deleteOrder, clearAllOrders };