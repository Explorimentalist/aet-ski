// src/components/Navigation.test.tsx
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { usePathname } from 'next/navigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('Navigation Component', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    mockUsePathname.mockClear();
  });

  it('should highlight Home when on home page', () => {
    mockUsePathname.mockReturnValue('/');
    
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-[#1E1E1E]', 'underline');
  });

  it('should highlight Routes when on routes page', () => {
    mockUsePathname.mockReturnValue('/routes');
    
    render(<Navigation />);
    
    const routesLink = screen.getByText('Routes');
    expect(routesLink).toHaveClass('text-[#1E1E1E]', 'underline');
  });

  it('should highlight Contact when on contact page', () => {
    mockUsePathname.mockReturnValue('/contact');
    
    render(<Navigation />);
    
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toHaveClass('text-[#1E1E1E]', 'underline');
  });

  it('should not highlight Home when on other pages', () => {
    mockUsePathname.mockReturnValue('/routes');
    
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-text-form');
    expect(homeLink).not.toHaveClass('text-[#1E1E1E]', 'underline');
  });

  it('should respect explicit isActive prop when provided', () => {
    mockUsePathname.mockReturnValue('/contact');
    
    const customItems = [
      { id: 'home', label: 'Home', href: '/', isActive: true },
      { id: 'routes', label: 'Routes', href: '/routes' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ];
    
    render(<Navigation items={customItems} />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-[#1E1E1E]', 'underline');
  });
}); 