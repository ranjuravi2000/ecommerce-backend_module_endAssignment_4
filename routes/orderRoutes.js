const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// User Routes---------------------------------//
router.post("/", verifyToken, authorizeRoles("user", "admin"), placeOrder);
router.get("/myorders", verifyToken, authorizeRoles("user", "admin"), getMyOrders);

// Admin Routes-------//
router.get("/", verifyToken, authorizeRoles("admin"), getAllOrders);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateOrderStatus);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteOrder);

module.exports = router;