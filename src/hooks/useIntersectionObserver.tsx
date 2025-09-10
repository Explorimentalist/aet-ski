// src/hooks/useIntersectionObserver.tsx
// Viewport detection hook for lazy loading components when they come into view

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  onIntersect?: () => void;
  onLeave?: () => void;
  triggerOnce?: boolean;
  disabled?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  onIntersect,
  onLeave,
  triggerOnce = true,
  disabled = false
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported, loading component immediately');
      setIsIntersecting(true);
      setHasIntersected(true);
      onIntersect?.();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
          onIntersect?.();
          
          // If triggerOnce is true, stop observing after first intersection
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!isCurrentlyIntersecting && hasIntersected && !triggerOnce) {
          onLeave?.();
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, root, onIntersect, onLeave, triggerOnce, hasIntersected, disabled]);

  return {
    ref,
    isIntersecting,
    hasIntersected
  };
};

// Hook specifically for lazy loading components
export const useLazyLoad = (options: UseIntersectionObserverOptions = {}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const { ref, hasIntersected } = useIntersectionObserver({
    ...options,
    onIntersect: () => {
      setShouldLoad(true);
      options.onIntersect?.();
    },
    triggerOnce: true
  });

  return {
    ref,
    shouldLoad: shouldLoad || hasIntersected
  };
};

export default useIntersectionObserver;