// src/components/PerformanceDashboard.tsx
// Development-only performance dashboard for monitoring lazy loading

'use client';

import React, { useState, useEffect } from 'react';
import { performanceTracker } from '@/utils/performanceMetrics';

interface PerformanceDashboardProps {
  show?: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  show = process.env.NODE_ENV === 'development' 
}) => {
  const [metrics, setMetrics] = useState(performanceTracker.getMetrics());
  const [lazyMetrics, setLazyMetrics] = useState(performanceTracker.getLazyLoadAnalytics());
  const [isOpen, setIsOpen] = useState(false);

  // Update metrics every 2 seconds in development
  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setMetrics(performanceTracker.getMetrics());
      setLazyMetrics(performanceTracker.getLazyLoadAnalytics());
    }, 2000);

    return () => clearInterval(interval);
  }, [show]);

  // Don't render in production or if show is false
  if (!show) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-[9999] font-mono text-xs"
      style={{ fontFamily: 'Monaco, Consolas, monospace' }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white px-3 py-2 rounded-md shadow-lg hover:bg-gray-800 transition-colors"
      >
        {isOpen ? '📊 Hide' : '📊 Performance'}
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg shadow-xl mt-2 w-80 max-h-96 overflow-y-auto">
          <h3 className="text-white font-bold mb-3 border-b border-gray-700 pb-2">
            🚀 Lazy Loading Performance
          </h3>

          {/* Web Vitals */}
          <div className="mb-4">
            <h4 className="text-yellow-400 font-semibold mb-2">Web Vitals</h4>
            <div className="space-y-1 text-xs">
              <div>FCP: <span className="text-white">{metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}</span></div>
              <div>LCP: <span className="text-white">{metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}</span></div>
              <div>FID: <span className="text-white">{metrics.fid ? `${metrics.fid.toFixed(1)}ms` : 'N/A'}</span></div>
              <div>CLS: <span className="text-white">{metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}</span></div>
            </div>
          </div>

          {/* Lazy Load Stats */}
          <div className="mb-4">
            <h4 className="text-yellow-400 font-semibold mb-2">Lazy Loading</h4>
            <div className="space-y-1 text-xs">
              <div>Total Loads: <span className="text-white">{lazyMetrics.totalLoads}</span></div>
              <div>Success: <span className="text-green-400">{lazyMetrics.successfulLoads}</span></div>
              <div>Failures: <span className="text-red-400">{lazyMetrics.failedLoads}</span></div>
              <div>Avg Time: <span className="text-white">{lazyMetrics.averageLoadTime.toFixed(1)}ms</span></div>
            </div>
          </div>

          {/* Component Breakdown */}
          {Object.keys(lazyMetrics.componentBreakdown).length > 0 && (
            <div className="mb-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Components</h4>
              <div className="space-y-1 text-xs">
                {Object.entries(lazyMetrics.componentBreakdown).map(([component, stats]) => (
                  <div key={component} className="flex justify-between">
                    <span className="text-blue-300">{component}:</span>
                    <span className="text-white">
                      {stats.loads} loads ({stats.avgTime.toFixed(0)}ms avg)
                      {stats.failures > 0 && <span className="text-red-400"> {stats.failures}❌</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {lazyMetrics.recentMetrics.length > 0 && (
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">Recent Activity</h4>
              <div className="space-y-1 text-xs max-h-24 overflow-y-auto">
                {lazyMetrics.recentMetrics.slice(-5).map((metric, i) => (
                  <div key={i} className="flex justify-between">
                    <span className={metric.success ? 'text-green-400' : 'text-red-400'}>
                      {metric.success ? '✅' : '❌'} {metric.componentName}
                    </span>
                    <span className="text-white">{metric.loadTime.toFixed(0)}ms</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 pt-2 border-t border-gray-700">
            <button
              onClick={() => {
                console.log('📊 Performance Report:', performanceTracker.generateReport());
                performanceTracker.sendMetrics();
              }}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500"
            >
              📊 Log Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;