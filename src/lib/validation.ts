// src/lib/validation.ts

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters except + for validation
  const digitsOnly = phone.replace(/[^\d+]/g, '');
  
  // Check if it starts with a country code (+)
  if (!digitsOnly.startsWith('+')) {
    return { isValid: false, error: 'Please include the country code (e.g., +44 for UK)' };
  }
  
  // Remove the + and check the length
  const numberWithoutPlus = digitsOnly.substring(1);
  
  // Check if it's a valid international phone number (7-15 digits after country code)
  if (numberWithoutPlus.length < 7 || numberWithoutPlus.length > 15) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { isValid: true };
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be no more than ${maxLength} characters` };
  }
  return { isValid: true };
}; 