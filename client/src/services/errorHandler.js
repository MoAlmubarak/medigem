// Centralized error handling for frontend
const errorHandler = (error) => {
  // Check for network errors
  if (!error.response) {
    console.error('Network Error:', error);
    return {
      type: 'network',
      message: 'Unable to connect to the server. Please check your internet connection.',
    };
  }

  // Handle API errors based on status code
  const status = error.response.status;

  // Get error message from response if available
  const serverMessage = error.response.data?.message || 'An error occurred';

  switch (status) {
    case 400:
      console.error('Bad Request:', serverMessage);
      return {
        type: 'validation',
        message: serverMessage,
      };
    case 404:
      console.error('Not Found:', serverMessage);
      return {
        type: 'not_found',
        message: serverMessage,
      };
    case 500:
      console.error('Server Error:', serverMessage);
      return {
        type: 'server',
        message: 'The server encountered an error. Please try again later.',
      };
    default:
      console.error(`Error ${status}:`, serverMessage);
      return {
        type: 'unknown',
        message: 'An unexpected error occurred. Please try again.',
      };
  }
};

export default errorHandler;