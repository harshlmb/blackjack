module.exports = {
  success: (data) => {
    return {
      sucess: true,
      data: data,
      error: null,
    };
  },

  fail: (err) => {
    return {
      sucess: false,
      data: null,
      error: err,
    };
  },
};
