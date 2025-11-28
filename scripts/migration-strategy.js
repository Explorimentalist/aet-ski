#!/usr/bin/env node
// scripts/migration-strategy.js
// Gradual migration strategy with fallback measures for lazy loading implementation
// Phase 4: Performance Testing & Validation

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Migration configuration
const MIGRATION_CONFIG = {
  components: [
    {
      name: 'PageHeroHome',
      file: 'src/components/PageHeroHome.tsx',
      priority: 'high',
      fallback: true,
      testCommand: 'npm run test -- --testNamePattern="PageHeroHome"',
    },
    {
      name: 'LinkListItem',
      file: 'src/components/LinkListItem.tsx',
      priority: 'medium',
      fallback: true,
      testCommand: 'npm run test -- --testNamePattern="LinkListItem"',
    },
    {
      name: 'RouteTransfer',
      file: 'src/components/RouteTransfer.tsx',
      priority: 'low',
      fallback: true,
      testCommand: 'npm run test -- --testNamePattern="RouteTransfer"',
    },
  ],
  rollback: {
    enabled: true,
    createBackup: true,
    backupDir: '.migration-backups',
  },
  testing: {
    runTests: true,
    runLighthouse: true,
    runPageSpeed: false, // Only for production
  },
};

/**
 * Create backup of component before migration
 */
function createBackup(component) {
  const backupDir = MIGRATION_CONFIG.rollback.backupDir;
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `${component.name}-${timestamp}.backup`);
  
  try {
    fs.copyFileSync(component.file, backupFile);
    console.log(`✅ Backup created: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error(`❌ Failed to create backup: ${error.message}`);
    return null;
  }
}

/**
 * Run component-specific tests
 */
function runComponentTests(component) {
  console.log(`🧪 Running tests for ${component.name}...`);
  
  try {
    const output = execSync(component.testCommand, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(`✅ Tests passed for ${component.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Tests failed for ${component.name}:`);
    console.error(error.stdout || error.message);
    return false;
  }
}

/**
 * Run Lighthouse test for component
 */
function runLighthouseTest(component) {
  console.log(`🔍 Running Lighthouse test for ${component.name}...`);
  
  try {
    const output = execSync('npm run lighthouse', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(`✅ Lighthouse test completed for ${component.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Lighthouse test failed for ${component.name}:`);
    console.error(error.stdout || error.message);
    return false;
  }
}

/**
 * Validate component implementation
 */
function validateComponent(component) {
  console.log(`🔍 Validating ${component.name} implementation...`);
  
  try {
    const content = fs.readFileSync(component.file, 'utf8');
    
    // Check for required lazy loading attributes
    const hasPriority = content.includes('priority={');
    const hasLoading = content.includes('loading=');
    const hasFetchPriority = content.includes('fetchPriority=');
    
    console.log(`   Priority attribute: ${hasPriority ? '✅' : '❌'}`);
    console.log(`   Loading attribute: ${hasLoading ? '✅' : '❌'}`);
    console.log(`   FetchPriority attribute: ${hasFetchPriority ? '✅' : '❌'}`);
    
    return hasPriority && hasLoading;
  } catch (error) {
    console.error(`❌ Failed to validate ${component.name}: ${error.message}`);
    return false;
  }
}

/**
 * Migrate single component
 */
async function migrateComponent(component) {
  console.log(`\n🚀 Migrating ${component.name}...`);
  
  // Step 1: Create backup
  let backupFile = null;
  if (MIGRATION_CONFIG.rollback.createBackup) {
    backupFile = createBackup(component);
    if (!backupFile) {
      console.error(`❌ Cannot proceed without backup for ${component.name}`);
      return false;
    }
  }
  
  // Step 2: Validate current implementation
  const isValid = validateComponent(component);
  if (!isValid) {
    console.error(`❌ Component ${component.name} is not properly implemented`);
    return false;
  }
  
  // Step 3: Run tests
  if (MIGRATION_CONFIG.testing.runTests) {
    const testsPassed = runComponentTests(component);
    if (!testsPassed) {
      console.error(`❌ Tests failed for ${component.name}, rolling back...`);
      if (backupFile) {
        fs.copyFileSync(backupFile, component.file);
        console.log(`✅ Rolled back ${component.name} from backup`);
      }
      return false;
    }
  }
  
  // Step 4: Run Lighthouse test
  if (MIGRATION_CONFIG.testing.runLighthouse) {
    const lighthousePassed = runLighthouseTest(component);
    if (!lighthousePassed) {
      console.warn(`⚠️  Lighthouse test failed for ${component.name}, but continuing...`);
    }
  }
  
  console.log(`✅ Successfully migrated ${component.name}`);
  return true;
}

/**
 * Rollback component to backup
 */
function rollbackComponent(component, backupFile) {
  console.log(`🔄 Rolling back ${component.name}...`);
  
  try {
    if (backupFile && fs.existsSync(backupFile)) {
      fs.copyFileSync(backupFile, component.file);
      console.log(`✅ Successfully rolled back ${component.name}`);
      return true;
    } else {
      console.error(`❌ Backup file not found for ${component.name}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Failed to rollback ${component.name}: ${error.message}`);
    return false;
  }
}

/**
 * Generate migration report
 */
function generateMigrationReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComponents: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    },
    results: results,
  };
  
  const reportPath = path.join(process.cwd(), 'migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

/**
 * Main migration execution
 */
async function main() {
  console.log('🚀 Starting gradual migration strategy...\n');
  
  const results = [];
  
  // Sort components by priority
  const sortedComponents = MIGRATION_CONFIG.components.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  
  console.log('📋 Migration plan:');
  sortedComponents.forEach((component, index) => {
    console.log(`   ${index + 1}. ${component.name} (${component.priority} priority)`);
  });
  console.log('');
  
  // Migrate each component
  for (const component of sortedComponents) {
    const success = await migrateComponent(component);
    results.push({
      component: component.name,
      success,
      timestamp: new Date().toISOString(),
    });
    
    if (!success) {
      console.error(`❌ Migration failed for ${component.name}`);
      
      // Ask if user wants to continue
      if (process.argv.includes('--continue-on-failure')) {
        console.log('⚠️  Continuing with next component...');
      } else {
        console.log('🛑 Stopping migration due to failure');
        break;
      }
    }
  }
  
  // Generate report
  const report = generateMigrationReport(results);
  
  console.log('\n📊 Migration Summary:');
  console.log(`   Total Components: ${report.summary.totalComponents}`);
  console.log(`   Successful: ${report.summary.successful}`);
  console.log(`   Failed: ${report.summary.failed}`);
  
  if (report.summary.failed > 0) {
    console.log('\n❌ Some migrations failed. Check the migration report for details.');
    process.exit(1);
  } else {
    console.log('\n✅ All migrations completed successfully!');
    process.exit(0);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  });
}

module.exports = { 
  migrateComponent, 
  rollbackComponent, 
  validateComponent,
  MIGRATION_CONFIG 
};















