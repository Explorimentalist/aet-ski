# AET-ski Website Redesign

> **Professional airport-to-ski-resort transfer service website**  
> Next.js, Tailwind CSS, and multi-step booking form for the French Alps

## 🎯 Project Overview

AET-ski is a premium one-man taxi service transferring clients from airports to ski resorts in the French Alps. This website redesign focuses on increasing quote conversions and enhancing visual appeal while maintaining the brand attributes of being genuine, reliable, warm, welcoming, and experienced.

### Key Features
- **Multi-step booking form** with dynamic route selection
- **Interactive route maps** using MapTiler integration
- **Responsive design** optimized for all devices
- **Content management** via Sanity CMS
- **Image optimization** with Cloudinary
- **Performance optimized** with Next.js 14

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Lucide Icons** - Beautiful icon library
- **Flag Icons** - Country flag display

### Backend & Services
- **Node.js** - Server-side runtime
- **Sanity CMS** - Headless content management
- **MapTiler** - Interactive maps and routing
- **Cloudinary** - Image and media management

### Development Tools
- **ESLint** - Code linting
- **Jest** - Unit testing
- **Cypress** - E2E testing
- **PostCSS** - CSS processing

## 📁 Project Structure

```
aet-ski/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── booking/           # Multi-step form pages
│   │   ├── routes/            # Dynamic route-map pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── tokens.json               # Design tokens
├── tokens.schema.json        # Token validation schema
└── package.json              # Dependencies & scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Explorimentalist/aet-ski.git
   cd aet-ski
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   
   # MapTiler
   NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_key
   
   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Testing
npm run test         # Run unit tests
npm run test:ci      # Run tests in CI mode
npm run cypress      # Open Cypress E2E tests
npm run cypress:run  # Run Cypress tests headlessly
```

## 🎨 Design System

The project uses a comprehensive design token system for consistency:

### Design Tokens
- **Colors**: Brand-aligned palette with semantic roles
- **Typography**: GT Walsheim Trial (headings) + Geist (body)
- **Spacing**: 4px base unit system
- **Grid**: Responsive 4/8/12 column layouts
- **Components**: Pre-built UI components with token integration

### Component Library
- `Button` - Primary, secondary, and ghost variants
- `Card` - Large and small card layouts
- `Input` - Form inputs with validation states
- `Navigation` - Responsive navigation component
- `Footer` - Site footer with links
- `Logo` - Brand logo component

## 🗺️ Features

### Multi-step Booking Form
- Step 1: Route selection with interactive map
- Step 2: Date and time selection
- Step 3: Passenger details and preferences
- Step 4: Quote generation and confirmation

### Interactive Maps
- Real-time route visualization
- Airport and resort location markers
- Distance and travel time calculations
- Responsive map controls

### Content Management
- Dynamic content via Sanity CMS
- Image optimization with Cloudinary
- SEO-friendly metadata
- Multi-language support ready

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

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup
- **Ionos.fr** - Primary hosting
- **Fasthosts.co.uk** - Secondary hosting
- **GitHub Actions** - CI/CD pipeline

### Deployment Process
1. Push to `main` branch
2. GitHub Actions runs tests and builds
3. Automatic deployment to production servers
4. Health check verification

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for user experience
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Route-based optimization
- **Caching**: Static generation where possible

## 🔧 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Include JSDoc comments for complex functions

### Git Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push branch: `git push origin feature/your-feature`
4. Create pull request for review
5. Merge after approval

### Environment Variables
- Never commit `.env` files
- Use `.env.example` for documentation
- Set production variables in hosting platform
- Validate required variables at build time

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for AET-ski transportation services.

## 🆘 Support

For technical support or questions:
- Create an issue on GitHub
- Contact the development team
- Check the project documentation

---

**Built with ❤️ for AET-ski - Elevating alpine transportation experiences through thoughtful design and technology.** 