// src/components/fallbacks/index.ts
// Central export for all fallback components

export { 
  MultiStepFormFallback, 
  MultiStepFormSkeleton, 
  StaticFormFallback 
} from './MultiStepFormFallback';

export { 
  TestimonialsCarouselSkeleton, 
  TestimonialsCarouselCompactSkeleton,
  TestimonialsLoadingState
} from './TestimonialsCarouselFallback';

export { 
  CalendarSkeleton, 
  CalendarDropdownSkeleton, 
  CalendarCompactSkeleton,
  CalendarFieldSkeleton,
  CalendarLoadingState
} from './CalendarFallback';

export { 
  ReviewFormSkeleton, 
  ReviewFormCompactSkeleton,
  StarRatingSkeleton,
  ReviewFormLoadingState
} from './ReviewFormFallback';

// Re-export LoadingSkeleton from LazyWrapper
export { LoadingSkeleton } from '../LazyWrapper';