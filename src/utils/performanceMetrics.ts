// src/utils/performanceMetrics.ts
// Performance monitoring and metrics tracking for lazy loading optimization

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  tti?: number; // Time to Interactive
}

interface LazyLoadMetrics {
  componentName: string;
  loadTime: number;
  success: boolean;
  error?: string;
  bundleSize?: number;
  timestamp: number;
}

interface BundleAnalytics {
  initialBundleSize: number;
  lazyBundleSize: number;
  totalSize: number;
  savings: number;
  loadedChunks: string[];
}

class PerformanceTracker {
  private metrics: PerformanceMetrics = {};
  private lazyLoadMetrics: LazyLoadMetrics[] = [];
  private bundleAnalytics: BundleAnalytics | null = null;
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializePerformanceObserver();
  }

  private initializePerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Observe Web Vitals
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                this.metrics.fcp = entry.startTime;
              }
              break;
            case 'largest-contentful-paint':
              this.metrics.lcp = entry.startTime;
              break;
            case 'first-input':
              this.metrics.fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
              }
              break;
            case 'navigation':
              const navEntry = entry as PerformanceNavigationTiming;
              this.metrics.ttfb = navEntry.responseStart - navEntry.fetchStart;
              break;
          }
        });
      });

      // Observe different entry types
      try {
        this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
      } catch (e) {
        // Fallback for older browsers
        this.observer.observe({ entryTypes: ['paint', 'navigation'] });
      }
    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  // Track lazy loading performance
  trackLazyLoad(componentName: string, startTime: number, success: boolean, error?: string) {
    const loadTime = performance.now() - startTime;
    
    const metric: LazyLoadMetrics = {
      componentName,
      loadTime,
      success,
      error,
      timestamp: Date.now()
    };

    this.lazyLoadMetrics.push(metric);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      if (success) {
        console.log(`🚀 ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      } else {
        console.error(`❌ ${componentName} failed to load: ${error}`);
      }
    }

    return metric;
  }

  // Get current performance metrics
  getMetrics(): PerformanceMetrics {
    // Update TTI if available
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navTiming) {
          this.metrics.tti = navTiming.loadEventEnd - navTiming.fetchStart;
        }
      } catch (e) {
        // Ignore TTI calculation errors
      }
    }

    return { ...this.metrics };
  }

  // Get lazy load analytics
  getLazyLoadAnalytics() {
    const successful = this.lazyLoadMetrics.filter(m => m.success);
    const failed = this.lazyLoadMetrics.filter(m => !m.success);
    
    return {
      totalLoads: this.lazyLoadMetrics.length,
      successfulLoads: successful.length,
      failedLoads: failed.length,
      averageLoadTime: successful.reduce((acc, m) => acc + m.loadTime, 0) / (successful.length || 1),
      componentBreakdown: this.getComponentBreakdown(),
      recentMetrics: this.lazyLoadMetrics.slice(-10)
    };
  }

  private getComponentBreakdown() {
    const breakdown: Record<string, { loads: number; avgTime: number; failures: number }> = {};
    
    this.lazyLoadMetrics.forEach(metric => {
      if (!breakdown[metric.componentName]) {
        breakdown[metric.componentName] = { loads: 0, avgTime: 0, failures: 0 };
      }
      
      breakdown[metric.componentName].loads++;
      
      if (metric.success) {
        const current = breakdown[metric.componentName];
        current.avgTime = ((current.avgTime * (current.loads - 1)) + metric.loadTime) / current.loads;
      } else {
        breakdown[metric.componentName].failures++;
      }
    });
    
    return breakdown;
  }

  // Bundle size tracking
  trackBundleSize(analytics: BundleAnalytics) {
    this.bundleAnalytics = analytics;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Bundle Analytics:', {
        'Initial Bundle': `${(analytics.initialBundleSize / 1024).toFixed(2)}KB`,
        'Lazy Bundles': `${(analytics.lazyBundleSize / 1024).toFixed(2)}KB`,
        'Total Size': `${(analytics.totalSize / 1024).toFixed(2)}KB`,
        'Savings': `${(analytics.savings / 1024).toFixed(2)}KB (${((analytics.savings / analytics.totalSize) * 100).toFixed(1)}%)`
      });
    }
  }

  // Generate performance report
  generateReport() {
    const metrics = this.getMetrics();
    const lazyAnalytics = this.getLazyLoadAnalytics();
    
    const report = {
      webVitals: {
        fcp: metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
        lcp: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
        fid: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
        cls: metrics.cls ? metrics.cls.toFixed(4) : 'N/A',
        ttfb: metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
        tti: metrics.tti ? `${metrics.tti.toFixed(2)}ms` : 'N/A'
      },
      lazyLoading: {
        successRate: `${((lazyAnalytics.successfulLoads / lazyAnalytics.totalLoads) * 100).toFixed(1)}%`,
        averageLoadTime: `${lazyAnalytics.averageLoadTime.toFixed(2)}ms`,
        totalComponents: lazyAnalytics.totalLoads,
        failures: lazyAnalytics.failedLoads
      },
      bundleOptimization: this.bundleAnalytics ? {
        initialSize: `${(this.bundleAnalytics.initialBundleSize / 1024).toFixed(2)}KB`,
        lazySizes: `${(this.bundleAnalytics.lazyBundleSize / 1024).toFixed(2)}KB`,
        totalSavings: `${(this.bundleAnalytics.savings / 1024).toFixed(2)}KB`,
        savingsPercentage: `${((this.bundleAnalytics.savings / this.bundleAnalytics.totalSize) * 100).toFixed(1)}%`
      } : null,
      timestamp: new Date().toISOString()
    };

    return report;
  }

  // Send metrics to analytics service (implement as needed)
  sendMetrics() {
    const report = this.generateReport();
    
    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics, DataDog, New Relic, etc.
      // analytics.track('lazy_loading_performance', report);
    } else {
      console.log('📈 Performance Report:', report);
    }

    return report;
  }

  // Clean up observer
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create singleton instance
export const performanceTracker = new PerformanceTracker();

// Utility functions for easy usage
export const trackLazyLoadStart = (componentName: string) => {
  return performance.now();
};

export const trackLazyLoadEnd = (componentName: string, startTime: number, success: boolean, error?: string) => {
  return performanceTracker.trackLazyLoad(componentName, startTime, success, error);
};

// Hook for React components
export const usePerformanceTracking = (componentName: string) => {
  const trackLoad = (success: boolean, error?: string) => {
    const startTime = performance.now();
    return () => trackLazyLoadEnd(componentName, startTime, success, error);
  };

  return { trackLoad };
};

// Web Vitals integration
export const reportWebVitals = (metric: any) => {
  switch (metric.name) {
    case 'FCP':
      performanceTracker['metrics'].fcp = metric.value;
      break;
    case 'LCP':
      performanceTracker['metrics'].lcp = metric.value;
      break;
    case 'FID':
      performanceTracker['metrics'].fid = metric.value;
      break;
    case 'CLS':
      performanceTracker['metrics'].cls = metric.value;
      break;
    case 'TTFB':
      performanceTracker['metrics'].ttfb = metric.value;
      break;
  }
};

export default performanceTracker;