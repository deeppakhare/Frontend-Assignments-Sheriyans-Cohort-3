const Product = require("../models/product.model");

/**
 * Create Product Controller
 * POST /api/products
 * Protected (Authenticated)
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category: category || "General",
      stock: parseInt(stock, 10),
      imageUrl: imageUrl || undefined,
      createdBy: req.user.userId
    });

    await product.save();
    await product.populate("createdBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error("[Create Product Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message
    });
  }
};

/**
 * Get All Products Controller
 * GET /api/products
 * Public
 */
const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category && category !== "All") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      products
    });
  } catch (error) {
    console.error("[Get Products Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message
    });
  }
};

/**
 * Get Product by ID Controller
 * GET /api/products/:id
 * Public
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error("[Get Product By ID Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product details",
      error: error.message
    });
  }
};

/**
 * Update Product Controller
 * PUT /api/products/:id
 * Protected (Authenticated)
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Confirm product existence first
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found. Cannot update non-existent resource."
      });
    }

    const { name, description, price, category, stock, imageUrl } = req.body;

    if (name !== undefined) existingProduct.name = name;
    if (description !== undefined) existingProduct.description = description;
    if (price !== undefined) existingProduct.price = parseFloat(price);
    if (category !== undefined) existingProduct.category = category;
    if (stock !== undefined) existingProduct.stock = parseInt(stock, 10);
    if (imageUrl !== undefined) existingProduct.imageUrl = imageUrl;

    await existingProduct.save();
    await existingProduct.populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct
    });
  } catch (error) {
    console.error("[Update Product Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: error.message
    });
  }
};

/**
 * Delete Product Controller
 * DELETE /api/products/:id
 * Protected (Authenticated)
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Confirm product existence first
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found. Cannot delete non-existent resource."
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      id
    });
  } catch (error) {
    console.error("[Delete Product Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
