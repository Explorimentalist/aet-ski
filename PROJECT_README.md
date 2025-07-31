# AET Ski - Next.js Project

> **Alpine Airport Transfers Website**  
> Built with Next.js, TypeScript, Tailwind CSS, and Design Tokens

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd aet-ski

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with the following variables:
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# MapTiler Configuration
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🏗️ Project Structure

```
aet-ski/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── booking/         # Multi-step booking form
│   │   ├── routes/          # Route pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript definitions
│   └── tests/              # Test files
├── tokens.json             # Design tokens
├── tokens.schema.json      # Token validation schema
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design System

### Design Tokens
The project uses a comprehensive design token system located in `tokens.json`:

- **Colors**: Brand, background, text, and state colors
- **Typography**: Font families, sizes, weights, and spacing
- **Spacing**: 4px base unit system
- **Grid**: Responsive breakpoints and column systems
- **Components**: Pre-defined component configurations

### Tailwind Integration
Design tokens are automatically integrated into Tailwind CSS:

```typescript
// Example usage
<button className="bg-brand-primary hover:bg-brand-primary-hover text-text-inverse">
  Get a quote
</button>
```

## 🧩 Components

### Button Component
```tsx
import { Button } from '@/components/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Get a quote
</Button>
```

### Input Component
```tsx
import { Input } from '@/components/Input';

<Input
  label="Email"
  required
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
/>
```

## 🔧 Custom Hooks

### useBookingForm
Manages the 7-step booking form state:

```tsx
import { useBookingForm } from '@/hooks/useForm';

const { formData, currentStep, nextStep, submitForm } = useBookingForm();
```

### useMap
Handles MapTiler integration:

```tsx
import { useMap } from '@/hooks/useMap';

const { map, isLoaded, addRoute } = useMap('map-container', routes);
```

## 📡 API Integration

### Sanity CMS
```tsx
import { sanityClient, routesQuery } from '@/lib/sanity';

const routes = await sanityClient.fetch(routesQuery);
```

### MapTiler
```tsx
import { initMapTiler, mapConfig } from '@/lib/maptiler';

initMapTiler();
```

### Cloudinary
```tsx
import { uploadImage } from '@/lib/cloudinary';

const imageUrl = await uploadImage(file);
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run cypress
```

### Test Coverage
```bash
npm run test:ci
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Start Production
```bash
npm run start
```

### Environment Setup
1. Set up environment variables on your hosting platform
2. Configure Sanity CMS project
3. Set up MapTiler API key
4. Configure Cloudinary account

## 📱 Responsive Design

The project follows the responsive grid system:

- **Mobile**: ≤380px, 4 columns
- **Tablet**: 381-768px, 8 columns  
- **Desktop**: 769-1440px+, 12 columns

## 🎯 Key Features

- ✅ **Design Token System**: Centralized design values
- ✅ **TypeScript**: Full type safety
- ✅ **Responsive Grid**: Mobile-first approach
- ✅ **Component Library**: Reusable UI components
- ✅ **Form Management**: Multi-step booking form
- ✅ **Map Integration**: Interactive route maps
- ✅ **CMS Integration**: Sanity content management
- ✅ **Image Optimization**: Cloudinary integration
- ✅ **Testing Setup**: Jest and Cypress
- ✅ **Performance**: Optimized builds

## 🔄 Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature
   # Make changes
   npm run lint
   npm run test
   git commit -m "feat: add new feature"
   ```

2. **Code Quality**
   - ESLint for code linting
   - TypeScript for type checking
   - Prettier for code formatting

3. **Testing**
   - Unit tests with Jest
   - E2E tests with Cypress
   - Visual regression testing

## 📚 Documentation

- [Design Tokens](./README.md) - Design system documentation
- [PRD](./prd.md) - Product requirements document
- [Component Library](./src/components/) - UI component documentation

## 🤝 Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Use conventional commits

## 📄 License

This project is proprietary to AET - Alps en route Transfers.

---

*Built with ❤️ for alpine transportation experiences* 