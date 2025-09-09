#!/usr/bin/env node
// scripts/pagespeed-insights.js
// PageSpeed Insights integration for mobile optimization testing
// Phase 4: Performance Testing & Validation

const https = require('https');
const fs = require('fs');
const path = require('path');

// PageSpeed Insights API configuration
const PSI_API_KEY = process.env.PAGESPEED_INSIGHTS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Test URLs for AET.ski
const TEST_URLS = [
  'https://www.aet.ski/',
  'https://www.aet.ski/routes',
  'https://www.aet.ski/contact',
  'https://www.aet.ski/booking',
];

// Device configurations
const DEVICE_CONFIGS = {
  mobile: {
    strategy: 'mobile',
    category: ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO'],
  },
  desktop: {
    strategy: 'desktop',
    category: ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO'],
  },
};

/**
 * Make PageSpeed Insights API request
 */
async function runPageSpeedTest(url, strategy = 'mobile') {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      url,
      strategy,
      key: PSI_API_KEY,
      category: DEVICE_CONFIGS[strategy].category,
    });

    const requestUrl = `${BASE_URL}?${params}`;
    
    https.get(requestUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse PageSpeed Insights response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`PageSpeed Insights API request failed: ${error.message}`));
    });
  });
}

/**
 * Extract Core Web Vitals from PageSpeed Insights result
 */
function extractCoreWebVitals(result) {
  const audits = result.lighthouseResult.audits;
  
  return {
    fcp: audits['first-contentful-paint']?.numericValue,
    lcp: audits['largest-contentful-paint']?.numericValue,
    cls: audits['cumulative-layout-shift']?.numericValue,
    tbt: audits['total-blocking-time']?.numericValue,
    si: audits['speed-index']?.numericValue,
  };
}

/**
 * Extract performance scores
 */
function extractScores(result) {
  const categories = result.lighthouseResult.categories;
  
  return {
    performance: categories.performance?.score * 100,
    accessibility: categories.accessibility?.score * 100,
    bestPractices: categories['best-practices']?.score * 100,
    seo: categories.seo?.score * 100,
  };
}

/**
 * Generate performance report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: results.length,
      averagePerformance: 0,
      averageAccessibility: 0,
      averageBestPractices: 0,
      averageSEO: 0,
    },
    results: [],
  };

  let totalPerformance = 0;
  let totalAccessibility = 0;
  let totalBestPractices = 0;
  let totalSEO = 0;

  results.forEach((result) => {
    const scores = extractScores(result.data);
    const webVitals = extractCoreWebVitals(result.data);
    
    totalPerformance += scores.performance;
    totalAccessibility += scores.accessibility;
    totalBestPractices += scores.bestPractices;
    totalSEO += scores.seo;

    report.results.push({
      url: result.url,
      strategy: result.strategy,
      scores,
      webVitals,
      passed: scores.performance >= 90 && scores.accessibility >= 95,
    });
  });

  // Calculate averages
  report.summary.averagePerformance = Math.round(totalPerformance / results.length);
  report.summary.averageAccessibility = Math.round(totalAccessibility / results.length);
  report.summary.averageBestPractices = Math.round(totalBestPractices / results.length);
  report.summary.averageSEO = Math.round(totalSEO / results.length);

  return report;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting PageSpeed Insights testing...\n');

  if (!PSI_API_KEY) {
    console.error('❌ Error: PAGESPEED_INSIGHTS_API_KEY environment variable is required');
    console.log('💡 Get your API key from: https://developers.google.com/speed/docs/insights/v5/get-started');
    process.exit(1);
  }

  const results = [];

  // Test each URL with both mobile and desktop strategies
  for (const url of TEST_URLS) {
    console.log(`📱 Testing ${url}...`);
    
    for (const [strategyName, config] of Object.entries(DEVICE_CONFIGS)) {
      try {
        console.log(`  ${strategyName === 'mobile' ? '📱' : '🖥️'} Running ${strategyName} test...`);
        
        const result = await runPageSpeedTest(url, config.strategy);
        results.push({
          url,
          strategy: config.strategy,
          data: result,
        });
        
        const scores = extractScores(result);
        console.log(`    ✅ Performance: ${Math.round(scores.performance)}/100`);
        
      } catch (error) {
        console.error(`    ❌ ${strategyName} test failed:`, error.message);
      }
    }
    
    console.log('');
  }

  // Generate and save report
  const report = generateReport(results);
  const reportPath = path.join(process.cwd(), 'pagespeed-report.json');
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('📊 PageSpeed Insights Test Summary:');
  console.log(`   Performance: ${report.summary.averagePerformance}/100`);
  console.log(`   Accessibility: ${report.summary.averageAccessibility}/100`);
  console.log(`   Best Practices: ${report.summary.averageBestPractices}/100`);
  console.log(`   SEO: ${report.summary.averageSEO}/100`);
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Check if tests passed
  const allPassed = report.results.every(result => result.passed);
  if (allPassed) {
    console.log('\n✅ All PageSpeed Insights tests passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Some PageSpeed Insights tests failed. Check the report for details.');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ PageSpeed Insights testing failed:', error.message);
    process.exit(1);
  });
}

module.exports = { runPageSpeedTest, extractCoreWebVitals, extractScores };

