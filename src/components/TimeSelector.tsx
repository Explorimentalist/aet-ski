// src/components/TimeSelector.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

export interface TimeSelectorProps {
  label?: string;
  placeholder?: string;
  value?: string; // e.g., '14:30'
  onChange: (time: string | null) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  minTime?: string; // e.g., '09:00'
  maxTime?: string; // e.g., '18:00'
  className?: string;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  placeholder = 'Select a time',
  value,
  onChange,
  required = false,
  error,
  helper,
  disabled = false,
  minTime,
  maxTime,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateTimes = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeStr);
      }
    }
    return times;
  };

  const isDisabled = (time: string): boolean => {
    if (minTime && time < minTime) return true;
    if (maxTime && time > maxTime) return true;
    return false;
  };

  const handleTimeSelect = (time: string) => {
    if (!isDisabled(time)) {
      onChange(time);
      setIsOpen(false);
    }
  };

  const times = generateTimes();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-text-primary font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div ref={selectorRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={ `
            form-calendar // Reusing Calendar's class for consistency
            w-full
            flex items-center justify-between
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ` }
          disabled={disabled}
        >
          <span className={value ? 'text-text-primary' : 'text-text-placeholder'}>
            {value || placeholder}
          </span>
          <Clock className="w-5 h-5 text-text-primary" /> {/* Using Lucide icon, like Calendar */}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-80 mt-1 bg-background-secondary border border-border-secondary rounded-sm shadow-md p-4 max-h-64 overflow-y-auto">
            {/* Header - Simple title, no month navigation needed for time */}
            <h3 className="text-base font-medium text-text-primary mb-4">
              Select Time (24-hour format)
            </h3>

            {/* Time list - Simple grid for half-hour slots */}
            <div className="grid grid-cols-4 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  disabled={isDisabled(time)}
                  className={ `
                    form-calendar-day // Reusing Calendar's day class for style consistency
                    py-2 px-3 text-sm rounded-sm
                    ${value === time ? 'bg-form-selection-active text-text-inverse' : 'text-text-primary'}
                    ${isDisabled(time) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-form-selection-hover cursor-pointer'}
                  ` }
                >
                  {time}
                </button>
              ))}
            </div>
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