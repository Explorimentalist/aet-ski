// src/utils/resizeObserver.test.ts

import {
  PortalDropdownResizeObserver,
  WindowResizeObserver,
  supportsResizeObserver,
  isSignificantViewportChange,
  getDeviceOrientation,
  isMobileDevice,
} from './resizeObserver';

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  
  constructor(public callback: ResizeObserverCallback) {}
  
  // Helper method to trigger resize events in tests
  triggerResize(entries: ResizeObserverEntry[]) {
    this.callback(entries, this);
  }
}

// Mock window properties
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  visualViewport: {
    width: 1024,
    height: 768,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
};

const mockNavigator = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  maxTouchPoints: 0,
};

describe('resizeObserver utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Setup window mock (only if not already defined)
    if (!global.window) {
      Object.defineProperty(global, 'window', {
        value: mockWindow,
        writable: true,
        configurable: true,
      });
    } else {
      Object.assign(global.window, mockWindow);
    }
    
    if (!global.navigator) {
      Object.defineProperty(global, 'navigator', {
        value: mockNavigator,
        writable: true,
        configurable: true,
      });
    } else {
      Object.assign(global.navigator, mockNavigator);
    }
    
    // Mock ResizeObserver globally
    global.ResizeObserver = MockResizeObserver as typeof ResizeObserver;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('PortalDropdownResizeObserver', () => {
    it('should initialize with default config', () => {
      const callback = jest.fn();
      const observer = new PortalDropdownResizeObserver(callback);
      
      expect(observer).toBeDefined();
      expect(MockResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should observe and unobserve elements', () => {
      const callback = jest.fn();
      const observer = new PortalDropdownResizeObserver(callback);
      const element = document.createElement('div');
      
      observer.observe(element);
      expect(MockResizeObserver.prototype.observe).toHaveBeenCalledWith(element);
      
      observer.unobserve(element);
      expect(MockResizeObserver.prototype.unobserve).toHaveBeenCalledWith(element);
    });

    it('should call callback when significant resize occurs', () => {
      const callback = jest.fn();
      new PortalDropdownResizeObserver(callback);
      const mockObserver = MockResizeObserver.mock.instances[0] as MockResizeObserver;
      
      const entries: ResizeObserverEntry[] = [{
        target: document.createElement('div'),
        contentRect: { width: 300, height: 200 } as DOMRectReadOnly,
        borderBoxSize: [] as ResizeObserverSize[],
        contentBoxSize: [] as ResizeObserverSize[],
        devicePixelContentBoxSize: [] as ResizeObserverSize[],
      }];
      
      mockObserver.triggerResize(entries);
      
      // Should be debounced
      expect(callback).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalled();
    });

    it('should not call callback for insignificant changes', () => {
      const callback = jest.fn();
      new PortalDropdownResizeObserver(callback, { threshold: 20 });
      const mockObserver = MockResizeObserver.mock.instances[0] as MockResizeObserver;
      
      // First resize to establish baseline
      const entries1: ResizeObserverEntry[] = [{
        target: document.createElement('div'),
        contentRect: { width: 300, height: 200 } as DOMRectReadOnly,
        borderBoxSize: [] as ResizeObserverSize[],
        contentBoxSize: [] as ResizeObserverSize[],
        devicePixelContentBoxSize: [] as ResizeObserverSize[],
      }];
      
      mockObserver.triggerResize(entries1);
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);
      
      // Small change below threshold
      const entries2: ResizeObserverEntry[] = [{
        target: document.createElement('div'),
        contentRect: { width: 305, height: 205 } as DOMRectReadOnly, // 5px change < 20px threshold
        borderBoxSize: [] as ResizeObserverSize[],
        contentBoxSize: [] as ResizeObserverSize[],
        devicePixelContentBoxSize: [] as ResizeObserverSize[],
      }];
      
      mockObserver.triggerResize(entries2);
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1); // No additional call
    });

    it('should disconnect properly', () => {
      const callback = jest.fn();
      const observer = new PortalDropdownResizeObserver(callback);
      
      observer.disconnect();
      
      expect(MockResizeObserver.prototype.disconnect).toHaveBeenCalled();
    });
  });

  describe('WindowResizeObserver', () => {
    it('should setup window event listeners', () => {
      const callback = jest.fn();
      new WindowResizeObserver(callback);
      
      expect(mockWindow.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
        { passive: true }
      );
      expect(mockWindow.addEventListener).toHaveBeenCalledWith(
        'orientationchange',
        expect.any(Function)
      );
    });

    it('should setup visual viewport listeners when available', () => {
      const callback = jest.fn();
      new WindowResizeObserver(callback);
      
      expect(mockWindow.visualViewport.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });

    it('should handle window resize events', () => {
      const callback = jest.fn();
      new WindowResizeObserver(callback, { threshold: 50 });
      
      // Get the resize handler
      const resizeHandler = mockWindow.addEventListener.mock.calls
        .find(call => call[0] === 'resize')?.[1];
      
      expect(resizeHandler).toBeDefined();
      
      // Simulate window resize
      Object.defineProperty(window, 'innerWidth', { value: 1200 });
      Object.defineProperty(window, 'innerHeight', { value: 800 });
      
      resizeHandler();
      
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalled();
    });

    it('should handle orientation change events', () => {
      const callback = jest.fn();
      new WindowResizeObserver(callback);
      
      // Get the orientation change handler
      const orientationHandler = mockWindow.addEventListener.mock.calls
        .find(call => call[0] === 'orientationchange')?.[1];
      
      expect(orientationHandler).toBeDefined();
      
      // Simulate orientation change
      orientationHandler();
      
      // Should have a slight delay for orientation change
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalled();
    });

    it('should cleanup event listeners on disconnect', () => {
      const callback = jest.fn();
      const observer = new WindowResizeObserver(callback);
      
      observer.disconnect();
      
      expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
      expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
        'orientationchange',
        expect.any(Function)
      );
    });
  });

  describe('utility functions', () => {
    describe('supportsResizeObserver', () => {
      it('should return true when ResizeObserver is available', () => {
        expect(supportsResizeObserver()).toBe(true);
      });

      it('should return false when ResizeObserver is not available', () => {
        const originalResizeObserver = global.ResizeObserver;
        delete (global as Record<string, unknown>).ResizeObserver;
        
        expect(supportsResizeObserver()).toBe(false);
        
        global.ResizeObserver = originalResizeObserver;
      });

      it('should return false in SSR environment', () => {
        const originalWindow = global.window;
        delete (global as Record<string, unknown>).window;
        
        expect(supportsResizeObserver()).toBe(false);
        
        global.window = originalWindow;
      });
    });

    describe('isSignificantViewportChange', () => {
      it('should return true for changes above threshold', () => {
        const oldDimensions = { width: 1000, height: 800 };
        const newDimensions = { width: 1100, height: 900 }; // 100px change
        
        const result = isSignificantViewportChange(oldDimensions, newDimensions, 50);
        expect(result).toBe(true);
      });

      it('should return false for changes below threshold', () => {
        const oldDimensions = { width: 1000, height: 800 };
        const newDimensions = { width: 1005, height: 805 }; // 5px change
        
        const result = isSignificantViewportChange(oldDimensions, newDimensions, 10);
        expect(result).toBe(false);
      });

      it('should use default threshold when not provided', () => {
        const oldDimensions = { width: 1000, height: 800 };
        const newDimensions = { width: 1015, height: 815 }; // 15px change
        
        const result = isSignificantViewportChange(oldDimensions, newDimensions);
        expect(result).toBe(true); // Default threshold is 10px
      });
    });

    describe('getDeviceOrientation', () => {
      it('should return landscape for wide viewports', () => {
        Object.defineProperty(window, 'innerWidth', { value: 1024 });
        Object.defineProperty(window, 'innerHeight', { value: 768 });
        
        expect(getDeviceOrientation()).toBe('landscape');
      });

      it('should return portrait for tall viewports', () => {
        Object.defineProperty(window, 'innerWidth', { value: 768 });
        Object.defineProperty(window, 'innerHeight', { value: 1024 });
        
        expect(getDeviceOrientation()).toBe('portrait');
      });

      it('should return portrait in SSR environment', () => {
        const originalWindow = global.window;
        delete (global as Record<string, unknown>).window;
        
        expect(getDeviceOrientation()).toBe('portrait');
        
        global.window = originalWindow;
      });
    });

    describe('isMobileDevice', () => {
      it('should return true for small viewports', () => {
        Object.defineProperty(window, 'innerWidth', { value: 600 });
        
        expect(isMobileDevice()).toBe(true);
      });

      it('should return true for mobile user agents', () => {
        Object.defineProperty(navigator, 'userAgent', {
          value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        });
        
        expect(isMobileDevice()).toBe(true);
      });

      it('should return true for devices with touch support', () => {
        Object.defineProperty(navigator, 'maxTouchPoints', { value: 5 });
        
        expect(isMobileDevice()).toBe(true);
      });

      it('should return false for desktop devices', () => {
        Object.defineProperty(window, 'innerWidth', { value: 1200 });
        Object.defineProperty(navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        });
        Object.defineProperty(navigator, 'maxTouchPoints', { value: 0 });
        
        expect(isMobileDevice()).toBe(false);
      });

      it('should return false in SSR environment', () => {
        const originalWindow = global.window;
        delete (global as Record<string, unknown>).window;
        
        expect(isMobileDevice()).toBe(false);
        
        global.window = originalWindow;
      });
    });
  });
});