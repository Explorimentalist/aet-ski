// lighthouserc.js
// Lighthouse CI configuration for AET.ski performance testing
// Phase 4: Performance Testing & Validation

module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/routes',
        'http://localhost:3000/contact',
        'http://localhost:3000/booking',
      ],
      // Number of runs per URL
      numberOfRuns: 3,
      // Start local server before testing
      startServerCommand: 'npm run start',
      // Wait for server to be ready
      startServerReadyPattern: 'ready - started server on',
      // Wait time after server starts
      startServerReadyTimeout: 30000,
    },
    assert: {
      // Performance budgets - Core Web Vitals targets
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        
        // Image optimization checks
        'uses-optimized-images': 'error',
        'uses-webp-images': 'warn',
        'uses-responsive-images': 'error',
        'efficient-animated-content': 'warn',
        
        // Lazy loading validation
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'render-blocking-resources': 'warn',
      },
    },
    upload: {
      // Upload results to Lighthouse CI server (optional)
      target: 'temporary-public-storage',
    },
    server: {
      // Local server configuration
      command: 'npm run start',
      port: 3000,
    },
  },
};

