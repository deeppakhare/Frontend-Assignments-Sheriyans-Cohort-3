const { validationResult } = require("express-validator");

/**
 * Middleware to check validation results from express-validator
 * Returns 400 Bad Request with field-level errors if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value !== undefined ? err.value : null
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: formattedErrors
    });
  }

  next();
};

module.exports = validate;
