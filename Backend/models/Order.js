const mongoose = require("mongoose");
//const Order = require("./models/Order");


const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  no: { type: String, required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  pizza: { type: String, enum: ["Ham and Cheese", "Pepperoni", "Veggie", "Hawaiian", "Ham and Bacon"], required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);