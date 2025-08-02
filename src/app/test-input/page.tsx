// src/app/test-input/page.tsx
'use client';

import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Calendar } from '@/components/Calendar';
import { Textarea } from '@/components/Textarea';
import { NumberInput } from '@/components/NumberInput';
import { PhoneInput } from '@/components/PhoneInput';
import { TimeSelector } from '@/components/TimeSelector';
import { validateEmail, validatePhoneNumber, validateRequired } from '@/lib/validation';
import { collectionPoints, destinations } from '@/data/locations';
import { useState } from 'react';

export default function TestInputPage() {
  // Form state
  const [formData, setFormData] = useState({
    collectionPoint: '',
    email: '',
    phone: '+44 ',
    travelDate: undefined as Date | undefined,
    travelTime: '' as string,
    specialRequests: '',
    destination: '',
    adults: 1,
    children: 0,
    skis: 0,
    snowboards: 0,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data
  const updateFormData = (field: string, value: string | number | Date | undefined | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate specific field
  const validateField = (field: string, value: string | number | Date | undefined | null) => {
    let validationResult;

    switch (field) {
      case 'email':
        validationResult = validateEmail(value as string);
        break;
      case 'phone':
        validationResult = validatePhoneNumber(value as string);
        break;
      case 'collectionPoint':
      case 'destination':
      case 'travelDate':
        validationResult = validateRequired(value as string, field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
        break;
      default:
        return;
    }

    if (!validationResult.isValid) {
      setErrors(prev => ({ ...prev, [field]: validationResult.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle blur events for validation
  const handleBlur = (field: string) => {
    validateField(field, formData[field as keyof typeof formData]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const fieldsToValidate = ['collectionPoint', 'email', 'phone', 'travelDate', 'destination'];
    let hasErrors = false;

    fieldsToValidate.forEach(field => {
      validateField(field, formData[field as keyof typeof formData]);
      if (errors[field]) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      alert('Form submitted successfully!');
      console.log('Form data:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Input Components Test</h1>
          <p className="text-text-secondary">Testing categorized dropdowns, number inputs, phone with country codes, calendar, and validation functionality</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categorized Dropdown - Collection Point */}
          <Select
            label="Collection point"
            placeholder="Select your collection point"
            categorizedOptions={collectionPoints}
            value={formData.collectionPoint}
            onChange={(value) => updateFormData('collectionPoint', value)}
            required
            error={errors.collectionPoint}
            helper="Choose where you'd like to be picked up"
          />
          
          {/* Categorized Dropdown - Destination */}
          <Select
            label="Destination"
            placeholder="Select your destination"
            categorizedOptions={destinations}
            value={formData.destination}
            onChange={(value) => updateFormData('destination', value)}
            required
            error={errors.destination}
            helper="Choose your ski resort destination"
          />
          
          {/* Calendar - Travel Date */}
          <Calendar
            label="Travel date"
            placeholder="Select your travel date"
            value={formData.travelDate}
            onChange={(date) => updateFormData('travelDate', date)}
            required
            error={errors.travelDate}
            helper="Choose when you'd like to travel"
            minDate={new Date()}
          />
          
          {/* Time Selector - Travel Time (hidden if no date selected) */}
          {formData.travelDate && (
            <TimeSelector
              label="Travel time"
              placeholder="Select your travel time"
              value={formData.travelTime}
              onChange={(time) => updateFormData('travelTime', time)}
              required
              error={errors.travelTime}
              helper="Choose your preferred time (half-hour intervals)"
              minTime="08:00"
              maxTime="22:00"
            />
          )}
          
          {/* Number Inputs - Passengers */}
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Adults"
              value={formData.adults}
              onChange={(value) => updateFormData('adults', value)}
              min={1}
              max={10}
              required
              helper="Number of adult passengers"
            />
            
            <NumberInput
              label="Children"
              value={formData.children}
              onChange={(value) => updateFormData('children', value)}
              min={0}
              max={8}
              helper="Number of children (under 12)"
            />
          </div>
          
          {/* Number Inputs - Equipment */}
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Skis"
              value={formData.skis}
              onChange={(value) => updateFormData('skis', value)}
              min={0}
              max={10}
              helper="Number of ski sets"
            />
            
            <NumberInput
              label="Snowboards"
              value={formData.snowboards}
              onChange={(value) => updateFormData('snowboards', value)}
              min={0}
              max={10}
              helper="Number of snowboards"
            />
          </div>
          
          {/* Email with validation */}
          <Input
            label="Email address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => updateFormData('email', value)}
            onBlur={() => handleBlur('email')}
            type="email"
            error={errors.email}
            helper="We'll send your booking confirmation here"
          />
          
          {/* Phone with country code selection */}
          <PhoneInput
            label="Phone number"
            value={formData.phone}
            onChange={(value) => updateFormData('phone', value)}
            required
            error={errors.phone}
            helper="We'll use this to contact you about your booking"
          />
          
          {/* Long text input */}
          <Textarea
            label="Special requests"
            placeholder="Any special requirements? (e.g., wheelchair access, extra luggage, specific pickup time)"
            value={formData.specialRequests}
            onChange={(value) => updateFormData('specialRequests', value)}
            rows={4}
            maxLength={500}
            helper="Optional: Let us know if you have any special requirements"
          />
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full h-12 bg-brand-primary text-text-inverse font-medium rounded-sm hover:bg-brand-primary-hover transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-brand-primary-focus"
          >
            Submit Booking Request
          </button>
        </form>

        {/* Form data display for debugging */}
        <div className="mt-8 p-4 bg-background-secondary rounded-sm border border-border-secondary">
          <h3 className="text-lg font-medium text-text-primary mb-2">Form Data (Debug)</h3>
          <pre className="text-sm text-text-secondary overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 