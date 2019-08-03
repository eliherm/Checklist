module.exports = {
  userId: {
    in: ['params'],
    isInt: {
      options: { gt: 0 },
      errorMessage: 'The requested id is invalid'
    }
  },
  firstName: {
    in: ['body'],
    optional: true,
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
    optional: true,
    trim: true,
    escape: true
  },
  email: {
    in: ['body'],
    optional: true,
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true
  },
  // Protect fields from modification
  id: {
    in: ['body'],
    exists: {
      negated: true,
      errorMessage: 'Not allowed'
    }
  },
  password: {
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
