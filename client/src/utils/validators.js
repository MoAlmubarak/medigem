export const validateDrugName = (drugName) => {
  if (!drugName || drugName.trim() === '') {
    return 'Drug name is required';
  }
  
  if (drugName.trim().length < 2) {
    return 'Drug name must be at least 2 characters';
  }
  
  if (!/^[a-zA-Z0-9\s\-]+$/.test(drugName)) {
    return 'Drug name can only contain letters, numbers, spaces and hyphens';
  }
  
  return null; // Valid
};