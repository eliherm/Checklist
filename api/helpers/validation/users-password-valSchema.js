module.exports = {
  userId: {
    in: ['params'],
    isInt: {
      options: { gt: 0 },
      errorMessage: 'The requested id is invalid'
    },
    toInt: {
      options: { radix: 10 }
    }
  },
  oldPassword: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'The password must be at least 6 characters'
    }
  },
  newPassword: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'The password must be at least 6 characters'
    },
    custom: {
      options: (value,  { req }) => {
        if (value === req.body.oldPassword) {
          throw new Error('The new password is identical to the old password');
        }
        return true;
      }
    }
  },
  passwordConfirm: {
    custom: {
      options: (value,  { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Confirmation password does not match new password');
        }
        return true;
      }
    }
  }
};
