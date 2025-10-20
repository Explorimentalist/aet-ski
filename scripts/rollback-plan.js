#!/usr/bin/env node
// scripts/rollback-plan.js
// Rollback plan with Git commits for lazy loading implementation
// Phase 4: Performance Testing & Validation

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rollback configuration
const ROLLBACK_CONFIG = {
  git: {
    enabled: true,
    createTags: true,
    backupBranch: 'backup-lazy-loading',
  },
  files: {
    backupDir: '.rollback-backups',
    createBackups: true,
  },
  components: [
    'src/components/PageHeroHome.tsx',
    'src/components/LinkListItem.tsx',
    'src/components/RouteTransfer.tsx',
    'src/components/PageHero.tsx',
  ],
  fallbacks: [
    'src/components/fallbacks/PageHeroHomeFallback.tsx',
    'src/components/fallbacks/LinkListItemFallback.tsx',
  ],
};

/**
 * Create Git backup branch
 */
function createGitBackup() {
  console.log('🔧 Creating Git backup branch...');
  
  try {
    // Get current branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    console.log(`   Current branch: ${currentBranch}`);
    
    // Create backup branch
    const backupBranch = `${ROLLBACK_CONFIG.git.backupBranch}-${Date.now()}`;
    execSync(`git checkout -b ${backupBranch}`, { stdio: 'pipe' });
    console.log(`   ✅ Created backup branch: ${backupBranch}`);
    
    // Return to original branch
    execSync(`git checkout ${currentBranch}`, { stdio: 'pipe' });
    
    return backupBranch;
  } catch (error) {
    console.error('❌ Failed to create Git backup:', error.message);
    return null;
  }
}

/**
 * Create file backups
 */
function createFileBackups() {
  console.log('📁 Creating file backups...');
  
  const backupDir = ROLLBACK_CONFIG.files.backupDir;
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `lazy-loading-${timestamp}`);
  fs.mkdirSync(backupPath, { recursive: true });
  
  const backups = [];
  
  ROLLBACK_CONFIG.components.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        const backupFile = path.join(backupPath, path.basename(file));
        fs.copyFileSync(file, backupFile);
        backups.push(backupFile);
        console.log(`   ✅ Backed up: ${file}`);
      }
    } catch (error) {
      console.error(`   ❌ Failed to backup ${file}:`, error.message);
    }
  });
  
  return { backupPath, backups };
}

/**
 * Create Git commit for current state
 */
function createGitCommit(message) {
  console.log(`📝 Creating Git commit: ${message}`);
  
  try {
    // Add all changes
    execSync('git add .', { stdio: 'pipe' });
    
    // Create commit
    execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
    
    console.log('   ✅ Git commit created successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to create Git commit:', error.message);
    return false;
  }
}

/**
 * Create Git tag for rollback point
 */
function createGitTag(tagName) {
  console.log(`🏷️  Creating Git tag: ${tagName}`);
  
  try {
    execSync(`git tag -a ${tagName} -m "Rollback point: ${tagName}"`, { stdio: 'pipe' });
    console.log('   ✅ Git tag created successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to create Git tag:', error.message);
    return false;
  }
}

/**
 * Rollback to specific commit
 */
function rollbackToCommit(commitHash) {
  console.log(`🔄 Rolling back to commit: ${commitHash}`);
  
  try {
    execSync(`git reset --hard ${commitHash}`, { stdio: 'pipe' });
    console.log('   ✅ Rollback completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to rollback:', error.message);
    return false;
  }
}

/**
 * Rollback to specific tag
 */
function rollbackToTag(tagName) {
  console.log(`🔄 Rolling back to tag: ${tagName}`);
  
  try {
    execSync(`git reset --hard ${tagName}`, { stdio: 'pipe' });
    console.log('   ✅ Rollback completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to rollback to tag:', error.message);
    return false;
  }
}

/**
 * Restore from file backups
 */
function restoreFromBackups(backupPath) {
  console.log(`🔄 Restoring from backups: ${backupPath}`);
  
  try {
    ROLLBACK_CONFIG.components.forEach((file) => {
      const backupFile = path.join(backupPath, path.basename(file));
      
      if (fs.existsSync(backupFile)) {
        fs.copyFileSync(backupFile, file);
        console.log(`   ✅ Restored: ${file}`);
      } else {
        console.warn(`   ⚠️  Backup not found: ${backupFile}`);
      }
    });
    
    console.log('   ✅ File restoration completed');
    return true;
  } catch (error) {
    console.error('❌ Failed to restore from backups:', error.message);
    return false;
  }
}

/**
 * List available rollback points
 */
function listRollbackPoints() {
  console.log('📋 Available rollback points:');
  
  try {
    // List recent commits
    const commits = execSync('git log --oneline -10', { encoding: 'utf8' });
    console.log('\n   Recent commits:');
    commits.split('\n').forEach((commit, index) => {
      if (commit.trim()) {
        console.log(`   ${index + 1}. ${commit}`);
      }
    });
    
    // List tags
    const tags = execSync('git tag -l', { encoding: 'utf8' });
    if (tags.trim()) {
      console.log('\n   Available tags:');
      tags.split('\n').forEach((tag, index) => {
        if (tag.trim()) {
          console.log(`   ${index + 1}. ${tag}`);
        }
      });
    }
    
    // List backup branches
    const branches = execSync('git branch -a | grep backup', { encoding: 'utf8' });
    if (branches.trim()) {
      console.log('\n   Backup branches:');
      branches.split('\n').forEach((branch, index) => {
        if (branch.trim()) {
          console.log(`   ${index + 1}. ${branch.trim()}`);
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Failed to list rollback points:', error.message);
  }
}

/**
 * Generate rollback report
 */
function generateRollbackReport(backupBranch, backupPath, backups) {
  const report = {
    timestamp: new Date().toISOString(),
    git: {
      backupBranch,
      currentCommit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
      currentBranch: execSync('git branch --show-current', { encoding: 'utf8' }).trim(),
    },
    files: {
      backupPath,
      backups,
    },
    rollbackCommands: {
      git: {
        rollbackToBranch: `git checkout ${backupBranch}`,
        rollbackToCommit: `git reset --hard <commit-hash>`,
        rollbackToTag: `git reset --hard <tag-name>`,
      },
      files: {
        restoreFromBackups: `node scripts/rollback-plan.js --restore ${backupPath}`,
      },
    },
  };
  
  const reportPath = path.join(process.cwd(), 'rollback-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Rollback report saved to: ${reportPath}`);
  return report;
}

/**
 * Main rollback plan execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--list')) {
    listRollbackPoints();
    return;
  }
  
  if (args.includes('--restore')) {
    const backupPath = args[args.indexOf('--restore') + 1];
    if (backupPath) {
      restoreFromBackups(backupPath);
    } else {
      console.error('❌ Please provide backup path');
    }
    return;
  }
  
  console.log('🛡️  Setting up rollback plan for lazy loading implementation...\n');
  
  // Step 1: Create Git backup
  let backupBranch = null;
  if (ROLLBACK_CONFIG.git.enabled) {
    backupBranch = createGitBackup();
  }
  
  // Step 2: Create file backups
  let backupPath = null;
  let backups = [];
  if (ROLLBACK_CONFIG.files.createBackups) {
    const backupResult = createFileBackups();
    backupPath = backupResult.backupPath;
    backups = backupResult.backups;
  }
  
  // Step 3: Create Git commit
  const commitMessage = 'feat: implement lazy loading strategy for images';
  const commitCreated = createGitCommit(commitMessage);
  
  // Step 4: Create Git tag
  let tagCreated = false;
  if (ROLLBACK_CONFIG.git.createTags && commitCreated) {
    const tagName = `lazy-loading-${Date.now()}`;
    tagCreated = createGitTag(tagName);
  }
  
  // Step 5: Generate rollback report
  const report = generateRollbackReport(backupBranch, backupPath, backups);
  
  console.log('\n✅ Rollback plan setup completed!');
  console.log('\n📋 Rollback options:');
  console.log('   1. Git rollback:');
  if (backupBranch) {
    console.log(`      - To backup branch: git checkout ${backupBranch}`);
  }
  if (tagCreated) {
    console.log(`      - To tag: git reset --hard <tag-name>`);
  }
  console.log('      - To commit: git reset --hard <commit-hash>');
  console.log('   2. File rollback:');
  if (backupPath) {
    console.log(`      - From backups: node scripts/rollback-plan.js --restore ${backupPath}`);
  }
  console.log('   3. List options: node scripts/rollback-plan.js --list');
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Rollback plan setup failed:', error.message);
    process.exit(1);
  });
}

module.exports = { 
  createGitBackup, 
  createFileBackups, 
  rollbackToCommit, 
  rollbackToTag, 
  restoreFromBackups,
  listRollbackPoints 
};










