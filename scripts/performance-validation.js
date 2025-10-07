#!/usr/bin/env node
// scripts/performance-validation.js
// Comprehensive performance validation tests for lazy loading implementation
// Phase 4: Performance Testing & Validation

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Validation configuration
const VALIDATION_CONFIG = {
  tests: {
    unit: true,
    performance: true,
    lighthouse: true,
    pagespeed: false, // Only for production
    webpagetest: false, // Only for production
  },
  thresholds: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 90,
    fcp: 2000, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    cls: 0.1,  // Cumulative Layout Shift
    tbt: 300,  // Total Blocking Time (ms)
    si: 3000,  // Speed Index (ms)
  },
  components: [
    'PageHeroHome',
    'LinkListItem', 
    'RouteTransfer',
    'PageHero',
  ],
};

/**
 * Run unit tests
 */
async function runUnitTests() {
  console.log('🧪 Running unit tests...');
  
  try {
    const output = execSync('npm run test:ci', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log('✅ Unit tests passed');
    return { success: true, output };
  } catch (error) {
    console.error('❌ Unit tests failed:');
    console.error(error.stdout || error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Run performance tests
 */
async function runPerformanceTests() {
  console.log('⚡ Running performance tests...');
  
  try {
    const output = execSync('npm run test:performance', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log('✅ Performance tests passed');
    return { success: true, output };
  } catch (error) {
    console.error('❌ Performance tests failed:');
    console.error(error.stdout || error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Run Lighthouse tests
 */
async function runLighthouseTests() {
  console.log('🔍 Running Lighthouse tests...');
  
  try {
    // Build the application first
    console.log('   Building application...');
    execSync('npm run build', { stdio: 'pipe' });
    
    // Start the application
    console.log('   Starting application...');
    const startProcess = execSync('npm run start &', { stdio: 'pipe' });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Run Lighthouse
    console.log('   Running Lighthouse analysis...');
    const output = execSync('npm run lighthouse', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Stop the application
    try {
      execSync('pkill -f "next start"', { stdio: 'pipe' });
    } catch (e) {
      // Ignore if process not found
    }
    
    console.log('✅ Lighthouse tests completed');
    return { success: true, output };
  } catch (error) {
    console.error('❌ Lighthouse tests failed:');
    console.error(error.stdout || error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Validate component implementations
 */
function validateComponentImplementations() {
  console.log('🔍 Validating component implementations...');
  
  const results = [];
  
  VALIDATION_CONFIG.components.forEach((componentName) => {
    console.log(`   Checking ${componentName}...`);
    
    let filePath;
    switch (componentName) {
      case 'PageHeroHome':
        filePath = 'src/components/PageHeroHome.tsx';
        break;
      case 'LinkListItem':
        filePath = 'src/components/LinkListItem.tsx';
        break;
      case 'RouteTransfer':
        filePath = 'src/components/RouteTransfer.tsx';
        break;
      case 'PageHero':
        filePath = 'src/components/PageHero.tsx';
        break;
      default:
        console.warn(`   ⚠️  Unknown component: ${componentName}`);
        return;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const checks = {
        hasPriority: content.includes('priority={'),
        hasLoading: content.includes('loading='),
        hasFetchPriority: content.includes('fetchPriority='),
        hasNextImage: content.includes('from \'next/image\''),
        hasProperAlt: content.includes('alt='),
      };
      
      const allPassed = Object.values(checks).every(check => check);
      
      console.log(`     Priority: ${checks.hasPriority ? '✅' : '❌'}`);
      console.log(`     Loading: ${checks.hasLoading ? '✅' : '❌'}`);
      console.log(`     FetchPriority: ${checks.hasFetchPriority ? '✅' : '❌'}`);
      console.log(`     Next.js Image: ${checks.hasNextImage ? '✅' : '❌'}`);
      console.log(`     Alt Text: ${checks.hasProperAlt ? '✅' : '❌'}`);
      
      results.push({
        component: componentName,
        file: filePath,
        success: allPassed,
        checks,
      });
      
    } catch (error) {
      console.error(`   ❌ Failed to validate ${componentName}: ${error.message}`);
      results.push({
        component: componentName,
        file: filePath,
        success: false,
        error: error.message,
      });
    }
  });
  
  return results;
}

/**
 * Check fallback components exist
 */
function validateFallbackComponents() {
  console.log('🛡️  Validating fallback components...');
  
  const fallbackFiles = [
    'src/components/fallbacks/PageHeroHomeFallback.tsx',
    'src/components/fallbacks/LinkListItemFallback.tsx',
  ];
  
  const results = [];
  
  fallbackFiles.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
        results.push({ file, exists: true });
      } else {
        console.log(`   ❌ ${file} missing`);
        results.push({ file, exists: false });
      }
    } catch (error) {
      console.error(`   ❌ Error checking ${file}: ${error.message}`);
      results.push({ file, exists: false, error: error.message });
    }
  });
  
  return results;
}

/**
 * Check test files exist
 */
function validateTestFiles() {
  console.log('🧪 Validating test files...');
  
  const testFiles = [
    'src/tests/performance/ImageLoading.test.tsx',
    'src/tests/performance/ComponentPerformance.test.tsx',
  ];
  
  const results = [];
  
  testFiles.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
        results.push({ file, exists: true });
      } else {
        console.log(`   ❌ ${file} missing`);
        results.push({ file, exists: false });
      }
    } catch (error) {
      console.error(`   ❌ Error checking ${file}: ${error.message}`);
      results.push({ file, exists: false, error: error.message });
    }
  });
  
  return results;
}

/**
 * Check configuration files
 */
function validateConfigurationFiles() {
  console.log('⚙️  Validating configuration files...');
  
  const configFiles = [
    'lighthouserc.js',
    'scripts/pagespeed-insights.js',
    'scripts/webpagetest.js',
    'scripts/migration-strategy.js',
    'scripts/rollback-plan.js',
  ];
  
  const results = [];
  
  configFiles.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
        results.push({ file, exists: true });
      } else {
        console.log(`   ❌ ${file} missing`);
        results.push({ file, exists: false });
      }
    } catch (error) {
      console.error(`   ❌ Error checking ${file}: ${error.message}`);
      results.push({ file, exists: false, error: error.message });
    }
  });
  
  return results;
}

/**
 * Generate validation report
 */
function generateValidationReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: Object.keys(results).length,
      passed: Object.values(results).filter(r => r.success !== false).length,
      failed: Object.values(results).filter(r => r.success === false).length,
    },
    results,
    recommendations: [],
  };
  
  // Add recommendations based on results
  if (results.unitTests && !results.unitTests.success) {
    report.recommendations.push('Fix failing unit tests before deployment');
  }
  
  if (results.performanceTests && !results.performanceTests.success) {
    report.recommendations.push('Fix failing performance tests');
  }
  
  if (results.lighthouseTests && !results.lighthouseTests.success) {
    report.recommendations.push('Optimize performance based on Lighthouse results');
  }
  
  const componentResults = results.componentValidation || [];
  const failedComponents = componentResults.filter(r => !r.success);
  if (failedComponents.length > 0) {
    report.recommendations.push(`Fix implementation issues in: ${failedComponents.map(c => c.component).join(', ')}`);
  }
  
  const reportPath = path.join(process.cwd(), 'performance-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

/**
 * Main validation execution
 */
async function main() {
  console.log('🚀 Starting comprehensive performance validation...\n');
  
  const results = {};
  
  // Run unit tests
  if (VALIDATION_CONFIG.tests.unit) {
    results.unitTests = await runUnitTests();
    console.log('');
  }
  
  // Run performance tests
  if (VALIDATION_CONFIG.tests.performance) {
    results.performanceTests = await runPerformanceTests();
    console.log('');
  }
  
  // Run Lighthouse tests
  if (VALIDATION_CONFIG.tests.lighthouse) {
    results.lighthouseTests = await runLighthouseTests();
    console.log('');
  }
  
  // Validate component implementations
  results.componentValidation = validateComponentImplementations();
  console.log('');
  
  // Validate fallback components
  results.fallbackValidation = validateFallbackComponents();
  console.log('');
  
  // Validate test files
  results.testFileValidation = validateTestFiles();
  console.log('');
  
  // Validate configuration files
  results.configValidation = validateConfigurationFiles();
  console.log('');
  
  // Generate report
  const report = generateValidationReport(results);
  
  // Display summary
  console.log('📊 Performance Validation Summary:');
  console.log(`   Total Tests: ${report.summary.totalTests}`);
  console.log(`   Passed: ${report.summary.passed}`);
  console.log(`   Failed: ${report.summary.failed}`);
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  console.log(`\n📄 Detailed report saved to: performance-validation-report.json`);
  
  // Check if validation passed
  const allPassed = report.summary.failed === 0;
  
  if (allPassed) {
    console.log('\n✅ All performance validation tests passed!');
    console.log('🚀 Ready for deployment with lazy loading optimizations.');
    process.exit(0);
  } else {
    console.log('\n❌ Some performance validation tests failed.');
    console.log('🛑 Please fix the issues before deployment.');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Performance validation failed:', error.message);
    process.exit(1);
  });
}

module.exports = { 
  runUnitTests, 
  runPerformanceTests, 
  runLighthouseTests,
  validateComponentImplementations,
  generateValidationReport 
};








