module.exports = function asyncMiddleware(handler) {
  //return std express route handler
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
