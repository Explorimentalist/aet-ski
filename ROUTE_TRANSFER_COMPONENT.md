# RouteTransfer Component

A reusable component for displaying transfer information with stats, description, and map visualization.

## Features

- **Responsive Grid Layout**: Uses the design system's grid layout with proper breakpoints
- **Transfer Stats**: Displays departure, distance, ETA, and cost information
- **Typography**: Follows the established design system typography patterns
- **Map Integration**: Supports Mapbox or any map image integration
- **Flexible Content**: Adaptable for different transfer routes and information

## Grid Layout Specifications

### Desktop (1440px+)
- **Heading**: 3 columns (columns 1-3)
- **Transfer Stats**: 6 columns (columns 4-9)
- **Transfer Description**: 6 columns (columns 4-9)
- **Map Image**: 8 columns (columns 5-12)

### Tablet (768px+)
- **Heading**: 3 columns (columns 1-3)
- **Transfer Stats**: 5 columns (columns 4-8)
- **Transfer Description**: 5 columns (columns 4-8)
- **Map Image**: 8 columns (full width)

### Mobile (380px+)
- **Heading**: 4 columns (full width)
- **Transfer Stats**: 4 columns (full width)
- **Transfer Description**: 4 columns (full width)
- **Map Image**: 4 columns (full width)

## Usage

```tsx
import { RouteTransfer } from '@/components/RouteTransfer';

<RouteTransfer
  heading="Lyon"
  transferStats={{
    departure: "Lyon Airport",
    distance: "200 km",
    eta: "Over 2 hours after departure",
    cost: "€€€€€"
  }}
  transferDescription="The majority of the transfer is via motorway. there can be a great deal of traffic during the month of February and peak holiday times throughout Europe where journey times can be significantly longer."
  mapImageSrc="/path/to/map-image.jpg"
  mapImageAlt="Map showing transfer route from Lyon Airport to ski resorts"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `heading` | `string` | Yes | The transfer location heading (e.g., "Lyon", "Geneva") |
| `transferStats` | `TransferStats` | Yes | Object containing transfer statistics |
| `transferDescription` | `string` | Yes | Detailed description of the transfer |
| `mapImageSrc` | `string` | Yes | URL of the map image |
| `mapImageAlt` | `string` | Yes | Alt text for accessibility |

### TransferStats Interface

```tsx
interface TransferStats {
  departure: string;  // e.g., "Lyon Airport"
  distance: string;   // e.g., "200 km"
  eta: string;        // e.g., "Over 2 hours after departure"
  cost: string;       // e.g., "€€€€€"
}
```

## Styling

The component uses the following design system patterns:

- **Typography**: 
  - **Heading**: GT Walsheim Trial, 36px, bold, proper tracking
  - **Labels**: Geist, 12px, normal weight, proper line height and tracking
  - **Values**: Geist, 16px, bold weight, proper line height and tracking
  - **Description**: Geist, 16px, medium weight, proper line height and tracking

- **Colors**: `text-text-primary` (#4F5B62) for all text
- **Spacing**: 61px gap between transfer stats items on tablet/desktop
- **Border Radius**: `rounded-xl` for map images
- **Layout**: Responsive flex layout for transfer stats

## Transfer Stats Layout

The transfer stats are displayed in a horizontal layout with:
- **Mobile**: Stacked vertically
- **Tablet/Desktop**: Horizontal layout with 61px gaps
- **Items**: Departure from, Distance, ETA, Cost

Each stat item contains:
- **Label**: 12px, normal weight, Geist font
- **Value**: 16px, bold weight, Geist font
- **Spacing**: 4px gap between label and value

## Example Transfer Routes

### Lyon
- **Departure**: Lyon Airport
- **Distance**: 200 km
- **ETA**: Over 2 hours after departure
- **Cost**: €€€€€

### Geneva
- **Departure**: Geneva Airport
- **Distance**: 135 km
- **ETA**: Over 2 hours after departure
- **Cost**: €€€

### Chambery
- **Departure**: Chambery Airport
- **Distance**: 120 km
- **ETA**: Under 1:30 hour after departure
- **Cost**: €€

### Grenoble
- **Departure**: Grenoble Airport
- **Distance**: 190 km
- **ETA**: over 2:15 hours after departure
- **Cost**: €€€€

## Test Page

Visit `/test-route-transfer` to see the component in action with multiple transfer examples.

## Integration with Mapbox

For actual map integration, replace the `mapImageSrc` with Mapbox static images or embed Mapbox components:

```tsx
// Example with Mapbox static image
mapImageSrc={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+1D4747(${longitude},${latitude})/${longitude},${latitude},10,0/600x400?access_token=${MAPBOX_TOKEN}`}
```

## Design System Compliance

- ✅ Uses existing Tailwind classes and design tokens
- ✅ No custom CSS - all styling via Tailwind
- ✅ Follows established typography patterns
- ✅ Uses proper grid system for responsive layout
- ✅ Maintains consistent spacing and colors 