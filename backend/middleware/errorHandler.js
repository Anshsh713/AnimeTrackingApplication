const {
  errorResponse,
  NotFoundResponse,
} = require("../ultils/responseHandler");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, err, err.statusCode || 500);
};

const NotFoundHandler = (req, res, next) => {
  NotFoundResponse(res);
};

module.exports = {
  errorHandler,
  NotFoundHandler,
};
