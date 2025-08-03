// src/components/SideNavigation.tsx
'use client';

import { useState } from 'react';
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
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
        >
          <span className="text-lg font-bold text-gray-700">
            {activeItem ? `${activeItem.number}. ${activeItem.title}` : 'Select Section'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-2 bg-white rounded-lg shadow-md overflow-hidden">
            <nav className="py-2">
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
                  <span className="text-base font-semibold leading-relaxed tracking-tight flex-shrink-0">
                    {item.number}
                  </span>
                  <span className="text-base font-semibold leading-relaxed tracking-tight">
                    {item.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
} 