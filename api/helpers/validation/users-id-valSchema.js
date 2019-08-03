module.exports = {
  userId: {
    in: ['params'],
    isInt: {
      options: { gt: 0 }
    }
  }
};
