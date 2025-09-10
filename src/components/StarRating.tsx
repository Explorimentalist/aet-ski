// src/components/StarRating.tsx
'use client';

import React, { useCallback, useState } from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
  error?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  max = 5,
  className = '',
  error,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, star: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onChange(Math.min(max, value + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onChange(Math.max(1, value - 1));
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onChange(star);
      }
    },
    [onChange, value, max]
  );

  return (
    <div className={`flex flex-col ${className}`}>
      <div role="radiogroup" aria-label="Rating" className="flex items-center gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const isHovering = hoverValue !== null;
          const isActive = isHovering ? star <= (hoverValue as number) : star <= value;
          const isSelected = star === value;
          const colorClass = isActive
            ? (isHovering ? 'text-[#FFD699]' : 'text-[#FFCC80]')
            : 'text-[#B3B7BB]';
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
              onClick={() => onChange(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(null)}
              className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-[rgba(29,71,71,0.2)] transition-colors ${colorClass}`}
              data-testid={`star-${star}`}
            >
              <Star className="w-7 h-7 fill-current" />
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-text-error mt-2">{error}</p>}
    </div>
  );
};
