const express = require("express");
//const Order = require("./models/Order");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Create a new order (for customers)
router.post("/", authMiddleware, async (req, res) => {
  const { customerName, address, pizza, totalAmount } = req.body;

  const newOrder = new Order({
    customerName,
    address,
    pizza,
    totalAmount,
    paymentStatus: "Pending", // Assuming payment is pending initially
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Get all orders (for admins)
router.get("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Get a single order (for customers)
router.get("/:id", authMiddleware, async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.customerName !== req.user.name && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// Update order status (for admins)
router.put("/:id/status", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const orderId = req.params.id;
  const { status } = req.body;

  if (!["Pending", "In Progress", "Completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});




module.exports = router;