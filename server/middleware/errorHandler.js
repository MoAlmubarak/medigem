// server/middleware/errorHandler.js
const { AppError } = require('../utils/errors');

// Development error response
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Production error response
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

// Handle specific error types
const handleFDAAPIError = (err) => {
  let message = 'Failed to fetch data from OpenFDA API';
  
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.status === 404) {
      message = 'Medication information not found in the FDA database';
    } else if (err.response.status === 429) {
      message = 'Too many requests to the FDA API. Please try again later.';
    }
    return new AppError(message, err.response.status);
  } else if (err.request) {
    // The request was made but no response was received
    return new AppError('Could not connect to the FDA database. Please check your network connection.', 503);
  }
  
  return new AppError(message, 500);
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Handle specific error types
  let error = { ...err };
  error.message = err.message;
  
  // Handle axios errors from FDA API
  if (err.isAxiosError) {
    error = handleFDAAPIError(err);
  }
  
  // Send different error responses for development and production
  if (isProduction) {
    sendErrorProd(error, res);
  } else {
    sendErrorDev(error, res);
  }
};

module.exports = errorHandler;