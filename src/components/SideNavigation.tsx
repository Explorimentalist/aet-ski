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

  useEffect(() => {
    // Only run on mobile
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;

    const handleScroll = () => {
      if (!navigationRef.current) return;
      
      // Get the mobile navigation height
      const mobileNavHeight = 56; // 56px (14rem) as defined in the terms page
      const scrollY = window.scrollY;
      
      // Check if we've scrolled past the top navigation
      setIsSticky(scrollY >= mobileNavHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleItemClick = (id: string) => {
    onItemClick(id);
    // On mobile, close the accordion after selection
    if (window.innerWidth < 768) {
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
      <div className="md:hidden relative z-20" ref={navigationRef}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full bg-white shadow-md p-4 flex items-center justify-between
            transition-all duration-300 ease-in-out
            ${isSticky 
              ? 'rounded-none fixed top-[56px] left-0 right-0 px-6' 
              : 'rounded-lg'}
          `}
        >
          <span className="flex-1 text-left text-base font-medium text-gray-700">
            {activeItem ? `${activeItem.number}. ${activeItem.title}` : 'Select Section'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {isExpanded && (
          <>
            {/* Dropdown menu */}
            <div className={`
              ${isSticky 
                ? 'fixed top-[104px] left-0 right-0 rounded-none px-6' 
                : 'absolute top-full left-0 right-0 mt-2 rounded-lg'}
              bg-white shadow-lg overflow-hidden z-20
              transition-all duration-300 ease-in-out
            `}>
              <nav className="py-2 max-h-[50vh] overflow-y-auto">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-start gap-2 px-4 py-3 text-left transition-colors duration-200 ${
                      item.isActive 
                        ? 'bg-gray-100 text-gray-700 font-semibold' 
                        : 'text-gray-700/60 font-semibold hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                                      <span className="text-base md:font-semibold font-normal leading-relaxed tracking-tight flex-shrink-0">
                    {item.number}
                  </span>
                  <span className="text-base md:font-semibold font-normal leading-relaxed tracking-tight">
                    {item.title}
                  </span>
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 