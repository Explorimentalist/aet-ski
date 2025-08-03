// src/components/CardSmall.test.tsx
import { render, screen } from '@testing-library/react';
import { CardSmall } from './CardSmall';
import { Shield } from 'lucide-react';

describe('CardSmall Component', () => {
  const defaultProps = {
    icon: Shield,
    title: 'Test Card',
    description: 'This is a test description for the card.',
  };

  it('should render with default grid variant', () => {
    render(<CardSmall {...defaultProps} />);
    
    const card = screen.getByText('Test Card').closest('div');
    expect(card).toHaveClass('col-mobile-4', 'tablet:col-tablet-3', 'desktop:col-desktop-3');
  });

  it('should render with flex variant without grid classes', () => {
    render(<CardSmall {...defaultProps} variant="flex" />);
    
    const card = screen.getByText('Test Card').closest('div');
    expect(card).not.toHaveClass('col-mobile-4', 'tablet:col-tablet-3', 'desktop:col-desktop-3');
  });

  it('should render the icon', () => {
    render(<CardSmall {...defaultProps} />);
    
    // The icon should be rendered as an SVG element
    const iconContainer = screen.getByText('Test Card').closest('div')?.querySelector('div[class*="bg-brand-primary"]');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should render title and description', () => {
    render(<CardSmall {...defaultProps} />);
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the card.')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<CardSmall {...defaultProps} className="custom-class" />);
    
    const card = screen.getByText('Test Card').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('should have correct base styling', () => {
    render(<CardSmall {...defaultProps} />);
    
    const card = screen.getByText('Test Card').closest('div');
    expect(card).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'bg-background-secondary',
      'rounded-xl',
      'min-h-[240px]',
      'w-[300px]'
    );
  });
}); 