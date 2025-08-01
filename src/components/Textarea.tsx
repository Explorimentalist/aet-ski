// src/components/Textarea.tsx
import React from 'react';

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  helper,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}) => {
  const textareaId = `textarea-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`;
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="text-base text-text-primary font-normal leading-[150%] tracking-[0.0005em]"
        >
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          className={`
            w-full px-4 py-3
            bg-background-secondary
            border border-border-transparent
            rounded-sm
            text-base text-text-primary
            placeholder:text-text-placeholder
            transition-all duration-fast ease-in-out
            focus:border-border-primary focus:outline-none focus:ring-2 focus:ring-brand-primary-focus
            hover:border-border-primary
            resize-vertical
            min-h-[48px]
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          required={required}
        />
        
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-text-secondary">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-text-error">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-text-secondary">{helper}</p>
      )}
    </div>
  );
}; 