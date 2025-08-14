// src/components/Select.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plane, Hotel, Train, Mountain } from 'lucide-react';
import { SelectOption, CategorizedOption } from '@/types';
import { findOptionByValue } from '@/data/locations';

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  categorizedOptions?: CategorizedOption[];
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
}

const getIcon = (iconType?: string) => {
  switch (iconType) {
    case 'airport':
      return <Plane className="w-4 h-4" />;
    case 'hotel':
      return <Hotel className="w-4 h-4" />;
    case 'train':
    case 'train-station':
      return <Train className="w-4 h-4" />;
    case 'ski-resort':
      return <Mountain className="w-4 h-4" />;
    default:
      return null;
  }
};

const renderCategorizedOptions = (
  options: CategorizedOption[],
  searchTerm: string,
  selectedValue: string,
  onSelect: (value: string) => void,
  level: number = 0
): React.ReactNode[] => {
  const rendered: React.ReactNode[] = [];

  options.forEach((option) => {
    const matchesSearch = searchTerm === '' || 
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (option.children && option.children.some(child => 
        child.label.toLowerCase().includes(searchTerm.toLowerCase())
      ));

    if (!matchesSearch) return;

    if (option.type === 'option') {
      rendered.push(
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value!)}
          className={`
            form-dropdown-option
            w-full text-left text-base
            flex items-center gap-3
            ${option.value === selectedValue ? 'bg-form-selection-active' : ''}
            ${level > 0 ? `pl-${(level + 1) * 4}` : ''}
          `}
        >
          {option.icon && (
            <span className="text-form-icon flex-shrink-0">
              {getIcon(option.icon)}
            </span>
          )}
          <span className="flex-1 text-form-text">{option.label}</span>
          {option.value === selectedValue && (
            <Check className="w-4 h-4 text-form-icon flex-shrink-0" />
          )}
        </button>
      );
    } else if (option.type === 'category' || option.type === 'subcategory') {
      // Only show category/subcategory if it has matching children or matches search
      const hasMatchingChildren = option.children && option.children.some(child => 
        child.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (hasMatchingChildren || option.label.toLowerCase().includes(searchTerm.toLowerCase())) {
        rendered.push(
          <div
            key={option.label}
            className={`
              px-4 py-2 text-sm font-medium text-form-text
              ${level > 0 ? `pl-${(level + 1) * 4}` : ''}
              ${option.type === 'subcategory' ? 'italic' : ''}
            `}
          >
            {option.label}
          </div>
        );
        
        if (option.children) {
          rendered.push(...renderCategorizedOptions(
            option.children,
            searchTerm,
            selectedValue,
            onSelect,
            level + 1
          ));
        }
      }
    }
  });

  return rendered;
};

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  categorizedOptions,
  value,
  onChange,
  required = false,
  error,
  helper,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  // Determine which options to use
  const useCategorized = categorizedOptions && categorizedOptions.length > 0;
  
  const selectedOption = useCategorized 
    ? findOptionByValue(categorizedOptions!, value ?? '')
    : options?.find(option => option.value === value);

  const filteredOptions = useCategorized
    ? categorizedOptions!
    : options?.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-form-text font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`
            form-dropdown
            w-full
            flex items-center justify-between
            ${error ? 'border-border-error bg-background-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 flex-1">
            {useCategorized && selectedOption && 'icon' in selectedOption && selectedOption.icon && (
              <span className="text-form-icon flex-shrink-0">
                {getIcon(selectedOption.icon)}
              </span>
            )}
            <span className={selectedOption ? 'text-form-text' : 'text-text-placeholder'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-form-icon transition-transform duration-fast flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-background-secondary border border-border-secondary rounded-sm shadow-md max-h-60 overflow-hidden">
            <div className="p-2 border-b border-border-secondary">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background-primary border border-border-secondary rounded-sm focus:outline-none focus:border-border-primary"
                autoFocus
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {useCategorized ? (
                renderCategorizedOptions(
                  filteredOptions as CategorizedOption[],
                  searchTerm,
                  value || '',
                  handleSelect
                )
              ) : (
                filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value || '')}
                      className={`
                        form-dropdown-option
                        w-full text-left text-base
                        flex items-center justify-between
                        ${option.value === value ? 'bg-form-selection-active' : ''}
                      `}
                    >
                      <span className="text-form-text">{option.label}</span>
                      {option.value === value && (
                        <Check className="w-4 h-4 text-form-icon" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-form-text">
                    No options found
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-text-error">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-form-text">{helper}</p>
      )}
    </div>
  );
}; 