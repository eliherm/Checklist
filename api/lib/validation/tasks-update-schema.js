module.exports = {
  taskId: {
    in: ['params'],
    isInt: {
      options: { gt: 0 },
      errorMessage: 'The requested id is invalid'
    },
    toInt: {
      options: { radix: 10 }
    }
  },
  description: {
    in: ['body'],
    optional: true,
    trim: true,
    escape: true,
  },
  completed: {
    in: ['body'],
    optional: true,
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
    optional: true,
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
