module.exports = {
  userName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The user name field is required'
    },
    trim: true,
    escape: true
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'The password field is required'
    },
  },
};
