// src/components/ReviewForm.tsx
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { StarRating } from '@/components/StarRating';
import { validateRequired, validateMinLength } from '@/lib/validation';

export interface ReviewFormValues {
  rating: number;
  comment: string;
  name: string;
  bookingName?: string;
}

interface ReviewFormProps {
  // onSubmit may return a boolean or an object with { success } to indicate success
  onSubmit: (values: ReviewFormValues) => unknown | Promise<unknown>;
  initialBookingName?: string;
  className?: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  initialBookingName = '',
  className = '',
}) => {
  const [values, setValues] = useState<ReviewFormValues>({
    rating: 0,
    comment: '',
    name: '',
    bookingName: initialBookingName,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setValues({ rating: 0, comment: '', name: '', bookingName: initialBookingName });
    setTouched({});
    setErrors({});
  };

  const setField = (field: keyof ReviewFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof ReviewFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = (v: ReviewFormValues) => {
    const nextErrors: Record<string, string> = {};
    if (!v.rating || v.rating < 1) {
      nextErrors.rating = 'Please select a rating';
    }

    const nameRes = validateRequired(v.name, 'Name');
    if (!nameRes.isValid) nextErrors.name = nameRes.error || 'Name is required';

    const commentReq = validateRequired(v.comment, 'Your review');
    if (!commentReq.isValid) nextErrors.comment = commentReq.error || 'Review is required';
    else {
      const commentMin = validateMinLength(v.comment.trim(), 10, 'Your review');
      if (!commentMin.isValid) nextErrors.comment = commentMin.error || 'Please write at least 10 characters';
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // mark all fields touched on submit for error visibility
      setTouched({ rating: true, name: true, comment: true, bookingName: true });
      return;
    }

    try {
      setSubmitting(true);
      const result = await onSubmit(values);
      const success = result === true || (typeof result === 'object' && result !== null && (result as any).success === true);
      if (success) {
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={`space-y-6 ${className}`} onSubmit={handleSubmit} noValidate>
      {/* Rating */}
      <div>
        <label className="text-base text-text-form font-normal leading-[150%] tracking-[0.0005em] block mb-2">
          Rating <span className="text-text-error">*</span>
        </label>
        <StarRating
          value={values.rating}
          onChange={(val) => {
            setField('rating', val);
            if (touched.rating) setErrors((prev) => ({ ...prev, rating: '' }));
          }}
          error={touched.rating ? errors.rating : ''}
        />
      </div>

      {/* Name */}
      <Input
        label="Your name"
        required
        value={values.name}
        onChange={(v) => {
          setField('name', v);
          if (touched.name) setErrors((prev) => ({ ...prev, name: '' }));
        }}
        onBlur={() => {
          markTouched('name');
          const nextErrors = validate(values);
          setErrors((prev) => ({ ...prev, name: nextErrors.name }));
        }}
        placeholder="Enter your name"
        error={touched.name ? errors.name : ''}
      />

      {/* Comment */}
      <Textarea
        label="Your review"
        required
        value={values.comment}
        onChange={(v) => {
          setField('comment', v);
          if (touched.comment) setErrors((prev) => ({ ...prev, comment: '' }));
        }}
        rows={5}
        maxLength={1000}
        placeholder="Share details about your transfer experience"
        className=""
        onBlur={() => {
          markTouched('comment');
          const nextErrors = validate(values);
          setErrors((prev) => ({ ...prev, comment: nextErrors.comment }));
        }}
        error={touched.comment ? errors.comment : ''}
      />

      {/* Hidden field: lead passenger booking name */}
      <input
        type="hidden"
        name="bookingName"
        value={values.bookingName}
        data-testid="booking-name-hidden"
        readOnly
      />

      {/* Submit */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg" className="w-auto" loading={submitting}>
          Submit review
        </Button>
      </div>
    </form>
  );
};
