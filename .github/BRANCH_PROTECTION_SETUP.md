# Branch Protection Setup Guide

This guide explains how to configure branch protection rules for the AET.ski repository to ensure code quality and prevent accidental changes to the main branch.

## Required Branch Protection Rules

### 1. Main Branch Protection

Navigate to: `https://github.com/Explorimentalist/aet-ski/settings/branches`

**Configure the following rules for the `main` branch:**

#### Basic Protection
- ✅ **Require a pull request before merging**
  - Required number of reviewers: `1`
  - Dismiss stale PR approvals when new commits are pushed: `✅`
  - Require review from code owners: `✅`

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging: `✅`
  - Required status checks:
    - `test` (Test & Lint job)
    - `build` (Build & Deploy job)
    - `security` (Security Scan job)

- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits**
- ✅ **Require linear history**
- ✅ **Include administrators**

#### Advanced Protection
- ✅ **Restrict pushes that create files larger than 100MB**
- ✅ **Require deployments to succeed before merging** (if using deployment branches)

### 2. Develop Branch Protection

**Configure similar rules for the `develop` branch:**

- ✅ **Require a pull request before merging**
- ✅ **Require status checks to pass before merging**
  - Required status checks:
    - `test` (Test & Lint job)
    - `deploy-staging` (Deploy to Staging job)

### 3. Feature Branch Rules

**For feature branches (feature/*):**
- ✅ **Require a pull request before merging**
- ✅ **Require status checks to pass before merging**
  - Required status checks:
    - `test` (Test & Lint job)

## Code Owners Configuration

Create a `.github/CODEOWNERS` file to automatically assign reviewers:

```
# Global code owners
* @Explorimentalist

# Critical files
/.github/ @Explorimentalist
/src/app/api/ @Explorimentalist
/src/components/MultiStepForm.tsx @Explorimentalist
/src/components/booking/ @Explorimentalist

# Configuration files
package.json @Explorimentalist
next.config.ts @Explorimentalist
tailwind.config.ts @Explorimentalist
```

## Required Status Checks

The following status checks must pass before merging:

### For Main Branch:
1. **Test & Lint** - Runs unit tests, linting, and type checking
2. **Build & Deploy** - Builds the application and deploys to production
3. **Security Scan** - Runs security audits and vulnerability scans

### For Develop Branch:
1. **Test & Lint** - Runs unit tests, linting, and type checking
2. **Deploy to Staging** - Builds and deploys to staging environment

## Setting Up Branch Protection

### Step 1: Navigate to Branch Settings
1. Go to `https://github.com/Explorimentalist/aet-ski`
2. Click on "Settings" tab
3. Click on "Branches" in the left sidebar

### Step 2: Add Branch Protection Rule
1. Click "Add rule" or "Add branch protection rule"
2. In "Branch name pattern", enter `main`
3. Configure the protection settings as described above
4. Click "Create" or "Save changes"

### Step 3: Repeat for Other Branches
1. Add protection rule for `develop` branch
2. Add protection rule for `feature/*` pattern (optional)

## Workflow Integration

The branch protection rules work with the following GitHub Actions workflows:

- **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
- **Deploy to Staging** (`.github/workflows/deploy-staging.yml`)
- **Performance Testing** (`.github/workflows/performance-test.yml`)
- **Dependency Update** (`.github/workflows/dependency-update.yml`)

## Benefits of Branch Protection

1. **Code Quality**: Ensures all code is reviewed before merging
2. **Automated Testing**: Prevents broken code from reaching production
3. **Security**: Blocks commits that don't pass security scans
4. **Deployment Safety**: Ensures only tested code is deployed
5. **Team Collaboration**: Enforces consistent development practices

## Emergency Override

In case of emergencies, administrators can:
1. Temporarily disable branch protection
2. Use force push (if allowed)
3. Merge directly (if "Include administrators" is unchecked)

## Monitoring

Monitor branch protection effectiveness by:
1. Checking PR merge statistics
2. Reviewing failed status checks
3. Monitoring deployment success rates
4. Tracking code review metrics

## Troubleshooting

### Common Issues:

1. **"Required status check is not set"**
   - Ensure the workflow file exists and is properly configured
   - Check that the job names match the required status checks

2. **"No reviews required"**
   - Verify that reviewers are assigned or code owners are configured
   - Check that the CODEOWNERS file is properly formatted

3. **"Branch is not up to date"**
   - Update the branch with the latest changes from main
   - Use "Update branch" button in the PR interface

### Getting Help:

- Check GitHub Actions logs for detailed error messages
- Verify branch protection settings in repository settings
- Ensure all required workflows are properly configured
