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
  onBlur,
  type = 'text',
  className = '',
}) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label 
        htmlFor={inputId} 
        className="text-base text-text-primary font-normal leading-[150%] tracking-[0.0005em]"
      >
        {label}
        {required && <span className="text-text-error ml-1">*</span>}
      </label>
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          form-input
          w-full
          ${error ? 'border-border-error bg-background-error' : ''}
        `}
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