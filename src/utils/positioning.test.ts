// src/utils/positioning.test.ts

import {
  getViewportBounds,
  getElementBounds,
  calculateAvailableSpace,
  determineOptimalPosition,
  calculateDropdownCoordinates,
  isElementInViewport,
  isPointInElement,
  debounce,
  getPortalContainer,
  calculateZIndex,
  DEFAULT_PORTAL_CONFIG,
} from './positioning';

// Mock DOM APIs
const mockGetBoundingClientRect = jest.fn();
const mockElement = {
  getBoundingClientRect: mockGetBoundingClientRect,
} as unknown as HTMLElement;

// Mock window dimensions
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
};

// Mock document
const mockDocument = {
  body: document.createElement('div'),
  documentElement: document.createElement('div'),
};

// Setup global mocks
beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: mockWindow.innerWidth,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: mockWindow.innerHeight,
  });
  Object.defineProperty(global, 'document', {
    writable: true,
    configurable: true,
    value: mockDocument,
  });
});

describe('positioning utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBoundingClientRect.mockReturnValue({
      top: 100,
      bottom: 140,
      left: 200,
      right: 400,
      width: 200,
      height: 40,
      x: 200,
      y: 100,
    });
  });

  describe('getViewportBounds', () => {
    it('should return current viewport dimensions', () => {
      const bounds = getViewportBounds();
      expect(bounds).toEqual({
        top: 0,
        bottom: 768,
        left: 0,
        right: 1024,
        width: 1024,
        height: 768,
      });
    });

    it('should return SSR fallback when window is undefined', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const bounds = getViewportBounds();
      expect(bounds).toEqual({
        top: 0,
        bottom: 1024,
        left: 0,
        right: 768,
        width: 768,
        height: 1024,
      });

      global.window = originalWindow;
    });
  });

  describe('getElementBounds', () => {
    it('should return element bounds from getBoundingClientRect', () => {
      const bounds = getElementBounds(mockElement);
      expect(bounds).toEqual({
        top: 100,
        bottom: 140,
        left: 200,
        right: 400,
        width: 200,
        height: 40,
        x: 200,
        y: 100,
      });
    });
  });

  describe('calculateAvailableSpace', () => {
    it('should calculate space around element correctly', () => {
      const elementBounds = {
        top: 100,
        bottom: 140,
        left: 200,
        right: 400,
        width: 200,
        height: 40,
        x: 200,
        y: 100,
      };
      const viewportBounds = getViewportBounds();
      const config = { ...DEFAULT_PORTAL_CONFIG, viewportPadding: 16 };

      const space = calculateAvailableSpace(elementBounds, viewportBounds, config);
      
      expect(space).toEqual({
        above: 84, // 100 - 16
        below: 612, // 768 - 140 - 16
        left: 184, // 200 - 16
        right: 608, // 1024 - 400 - 16
      });
    });
  });

  describe('determineOptimalPosition', () => {
    const elementBounds = {
      top: 100,
      bottom: 140,
      left: 200,
      right: 400,
      width: 200,
      height: 40,
      x: 200,
      y: 100,
    };
    const viewportBounds = getViewportBounds();

    it('should return "bottom" when there is enough space below', () => {
      const config = { ...DEFAULT_PORTAL_CONFIG, maxHeight: 300 };
      const position = determineOptimalPosition(elementBounds, viewportBounds, config);
      expect(position).toBe('bottom');
    });

    it('should return "top" when there is more space above than below', () => {
      const highElementBounds = {
        ...elementBounds,
        top: 600,
        bottom: 640,
      };
      const config = { ...DEFAULT_PORTAL_CONFIG, maxHeight: 300 };
      const position = determineOptimalPosition(highElementBounds, viewportBounds, config);
      expect(position).toBe('top');
    });

    it('should respect explicit position preference', () => {
      const config = { ...DEFAULT_PORTAL_CONFIG, position: 'top' as const };
      const position = determineOptimalPosition(elementBounds, viewportBounds, config);
      expect(position).toBe('top');
    });
  });

  describe('calculateDropdownCoordinates', () => {
    it('should calculate coordinates for bottom positioning', () => {
      const coordinates = calculateDropdownCoordinates(mockElement);
      
      expect(coordinates).toMatchObject({
        x: 200,
        y: 144, // bottom (140) + offset (4)
        position: 'bottom',
        maxHeight: expect.any(Number),
      });
    });

    it('should adjust x position to prevent horizontal overflow', () => {
      mockGetBoundingClientRect.mockReturnValue({
        top: 100,
        bottom: 140,
        left: 800, // Near right edge
        right: 1000,
        width: 200,
        height: 40,
        x: 800,
        y: 100,
      });

      const coordinates = calculateDropdownCoordinates(mockElement);
      
      // Should be adjusted to fit dropdown width (320px) + padding
      expect(coordinates.x).toBeLessThan(800);
    });

    it('should handle custom configuration', () => {
      const config = {
        offset: 10,
        maxHeight: 500,
        viewportPadding: 20,
      };

      const coordinates = calculateDropdownCoordinates(mockElement, config);
      
      expect(coordinates).toMatchObject({
        y: 150, // bottom (140) + custom offset (10)
        maxHeight: expect.any(Number),
      });
    });
  });

  describe('isElementInViewport', () => {
    it('should return true for element within viewport', () => {
      const result = isElementInViewport(mockElement);
      expect(result).toBe(true);
    });

    it('should return false for element outside viewport', () => {
      mockGetBoundingClientRect.mockReturnValue({
        top: -50,
        bottom: -10,
        left: 200,
        right: 400,
        width: 200,
        height: 40,
        x: 200,
        y: -50,
      });

      const result = isElementInViewport(mockElement);
      expect(result).toBe(false);
    });
  });

  describe('isPointInElement', () => {
    it('should return true for point within element bounds', () => {
      const result = isPointInElement(300, 120, mockElement);
      expect(result).toBe(true);
    });

    it('should return false for point outside element bounds', () => {
      const result = isPointInElement(100, 120, mockElement);
      expect(result).toBe(false);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call function with latest arguments', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      debouncedFn('second');
      debouncedFn('third');

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('third');
    });
  });

  describe('getPortalContainer', () => {
    it('should return custom container if provided', () => {
      const customContainer = document.createElement('div');
      const result = getPortalContainer(customContainer);
      expect(result).toBe(customContainer);
    });

    it('should return document.body as default', () => {
      const result = getPortalContainer();
      expect(result).toBe(document.body);
    });

    it('should return null in SSR environment', () => {
      const originalDocument = global.document;
      delete (global as any).document;

      const result = getPortalContainer();
      expect(result).toBeNull();

      global.document = originalDocument;
    });
  });

  describe('calculateZIndex', () => {
    it('should return default z-index when no custom value provided', () => {
      const zIndex = calculateZIndex();
      expect(zIndex).toBe(70);
    });

    it('should return custom z-index when provided', () => {
      const zIndex = calculateZIndex(80, 90);
      expect(zIndex).toBe(90);
    });

    it('should ensure minimum z-index above FormNavigation', () => {
      const zIndex = calculateZIndex(50);
      expect(zIndex).toBe(70); // Minimum is 70, above FormNavigation's z-[60]
    });
  });
});

describe('DEFAULT_PORTAL_CONFIG', () => {
  it('should have expected default values', () => {
    expect(DEFAULT_PORTAL_CONFIG).toEqual({
      position: 'auto',
      offset: 4,
      maxHeight: 400,
      viewportPadding: 16,
      zIndex: 70,
      enableResize: true,
      resizeDebounce: 100,
    });
  });
});