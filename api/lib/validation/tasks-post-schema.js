module.exports = {
  description: {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: 'The description field is required'
    },
    escape: true
  },
  completed: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The completed field is required'
    },
    isInt: {
      options: { min: 0, max: 1, allow_leading_zeroes: false },
      errorMessage: 'Invalid value'
    },
    toInt: {
      options: { radix: 10 }
    }
  },
  starred: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The starred field is required'
    },
    isInt: {
      options: { min: 0, max: 1, allow_leading_zeroes: false },
      errorMessage: 'Invalid value'
    },
    toInt: {
      options: { radix: 10 }
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
  userId: {
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
