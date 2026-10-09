const { body, param } = require("express-validator");

const productIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Product ID format")
];

const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid positive number"),

  body("stock")
    .notEmpty()
    .withMessage("Stock count is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a valid non-negative integer"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty if provided"),

  body("imageUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image URL must be a valid URL")
];

const updateProductValidator = [
  ...productIdValidator,

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a valid non-negative integer"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("imageUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image URL must be a valid URL")
];

module.exports = {
  productIdValidator,
  createProductValidator,
  updateProductValidator
};
