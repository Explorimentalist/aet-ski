// src/components/Navigation.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';
import { NavigationProps, NavigationItem } from '@/types';
import { motion, AnimatePresence, useMotionSafeSimple, motionTokens } from '@/motion';

// Default navigation items matching Figma
const defaultNavItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'routes', label: 'Routes', href: '/routes' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  items = defaultNavItems,
  showCTA = true,
  className = '',
  onMenuToggle,
  isMobileMenuOpen: externalMobileMenuOpen,
  onQuoteClick,
}) => {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const isMobileMenuOpen = externalMobileMenuOpen ?? internalMobileMenuOpen;
  const pathname = usePathname();
  const shouldAnimate = useMotionSafeSimple();

  const handleMenuToggle = () => {
    if (onMenuToggle) {
      onMenuToggle();
    } else {
      setInternalMobileMenuOpen(!internalMobileMenuOpen);
    }
  };

  // Function to determine if a navigation item is active
  const isItemActive = (item: NavigationItem): boolean => {
    // If the item has an explicit isActive prop, use it
    if (item.isActive !== undefined) {
      return item.isActive;
    }
    
    // Otherwise, determine based on current pathname
    if (item.href === '/') {
      // Home is active only if we're exactly on the home page
      return pathname === '/';
    }
    
    // For other pages, check if the pathname starts with the href
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      >
        {/* Progressive Blur Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -1,
          }}
        >
          {/* Progressive blur layers - 7 layers for smooth transition */}
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(1px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(2px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(4px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(8px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(16px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(24px)',
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(24px)', // Max blur at top
              mask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)',
              WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)',
            }}
          />
          
          {/* Background gradient for opacity fade and glitch hiding */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(245, 245, 245, 0.9) 0%, rgba(245, 245, 245, 0.3) 50%, transparent 100%)',
            }}
          />
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-[72px] px-[84px]">
          {/* Logo */}
          <Link href="/" className="flex-none">
            <Logo />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-[60px]">
            {items.map((item) => {
              const isActive = isItemActive(item);
              return (
                <NavigationLink
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  shouldAnimate={shouldAnimate}
                />
              );
            })}
          </div>

          {/* CTA Button */}
          {showCTA && (
            <Button
              variant="secondary"
              size="md"
              className="flex-none"
              onClick={onQuoteClick}
              style={{
                // Exact Figma specifications
                background: '#FFFFFF',
                border: '2px solid #1D4747',
                borderRadius: '8px',
                padding: '8px 16px',
                width: '118px',
                height: '40px',
              }}
            >
              Get a quote
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <Link href="/" className="flex-none">
            <Logo />
          </Link>

          {/* Mobile Menu Button */}
          <AnimatedMenuButton
            isOpen={isMobileMenuOpen}
            onClick={handleMenuToggle}
            shouldAnimate={shouldAnimate}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex items-center justify-center">
          {/* Centered Menu Content */}
          <div className="flex flex-col items-center justify-center w-full h-full px-6 py-20 bg-[#F5F5F5]">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center justify-center text-center space-y-12" role="navigation" aria-label="Mobile navigation">
              {items.map((item, index) => {
                const isActive = isItemActive(item);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      block font-geist font-medium text-lg transition-all duration-300 ease-out
                      transform translate-y-4 opacity-0 text-center
                      focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#F5F5F5]
                      hover:scale-105 hover:text-brand-primary
                      ${
                        isActive
                          ? 'text-brand-primary'
                          : 'text-text-form'
                      }
                      ${index === 0 ? 'animate-slide-in' : ''}
                      ${index === 1 ? 'animate-slide-in-1' : ''}
                      ${index === 2 ? 'animate-slide-in-2' : ''}
                      ${index === 3 ? 'animate-slide-in-3' : ''}
                    `}
                    onClick={handleMenuToggle}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile CTA Button */}
            {showCTA && (
              <div className="mt-[68px] flex justify-center">
                <Button
                  variant="secondary"
                  size="md"
                  className="transform translate-y-4 opacity-0 animate-slide-in-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#F5F5F5] hover:scale-105 transition-transform duration-200"
                  onClick={() => {
                    handleMenuToggle();
                    onQuoteClick?.();
                  }}
                  aria-label="Get a quote - opens quote form"
                >
                  Get a quote
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Desktop Navigation Link with underline draw animation
interface NavigationLinkProps {
  item: NavigationItem;
  isActive: boolean;
  shouldAnimate: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, isActive, shouldAnimate }) => {
  return (
    <Link
      href={item.href}
      className="relative font-medium text-base leading-[150%] tracking-[-0.011em] transition-colors group"
      style={{
        fontFamily: 'Geist',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '150%',
        letterSpacing: '-0.011em',
        color: isActive ? '#1E1E1E' : '#6B7280',
      }}
    >
      <span className="relative z-10 group-hover:text-[#1D4747] transition-colors">
        {item.label}
      </span>
      
      {/* Underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-[#1D4747]"
        initial={false}
        animate={{
          width: isActive ? '100%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
        whileHover={{
          width: shouldAnimate ? '100%' : (isActive ? '100%' : '0%'),
          opacity: shouldAnimate ? 1 : (isActive ? 1 : 0),
        }}
        transition={{
          duration: shouldAnimate ? motionTokens.d.short : 0,
          ease: motionTokens.e.brand,
        }}
        style={{
          originX: 0,
        }}
      />
    </Link>
  );
};

// Animated Menu Button for mobile with hamburger to close morph
interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  shouldAnimate: boolean;
}

const AnimatedMenuButton: React.FC<AnimatedMenuButtonProps> = ({ isOpen, onClick, shouldAnimate }) => {
  return (
    <button
      onClick={onClick}
      className="flex-none p-2 -mr-2 relative w-10 h-10 flex items-center justify-center"
      aria-label="Toggle navigation menu"
    >
      {shouldAnimate ? (
        <motion.div
          className="relative w-6 h-6"
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
        >
          {/* Menu Icon (closed state) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              closed: { opacity: 1, rotate: 0, scale: 1 },
              open: { opacity: 0, rotate: 135, scale: 0.8 }
            }}
            transition={{
              duration: motionTokens.d.short,
              ease: motionTokens.e.brand,
            }}
          >
            <Menu className="w-6 h-6 text-text-form" />
          </motion.div>
          
          {/* X Icon (open state) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              closed: { opacity: 0, rotate: -45, scale: 0.8 },
              open: { opacity: 1, rotate: 0, scale: 1 }
            }}
            transition={{
              duration: motionTokens.d.short,
              ease: motionTokens.e.brand,
            }}
          >
            <X className="w-6 h-6 text-text-form" />
          </motion.div>
        </motion.div>
      ) : (
        // Fallback for reduced motion - immediate icon swap
        <div className="flex items-center justify-center w-6 h-6">
          {isOpen ? (
            <X className="w-6 h-6 text-text-form" />
          ) : (
            <Menu className="w-6 h-6 text-text-form" />
          )}
        </div>
      )}
    </button>
  );
}; 