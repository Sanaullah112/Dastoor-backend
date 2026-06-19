const orderSchema = new mongoose.Schema({
  productId: String,
  customer: Object,
  status: {
    type: String,
    default: "pending",
  },
});
