# Motion Implementation - AET Ski Website

## **Current Status - Phase 3 Ready** 🚀

### **Phase 1 - Core Layout & Navigation** ✅ **COMPLETED**
- ✅ **`layout.tsx`** - Page transitions with AnimatePresence
- ✅ **`Navigation.tsx`** - Mobile menu open/close animations  
- ✅ **`SideNavigation.tsx`** - Smooth accordion transitions
- ✅ **Brand Animation Library** - Comprehensive motion tokens and patterns created

### **Phase 2 - User Experience Components** ✅ **COMPLETED**
- ✅ **`Modal.tsx`** - Brand-consistent entrance/exit animations applied
- ✅ **`MultiStepForm.tsx`** - Brand-consistent step transitions applied
- ✅ **`PageHero.tsx`** - Brand-consistent content reveal animations applied
- ✅ **`Footer.tsx`** - Brand-consistent scroll-triggered reveal animations applied
- ✅ **`FormNavigation.tsx`** - Brand-consistent navigation button animations applied

### **Phase 3 - Main Page Components** 🔥 **READY TO IMPLEMENT**
- [ ] **`PageHeroHome.tsx`** - Apply brand-consistent hero animations
- [ ] **`TestimonialsCarousel.tsx`** - Apply brand-consistent carousel animations
- [ ] **`MarqueeRebrand.tsx`** - Apply brand-consistent marquee animations
- [ ] **`RouteTransfer.tsx`** - Apply brand-consistent content reveal animations
- [ ] **`LinksList.tsx`** - Apply brand-consistent list item animations

### **Brand Animation Library Created** 🎨 **COMPLETE**
- ✅ **Motion Tokens** - Duration, easing, scale, movement, stagger
- ✅ **Brand Patterns** - Entrance, hover, focus, page transitions, content reveal
- ✅ **Component Patterns** - Navigation, forms, content, modals, multi-step forms
- ✅ **Performance Tokens** - Hardware acceleration, viewport optimization
- ✅ **Accessibility Tokens** - Reduced motion support, focus management
- ✅ **Utility Functions** - Reduced motion alternatives, staggered animations
- ✅ **Documentation** - Comprehensive README with usage examples

### **Phase 2 Results** ✨ **STANDARDIZATION COMPLETE**
- **All existing animated components** now use consistent brand patterns
- **Animation timing** standardized across all components
- **Easing curves** unified with brand personality
- **Scale changes** consistent and brand-aligned
- **Movement values** standardized for warm, welcoming feel
- **Performance optimizations** applied consistently
- **Accessibility features** implemented uniformly

### **Component Analysis Completed** 📋
- **Total Components Identified**: 25+ components actually used on the website
- **Components Using Brand Patterns**: Modal, MultiStepForm, PageHero, Footer, FormNavigation
- **Components Needing Brand Patterns**: 20+ components across remaining phases
- **Motion System**: Fully implemented with tokens, reduced motion support, and accessibility features

### **Components Actually Used on Website:**
- **Homepage**: Navigation, Footer, PageHeroHome, TestimonialsCarousel, MarqueeRebrand, CardSmall, ImageWithGradient, CardLarge, Button, Grid, MultiStepForm
- **Routes Page**: Navigation, Footer, PageHero, RouteTransfer, MultiStepForm
- **Contact Page**: Navigation, Footer, MultiStepForm, Input, Textarea, Button, Grid
- **Terms Page**: SideNavigation, Button, Navigation, Footer, MultiStepForm
- **Travel Info Page**: Navigation, Footer, PageHero, LinksList, MultiStepForm
- **Form Steps**: JourneyStep, DatesStep, PeopleStep, LuggageStep, PassengerStep, SummaryStep, SuccessStep
- **Form Elements**: Select, Calendar, TimeSelector, NumberInput, Textarea, Input
- **Layout**: Grid, LocalBusinessSchema

### **Next Steps**
1. **✅ Phase 1 Complete** - Brand animation library created
2. **✅ Phase 2 Complete** - All existing animated components standardized
3. **🔥 Phase 3 Ready** - Apply brand patterns to main page components
4. **Implement Phase 4** - Content and card components
5. **Add Phase 5** - Form and interactive elements
6. **Optimize Phase 6 & 7** - Form steps and utility components

---

## **Components Requiring Motion Implementation**

### **Phase 1 - Core Layout & Navigation** (🔥 **High Priority**)
- [x] **`layout.tsx`** - Page transitions with AnimatePresence ✅
- [x] **`Navigation.tsx`** - Mobile menu open/close animations ✅
- [ ] **`SideNavigation.tsx`** - Smooth accordion transitions (used in Terms page)

### **Phase 2 - User Experience Components** (🔥 **High Priority**)
- [x] **`Modal.tsx`** - Entrance/exit animations with overlay fade ✅
- [x] **`MultiStepForm.tsx`** - Step transitions with stagger effects ✅
- [x] **`PageHero.tsx`** - Hero content reveal animations ✅
- [ ] **`Footer.tsx`** - Scroll-triggered reveal animations (used on all pages)
- [x] **`FormNavigation.tsx`** - Navigation button animations and transitions ✅

### **Phase 3 - Main Page Components** (🟡 **Medium Priority**)
- [ ] **`PageHeroHome.tsx`** - Home-specific hero animations (used on homepage)
- [ ] **`TestimonialsCarousel.tsx`** - Enhanced carousel animations (used on homepage)
- [ ] **`MarqueeRebrand.tsx`** - Smooth marquee scrolling (used on homepage)
- [ ] **`RouteTransfer.tsx`** - Content sections reveal (used on routes page)
- [ ] **`LinksList.tsx`** - List item stagger animations (used on travel-info page)

### **Phase 4 - Content & Card Components** (🟡 **Medium Priority**)
- [ ] **`CardLarge.tsx`** - Enhanced hover + reveal animations (used for testimonials)
- [ ] **`CardSmall.tsx`** - Hover animations (used on homepage and routes)
- [ ] **`ImageWithGradient.tsx`** - Image reveal with clip-path animations (used on homepage)
- [ ] **`Logo.tsx`** - Logo reveal and hover animations (used in navigation)

### **Phase 5 - Form & Interactive Elements** (🟡 **Medium Priority**)
- [ ] **`Button.tsx`** - Hover underline animations with layout transitions (used throughout)
- [ ] **`Input.tsx`** - Focus state animations (used in contact form)
- [ ] **`Select.tsx`** - Enhanced dropdown animations (used in form steps)
- [ ] **`Calendar.tsx`** - Date picker animations (used in form steps)
- [ ] **`TimeSelector.tsx`** - Time picker dropdown animations (used in form steps)
- [ ] **`Textarea.tsx`** - Focus and resize animations (used in forms)
- [ ] **`NumberInput.tsx`** - Increment/decrement button animations (used in form steps)

### **Phase 6 - Form Step Components** (🟡 **Medium Priority**)
- [ ] **`JourneyStep.tsx`** - Form field reveal and validation animations
- [ ] **`DatesStep.tsx`** - Date picker and calendar animations
- [ ] **`PeopleStep.tsx`** - Counter button animations
- [ ] **`LuggageStep.tsx`** - Luggage type selection animations
- [ ] **`PassengerStep.tsx`** - Form field focus and validation animations
- [ ] **`SummaryStep.tsx`** - Summary reveal and edit button animations
- [ ] **`SuccessStep.tsx`** - Success message and button animations

### **Phase 7 - Utility Components** (🟢 **Lower Priority**)
- [ ] **`Grid.tsx`** - Layout animations for responsive transitions (used throughout)
- [ ] **`LocalBusinessSchema.tsx`** - Schema markup reveal animations (used in layout)

---

## **Implementation Approach**

### **Data Attributes System:**
- `data-reveal="slideUp|fade|scale|slideLeft|slideRight"`
- `data-stagger="xs|sm|md"`
- `data-modal="true"` for modal-specific animations

### **Progressive Enhancement:**
- Light animations for basic interactions
- Enhanced animations for key user flows
- Reduced motion compliance for accessibility

### **Performance Strategy:**
- Tree-shake motion components
- Lazy load non-critical animations
- Use `will-change` sparingly

---

## **Brand Animation Style Guide** 🎨

### **Brand Attributes & Animation Principles:**
- **Genuine** → Smooth, reliable animations (no glitches)
- **Reliable** → Consistent timing and behavior  
- **Warm** → Gentle, welcoming motion (not harsh or jarring)
- **Welcoming** → Inviting entrance animations
- **Experienced** → Professional, polished feel

### **TL;DR — Recommended Defaults for Your aet.ski System:**
- **General motion (brand personality)**: `cubic-bezier(0.25, 0.9, 0.3, 1)` → snappy + warm settle
- **Fades/opacity-only**: `ease-in-out` → subtle and unnoticeable  
- **Micro interactions (hover/focus)**: `cubic-bezier(0.3, 0, 0.7, 1)` → quick and efficient
- **Optional playful micro delight**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (light spring) → use sparingly

### **Standard Animation Patterns:**

#### **A. Entrance Animations (Brand: Welcoming)**
```typescript
const brandEntrance = {
  hidden: { 
    opacity: 0, 
    y: 16,        // Gentle rise from below
    scale: 0.98   // Subtle scale for warmth
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: motionTokens.d.medium,  // 0.48s - not too fast, not too slow
      ease: motionTokens.e.brand        // Brand-specific easing
    }
  }
};
```

#### **B. Hover Animations (Brand: Warm)**
```typescript
const brandHover = {
  whileHover: { 
    scale: 1.02,           // Subtle scale (not 1.1 - too dramatic)
    y: -2,                 // Gentle lift
    transition: {
      duration: motionTokens.d.short,   // 0.28s - responsive feel
      ease: motionTokens.e.brand
    }
  }
};
```

#### **C. Focus Animations (Brand: Reliable)**
```typescript
const brandFocus = {
  whileFocus: { 
    scale: 1.01,           // Very subtle scale
    transition: {
      duration: motionTokens.d.micro,   // 0.16s - immediate feedback
      ease: motionTokens.e.brand
    }
  }
};
```

#### **D. Page Transitions (Brand: Experienced)**
```typescript
const brandPageTransition = {
  initial: { 
    opacity: 0, 
    y: 8,                 // Minimal movement
    scale: 0.99           // Barely noticeable scale
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1 
  },
  exit: { 
    opacity: 0, 
    y: -8,                // Symmetric exit
    scale: 0.99 
  },
  transition: {
    duration: motionTokens.d.long,      // 0.8s - smooth, not rushed
    ease: motionTokens.e.brand
  }
};
```

---

## **Implementation Strategy & Consistency** 🔄

### **Phase 1: Standardize Existing Animations**
- Audit current motion components (TestimonialsCarousel, MultiStepForm, Modal, PageHero)
- Apply consistent timing using motion tokens
- Fix performance issues (like carousel blurring after movement)
- Ensure brand-consistent easing curves

### **Phase 2: Apply Brand Patterns to New Components**
- Use standardized entrance patterns for all components
- Implement consistent hover behaviors across interactive elements
- Apply brand-specific easing everywhere
- Create reusable animation variants

### **Phase 3: Create Reusable Animation Components**
- `BrandAnimatedCard` component with consistent patterns
- Standardized motion variants for common use cases
- Consistent transition patterns across all components
- Performance-optimized animation hooks

---

## **Technical Implementation Details** ⚙️

### **Motion Library Choice:**
- **Current**: Using `motion` package (v12.23.12) - already installed
- **Benefits**: Hybrid engine (hardware accelerated + JavaScript), tree-shakable
- **Performance**: 60fps target, hardware-accelerated transforms
- **Accessibility**: Built-in reduced motion support

### **Performance Standards:**
- **Target**: 60fps for all animations
- **Transforms**: Use `transform` instead of individual properties
- **Hardware acceleration**: Leverage `will-change` sparingly
- **Tree-shaking**: Import only needed motion features

### **Accessibility Compliance:**
- **Reduced motion**: Use `useReducedMotion()` hook
- **Fallbacks**: Provide instant transitions when motion is disabled
- **Focus management**: Ensure animations don't interfere with keyboard navigation
- **Screen readers**: Maintain proper ARIA states during animations

---

## **Motion Tokens Reference** (Updated)

```typescript
// Duration tokens (from tokens.json)
d.micro: 0.16s    // Hovers, micro-interactions
d.short: 0.28s    // UI transitions  
d.medium: 0.48s   // Modals, sections
d.long: 0.80s     // Page transitions

// Easing tokens (Updated with brand defaults)
e.brand: [0.25, 0.90, 0.30, 1]        // Brand personality: snappy + warm settle
e.fade: "ease-in-out"                   // Fades: subtle and unnoticeable
e.micro: [0.3, 0, 0.7, 1]              // Micro interactions: quick and efficient
e.playful: [0.34, 1.56, 0.64, 1]      // Playful delight: use sparingly

// Stagger tokens
stagger.xs: 0.04s  // Tight staggering
stagger.sm: 0.08s  // Default staggering
stagger.md: 0.12s  // Large groups
```

---

## **Component-Specific Animation Patterns**

### **Navigation & Layout:**
```typescript
// Mobile menu open/close
const mobileMenuAnimation = {
  closed: { x: "100%", opacity: 0 },
  open: { x: 0, opacity: 1 },
  transition: { duration: motionTokens.d.short, ease: motionTokens.e.brand }
};

// Page transitions
const pageTransition = {
  initial: { opacity: 0, y: 8, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
  transition: { duration: motionTokens.d.long, ease: motionTokens.e.brand }
};
```

### **Form & Interactive Elements:**
```typescript
// Button hover effects
const buttonHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileFocus: { scale: 1.01 },
  transition: { duration: motionTokens.d.short, ease: motionTokens.e.brand }
};

// Input focus states
const inputFocus = {
  whileFocus: { scale: 1.01 },
  transition: { duration: motionTokens.d.micro, ease: motionTokens.e.micro }
};
```

### **Content Reveal:**
```typescript
// Scroll-triggered reveals
const contentReveal = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: motionTokens.d.medium, ease: motionTokens.e.brand }
};

// Staggered list reveals
const staggeredReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTokens.stagger.sm,
      delayChildren: motionTokens.stagger.xs
    }
  }
};
```

---

## **Testing Strategy**

### **Motion System Tests:**
- ✅ Basic motion functionality
- ✅ Reduced motion compliance
- ✅ Token value accuracy
- ✅ Stagger animations

### **Component Tests:**
- [ ] Navigation animations
- [ ] Modal transitions
- [ ] Form step animations
- [ ] Scroll reveal system
- [ ] Performance benchmarks (60fps target)
- [ ] Accessibility compliance
- [ ] Brand consistency validation

---

## **Performance Optimization Checklist**

### **Animation Performance:**
- [ ] Use `transform` instead of `top`, `left`, `width`, `height`
- [ ] Leverage hardware acceleration with `will-change`
- [ ] Implement proper cleanup for unmounted components
- [ ] Use `layout` prop for automatic layout animations
- [ ] Optimize `whileInView` with appropriate `viewport` settings

### **Bundle Optimization:**
- [ ] Tree-shake motion imports
- [ ] Lazy load non-critical animations
- [ ] Use dynamic imports for heavy animation components
- [ ] Monitor bundle size impact

---

*Last updated: Phase 2 in progress - Brand animation style guide added*