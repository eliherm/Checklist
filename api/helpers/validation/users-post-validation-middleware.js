/*
// Middleware format
[
  // Validation and Sanitization
  body('firstName').not().isEmpty().withMessage('The first name field is required').trim().escape(),
  body('lastName').optional().trim().escape(),
  body('userName').not().isEmpty().withMessage('The user name field is required').trim().escape(),
  body('email').not().isEmpty().withMessage('The email field is required').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('The password must be at least 6 characters'),
  body('passwordConfirm').custom((value,  { req } ) => {
    if (value !== req.body.password) {
      throw new Error('Confirmation password does not match password');
    }
    return true;
  })
]*/
