// src/components/NumberInput.tsx
import React from 'react';
import { Plus, Minus } from 'lucide-react';

export interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
  showButtons?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  required = false,
  error,
  helper,
  disabled = false,
  className = '',
  showButtons = true,
}) => {
  const handleIncrement = () => {
    if (!disabled && value < max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (!disabled && value > min) {
      onChange(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-text-form font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {showButtons && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            className={`
              absolute left-2 top-1/2 -translate-y-1/2
              w-8 h-8 rounded-sm
              flex items-center justify-center
              transition-colors duration-fast
              ${disabled || value <= min 
                ? 'text-text-disabled cursor-not-allowed' 
                : 'text-form-icon hover:bg-background-hover cursor-pointer'
              }
            `}
            aria-label="Decrease value"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}
        
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`
            form-input
            w-full text-center
            ${showButtons ? 'pl-12 pr-12' : ''}
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-moz-inner-spin-button]:appearance-none
            [&::-moz-outer-spin-button]:appearance-none
          `}
          required={required}
        />
        
        {showButtons && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2
              w-8 h-8 rounded-sm
              flex items-center justify-center
              transition-colors duration-fast
              ${disabled || value >= max 
                ? 'text-text-disabled cursor-not-allowed' 
                : 'text-form-icon hover:bg-background-hover cursor-pointer'
              }
            `}
            aria-label="Increase value"
          >
            <Plus className="w-4 h-4" />
          </button>
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