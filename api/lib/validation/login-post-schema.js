module.exports = {
  userName: {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: 'The user name field is required'
    },
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
