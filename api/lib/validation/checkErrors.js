const { validationResult } = require('express-validator');

// Check for validation errors
function checkValidationErr(req, res, next) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ validationErrors: validationErrors.array() });
  }
  next();
}

module.exports = checkValidationErr;
