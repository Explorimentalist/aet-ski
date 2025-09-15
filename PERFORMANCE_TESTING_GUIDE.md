# Performance Testing & Validation Guide

## Phase 4: Performance Testing & Validation Implementation

This guide covers the comprehensive performance testing infrastructure implemented for the AET.ski lazy loading optimization project.

## 🚀 Quick Start

### Run All Performance Tests
```bash
npm run validate:performance
```

### Run Individual Test Suites
```bash
# Unit and performance tests
npm run test:performance

# Lighthouse CI
npm run lighthouse:ci

# PageSpeed Insights (requires API key)
npm run pagespeed

# WebPageTest (requires API key)
npm run webpagetest

# Full performance suite
npm run perf:full
```

## 🛠️ Tools & Infrastructure

### 1. Lighthouse CI
- **Purpose**: Automated performance testing with Core Web Vitals
- **Configuration**: `lighthouserc.js`
- **Thresholds**: Performance ≥90, Accessibility ≥95, Best Practices ≥90, SEO ≥90
- **Usage**: `npm run lighthouse:ci`

### 2. PageSpeed Insights
- **Purpose**: Mobile optimization testing
- **Configuration**: `scripts/pagespeed-insights.js`
- **Requirements**: `PAGESPEED_INSIGHTS_API_KEY` environment variable
- **Usage**: `npm run pagespeed`

### 3. WebPageTest
- **Purpose**: Detailed performance analysis with real-world conditions
- **Configuration**: `scripts/webpagetest.js`
- **Requirements**: `WEBPAGETEST_API_KEY` environment variable
- **Usage**: `npm run webpagetest`

### 4. Component Testing Suite
- **Purpose**: Individual component performance validation
- **Location**: `src/tests/performance/`
- **Usage**: `npm run test:performance`

## 🔧 Configuration

### Environment Variables
```bash
# PageSpeed Insights API Key
PAGESPEED_INSIGHTS_API_KEY=your_api_key_here

# WebPageTest API Key
WEBPAGETEST_API_KEY=your_api_key_here

# Lighthouse CI GitHub App Token (for CI/CD)
LHCI_GITHUB_APP_TOKEN=your_token_here
```

### Performance Thresholds
```javascript
const thresholds = {
  performance: 90,        // Lighthouse Performance Score
  accessibility: 95,      // Lighthouse Accessibility Score
  bestPractices: 90,      // Lighthouse Best Practices Score
  seo: 90,               // Lighthouse SEO Score
  fcp: 2000,             // First Contentful Paint (ms)
  lcp: 2500,             // Largest Contentful Paint (ms)
  cls: 0.1,              // Cumulative Layout Shift
  tbt: 300,              // Total Blocking Time (ms)
  si: 3000,              // Speed Index (ms)
};
```

## 🛡️ Safety Measures

### 1. Gradual Migration Strategy
- **Script**: `scripts/migration-strategy.js`
- **Purpose**: Migrate components one at a time with validation
- **Usage**: `npm run migrate` or `npm run migrate:safe`

### 2. Fallback Components
- **Location**: `src/components/fallbacks/`
- **Purpose**: Original implementations as safety net
- **Components**: `PageHeroHomeFallback.tsx`, `LinkListItemFallback.tsx`

### 3. Rollback Plan
- **Script**: `scripts/rollback-plan.js`
- **Features**: Git commits, file backups, tag creation
- **Usage**: `npm run rollback:setup`

## 📊 Test Results & Reports

### Generated Reports
- `lighthouse-report.html` - Lighthouse analysis results
- `lighthouse-mobile-report.html` - Mobile-specific analysis
- `pagespeed-report.json` - PageSpeed Insights results
- `webpagetest-report.json` - WebPageTest analysis
- `performance-validation-report.json` - Comprehensive validation results
- `migration-report.json` - Migration process results
- `rollback-report.json` - Rollback plan documentation

### CI/CD Integration
The performance testing is integrated into the GitHub Actions workflow:
- Unit tests run on every PR
- Performance tests run on every PR
- Lighthouse CI runs on main branch builds
- Rollback plan is set up before deployment

## 🧪 Component Testing

### Image Loading Tests
Tests validate that all image components have proper lazy loading attributes:
- `priority` attribute for above-the-fold content
- `loading="lazy"` for below-the-fold content
- `fetchPriority` for performance optimization
- Proper `alt` text for accessibility

### Performance Tests
Tests validate component performance:
- Render time within acceptable limits
- Memory leak prevention
- Proper attribute implementation
- Responsive image handling

## 🔄 Migration Process

### Step-by-Step Migration
1. **Setup Rollback Plan**: `npm run rollback:setup`
2. **Run Migration**: `npm run migrate`
3. **Validate Results**: `npm run validate:performance`
4. **Deploy if Passed**: Continue with deployment
5. **Rollback if Failed**: Use rollback commands

### Rollback Options
```bash
# List available rollback points
npm run rollback:list

# Rollback to specific commit
git reset --hard <commit-hash>

# Rollback to specific tag
git reset --hard <tag-name>

# Restore from file backups
node scripts/rollback-plan.js --restore <backup-path>
```

## 📈 Performance Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Image Optimization Validation
- Above-the-fold images: `priority={true}`, `loading="eager"`, `fetchPriority="high"`
- Below-the-fold images: `loading="lazy"`, `fetchPriority="low"`
- Responsive images with proper `sizes` attributes
- Optimized Cloudinary URLs with quality settings

## 🚨 Troubleshooting

### Common Issues

#### Lighthouse Tests Failing
- Check if application is running on localhost:3000
- Verify build completed successfully
- Check for console errors in browser

#### PageSpeed Insights API Errors
- Verify API key is set correctly
- Check API quota limits
- Ensure URLs are publicly accessible

#### Component Tests Failing
- Check for missing dependencies
- Verify mock implementations
- Check for TypeScript errors

### Debug Commands
```bash
# Run tests with verbose output
npm run test:performance -- --verbose

# Run Lighthouse with custom configuration
lighthouse http://localhost:3000 --output=html --output-path=./debug-lighthouse.html

# Check component implementations
npm run test:components
```

## 📚 Best Practices

### Development Workflow
1. Implement lazy loading changes
2. Run component tests: `npm run test:performance`
3. Run full validation: `npm run validate:performance`
4. Check Lighthouse scores
5. Deploy if all tests pass

### Performance Optimization
- Use `priority={true}` only for above-the-fold images
- Implement `loading="lazy"` for below-the-fold content
- Add `fetchPriority` attributes for fine-tuned control
- Use responsive images with proper `sizes` attributes
- Optimize Cloudinary URLs with quality settings

### Monitoring & Maintenance
- Run performance tests regularly
- Monitor Core Web Vitals in production
- Update performance thresholds as needed
- Keep testing infrastructure up to date

## 🔗 Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [WebPageTest API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Note**: This performance testing infrastructure ensures that the lazy loading implementation maintains optimal performance while providing comprehensive safety measures for production deployment.



