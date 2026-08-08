const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    adminDashboard,
    userDashboard
} = require("../controllers/testController");

router.get(
    "/admin",
    verifyToken,
    authorizeRoles("admin"),
    adminDashboard
);

router.get(
    "/user",
    verifyToken,
    authorizeRoles("admin", "user"),
    userDashboard
);

module.exports = router;