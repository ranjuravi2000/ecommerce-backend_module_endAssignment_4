const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public Routes---------
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Only----------
router.post("/", verifyToken, authorizeRoles("admin"), createProduct);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateProduct);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteProduct);

module.exports = router;