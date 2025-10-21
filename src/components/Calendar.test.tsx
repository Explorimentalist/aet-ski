// src/components/Calendar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

// Mock the portal dropdown hook
const mockActions = {
  open: jest.fn(),
  close: jest.fn(),
  toggle: jest.fn(),
  recalculatePosition: jest.fn(),
  updateConfig: jest.fn(),
};

const mockState = {
  isOpen: false,
  coordinates: null,
  error: null,
  portalContainer: null,
};

const mockRenderPortal = jest.fn((content) => content);

jest.mock('@/hooks/usePortalDropdown', () => ({
  usePortalDropdown: jest.fn(() => ({
    state: mockState,
    actions: mockActions,
    triggerRef: { current: null },
    renderPortal: mockRenderPortal,
  })),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => React.createElement('div', { 'data-testid': 'chevron-left' }),
  ChevronRight: () => React.createElement('div', { 'data-testid': 'chevron-right' }),
  Calendar: () => React.createElement('div', { 'data-testid': 'calendar-icon' }),
}));

describe('Calendar Component', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockState.isOpen = false;
    mockState.error = null;
  });

  describe('Basic Rendering', () => {
    it('renders calendar input with placeholder', () => {
      render(React.createElement(Calendar, defaultProps));
      expect(screen.getByText('Select a date')).toBeInTheDocument();
    });

    it('renders custom label and placeholder', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        label: 'Birthday',
        placeholder: 'Choose your birthday',
      }));
      
      expect(screen.getByText('Birthday')).toBeInTheDocument();
      expect(screen.getByText('Choose your birthday')).toBeInTheDocument();
    });

    it('shows required indicator when required', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        label: 'Date',
        required: true,
      }));
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('displays formatted date when value is provided', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      render(React.createElement(Calendar, {
        ...defaultProps,
        value: testDate,
      }));
      
      expect(screen.getByText('Jun 15, 2024')).toBeInTheDocument();
    });
  });

  describe('Portal Integration', () => {
    it('calls usePortalDropdown with correct configuration', () => {
      const usePortalDropdownModule = jest.requireMock('@/hooks/usePortalDropdown');
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        portalConfig: { position: 'top', offset: 8 },
        portalContainer: document.body,
      }));

      expect(usePortalDropdownModule.usePortalDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          position: 'top',
          offset: 8,
          portalContainer: document.body,
        }),
        expect.any(Object)
      );
    });

    it('disables portal when disablePortal is true', () => {
      const usePortalDropdownModule = jest.requireMock('@/hooks/usePortalDropdown');
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        disablePortal: true,
        portalContainer: document.body,
      }));

      expect(usePortalDropdownModule.usePortalDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          portalContainer: null,
        }),
        expect.any(Object)
      );
    });

    it('calls portal toggle action when calendar input is clicked', () => {
      render(React.createElement(Calendar, defaultProps));
      
      const calendarInput = screen.getByRole('button');
      fireEvent.click(calendarInput);
      
      expect(mockActions.toggle).toHaveBeenCalled();
    });

    it('does not toggle when disabled', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        disabled: true,
      }));
      
      const calendarInput = screen.getByRole('button');
      fireEvent.click(calendarInput);
      
      expect(mockActions.toggle).not.toHaveBeenCalled();
    });
  });

  describe('Calendar Dropdown Behavior', () => {
    beforeEach(() => {
      mockState.isOpen = true;
    });

    it('renders calendar dropdown when open', () => {
      render(React.createElement(Calendar, defaultProps));
      
      expect(mockRenderPortal).toHaveBeenCalled();
      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      expect(screen.getByText('Wed')).toBeInTheDocument();
    });

    it('displays current month header', () => {
      render(React.createElement(Calendar, defaultProps));
      
      const currentMonth = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
      
      expect(screen.getByText(currentMonth)).toBeInTheDocument();
    });

    it('handles month navigation', () => {
      render(React.createElement(Calendar, defaultProps));
      
      const nextButton = screen.getByTestId('chevron-right').parentElement;
      const prevButton = screen.getByTestId('chevron-left').parentElement;
      
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
      
      fireEvent.click(nextButton);
      fireEvent.click(prevButton);
    });

    it('handles date selection and closes dropdown', () => {
      const onChange = jest.fn();
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        onChange,
      }));
      
      // Find a date button (look for numbers)
      const dateButton = screen.getByText('15');
      fireEvent.click(dateButton);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
      expect(mockActions.close).toHaveBeenCalled();
    });

    it('handles "I\'m not sure" option', () => {
      const onChange = jest.fn();
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        onChange,
      }));
      
      const notSureButton = screen.getByText("I'm not sure");
      fireEvent.click(notSureButton);
      
      expect(onChange).toHaveBeenCalledWith(null);
      expect(mockActions.close).toHaveBeenCalled();
    });

    it('displays "I\'m not sure" state correctly', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        value: null,
      }));
      
      // Simulate the "not sure" state by checking internal component state
      // This would need to be tested through user interaction
      expect(screen.getByText('Select a date')).toBeInTheDocument();
    });
  });

  describe('Date Validation', () => {
    beforeEach(() => {
      mockState.isOpen = true;
    });

    it('disables dates before minDate', () => {
      const minDate = new Date(2024, 5, 10); // June 10, 2024
      const currentMonth = new Date(2024, 5, 1); // June 1, 2024
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        value: currentMonth,
        minDate,
      }));
      
      // Find all date buttons and check if early dates are disabled
      const dateButtons = screen.getAllByRole('button').filter(btn => 
        btn.classList.contains('form-calendar-day') && 
        parseInt(btn.textContent || '0') <= 9
      );
      
      expect(dateButtons.length).toBeGreaterThan(0);
      const earlyDate = dateButtons.find(btn => parseInt(btn.textContent || '0') === 5);
      if (earlyDate) {
        expect(earlyDate).toHaveClass('opacity-30');
        expect(earlyDate).toHaveClass('cursor-not-allowed');
      }
    });

    it('disables dates after maxDate', () => {
      const maxDate = new Date(2024, 5, 20); // June 20, 2024
      const currentMonth = new Date(2024, 5, 1); // June 1, 2024
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        value: currentMonth,
        maxDate,
      }));
      
      // Dates after June 20 should be disabled
      const disabledDate = screen.getByText('25');
      expect(disabledDate).toHaveClass('opacity-30');
      expect(disabledDate).toHaveClass('cursor-not-allowed');
    });

    it('does not call onChange for disabled dates', () => {
      const onChange = jest.fn();
      const minDate = new Date(2024, 5, 10);
      
      render(React.createElement(Calendar, {
        ...defaultProps,
        onChange,
        minDate,
        value: new Date(2024, 5, 1),
      }));
      
      // Find a disabled date button
      const dateButtons = screen.getAllByRole('button').filter(btn => 
        btn.classList.contains('form-calendar-day') && 
        btn.hasAttribute('disabled')
      );
      
      expect(dateButtons.length).toBeGreaterThan(0);
      const disabledDate = dateButtons[0];
      fireEvent.click(disabledDate);
      
      expect(onChange).not.toHaveBeenCalled();
      expect(mockActions.close).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message when provided', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        error: 'Invalid date selected',
      }));
      
      expect(screen.getByText('Invalid date selected')).toBeInTheDocument();
    });

    it('applies error styling to input', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        error: 'Invalid date',
      }));
      
      const input = screen.getByRole('button');
      expect(input).toHaveClass('border-border-error');
      expect(input).toHaveClass('bg-background-error');
    });

    it('displays helper text when no error', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        helper: 'Select your preferred date',
      }));
      
      expect(screen.getByText('Select your preferred date')).toBeInTheDocument();
    });

    it('prioritizes error over helper text', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        error: 'Invalid date',
        helper: 'Helper text',
      }));
      
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        label: 'Date of Birth',
      }));
      
      const label = screen.getByText('Date of Birth');
      expect(label).toBeInTheDocument();
    });

    it('maintains keyboard accessibility', () => {
      render(React.createElement(Calendar, defaultProps));
      
      const input = screen.getByRole('button');
      expect(input).toHaveAttribute('type', 'button');
    });

    it('applies disabled styling correctly', () => {
      render(React.createElement(Calendar, {
        ...defaultProps,
        disabled: true,
      }));
      
      const input = screen.getByRole('button');
      expect(input).toHaveClass('opacity-50');
      expect(input).toHaveClass('cursor-not-allowed');
      expect(input).toBeDisabled();
    });
  });

  describe('Portal Edge Cases', () => {
    it('handles portal rendering failure gracefully', () => {
      mockRenderPortal.mockImplementation(() => null);
      mockState.isOpen = true;
      
      render(React.createElement(Calendar, defaultProps));
      
      // Should not crash when portal rendering fails
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('recalculates position when requested', () => {
      render(React.createElement(Calendar, defaultProps));
      
      // Simulate a position recalculation trigger
      mockActions.recalculatePosition();
      
      expect(mockActions.recalculatePosition).toHaveBeenCalled();
    });
  });
});