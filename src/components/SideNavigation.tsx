// src/components/SideNavigation.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavigationItem {
  id: string;
  number: string;
  title: string;
  isActive?: boolean;
}

interface SideNavigationProps {
  items: NavigationItem[];
  onItemClick: (id: string) => void;
  className?: string;
}

export default function SideNavigation({ 
  items, 
  onItemClick, 
  className = '' 
}: SideNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);
  const [stickyThreshold, setStickyThreshold] = useState(56);

  useEffect(() => {
    // Calculate sticky threshold based on actual navigation height
    const calculateStickyThreshold = () => {
      // Main navigation height: 56px on mobile, 72px on desktop
      const mainNavHeight = window.innerWidth >= 768 ? 72 : 56;
      setStickyThreshold(mainNavHeight);
    };

    const handleScroll = () => {
      if (!navigationRef.current) return;
      
      const scrollY = window.scrollY;
      const shouldBeSticky = scrollY >= stickyThreshold;
      
      // Only update if the state actually changes to prevent unnecessary re-renders
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
    };

    const handleResize = () => {
      calculateStickyThreshold();
    };

    // Initial calculations
    calculateStickyThreshold();
    handleScroll();

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSticky, stickyThreshold]);

  const handleItemClick = (id: string) => {
    onItemClick(id);
    // On mobile, close the accordion after selection
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const activeItem = items.find(item => item.isActive);

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Side Navigation */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-700 mb-7 leading-tight tracking-tight">
            Content
          </h3>
          
          <nav className="space-y-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-start gap-2 p-0 transition-colors duration-200 ${
                  item.isActive 
                    ? 'text-gray-700 font-semibold' 
                    : 'text-gray-700/60 font-semibold hover:text-gray-700'
                }`}
              >
                <span className="text-base font-semibold leading-relaxed tracking-tight flex-shrink-0">
                  {item.number}
                </span>
                <span className="text-base font-semibold leading-relaxed tracking-tight text-left">
                  {item.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Accordion Navigation */}
      <div className="md:hidden relative" ref={navigationRef}>
        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full bg-white shadow-md flex items-center justify-between
            transition-all duration-300 ease-in-out
            ${isSticky 
              ? `fixed left-0 right-0 z-30 px-6 py-4 rounded-none shadow-lg
                 backdrop-blur-md bg-white/95 border-b border-gray-100
                 top-[${stickyThreshold}px]`
              : 'relative px-4 py-4 rounded-lg z-20'}
          `}
          style={isSticky ? { top: `${stickyThreshold}px` } : undefined}
        >
          <span className="flex-1 text-left text-base font-medium text-gray-700 truncate pr-2">
            {activeItem ? `${activeItem.number}. ${activeItem.title}` : 'Select Section'}
          </span>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-700" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isExpanded && (
          <div 
            className={`
              ${isSticky 
                ? `fixed left-0 right-0 z-20 px-0 shadow-xl
                   backdrop-blur-md bg-white/95 border-b border-gray-100`
                : 'absolute left-0 right-0 mt-2 rounded-lg shadow-lg z-20 bg-white'}
              overflow-hidden transition-all duration-300 ease-in-out
            `}
            style={isSticky ? { top: `${stickyThreshold + 56}px` } : undefined}
          >
            <nav className="py-2 max-h-[60vh] overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-start gap-3 px-6 py-3 text-left transition-colors duration-200 ${
                    item.isActive 
                      ? 'bg-gray-50 text-gray-700 font-semibold border-l-4 border-gray-700' 
                      : 'text-gray-700/70 font-medium hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <span className="text-base font-medium leading-relaxed tracking-tight flex-shrink-0 min-w-[1.5rem]">
                    {item.number}
                  </span>
                  <span className="text-base font-medium leading-relaxed tracking-tight">
                    {item.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Backdrop overlay when expanded and sticky */}
        {isExpanded && isSticky && (
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10"
            onClick={() => setIsExpanded(false)}
            style={{ top: `${stickyThreshold + 56 + (items.length * 48) + 16}px` }}
          />
        )}
      </div>
    </div>
  );
} 