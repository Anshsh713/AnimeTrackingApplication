// Send a success JSON response
const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success", // response type
    statusCode, // HTTP status code
    data, // returned payload
  });
};

// Send an error JSON response
const errorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error", // response type
    statusCode, // HTTP status code
    message: error.message || "Internal Server Error", // error message
  });
};

// Send a 404 not found response
const NotFoundResponse = (res, message = "Resource not found") => {
  res.status(404).json({
    status: "error", // response type
    statusCode: 404, // fixed not found status
    message, // custom or default message
  });
};

// Export all helpers for use in controllers
module.exports = {
  successResponse,
  errorResponse,
  NotFoundResponse,
};
