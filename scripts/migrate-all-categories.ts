// scripts/migrate-all-categories.ts
// Full production migration with progress logging and batch processing

import { sanityClient } from '@/lib/sanity'
import { FULL_MIGRATION_DATA, CATEGORY_MAPPING } from './extract-hardcoded-data'

interface LinkData {
  id: string;
  logo: string;
  companyName: string;
  url: string;
  description?: string;
}

interface SanityLinkDocument {
  _type: 'link';
  name: string;
  url: string;
  logo: string;
  description?: string;
  category: string;
  sortOrder?: number;
}

interface MigrationStats {
  total: number;
  created: number;
  skipped: number;
  errors: number;
  categories: Record<string, { created: number; skipped: number; errors: number }>;
}

// Progress tracking
let overallStats: MigrationStats = {
  total: 0,
  created: 0,
  skipped: 0,
  errors: 0,
  categories: {}
};

// Check if document exists
async function documentExists(name: string, category: string): Promise<boolean> {
  if (!sanityClient) return false;
  try {
    const query = `*[_type == "link" && name == $name && category == $category]`
    const params = { name, category }
    const results = await sanityClient.fetch(query, params)
    return results.length > 0
  } catch (error) {
    console.error('Error checking document existence:', error)
    return false
  }
}

// Transform data to Sanity document
function transformToSanityDocument(
  item: LinkData, 
  categoryName: string, 
  sortOrder: number
): SanityLinkDocument {
  return {
    _type: 'link',
    name: item.companyName,
    url: item.url,
    logo: item.logo, // Already full URLs with version IDs
    description: item.description,
    category: categoryName,
    sortOrder: sortOrder,
  }
}

// Migrate single category with enhanced progress tracking
async function migrateCategory(
  categoryKey: string,
  data: LinkData[],
  dryRun: boolean = true
): Promise<{ success: number; skipped: number; errors: number }> {
  const categoryName = CATEGORY_MAPPING[categoryKey as keyof typeof CATEGORY_MAPPING]
  if (!categoryName) {
    console.error(`❌ No category mapping found for ${categoryKey}`)
    return { success: 0, skipped: 0, errors: 0 }
  }

  console.log(`\n🏷️  === ${categoryName.toUpperCase()} (${data.length} items) ===`)
  
  let success = 0
  let skipped = 0
  let errors = 0

  // Initialize category stats
  overallStats.categories[categoryName] = { created: 0, skipped: 0, errors: 0 }

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const progress = `[${i + 1}/${data.length}]`
    
    console.log(`\n${progress} 🔄 ${item.companyName}`)

    // Check if exists
    const exists = await documentExists(item.companyName, categoryName)
    if (exists) {
      console.log(`  ⏭️  Already exists, skipping`)
      skipped++
      overallStats.categories[categoryName].skipped++
      continue
    }

    // Transform data
    const document = transformToSanityDocument(item, categoryName, i)
    
    // Validate logo URL format
    const logoFormat = document.logo.endsWith('.svg') ? 'SVG' : 
                      document.logo.endsWith('.png') ? 'PNG' :
                      document.logo.endsWith('.webp') ? 'WEBP' :
                      document.logo.endsWith('.jpg') ? 'JPG' :
                      document.logo.endsWith('.gif') ? 'GIF' : 'UNKNOWN'
    
    console.log(`  📝 Format: ${logoFormat} | URL: ${document.logo.substring(0, 80)}...`)

    if (dryRun) {
      console.log(`  🔍 DRY RUN: Would create document`)
      success++
      overallStats.categories[categoryName].created++
    } else {
      try {
        if (!sanityClient) throw new Error('Sanity client not available')
        
        const result = await sanityClient.create(document)
        console.log(`  ✅ Created: ${result._id}`)
        success++
        overallStats.categories[categoryName].created++
        
        // Rate limiting - 100ms delay
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`  ❌ Error:`, error)
        errors++
        overallStats.categories[categoryName].errors++
      }
    }
    
    // Update overall progress
    overallStats.total++
    const overallProgress = Math.round((overallStats.total / getTotalDocuments()) * 100)
    console.log(`  📊 Overall Progress: ${overallProgress}% (${overallStats.total}/${getTotalDocuments()})`)
  }

  console.log(`\n📋 ${categoryName} Summary:`)
  console.log(`   ✅ Success: ${success}`)
  console.log(`   ⏭️  Skipped: ${skipped}`) 
  console.log(`   ❌ Errors: ${errors}`)

  return { success, skipped, errors }
}

// Calculate total documents across all categories
function getTotalDocuments(): number {
  return Object.values(FULL_MIGRATION_DATA).reduce((total, data) => total + data.length, 0)
}

// Print final migration report
function printFinalReport() {
  console.log(`\n🎯 === FINAL MIGRATION REPORT ===`)
  console.log(`📊 Overall Statistics:`)
  console.log(`   📈 Total Documents: ${overallStats.total}`)
  console.log(`   ✅ Created: ${overallStats.created}`)
  console.log(`   ⏭️  Skipped: ${overallStats.skipped}`)
  console.log(`   ❌ Errors: ${overallStats.errors}`)
  
  const successRate = Math.round((overallStats.created / (overallStats.created + overallStats.errors)) * 100)
  console.log(`   📈 Success Rate: ${successRate}%`)
  
  console.log(`\n📂 By Category:`)
  Object.entries(overallStats.categories).forEach(([category, stats]) => {
    const total = stats.created + stats.skipped + stats.errors
    console.log(`   ${category}: ${stats.created}✅ ${stats.skipped}⏭️ ${stats.errors}❌ (${total} total)`)
  })
  
  console.log(`\n🏆 Top Categories by Volume:`)
  const sortedCategories = Object.entries(overallStats.categories)
    .sort(([,a], [,b]) => (b.created + b.skipped + b.errors) - (a.created + a.skipped + a.errors))
    .slice(0, 5)
  
  sortedCategories.forEach(([category, stats], index) => {
    const total = stats.created + stats.skipped + stats.errors
    console.log(`   ${index + 1}. ${category}: ${total} items`)
  })
}

// Main migration orchestrator
async function main() {
  console.log('🚀 === PHASE 2: FULL PRODUCTION MIGRATION ===')
  console.log(`⚡ 10x Engineer Mode: ACTIVATED`)
  console.log(`📅 ${new Date().toISOString()}`)
  console.log(`📊 Total Categories: ${Object.keys(CATEGORY_MAPPING).length}`)
  console.log(`📈 Total Documents: ${getTotalDocuments()}`)
  
  if (!sanityClient) {
    console.error('❌ Sanity client not configured')
    process.exit(1)
  }

  console.log('✅ Sanity client configured')

  const dryRun = !process.argv.includes('--live')
  console.log(`\n🔧 Mode: ${dryRun ? '🔍 DRY RUN' : '🚀 LIVE MIGRATION'}`)
  
  if (!dryRun) {
    console.log('⚠️  WARNING: LIVE MIGRATION - Creating actual documents!')
    console.log('⚠️  Ensure data backup completed!')
  }

  const startTime = Date.now()

  try {
    // Reset stats
    overallStats = {
      total: 0,
      created: 0,
      skipped: 0,
      errors: 0,
      categories: {}
    }

    // Process all categories in order of importance
    const categoryOrder = [
      'airlinesData',      // Already migrated - will skip
      'resortsData',       // High priority
      'chaletAccommodationData', // High volume
      'skiSchoolsData',
      'skiHireData',
      'trainsData',
      'selfCateredAccommodationData',
      'informationWebsitesData',
      'weatherData',
      'achesAndPainsData',
      'lifeInResortData',
      'selfCateringData',
    ]

    for (const categoryKey of categoryOrder) {
      const data = FULL_MIGRATION_DATA[categoryKey as keyof typeof FULL_MIGRATION_DATA]
      if (!data || data.length === 0) {
        console.log(`\n⚠️  Skipping empty category: ${categoryKey}`)
        continue
      }

      const result = await migrateCategory(categoryKey, data, dryRun)
      
      // Update overall stats
      overallStats.created += result.success
      overallStats.skipped += result.skipped
      overallStats.errors += result.errors
      
      // Brief pause between categories
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const endTime = Date.now()
    const duration = Math.round((endTime - startTime) / 1000)

    printFinalReport()
    
    console.log(`\n⏱️  Migration completed in ${duration}s`)
    
    if (overallStats.errors === 0) {
      console.log(`\n🎉 MIGRATION SUCCESS! All documents processed without errors.`)
      if (dryRun) {
        console.log(`\n💡 Ready for live migration: npm run migrate-all -- --live`)
      } else {
        console.log(`\n🎯 Live migration complete! Check Sanity Studio for verification.`)
      }
    } else {
      console.log(`\n⚠️  Migration completed with ${overallStats.errors} errors. Review logs above.`)
      if (!dryRun) process.exit(1)
    }

  } catch (error) {
    console.error('💥 Migration failed:', error)
    process.exit(1)
  }
}

// Export for testing
export { migrateCategory, documentExists, transformToSanityDocument }

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}