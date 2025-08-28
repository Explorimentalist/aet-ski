# Brand Animation Library - AET Ski Website

## Overview

This library provides standardized, brand-aligned animation patterns for the AET Ski website. All animations are designed to reflect the brand attributes: **Genuine, Reliable, Warm, Welcoming, and Experienced**.

## Quick Start

```typescript
import { motionTokens } from '@/motion/tokens';

// Use standardized patterns
<motion.div
  variants={motionTokens.patterns.entrance}
  initial="hidden"
  whileInView="visible"
  viewport={motionTokens.performance.viewport}
>
  Your content here
</motion.div>
```

## Brand Animation Principles

### 1. **Genuine** → Smooth, reliable animations (no glitches)
- Use consistent timing with motion tokens
- Implement proper error handling and fallbacks

### 2. **Reliable** → Consistent timing and behavior
- All animations use standardized duration and easing
- Predictable performance across all components

### 3. **Warm** → Gentle, welcoming motion (not harsh or jarring)
- Subtle scale changes (0.98 → 1.0, not 0.95 → 1.0)
- Gentle vertical movements (y: 16px, not 32px)

### 4. **Welcoming** → Inviting entrance animations
- Content rises gently from below
- Smooth opacity transitions
- Staggered reveals for groups

### 5. **Experienced** → Professional, polished feel
- 60fps performance target
- Hardware-accelerated transforms
- Proper accessibility support

## Usage Examples

### Basic Content Reveal

```typescript
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';

export const AnimatedSection = ({ children }) => (
  <motion.section
    variants={motionTokens.patterns.entrance}
    initial="hidden"
    whileInView="visible"
    viewport={motionTokens.performance.viewport}
  >
    {children}
  </motion.section>
);
```

### Button with Hover Effects

```typescript
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';

export const AnimatedButton = ({ children, ...props }) => (
  <motion.button
    {...motionTokens.patterns.hover}
    {...motionTokens.patterns.focus}
    {...props}
  >
    {children}
  </motion.button>
);
```

### Staggered List Items

```typescript
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';

export const AnimatedList = ({ items }) => (
  <motion.ul
    variants={motionTokens.patterns.staggeredReveal}
    initial="hidden"
    whileInView="visible"
    viewport={motionTokens.performance.viewport}
  >
    {items.map((item, index) => (
      <motion.li
        key={item.id}
        variants={motionTokens.patterns.entrance}
      >
        {item.content}
      </motion.li>
    ))}
  </motion.ul>
);
```

### Page Transitions

```typescript
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';

export const PageWrapper = ({ children }) => (
  <motion.div
    variants={motionTokens.patterns.pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);
```

### Modal Animations

```typescript
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';

export const AnimatedModal = ({ isOpen, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Overlay */}
        <motion.div
          variants={motionTokens.components.modal.overlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="overlay"
        />
        
        {/* Content */}
        <motion.div
          variants={motionTokens.components.modal.content}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="modal-content"
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

## Component-Specific Patterns

### Navigation & Layout

```typescript
// Mobile menu
<motion.nav
  variants={motionTokens.components.navigation.mobileMenu}
  animate={isOpen ? "open" : "closed"}
/>

// Page transitions
<motion.main
  variants={motionTokens.components.navigation.pageTransition}
  key={pathname}
/>
```

### Form Elements

```typescript
// Button interactions
<motion.button
  {...motionTokens.components.form.button}
/>

// Input focus states
<motion.input
  {...motionTokens.components.form.input}
/>

// Dropdown animations
<motion.div
  variants={motionTokens.components.form.dropdown}
  animate={isOpen ? "open" : "closed"}
/>
```

### Content & Cards

```typescript
// Card animations
<motion.div
  variants={motionTokens.components.content.card}
  initial="hidden"
  whileInView="visible"
  whileHover="hover"
/>

// Image reveals
<motion.img
  variants={motionTokens.components.content.image}
  initial="hidden"
  whileInView="visible"
/>
```

## Performance Optimization

### Hardware Acceleration

```typescript
// Use transform properties for hardware acceleration
<motion.div
  style={{ willChange: motionTokens.performance.willChange.transform }}
  animate={{ x: 100 }}
/>
```

### Viewport Optimization

```typescript
// Optimize scroll reveals
<motion.div
  viewport={motionTokens.performance.viewport}
  whileInView="visible"
/>
```

### Layout Animations

```typescript
// Smooth layout changes
<motion.div
  layout
  transition={motionTokens.performance.layout}
>
  {children}
</motion.div>
```

## Accessibility

### Reduced Motion Support

```typescript
import { useReducedMotion } from 'motion/react';

export const AccessibleAnimation = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return (
      <div className="instant-transition">
        {children}
      </div>
    );
  }
  
  return (
    <motion.div
      variants={motionTokens.patterns.entrance}
      initial="hidden"
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
};
```

### Focus Management

```typescript
// Ensure animations don't interfere with focus
<motion.button
  {...motionTokens.patterns.focus}
  style={{
    outline: motionTokens.accessibility.focus.ring,
    outlineOffset: motionTokens.accessibility.focus.offset
  }}
>
  Click me
</motion.button>
```

## Migration Guide

### From Legacy Variants

```typescript
// Old way
<motion.div variants={motionTokens.variants.slideUp} />

// New way
<motion.div variants={motionTokens.patterns.entrance} />
```

### From Legacy Transitions

```typescript
// Old way
transition={motionTokens.transitions.medium}

// New way
variants={motionTokens.patterns.entrance}
```

## Best Practices

1. **Always use patterns** instead of custom variants
2. **Leverage component-specific patterns** for complex animations
3. **Use performance tokens** for optimization
4. **Implement accessibility** with reduced motion support
5. **Test on low-end devices** to ensure 60fps performance
6. **Use viewport optimization** for scroll-triggered animations

## Troubleshooting

### Common Issues

1. **Animation not working**: Check if you're using the correct pattern
2. **Performance issues**: Ensure you're using transform properties
3. **Accessibility problems**: Implement reduced motion alternatives
4. **Timing inconsistencies**: Use motion tokens instead of custom values

### Debug Mode

```typescript
// Enable debug mode for development
<motion.div
  variants={motionTokens.patterns.entrance}
  initial="hidden"
  whileInView="visible"
  onAnimationStart={() => console.log('Animation started')}
  onAnimationComplete={() => console.log('Animation completed')}
/>
```

## Contributing

When adding new animation patterns:

1. **Follow brand principles** (Genuine, Reliable, Warm, Welcoming, Experienced)
2. **Use consistent timing** from motion tokens
3. **Implement accessibility** with reduced motion support
4. **Test performance** on low-end devices
5. **Document usage** with examples

---

*This library ensures every animation on the AET Ski website feels like it belongs to the same brand family.*

