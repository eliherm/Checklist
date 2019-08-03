module.exports = {
  taskId: {
    in: ['params'],
    isInt: {
      options: { gt: 0 }
    }
  }
};
