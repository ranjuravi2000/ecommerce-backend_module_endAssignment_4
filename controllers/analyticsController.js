const Product = require("../models/productModel");

// Recommend products by category
const getRecommendations = async (req, res) => {
    try {

        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                message: "Category is required"
            });
        }

        const recommendations = await Product.find({
            category: category
        }).limit(5);

        res.status(200).json({
            message: "Recommended Products",
            recommendations
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getRecommendations
};