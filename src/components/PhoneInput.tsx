// src/components/PhoneInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { countries, Country, getDefaultCountry } from '../data/countries';

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  helper,
  disabled = false,
  className = '',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(getDefaultCountry());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phoneCode.includes(searchTerm)
  );

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
    
    // Update the full phone number with new country code
    const phoneNumber = value.replace(/^\+\d+\s*/, '');
    const newValue = `${country.phoneCode} ${phoneNumber}`.trim();
    onChange(newValue);
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    const newValue = `${selectedCountry.phoneCode} ${phoneNumber}`.trim();
    onChange(newValue);
  };

  // Get phone number without country code for input display
  const getPhoneNumberWithoutCode = () => {
    return value.replace(/^\+\d+\s*/, '');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base text-text-primary font-normal leading-[150%] tracking-[0.0005em]">
          {label}
          {required && <span className="text-text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Main input container */}
        <div className="flex border border-border-transparent rounded-sm bg-background-secondary transition-all duration-fast hover:border-border-primary focus-within:border-border-primary focus-within:ring-2 focus-within:ring-brand-primary-focus">
          {/* Country code selector */}
          <button
            type="button"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-3
              border-r border-border-secondary
              transition-colors duration-fast
              ${disabled 
                ? 'text-text-disabled cursor-not-allowed' 
                : 'text-form-text hover:bg-background-hover cursor-pointer'
              }
            `}
            aria-label="Select country code"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-base font-medium">{selectedCountry.phoneCode}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-fast ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Phone number input */}
          <input
            type="tel"
            value={getPhoneNumberWithoutCode()}
            onChange={handlePhoneNumberChange}
            disabled={disabled}
            placeholder="Enter phone number"
            className={`
              flex-1 px-3 py-3
              bg-transparent
              text-base text-form-text
              placeholder:text-text-placeholder
              outline-none
              transition-colors duration-fast
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            required={required}
          />
        </div>

        {/* Error state styling */}
        {error && (
          <div className="absolute inset-0 border border-border-error rounded-sm bg-background-error pointer-events-none" />
        )}

        {/* Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-background-secondary border border-border-secondary rounded-sm shadow-md z-10 max-h-60 overflow-hidden"
          >
            {/* Search input */}
            <div className="p-3 border-b border-border-secondary">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for country"
                  className="w-full pl-10 pr-3 py-2 bg-background-secondary border border-border-transparent rounded-sm text-base text-form-text placeholder:text-text-placeholder outline-none focus:border-border-primary"
                />
              </div>
            </div>

            {/* Country list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2
                    text-left text-base text-form-text
                    transition-colors duration-fast
                    hover:bg-form-selection-hover
                    ${selectedCountry.code === country.code ? 'bg-form-selection-active' : ''}
                  `}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-sm text-text-secondary">({country.phoneCode})</span>
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