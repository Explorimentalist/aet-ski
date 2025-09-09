#!/usr/bin/env node
// scripts/webpagetest.js
// WebPageTest integration for detailed performance analysis
// Phase 4: Performance Testing & Validation

const https = require('https');
const fs = require('fs');
const path = require('path');

// WebPageTest API configuration
const WPT_API_KEY = process.env.WEBPAGETEST_API_KEY;
const WPT_API_URL = 'https://www.webpagetest.org/runtest.php';
const WPT_RESULTS_URL = 'https://www.webpagetest.org/jsonResult.php';

// Test URLs for AET.ski
const TEST_URLS = [
  'https://www.aet.ski/',
  'https://www.aet.ski/routes',
  'https://www.aet.ski/contact',
];

// Test configurations
const TEST_CONFIGS = {
  mobile: {
    location: 'Dulles_MotoG4:Chrome',
    runs: 3,
    firstViewOnly: false,
    video: 1,
    label: 'AET.ski Mobile Test',
  },
  desktop: {
    location: 'Dulles:Chrome',
    runs: 3,
    firstViewOnly: false,
    video: 1,
    label: 'AET.ski Desktop Test',
  },
};

/**
 * Submit WebPageTest
 */
async function submitWebPageTest(url, config) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      url,
      key: WPT_API_KEY,
      location: config.location,
      runs: config.runs,
      firstViewOnly: config.firstViewOnly ? 1 : 0,
      video: config.video,
      label: config.label,
      f: 'json',
    });

    const requestUrl = `${WPT_API_URL}?${params}`;
    
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
          reject(new Error(`Failed to parse WebPageTest response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`WebPageTest API request failed: ${error.message}`));
    });
  });
}

/**
 * Get WebPageTest results
 */
async function getWebPageTestResults(testId) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      test: testId,
      f: 'json',
    });

    const requestUrl = `${WPT_RESULTS_URL}?${params}`;
    
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
          reject(new Error(`Failed to parse WebPageTest results: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`WebPageTest results request failed: ${error.message}`));
    });
  });
}

/**
 * Wait for test completion
 */
async function waitForTestCompletion(testId, maxWaitTime = 300000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const result = await getWebPageTestResults(testId);
      
      if (result.statusCode === 200) {
        return result.data;
      } else if (result.statusCode === 100) {
        // Test is still running
        console.log(`⏳ Test ${testId} is still running...`);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      } else {
        throw new Error(`Test failed with status: ${result.statusCode}`);
      }
    } catch (error) {
      console.error(`Error checking test status: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  throw new Error('Test timed out');
}

/**
 * Extract performance metrics from WebPageTest results
 */
function extractMetrics(results) {
  const firstView = results.runs[1].firstView;
  const repeatView = results.runs[1].repeatView;
  
  return {
    url: results.testUrl,
    location: results.location,
    testId: results.testId,
    summary: results.summary,
    firstView: {
      loadTime: firstView.loadTime,
      firstByte: firstView.TTFB,
      startRender: firstView.render,
      speedIndex: firstView.SpeedIndex,
      visualComplete: firstView.visualComplete,
      fullyLoaded: firstView.fullyLoaded,
      domElements: firstView.domElements,
      requests: firstView.requests,
      bytesIn: firstView.bytesIn,
      bytesInDoc: firstView.bytesInDoc,
    },
    repeatView: {
      loadTime: repeatView.loadTime,
      firstByte: repeatView.TTFB,
      startRender: repeatView.render,
      speedIndex: repeatView.SpeedIndex,
      visualComplete: repeatView.visualComplete,
      fullyLoaded: repeatView.fullyLoaded,
      domElements: repeatView.domElements,
      requests: repeatView.requests,
      bytesIn: repeatView.bytesIn,
      bytesInDoc: repeatView.bytesInDoc,
    },
    video: results.video,
    breakdown: results.breakdown,
    domains: results.domains,
    pages: results.pages,
  };
}

/**
 * Generate WebPageTest report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: results.length,
      averageLoadTime: 0,
      averageSpeedIndex: 0,
      averageRequests: 0,
      averageBytesIn: 0,
    },
    results: results.map(extractMetrics),
  };

  // Calculate averages
  let totalLoadTime = 0;
  let totalSpeedIndex = 0;
  let totalRequests = 0;
  let totalBytesIn = 0;

  results.forEach((result) => {
    totalLoadTime += result.firstView.loadTime;
    totalSpeedIndex += result.firstView.speedIndex;
    totalRequests += result.firstView.requests;
    totalBytesIn += result.firstView.bytesIn;
  });

  report.summary.averageLoadTime = Math.round(totalLoadTime / results.length);
  report.summary.averageSpeedIndex = Math.round(totalSpeedIndex / results.length);
  report.summary.averageRequests = Math.round(totalRequests / results.length);
  report.summary.averageBytesIn = Math.round(totalBytesIn / results.length);

  return report;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting WebPageTest analysis...\n');

  if (!WPT_API_KEY) {
    console.error('❌ Error: WEBPAGETEST_API_KEY environment variable is required');
    console.log('💡 Get your API key from: https://www.webpagetest.org/getkey.php');
    process.exit(1);
  }

  const results = [];

  // Test each URL with both mobile and desktop configurations
  for (const url of TEST_URLS) {
    console.log(`🌐 Testing ${url}...`);
    
    for (const [configName, config] of Object.entries(TEST_CONFIGS)) {
      try {
        console.log(`  ${configName === 'mobile' ? '📱' : '🖥️'} Submitting ${configName} test...`);
        
        const submitResult = await submitWebPageTest(url, config);
        
        if (submitResult.statusCode === 200) {
          const testId = submitResult.data.testId;
          console.log(`    ✅ Test submitted with ID: ${testId}`);
          console.log(`    ⏳ Waiting for test completion...`);
          
          const testResults = await waitForTestCompletion(testId);
          results.push(testResults);
          
          console.log(`    ✅ Test completed successfully`);
          console.log(`    📊 Load Time: ${testResults.runs[1].firstView.loadTime}ms`);
          console.log(`    📊 Speed Index: ${testResults.runs[1].firstView.SpeedIndex}`);
          
        } else {
          console.error(`    ❌ Test submission failed: ${submitResult.statusText}`);
        }
        
      } catch (error) {
        console.error(`    ❌ ${configName} test failed:`, error.message);
      }
    }
    
    console.log('');
  }

  if (results.length === 0) {
    console.error('❌ No tests completed successfully');
    process.exit(1);
  }

  // Generate and save report
  const report = generateReport(results);
  const reportPath = path.join(process.cwd(), 'webpagetest-report.json');
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('📊 WebPageTest Analysis Summary:');
  console.log(`   Average Load Time: ${report.summary.averageLoadTime}ms`);
  console.log(`   Average Speed Index: ${report.summary.averageSpeedIndex}`);
  console.log(`   Average Requests: ${report.summary.averageRequests}`);
  console.log(`   Average Bytes In: ${Math.round(report.summary.averageBytesIn / 1024)}KB`);
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  
  if (report.summary.averageLoadTime > 3000) {
    console.log('   ⚠️  Load time is above 3s - consider optimizing images and reducing bundle size');
  }
  
  if (report.summary.averageSpeedIndex > 3000) {
    console.log('   ⚠️  Speed Index is above 3s - consider improving above-the-fold content loading');
  }
  
  if (report.summary.averageRequests > 100) {
    console.log('   ⚠️  High number of requests - consider bundling and reducing HTTP requests');
  }
  
  if (report.summary.averageBytesIn > 2000000) {
    console.log('   ⚠️  Large page size - consider image optimization and code splitting');
  }
  
  console.log('\n✅ WebPageTest analysis completed!');
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ WebPageTest analysis failed:', error.message);
    process.exit(1);
  });
}

module.exports = { submitWebPageTest, getWebPageTestResults, extractMetrics };

