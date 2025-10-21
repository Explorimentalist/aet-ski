// src/utils/portalErrorRecovery.test.ts

import {
  retryPortalOperation,
  safeGetPortalContainer,
  validatePortalContainer,
  createErrorContext,
  errorRecoveryStrategies,
  handlePortalError,
} from './portalErrorRecovery';

// Mock console methods
const consoleSpy = {
  warn: jest.spyOn(console, 'warn').mockImplementation(),
};

// Mock DOM elements
const createMockElement = (isConnected = true) => ({
  isConnected,
  appendChild: jest.fn(),
  removeChild: jest.fn(),
}) as unknown as HTMLElement;

const mockDocument = {
  body: createMockElement(),
  documentElement: createMockElement(),
  createElement: jest.fn(() => createMockElement()),
};

describe('portalErrorRecovery utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    Object.defineProperty(global, 'document', {
      value: mockDocument,
      writable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    consoleSpy.warn.mockClear();
  });

  describe('retryPortalOperation', () => {
    it('should succeed on first attempt when operation succeeds', async () => {
      const operation = jest.fn().mockResolvedValue('success');
      
      const result = await retryPortalOperation(operation);
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockResolvedValue('success');
      
      const resultPromise = retryPortalOperation(operation, { 
        maxRetries: 2,
        retryDelay: 50 
      });
      
      jest.advanceTimersByTime(50);
      const result = await resultPromise;
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should fail after max retries exceeded', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Persistent failure'));
      
      await expect(retryPortalOperation(operation, { 
        maxRetries: 1,
        retryDelay: 50 
      })).rejects.toThrow('Persistent failure');
      
      expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });

    it('should log errors when logging is enabled', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Test error'));
      
      try {
        await retryPortalOperation(operation, { 
          maxRetries: 1,
          logErrors: true 
        });
      } catch (error) {
        // Expected to fail
      }
      
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Portal operation attempt 1 failed:',
        'Test error'
      );
    });

    it('should not log errors when logging is disabled', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Test error'));
      
      try {
        await retryPortalOperation(operation, { 
          maxRetries: 1,
          logErrors: false 
        });
      } catch (error) {
        // Expected to fail
      }
      
      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it('should work with synchronous operations', async () => {
      const operation = jest.fn().mockReturnValue('sync success');
      
      const result = await retryPortalOperation(operation);
      
      expect(result).toBe('sync success');
      expect(operation).toHaveBeenCalledTimes(1);
    });
  });

  describe('safeGetPortalContainer', () => {
    it('should return preferred container when valid', () => {
      const preferredContainer = createMockElement(true);
      
      const result = safeGetPortalContainer(preferredContainer);
      
      expect(result).toBe(preferredContainer);
    });

    it('should fallback to document.body when preferred container is invalid', () => {
      const preferredContainer = createMockElement(false); // Not connected
      
      const result = safeGetPortalContainer(preferredContainer);
      
      expect(result).toBe(mockDocument.body);
    });

    it('should fallback to document.documentElement when body is unavailable', () => {
      Object.defineProperty(document, 'body', { value: null });
      
      const result = safeGetPortalContainer();
      
      expect(result).toBe(mockDocument.documentElement);
    });

    it('should return null in SSR environment', () => {
      const originalDocument = global.document;
      delete (global as any).document;
      
      const result = safeGetPortalContainer();
      
      expect(result).toBeNull();
      
      global.document = originalDocument;
    });

    it('should handle exceptions gracefully', () => {
      const preferredContainer = {
        get isConnected() {
          throw new Error('Property access failed');
        }
      } as HTMLElement;
      
      const result = safeGetPortalContainer(preferredContainer);
      
      expect(result).toBe(mockDocument.body);
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Failed to find portal container:',
        expect.any(Error)
      );
    });
  });

  describe('validatePortalContainer', () => {
    it('should return true for valid connected element', () => {
      const element = createMockElement(true);
      
      const result = validatePortalContainer(element);
      
      expect(result).toBe(true);
      expect(element.appendChild).toHaveBeenCalled();
      expect(element.removeChild).toHaveBeenCalled();
    });

    it('should return false for null element', () => {
      const result = validatePortalContainer(null);
      
      expect(result).toBe(false);
    });

    it('should return false for disconnected element', () => {
      const element = createMockElement(false);
      
      const result = validatePortalContainer(element);
      
      expect(result).toBe(false);
    });

    it('should return false when appendChild fails', () => {
      const element = createMockElement(true);
      (element.appendChild as jest.Mock).mockImplementation(() => {
        throw new Error('appendChild failed');
      });
      
      const result = validatePortalContainer(element);
      
      expect(result).toBe(false);
    });
  });

  describe('createErrorContext', () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (Test Browser)',
    };

    const mockWindow = {
      innerWidth: 1024,
      innerHeight: 768,
    };

    beforeEach(() => {
      Object.defineProperty(global, 'navigator', {
        value: mockNavigator,
        writable: true,
      });
      
      Object.defineProperty(global, 'window', {
        value: mockWindow,
        writable: true,
      });
    });

    it('should create comprehensive error context', () => {
      const context = createErrorContext('PORTAL_RENDERING_FAILED', {
        triggerId: 'test-trigger',
        coordinates: { x: 100, y: 200 },
      });
      
      const parsed = JSON.parse(context);
      
      expect(parsed).toMatchObject({
        error: 'PORTAL_RENDERING_FAILED',
        timestamp: expect.any(String),
        userAgent: 'Mozilla/5.0 (Test Browser)',
        viewport: { width: 1024, height: 768 },
        triggerId: 'test-trigger',
        coordinates: { x: 100, y: 200 },
      });
    });

    it('should handle missing browser APIs gracefully', () => {
      const originalNavigator = global.navigator;
      const originalWindow = global.window;
      
      delete (global as any).navigator;
      delete (global as any).window;
      
      const context = createErrorContext('TRIGGER_ELEMENT_NOT_FOUND');
      const parsed = JSON.parse(context);
      
      expect(parsed).toMatchObject({
        error: 'TRIGGER_ELEMENT_NOT_FOUND',
        userAgent: 'Unknown',
        viewport: null,
      });
      
      global.navigator = originalNavigator;
      global.window = originalWindow;
    });
  });

  describe('errorRecoveryStrategies', () => {
    it('should have correct strategies for each error type', () => {
      expect(errorRecoveryStrategies.PORTAL_CONTAINER_NOT_FOUND).toMatchObject({
        fallbackToInline: true,
        retryable: true,
        recovery: expect.any(Function),
      });

      expect(errorRecoveryStrategies.TRIGGER_ELEMENT_NOT_FOUND).toMatchObject({
        fallbackToInline: false,
        retryable: false,
        recovery: expect.any(Function),
      });

      expect(errorRecoveryStrategies.POSITIONING_CALCULATION_FAILED).toMatchObject({
        fallbackToInline: true,
        retryable: true,
        recovery: expect.any(Function),
      });

      expect(errorRecoveryStrategies.PORTAL_RENDERING_FAILED).toMatchObject({
        fallbackToInline: true,
        retryable: false,
        recovery: expect.any(Function),
      });
    });

    it('should provide working recovery functions', () => {
      // Test PORTAL_CONTAINER_NOT_FOUND recovery
      const containerRecovery = errorRecoveryStrategies.PORTAL_CONTAINER_NOT_FOUND.recovery();
      expect(containerRecovery).toBe(mockDocument.body);

      // Test POSITIONING_CALCULATION_FAILED recovery
      Object.defineProperty(global, 'window', {
        value: { innerWidth: 1024, innerHeight: 768 },
        writable: true,
      });
      
      const positionRecovery = errorRecoveryStrategies.POSITIONING_CALCULATION_FAILED.recovery();
      expect(positionRecovery).toMatchObject({
        x: 0,
        y: 0,
        position: 'bottom',
        maxHeight: 300,
      });

      // Test TRIGGER_ELEMENT_NOT_FOUND recovery
      const triggerRecovery = errorRecoveryStrategies.TRIGGER_ELEMENT_NOT_FOUND.recovery();
      expect(triggerRecovery).toBeNull();
    });
  });

  describe('handlePortalError', () => {
    it('should return correct strategy for known errors', () => {
      const result = handlePortalError('PORTAL_CONTAINER_NOT_FOUND', {
        triggerId: 'test',
      });
      
      expect(result).toMatchObject({
        shouldRetry: true,
        shouldFallback: true,
        recoveryAction: expect.any(Function),
      });
      
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Portal dropdown error: PORTAL_CONTAINER_NOT_FOUND',
        expect.any(String)
      );
    });

    it('should handle unknown errors gracefully', () => {
      const result = handlePortalError('UNKNOWN_ERROR' as any);
      
      expect(result).toMatchObject({
        shouldRetry: false,
        shouldFallback: true,
      });
      
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Unknown portal dropdown error: UNKNOWN_ERROR'
      );
    });

    it('should create error context with additional information', () => {
      const context = { triggerId: 'test-trigger', step: 'opening' };
      
      handlePortalError('PORTAL_RENDERING_FAILED', context);
      
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Portal dropdown error: PORTAL_RENDERING_FAILED',
        expect.stringContaining('"triggerId":"test-trigger"')
      );
    });
  });
});