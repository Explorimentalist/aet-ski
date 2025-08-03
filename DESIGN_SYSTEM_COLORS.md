# Design System Color Guide

## Overview

This document outlines the correct usage of colors in the AET Ski Transfer design system. The color system has been corrected to ensure proper semantic usage across the application.

## Color Token Definitions

### Text Colors

| Token | Value | Usage | Description |
|-------|-------|-------|-------------|
| `text-primary` | `#4F5B62` | **Headings & Body Copy** | Primary text color for all headings, paragraphs, and body text |
| `text-form` | `#4F5B62` | **Form Elements** | Text color for form labels, inputs, and form-related content |
| `text-secondary` | `#757575` | **Helper Text** | Secondary text for descriptions, helper text, and less important content |
| `text-placeholder` | `#B3B7BB` | **Placeholders** | Text color for input placeholders |
| `text-disabled` | `#B3B7BB` | **Disabled States** | Text color for disabled elements |
| `text-inverse` | `#FFFFFF` | **Dark Backgrounds** | Text color for use on dark backgrounds |
| `text-error` | `#E53935` | **Error Messages** | Text color for error messages and validation |
| `text-brand` | `#1D4747` | **Interactive Elements** | Brand color for hover states, buttons, and CTAs |

### Brand Colors

| Token | Value | Usage | Description |
|-------|-------|-------|-------------|
| `brand-primary` | `#1D4747` | **Primary Buttons** | Main brand color for primary buttons and CTAs |
| `brand-primary-hover` | `#0C2626` | **Button Hover** | Hover state for primary buttons |
| `brand-primary-active` | `#0C2626` | **Button Active** | Active/pressed state for primary buttons |
| `brand-primary-focus` | `rgba(29, 71, 71, 0.1)` | **Focus Rings** | Focus ring color for primary elements |

## Correct Usage Guidelines

### ✅ DO Use

#### For Headings and Body Copy:
```tsx
// Main headings
<h1 className="text-text-form">Page Title</h1>
<h2 className="text-text-form">Section Title</h2>
<h3 className="text-text-form">Subsection Title</h3>

// Body text
<p className="text-text-form">Regular paragraph text</p>
<p className="text-text-secondary">Helper or secondary text</p>
```

#### For Form Elements:
```tsx
// Form labels
<label className="text-text-form">Field Label</label>

// Form inputs
<input className="text-text-form placeholder:text-text-placeholder" />

// Form descriptions
<p className="text-text-secondary">Field description</p>
```

#### For Buttons and CTAs:
```tsx
// Primary buttons (use brand colors directly)
<button className="bg-brand-primary text-white hover:bg-brand-primary-hover">
  Get a quote
</button>

// Secondary buttons
<button className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
  Learn more
</button>
```

#### For Icons and Interactive Elements:
```tsx
// Icons should use standard text color by default
<CalendarIcon className="text-text-form" />
<Clock className="text-text-form" />
<Menu className="text-text-form" />

// Hover states use brand color for interactive feedback
<button className="text-text-secondary hover:text-text-brand">
  Edit
</button>
```

### ❌ DON'T Use

#### Avoid using brand colors for regular text:
```tsx
// ❌ WRONG - Using brand color for headings
<h1 className="text-text-brand">Page Title</h1>

// ✅ CORRECT - Using proper text color
<h1 className="text-text-form">Page Title</h1>
```

#### Avoid using primary text color for buttons:
```tsx
// ❌ WRONG - Using text color for button
<button className="bg-text-primary text-white">
  Get a quote
</button>

// ✅ CORRECT - Using brand color for button
<button className="bg-brand-primary text-white">
  Get a quote
</button>
```

## Component-Specific Guidelines

### Navigation
- **Logo**: Use `text-text-brand`
- **Menu items**: Use `text-text-form` with `hover:text-text-brand`
- **Icons**: Use `text-text-form` (standard text color)

### Forms
- **Labels**: Use `text-text-form`
- **Inputs**: Use `text-text-form` with `placeholder:text-text-placeholder`
- **Helper text**: Use `text-text-secondary`
- **Error messages**: Use `text-text-error`
- **Required indicators**: Use `text-text-error`

### Cards and Content
- **Card titles**: Use `text-text-form`
- **Card descriptions**: Use `text-text-form`
- **Section headings**: Use `text-text-form`
- **Body text**: Use `text-text-form`

### Buttons
- **Primary buttons**: Use `bg-brand-primary text-white`
- **Secondary buttons**: Use `border-brand-primary text-brand-primary`
- **Disabled buttons**: Use `bg-text-disabled text-text-disabled`

## Color Accessibility

### Contrast Ratios
- **Text on white background**: `#4F5B62` provides excellent contrast
- **Brand color on white**: `#1D4747` provides good contrast
- **White text on brand background**: `#FFFFFF` on `#1D4747` provides excellent contrast

### Color Blindness Considerations
- The design uses sufficient contrast ratios for color-blind users
- Information is not conveyed solely through color
- Interactive elements have clear visual indicators

## Implementation Notes

### Tailwind Classes
The color system is implemented using Tailwind CSS classes:

```tsx
// Text colors
text-text-form        // #4F5B62 - Primary text
text-text-secondary   // #757575 - Secondary text
text-text-brand       // #1D4747 - Brand text
text-text-error       // #E53935 - Error text

// Brand colors
bg-brand-primary      // #1D4747 - Primary background
text-brand-primary    // #1D4747 - Brand text color
```

### Token Mapping
The design tokens are mapped to Tailwind classes in `tailwind.config.ts`:

```typescript
colors: {
  text: {
    primary: '#4F5B62',    // text-text-primary
    form: '#4F5B62',       // text-text-form
    brand: '#1D4747',      // text-text-brand
    // ... other colors
  },
  brand: {
    primary: '#1D4747',    // bg-brand-primary, text-brand-primary
    // ... other brand colors
  }
}
```

## Migration Guide

If you're updating existing components, follow these rules:

1. **Replace `text-text-primary` with `text-text-form`** for headings and body text
2. **Keep `text-text-primary` as `text-text-brand`** for icons and interactive elements
3. **Use `bg-brand-primary` and `text-brand-primary`** for buttons and CTAs
4. **Test contrast ratios** after making changes

## Testing

To verify correct color usage:

1. **Visual inspection**: Check that headings use `#4F5B62` not `#1D4747`
2. **Accessibility testing**: Use browser dev tools to check contrast ratios
3. **Component testing**: Verify buttons use brand colors, text uses text colors
4. **Cross-browser testing**: Ensure colors render consistently

## Common Mistakes to Avoid

1. **Using brand color for headings** - This makes text too dark and heavy
2. **Using text color for buttons** - This makes buttons look like regular text
3. **Using brand color for icons** - Icons should use standard text color unless they're interactive
4. **Inconsistent hover states** - Always use brand colors for interactive elements
5. **Poor contrast ratios** - Always test accessibility

## Resources

- **Figma Design**: Reference the original design for color usage
- **Tailwind Config**: `tailwind.config.ts` for implementation details
- **Design Tokens**: `tokens.json` for token definitions
- **Accessibility Guidelines**: WCAG 2.1 AA compliance requirements 