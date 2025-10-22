// src/components/Calendar.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './Button';
import { usePortalDropdown } from '@/hooks/usePortalDropdown';
import type { PortalDropdownProps } from '@/types/dropdown';

export interface CalendarProps extends PortalDropdownProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
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
  portalConfig,
  portalContainer,
  disablePortal = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isNotSure, setIsNotSure] = useState(false);
  
  // Initialize portal dropdown hook
  const { state, actions, triggerRef, renderPortal } = usePortalDropdown(
    {
      ...portalConfig,
      portalContainer: disablePortal ? null : portalContainer,
    },
    {
      onOpen: () => {
        // Optional: Add any custom logic on open
      },
      onClose: () => {
        // Optional: Add any custom logic on close
      },
    }
  );

  useEffect(() => {
    if (value) {
      setIsNotSure(false);
    }
  }, [value]);

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
    
    // Convert Sunday (0) to 6, Monday (1) to 0, etc. for Monday start
    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

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
      actions.close();
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-text-form font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          onClick={() => !disabled && actions.toggle()}
          className={`
            form-calendar
            w-full
            flex items-center justify-between
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
        >
          <span className={(value || isNotSure) ? 'text-text-form' : 'text-text-placeholder'}>
            {value ? formatDate(value) : isNotSure ? "I'm not sure" : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 text-text-form" />
        </button>

        {state.isOpen && renderPortal(
          <div 
            data-portal-dropdown
            data-testid="calendar-dropdown"
            className="w-80 bg-background-secondary border border-border-secondary rounded-sm shadow-lg p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-form-selection-hover rounded-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <h3 
                data-testid="calendar-month"
                className="text-base font-medium text-text-form"
              >
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
                  actions.close();
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