const Product = require("../models/productModel");

// Create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;

        let filter = {};

        // Search by product name
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        let query = Product.find(filter);

        // Sort by price
        if (sort === "asc") {
            query = query.sort({ price: 1 });
        } else if (sort === "desc") {
            query = query.sort({ price: -1 });
        }

        const products = await query;

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};