const express = require("express");

const router = express.Router();

const {
    getRecommendations
} = require("../controllers/analyticsController");

router.get("/recommend", getRecommendations);

module.exports = router;