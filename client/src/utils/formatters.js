export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return 'Unknown';
  }
};

export const formatTime = (date) => {
  if (!date) return '';
  
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString([], options);
};