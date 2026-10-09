const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const {
  productIdValidator,
  createProductValidator,
  updateProductValidator
} = require("../validators/product.validator");

const validate = require("../middleware/validate.middleware");
const authenticate = require("../middleware/auth.middleware");

// @route   POST /api/products
// @desc    Create a new product
// @access  Authenticated
router.post("/", authenticate, createProductValidator, validate, createProduct);

// @route   GET /api/products
// @desc    List all products with search & pagination
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/:id
// @desc    Get a single product by ID
// @access  Public
router.get("/:id", productIdValidator, validate, getProductById);

// @route   PUT /api/products/:id
// @desc    Update a product by ID
// @access  Authenticated
router.put("/:id", authenticate, updateProductValidator, validate, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Authenticated
router.delete("/:id", authenticate, productIdValidator, validate, deleteProduct);

module.exports = router;
