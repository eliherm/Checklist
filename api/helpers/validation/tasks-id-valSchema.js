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
  }
};
