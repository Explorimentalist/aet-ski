// src/types/index.ts

// Design token types
export interface DesignToken {
  value: string | number;
  type: string;
  description?: string;
  attributes?: Record<string, unknown>;
}

export interface DesignTokens {
  meta: {
    version: string;
    project: string;
    description: string;
    created: string;
    lastModified: string;
    author: string;
    baseUnit: string;
  };
  tokens: {
    grid: {
      breakpoints: Record<string, DesignToken>;
      columns: Record<string, DesignToken>;
      margins: Record<string, DesignToken>;
      gaps: Record<string, DesignToken>;
    };
    spacing: Record<string, DesignToken>;
    color: {
      brand: Record<string, DesignToken>;
      background: Record<string, DesignToken>;
      text: Record<string, DesignToken>;
      border: Record<string, DesignToken>;
      state: Record<string, DesignToken>;
      shadow: Record<string, DesignToken>;
    };
    typography: {
      fontFamily: Record<string, DesignToken>;
      fontSize: Record<string, DesignToken>;
      fontWeight: Record<string, DesignToken>;
      lineHeight: Record<string, DesignToken>;
      letterSpacing: Record<string, DesignToken>;
    };
    borderRadius: Record<string, DesignToken>;
    size: {
      icon: Record<string, DesignToken>;
      input: Record<string, DesignToken>;
      button: Record<string, DesignToken>;
      progress: Record<string, DesignToken>;
    };
    elevation: Record<string, DesignToken>;
    animation: {
      duration: Record<string, DesignToken>;
      easing: Record<string, DesignToken>;
    };
    layout: {
      component: Record<string, Record<string, DesignToken>>;
      span: Record<string, Record<string, DesignToken>>;
    };
  };
  components: Record<string, Record<string, { consumes: string[] }>>;
}

// Booking form types
export interface BookingFormData {
  journey: {
    type: 'one-way' | 'return';
    collectionPoint: string;
    destinationPoint: string;
    returnDate?: string;
    returnTime?: string;
  };
  dates: {
    collectionDate: string;
    collectionTime: string;
    isFlexible: boolean;
  };
  people: {
    adults: number;
    children: number;
  };
  luggage: {
    skis: number;
    snowboards: number;
    suitcases: number;
    extraItems: string[];
  };
  passenger: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

// Route types
export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  price: {
    base: number;
    currency: string;
  };
  description: string;
  imageUrl: string;
  coordinates: {
    from: [number, number];
    to: [number, number];
  };
}

// Testimonial types
export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  route?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props types
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface InputProps {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

// Sanity CMS types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// MapTiler types
export interface MapConfig {
  apiKey: string;
  style: string;
  center: [number, number];
  zoom: number;
}

// Environment variables types
export interface EnvironmentVariables {
  NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  NEXT_PUBLIC_SANITY_DATASET: string;
  SANITY_API_TOKEN: string;
  NEXT_PUBLIC_MAPTILER_API_KEY: string;
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavigationProps {
  items?: NavigationItem[];
  showCTA?: boolean;
  className?: string;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

// Utility types
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CategorizedOption {
  type: 'category' | 'subcategory' | 'option';
  label: string;
  value?: string;
  icon?: 'airport' | 'hotel' | 'train' | 'train-station' | 'ski-resort';
  children?: CategorizedOption[];
  disabled?: boolean;
} 