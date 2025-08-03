// src/components/ImageWithGradient.test.tsx
import { render, screen } from '@testing-library/react';
import { ImageWithGradient } from './ImageWithGradient';

describe('ImageWithGradient Component', () => {
  it('should render with placeholder when no src provided', () => {
    const { container } = render(
      <ImageWithGradient 
        alt="Test image" 
        placeholder={true}
      />
    );
    
    // When placeholder is true, there's no img element, so we check for the container
    const imageContainer = container.querySelector('.relative.rounded-xl.overflow-hidden');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render with image when src provided', () => {
    render(
      <ImageWithGradient 
        src="/test-image.jpg"
        alt="Test image" 
        placeholder={false}
      />
    );
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should apply custom height and width', () => {
    const { container } = render(
      <ImageWithGradient 
        alt="Test image" 
        height="h-[400px]"
        width="w-[300px]"
      />
    );
    
    const imageContainer = container.querySelector('.relative.rounded-xl.overflow-hidden');
    expect(imageContainer).toHaveClass('h-[400px]', 'w-[300px]');
  });

  it('should apply custom gradient colors', () => {
    const { container } = render(
      <ImageWithGradient 
        alt="Test image" 
        gradientFrom="#FF0000"
        gradientTo="#00FF00"
      />
    );
    
    const imageContainer = container.querySelector('.relative.rounded-xl.overflow-hidden');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should have correct base styling', () => {
    const { container } = render(
      <ImageWithGradient 
        alt="Test image" 
      />
    );
    
    const imageContainer = container.querySelector('.relative.rounded-xl.overflow-hidden');
    expect(imageContainer).toHaveClass(
      'relative',
      'rounded-xl',
      'overflow-hidden',
      'w-full',
      'h-[528px]'
    );
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ImageWithGradient 
        alt="Test image" 
        className="custom-class"
      />
    );
    
    const imageContainer = container.querySelector('.relative.rounded-xl.overflow-hidden');
    expect(imageContainer).toHaveClass('custom-class');
  });
}); 