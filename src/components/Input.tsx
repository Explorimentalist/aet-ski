// src/components/Input.tsx
import React from 'react';
import { InputProps } from '@/types';

export const Input: React.FC<InputProps> = ({
  label,
  required = false,
  error,
  helper,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
}) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={inputId} className="text-body text-text-primary font-medium">
        {label}
        {required && <span className="text-text-error ml-1">*</span>}
      </label>
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''}`}
        required={required}
      />
      
      {error && (
        <p className="text-sm text-text-error">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-text-secondary">{helper}</p>
      )}
    </div>
  );
}; 