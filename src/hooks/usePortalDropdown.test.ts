// src/hooks/usePortalDropdown.test.ts

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { usePortalDropdown, useSimplePortalDropdown } from './usePortalDropdown';
import * as positioning from '@/utils/positioning';
import * as resizeObserver from '@/utils/resizeObserver';

// Mock dependencies
jest.mock('react-dom', () => ({
  createPortal: jest.fn((children) => children),
}));

jest.mock('@/utils/positioning');
jest.mock('@/utils/resizeObserver');

const mockedPositioning = positioning as jest.Mocked<typeof positioning>;
const mockedResizeObserver = resizeObserver as jest.Mocked<typeof resizeObserver>;

// Mock DOM elements
const mockTriggerElement = {
  getBoundingClientRect: jest.fn(() => ({
    top: 100,
    bottom: 140,
    left: 200,
    right: 400,
    width: 200,
    height: 40,
  })),
} as unknown as HTMLElement;

const mockPortalContainer = document.createElement('div');

// Mock ResizeObserver classes
class MockWindowResizeObserver {
  disconnect = jest.fn();
}

class MockPortalDropdownResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

describe('usePortalDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockedPositioning.getPortalContainer.mockReturnValue(mockPortalContainer);
    mockedPositioning.calculateDropdownCoordinates.mockReturnValue({
      x: 200,
      y: 144,
      position: 'bottom',
      maxHeight: 300,
    });
    mockedPositioning.calculateZIndex.mockReturnValue(70);
    
    mockedResizeObserver.WindowResizeObserver = MockWindowResizeObserver as typeof MockWindowResizeObserver;
    mockedResizeObserver.PortalDropdownResizeObserver = MockPortalDropdownResizeObserver as typeof MockPortalDropdownResizeObserver;
    mockedResizeObserver.supportsResizeObserver.mockReturnValue(true);
    mockedResizeObserver.isMobileDevice.mockReturnValue(false);
    mockedResizeObserver.getDeviceOrientation.mockReturnValue('landscape');

    // Mock document body
    Object.defineProperty(document, 'body', {
      value: mockPortalContainer,
      writable: true,
    });
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => usePortalDropdown());

      expect(result.current.state).toMatchObject({
        isOpen: false,
        coordinates: null,
        shouldOpenUpward: false,
        portalContainer: mockPortalContainer,
        error: null,
      });
    });

    it('should merge custom config with defaults', () => {
      const customConfig = {
        position: 'top' as const,
        offset: 10,
        zIndex: 80,
      };

      renderHook(() => usePortalDropdown(customConfig));

      expect(mockedPositioning.calculateDropdownCoordinates).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining(customConfig)
      );
    });
  });

  describe('actions', () => {
    it('should open dropdown and calculate position', () => {
      const { result } = renderHook(() => usePortalDropdown());
      
      // Set up trigger ref
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
      });

      act(() => {
        result.current.actions.open();
      });

      expect(result.current.state.isOpen).toBe(true);
      expect(mockedPositioning.calculateDropdownCoordinates).toHaveBeenCalledWith(
        mockTriggerElement,
        expect.any(Object)
      );
    });

    it('should close dropdown', () => {
      const { result } = renderHook(() => usePortalDropdown());
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
        result.current.actions.open();
      });

      act(() => {
        result.current.actions.close();
      });

      expect(result.current.state.isOpen).toBe(false);
    });

    it('should toggle dropdown state', () => {
      const { result } = renderHook(() => usePortalDropdown());
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
      });

      // Toggle open
      act(() => {
        result.current.actions.toggle();
      });
      expect(result.current.state.isOpen).toBe(true);

      // Toggle closed
      act(() => {
        result.current.actions.toggle();
      });
      expect(result.current.state.isOpen).toBe(false);
    });

    it('should recalculate position manually', () => {
      const { result } = renderHook(() => usePortalDropdown());
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
      });

      act(() => {
        result.current.actions.recalculatePosition();
      });

      expect(mockedPositioning.calculateDropdownCoordinates).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle missing trigger element', () => {
      const onError = jest.fn();
      const { result } = renderHook(() => 
        usePortalDropdown({}, { onError })
      );

      act(() => {
        result.current.actions.open();
      });

      expect(result.current.state.error).toBe('TRIGGER_ELEMENT_NOT_FOUND');
      expect(onError).toHaveBeenCalledWith(
        'TRIGGER_ELEMENT_NOT_FOUND',
        'Trigger element not found'
      );
    });

    it('should handle missing portal container', () => {
      mockedPositioning.getPortalContainer.mockReturnValue(null);
      
      const { result } = renderHook(() => usePortalDropdown());
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
      });

      const content = React.createElement('div', null, 'Test content');
      const rendered = result.current.renderPortal(content);

      expect(result.current.state.error).toBe('PORTAL_CONTAINER_NOT_FOUND');
      // Should fallback to inline rendering
      expect(rendered).toMatchObject({
        type: 'div',
        props: { className: 'relative' },
      });
    });

    it('should handle positioning calculation errors', () => {
      mockedPositioning.calculateDropdownCoordinates.mockImplementation(() => {
        throw new Error('Calculation failed');
      });

      const onError = jest.fn();
      const { result } = renderHook(() => 
        usePortalDropdown({}, { onError })
      );

      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
        result.current.actions.open();
      });

      expect(result.current.state.error).toBe('POSITIONING_CALCULATION_FAILED');
      expect(onError).toHaveBeenCalledWith(
        'POSITIONING_CALCULATION_FAILED',
        expect.stringContaining('Position calculation failed')
      );
    });
  });

  describe('resize handling', () => {
    it('should setup resize observers when enabled', () => {
      renderHook(() => usePortalDropdown({ enableResize: true }));

      expect(MockWindowResizeObserver).toHaveBeenCalled();
      expect(MockPortalDropdownResizeObserver).toHaveBeenCalled();
    });

    it('should not setup resize observers when disabled', () => {
      renderHook(() => usePortalDropdown({ enableResize: false }));

      expect(MockWindowResizeObserver).not.toHaveBeenCalled();
      expect(MockPortalDropdownResizeObserver).not.toHaveBeenCalled();
    });

    it('should cleanup resize observers on unmount', () => {
      const { unmount } = renderHook(() => usePortalDropdown({ enableResize: true }));
      
      const windowObserverInstance = MockWindowResizeObserver.mock.instances[0];
      const elementObserverInstance = MockPortalDropdownResizeObserver.mock.instances[0];

      unmount();

      expect(windowObserverInstance.disconnect).toHaveBeenCalled();
      expect(elementObserverInstance.disconnect).toHaveBeenCalled();
    });
  });

  describe('portal rendering', () => {
    it('should render content through portal when container available', () => {
      const { result } = renderHook(() => usePortalDropdown());
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
        result.current.actions.open();
      });

      const content = React.createElement('div', null, 'Test content');
      result.current.renderPortal(content);

      expect(createPortal).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            style: expect.objectContaining({
              position: 'fixed',
              left: 200,
              top: 144,
              zIndex: 70,
            }),
          }),
        }),
        mockPortalContainer
      );
    });

    it('should render inline when portal is disabled', () => {
      const { result } = renderHook(() => 
        usePortalDropdown({ portalContainer: null })
      );

      const content = React.createElement('div', null, 'Test content');
      const rendered = result.current.renderPortal(content);

      expect(createPortal).not.toHaveBeenCalled();
      expect(rendered).toMatchObject({
        type: 'div',
        props: { className: 'relative' },
      });
    });

    it('should handle portal rendering errors gracefully', () => {
      (createPortal as jest.Mock).mockImplementation(() => {
        throw new Error('Portal failed');
      });

      const onError = jest.fn();
      const { result } = renderHook(() => 
        usePortalDropdown({}, { onError })
      );
      
      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
        result.current.actions.open();
      });

      const content = React.createElement('div', null, 'Test content');
      const rendered = result.current.renderPortal(content);

      expect(result.current.state.error).toBe('PORTAL_RENDERING_FAILED');
      expect(onError).toHaveBeenCalledWith(
        'PORTAL_RENDERING_FAILED',
        expect.stringContaining('Portal rendering failed')
      );
      
      // Should fallback to inline rendering
      expect(rendered).toMatchObject({
        type: 'div',
        props: { className: 'relative' },
      });
    });
  });

  describe('event handlers', () => {
    it('should call event handlers at appropriate times', () => {
      const eventHandlers = {
        onOpen: jest.fn(),
        onClose: jest.fn(),
        onPositionChange: jest.fn(),
      };

      const { result } = renderHook(() => 
        usePortalDropdown({}, eventHandlers)
      );

      act(() => {
        result.current.triggerRef.current = mockTriggerElement;
      });

      // Test open event
      act(() => {
        result.current.actions.open();
      });
      expect(eventHandlers.onOpen).toHaveBeenCalled();
      expect(eventHandlers.onPositionChange).toHaveBeenCalledWith({
        x: 200,
        y: 144,
        position: 'bottom',
        maxHeight: 300,
      });

      // Test close event
      act(() => {
        result.current.actions.close();
      });
      expect(eventHandlers.onClose).toHaveBeenCalled();
    });
  });

  describe('mobile device handling', () => {
    beforeEach(() => {
      mockedResizeObserver.isMobileDevice.mockReturnValue(true);
    });

    it('should use mobile-optimized settings', () => {
      renderHook(() => usePortalDropdown({ enableResize: true }));

      expect(MockWindowResizeObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 5, // More sensitive threshold for mobile
        })
      );
    });
  });
});

describe('useSimplePortalDropdown', () => {
  it('should return simplified interface', () => {
    const { result } = renderHook(() => useSimplePortalDropdown());

    expect(result.current).toMatchObject({
      isOpen: false,
      open: expect.any(Function),
      close: expect.any(Function),
      toggle: expect.any(Function),
      triggerRef: expect.any(Object),
      renderPortal: expect.any(Function),
      shouldOpenUpward: false,
    });

    // Should not expose internal state or complex actions
    expect(result.current).not.toHaveProperty('state');
    expect(result.current).not.toHaveProperty('actions');
    expect(result.current).not.toHaveProperty('dropdownRef');
  });

  it('should work with basic operations', () => {
    const { result } = renderHook(() => useSimplePortalDropdown());

    act(() => {
      result.current.triggerRef.current = mockTriggerElement;
    });

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });
});