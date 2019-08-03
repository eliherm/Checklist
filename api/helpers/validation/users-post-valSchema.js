module.exports = {
  firstName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The first name field is required'
    },
    trim: true,
    escape: true
  },
  lastName: {
    in: ['body'],
    optional: true,
    trim: true,
    escape: true
  },
  userName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The user name field is required'
    },
    trim: true,
    escape: true
  },
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The email field is required'
    },
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'The password must be at least 6 characters'
    }
  },
  passwordConfirm: {
    custom: {
      options: (value,  { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirmation password does not match password');
        }
        return true;
      }
    }
  },
  // Protect fields from modification
  id: {
    in: ['body'],
    exists: {
      negated: true,
      errorMessage: 'Not allowed'
    }
  },
  created_at: {
    in: ['body'],
    exists: {
      negated: true,
      errorMessage: 'Not allowed'
    }
  },
  updated_at: {
    in: ['body'],
    exists: {
      negated: true,
      errorMessage: 'Not allowed'
    }
  }
};
