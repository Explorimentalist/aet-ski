// src/motion/tokens.ts
// Brand Animation Library - AET Ski Website
// Comprehensive motion tokens for consistent, brand-aligned animations
// Based on brand attributes: Genuine, Reliable, Warm, Welcoming, Experienced

export const motionTokens = {
  // Duration tokens (from tokens.json animation.duration)
  d: {
    micro: 0.16,    // Micro-interactions like hovers, focus states
    fast: 0.2,      // Fast animation duration
    short: 0.28,    // Small components and UI transitions
    normal: 0.3,    // Normal animation duration
    medium: 0.48,   // Page sections, modals, content reveals
    long: 0.80,     // Page transitions and hero animations
    slow: 0.8,      // Slow animation duration for loading states
  },
  
  // Easing tokens (Updated with brand defaults from MOTION_IMPLEMENTATION.md)
  e: {
    // Brand personality: snappy + warm settle
    brand: [0.25, 0.90, 0.30, 1] as [number, number, number, number],
    
    // Fades: subtle and unnoticeable
    fade: "easeInOut" as const,
    
    // Micro interactions: quick and efficient
    micro: [0.3, 0, 0.7, 1] as [number, number, number, number],
    
    // Playful delight: use sparingly for special moments
    playful: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    
    // Legacy support (deprecated - use brand instead)
    ease: "easeOut" as const,
    easeInOut: "easeInOut" as const,
  },
  
  // Stagger tokens (from tokens.json animation.stagger)
  stagger: {
    xs: 0.04,  // Very tight list item staggering
    sm: 0.08,  // Default stagger for small groups
    md: 0.12,  // Larger groups or hero elements
    lg: 0.16,  // Large content sections
  },
  
  // Delay tokens for coordinated animations
  delay: {
    micro: 0.04,   // Micro delays for immediate feedback
    fast: 0.08,    // Fast delays for quick sequences
    short: 0.12,   // Short delays for UI coordination
    normal: 0.16,  // Normal delays for content reveals
    medium: 0.24,  // Medium delays for section coordination
    long: 0.32,    // Long delays for major transitions
  },
  
  // Scale tokens for consistent, brand-aligned scaling
  scale: {
    // Entrance/exit scales (warm and welcoming)
    entrance: {
      hidden: 0.98,    // Gentle, warm scale (not 0.95 - too dramatic)
      visible: 1.0,    // Natural size
    },
    
    // Hover scales (warm and inviting)
    hover: {
      default: 1.02,   // Subtle scale (not 1.1 - too dramatic)
      large: 1.05,     // For special interactive elements
    },
    
    // Focus scales (reliable and immediate)
    focus: {
      default: 1.01,   // Very subtle scale for immediate feedback
    },
    
    // Page transition scales (experienced and professional)
    page: {
      initial: 0.99,   // Barely noticeable scale
      animate: 1.0,    // Natural size
      exit: 0.99,      // Symmetric exit
    },
  },
  
  // Movement tokens for consistent positioning
  movement: {
    // Vertical movements (welcoming and warm)
    y: {
      micro: 2,        // Very small movements (focus states)
      small: 8,        // Small movements (page transitions)
      medium: 16,      // Medium movements (content reveals)
      large: 24,       // Large movements (hero elements)
    },
    
    // Horizontal movements (experienced and professional)
    x: {
      micro: 4,        // Very small movements
      small: 8,        // Small movements
      medium: 16,      // Medium movements
      large: 32,       // Large movements
    },
  },
  
  // Brand Animation Patterns - Standardized for consistency
  patterns: {
    // Standard brand entrance (welcoming and warm)
    entrance: {
      hidden: { 
        opacity: 0, 
        y: 16, 
        scale: 0.98 
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1
      }
    },
    
    // Hover animations (warm and inviting)
    hover: {
      whileHover: { 
        scale: 1.02, 
        y: -2
      }
    },
    
    // Focus animations (reliable and immediate)
    focus: {
      whileFocus: { 
        scale: 1.01
      }
    },
    
    // Page transitions (experienced and professional)
    pageTransition: {
      initial: { 
        opacity: 0, 
        y: 8, 
        scale: 0.99 
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      },
      exit: { 
        opacity: 0, 
        y: -8, 
        scale: 0.99 
      }
    },
    
    // Content reveal (welcoming and genuine)
    contentReveal: {
      hidden: { 
        opacity: 0, 
        y: 16, 
        scale: 0.98 
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1
      }
    },
    
    // Staggered reveals (warm and welcoming)
    staggeredReveal: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1
      }
    },
    
    // Opacity-only stagger (clean and subtle)
    opacityStagger: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    
    // Micro interactions (reliable and efficient)
    microInteraction: {
      whileHover: { 
        scale: 1.02
      },
      whileTap: { 
        scale: 0.98
      }
    },
  },
  
  // Glassmorphism page transition tokens
  glassmorphism: {
    // Overlay styling
    overlay: {
      background: 'rgba(245, 245, 245, 0.95)',     // background.primary with 95% opacity for better visibility
      backdropBlur: '24px',                        // Strong blur for premium feel
      borderRadius: '0px',                         // No radius for full-screen overlay
    },
    
    // Three-phase timing (total: 1.2s)
    timing: {
      slideIn: 0.48,      // Phase 1: Overlay slides in (medium duration)
      pause: 0.24,        // Phase 2: Brief pause (short duration)
      slideOut: 0.48,     // Phase 3: Overlay slides out (medium duration)
      total: 1.20,        // Total transition time
    },
    
    // Animation variants for the overlay
    overlay_variants: {
      initial: {
        y: '100%',                    // Start below viewport
        opacity: 1,
      },
      covering: {
        y: '0%',                      // Cover the screen
        opacity: 1,
        transition: {
          duration: 0.48,
          ease: [0.25, 0.90, 0.30, 1] as [number, number, number, number],
        }
      },
      exit: {
        y: '-100%',                   // Exit above viewport
        opacity: 1,
        transition: {
          duration: 0.48,
          ease: [0.25, 0.90, 0.30, 1] as [number, number, number, number],
          delay: 0.24,                  // Pause duration
        }
      }
    },
    
    // Content variants (hidden during transition)
    content_variants: {
      hidden: {
        opacity: 0,
        y: 8,
        scale: 0.99,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.48,
          ease: [0.25, 0.90, 0.30, 1] as [number, number, number, number],
          delay: 0.72,                  // After overlay covers + pause
        }
      }
    }
  },

  // Component-specific animation patterns
  components: {
    // Navigation & Layout
    navigation: {
      mobileMenu: {
        closed: { x: "100%", opacity: 0, scale: 0.98 },
        open: { x: 0, opacity: 1, scale: 1 }
      },
      
      pageTransition: {
        initial: { opacity: 0, y: 8, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.99 }
      }
    },
    
    // Form & Interactive Elements
    form: {
      button: {
        hover: { scale: 1.02, y: -2 },
        focus: { scale: 1.01 },
        tap: { scale: 0.98 }
      },
      
      input: {
        focus: { scale: 1.01 }
      },
      
      dropdown: {
        closed: { opacity: 0, y: -8, scale: 0.98 },
        open: { opacity: 1, y: 0, scale: 1 }
      }
    },
    
    // Content & Cards
    content: {
      card: {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        hover: { scale: 1.02, y: -2 }
      },
      
      image: {
        hidden: { opacity: 0, scale: 1.1 },
        visible: { opacity: 1, scale: 1 }
      },
      
      text: {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 }
      }
    },
    
    // Modals & Overlays
    modal: {
      overlay: {
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
        visible: { opacity: 1, backdropFilter: "blur(8px)" },
        exit: { opacity: 0, backdropFilter: "blur(0px)" }
      },
      
      content: {
        hidden: { opacity: 0, scale: 0.98, y: 8 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: -8 }
      }
    },
    
    // Multi-step forms
    multiStep: {
      step: {
        enter: { y: 8, opacity: 0 },
        center: { y: 0, opacity: 1 },
        exit: { y: -8, opacity: 0 }
      },
      
      content: {
        hidden: { opacity: 0, y: 12 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04
          }
        }
      }
    },
    
    // Carousel & Sliders
    carousel: {
      slide: {
        // No variants needed for carousel slides
      },
      
      content: {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 }
      }
    }
  },
  
  // Performance optimization tokens
  performance: {
    // Hardware acceleration hints
    willChange: {
      transform: "transform",
      opacity: "opacity",
      auto: "auto"
    },
    
    // Viewport settings for scroll reveals
    viewport: {
      once: true,
      amount: 0.15,        // 15% visible triggers animation
      margin: "0px 0px -100px 0px"  // 100px bottom margin
    },
    
    // Layout animation settings
    layout: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  
  // Accessibility tokens
  accessibility: {
    // Reduced motion alternatives
    reducedMotion: {
      duration: 0.1,       // Very fast for reduced motion
      scale: 1.0,          // No scale changes
      movement: 0,         // No movement
      opacity: true        // Only opacity changes
    },
    
    // Focus management
    focus: {
      ring: "2px solid rgba(29, 71, 71, 0.1)",
      offset: "2px"
    }
  },
  
  // Legacy variants (deprecated - use patterns instead)
  variants: {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    },
    slideUpLarge: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -16 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 16 },
      visible: { opacity: 1, x: 0 },
    },
  },
  
  // Legacy transitions (deprecated - use patterns instead)
  transitions: {
    micro: {
      duration: 0.16,
      ease: [0.25, 0.90, 0.30, 1],
    },
    short: {
      duration: 0.28,
      ease: [0.25, 0.90, 0.30, 1],
    },
    medium: {
      duration: 0.48,
      ease: [0.25, 0.90, 0.30, 1],
    },
    long: {
      duration: 0.80,
      ease: [0.25, 0.90, 0.30, 1],
    },
    fade: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Type exports for better TypeScript support
export type MotionTokens = typeof motionTokens;
export type MotionPatterns = typeof motionTokens.patterns;
export type MotionComponents = typeof motionTokens.components;
export type MotionPerformance = typeof motionTokens.performance;
export type MotionAccessibility = typeof motionTokens.accessibility;

// Legacy type exports (deprecated)
export type MotionVariants = typeof motionTokens.variants;
export type MotionTransitions = typeof motionTokens.transitions;

// Utility functions for common animation operations
export const motionUtils = {
  // Create reduced motion alternatives
  createReducedMotion: (normal: Record<string, unknown>, reduced: Record<string, unknown>) => {
    return {
      ...normal,
      reduced: reduced
    };
  },
  
  // Create staggered children variants
  createStaggered: (staggerDelay: number = 0.08, childVariants: Record<string, unknown>) => {
    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.04
        }
      },
      children: childVariants
    };
  },
  
  // Create responsive animation variants
  createResponsive: (mobile: Record<string, unknown>, tablet: Record<string, unknown>, desktop: Record<string, unknown>) => {
    return {
      mobile,
      tablet,
      desktop
    };
  }
};
