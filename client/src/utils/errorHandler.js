// client/src/utils/errorHandler.js
export const getErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";
  
  // Handle axios errors
  if (error.response) {
    // Server responded with an error status
    switch (error.response.status) {
      case 404:
        return "Medication not found. Please check the spelling.";
      case 429:
        return "Too many requests. Please try again in a moment.";
      case 500:
        return "Server error. Our system is experiencing issues.";
      default:
        return `Error: ${error.response.data.message || "Something went wrong"}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return "Network error. Please check your connection.";
  } else {
    // Something else caused the error
    return error.message || "An unexpected error occurred";
  }
};

export const getSuggestions = (error) => {
  // Default suggestions
  const defaultSuggestions = [
    "Double-check the spelling of the medication",
    "Try searching for the generic name instead",
    "Try a more common over-the-counter medication like 'Ibuprofen' or 'Tylenol'"
  ];
  
  // Custom suggestions based on error type
  if (error && error.response) {
    if (error.response.status === 404) {
      return [
        "Check the spelling of the medication",
        "Try the generic name (e.g., 'acetaminophen' instead of 'Tylenol')",
        "Try a different medication"
      ];
    }
    
    if (error.response.status === 429) {
      return [
        "Wait a moment and try again",
        "Try a different medication for now"
      ];
    }
  }
  
  return defaultSuggestions;
};