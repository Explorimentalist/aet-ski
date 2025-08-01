// src/components/Calendar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './Button';

export interface CalendarProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date | null) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  label,
  placeholder = 'Select a date',
  value,
  onChange,
  required = false,
  error,
  helper,
  disabled = false,
  minDate,
  maxDate,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isNotSure, setIsNotSure] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setIsNotSure(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Date[] = [];

    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleDateSelect = (date: Date) => {
    if (!isDisabled(date)) {
      setIsNotSure(false);
      onChange(date);
      setIsOpen(false);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-text-primary font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div ref={calendarRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            form-calendar
            w-full
            flex items-center justify-between
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
        >
          <span className={(value || isNotSure) ? 'text-text-primary' : 'text-text-placeholder'}>
            {value ? formatDate(value) : isNotSure ? "I'm not sure" : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 text-text-primary" />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-80 mt-1 bg-background-secondary border border-border-secondary rounded-sm shadow-md p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-form-selection-hover rounded-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <h3 className="text-base font-medium text-text-primary">
                {currentMonth.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </h3>
              
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:bg-form-selection-hover rounded-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-xs text-text-secondary text-center py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={isDisabled(day)}
                  className={`
                    form-calendar-day
                    w-8 h-8 text-sm
                    flex items-center justify-center
                    ${isSameDay(day, value || new Date(0)) 
                      ? 'bg-form-selection-active text-text-inverse' 
                      : isCurrentMonth(day) 
                        ? 'text-form-text' 
                        : 'text-text-secondary'
                    }
                    ${isDisabled(day) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsNotSure(true);
                  onChange(null);
                  setIsOpen(false);
                }}
              >
                I&apos;m not sure
              </Button>
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