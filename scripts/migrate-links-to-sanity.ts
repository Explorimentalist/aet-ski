// scripts/migrate-links-to-sanity.ts
import { sanityClient } from '@/lib/sanity'

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

// Category mapping from variable names to schema categories
const CATEGORY_MAP: Record<string, string> = {
  'airlinesData': 'Airlines',
  'resortsData': 'Resorts',
  'trainsData': 'Trains',
  'chaletAccommodationData': 'Chalet accommodation',
  'selfCateredAccommodationData': 'Self-catered Accommodation',
  'weatherData': 'Weather',
  'skiSchoolsData': 'Ski Schools',
  'skiHireData': 'Ski hire',
  'achesAndPainsData': 'Aches and pains',
  'lifeInResortData': 'Life in resort info',
  'informationWebsitesData': 'Information Websites',
  'selfCateringData': 'Self catering',
}

// Extract public ID from logo field (handles getLogoUrl calls and direct strings)
function extractLogoId(logoField: string): string {
  if (typeof logoField !== 'string') {
    console.warn('Logo field is not a string:', logoField)
    return 'fallback-logo'
  }

  // Handle full URLs (keep as-is)
  if (logoField.startsWith('http')) {
    return logoField
  }

  // Handle direct Cloudinary public IDs
  if (!logoField.includes('getLogoUrl') && !logoField.includes('res.cloudinary.com')) {
    return logoField
  }

  // For hardcoded getLogoUrl calls, we'll need to extract manually
  // This is a fallback - ideally we'd parse the actual function calls
  console.warn('Complex logo field detected, may need manual extraction:', logoField)
  return 'needs-manual-extraction'
}

// Validate if a document already exists
async function documentExists(name: string, category: string): Promise<boolean> {
  if (!sanityClient) {
    console.error('Sanity client not available')
    return false
  }

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

// Transform LinkData to SanityLinkDocument
function transformToSanityDocument(
  item: LinkData, 
  categoryName: string, 
  sortOrder: number
): SanityLinkDocument {
  return {
    _type: 'link',
    name: item.companyName,
    url: item.url,
    logo: extractLogoId(item.logo),
    description: item.description,
    category: categoryName,
    sortOrder: sortOrder,
  }
}

// Migrate a single category
async function migrateCategory(
  categoryKey: string,
  data: LinkData[],
  dryRun: boolean = true
): Promise<{ success: number; skipped: number; errors: number }> {
  const categoryName = CATEGORY_MAP[categoryKey]
  if (!categoryName) {
    console.error(`No category mapping found for ${categoryKey}`)
    return { success: 0, skipped: 0, errors: 1 }
  }

  console.log(`\n=== Migrating ${categoryName} (${data.length} items) ===`)
  
  let success = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    console.log(`\n[${i + 1}/${data.length}] Processing: ${item.companyName}`)

    // Check if document already exists
    const exists = await documentExists(item.companyName, categoryName)
    if (exists) {
      console.log(`  ⏭️  Already exists, skipping`)
      skipped++
      continue
    }

    // Transform data
    const document = transformToSanityDocument(item, categoryName, i)
    
    // Log what we would create
    console.log(`  📝 Document preview:`)
    console.log(`     Name: ${document.name}`)
    console.log(`     URL: ${document.url}`)
    console.log(`     Logo: ${document.logo}`)
    console.log(`     Category: ${document.category}`)
    console.log(`     Sort Order: ${document.sortOrder}`)
    if (document.description) {
      console.log(`     Description: ${document.description.substring(0, 100)}...`)
    }

    if (dryRun) {
      console.log(`  🔍 DRY RUN: Would create document`)
      success++
    } else {
      // Actually create the document
      try {
        if (!sanityClient) {
          throw new Error('Sanity client not available')
        }
        
        const result = await sanityClient.create(document)
        console.log(`  ✅ Created document with ID: ${result._id}`)
        success++
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`  ❌ Error creating document:`, error)
        errors++
      }
    }
  }

  console.log(`\n${categoryName} Summary:`)
  console.log(`  ✅ Success: ${success}`)
  console.log(`  ⏭️  Skipped: ${skipped}`)
  console.log(`  ❌ Errors: ${errors}`)

  return { success, skipped, errors }
}

// Airlines data for testing (Phase 1) - using full Cloudinary URLs with version IDs
const airlinesData: LinkData[] = [
  {
    id: 'british-airways',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918357/logos/british-airways.svg',
    companyName: 'British Airways',
    url: 'https://www.britishairways.com/',
  },
  {
    id: 'easyjet',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918359/logos/easyjet.svg',
    companyName: 'easyJet',
    url: 'https://www.easyjet.com/',
  },
  {
    id: 'jet2',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918361/logos/jet2.svg',
    companyName: 'Jet2.com',
    url: 'https://www.jet2.com/',
  },
  {
    id: 'airfrance',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918362/logos/airfrance.svg',
    companyName: 'Air France',
    url: 'https://www.airfrance.com/',
  },
  {
    id: 'flybe',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1755528438/logos/flybe.svg',
    companyName: 'Flybe',
    url: 'https://www.flybe.com/',
  },
  {
    id: 'swiss-air',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918366/logos/swiss-air.svg',
    companyName: 'Swiss Air',
    url: 'https://www.swiss.com/',
  },
  {
    id: 'aer-lingus',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1755534754/logos/aer-lingus.svg',
    companyName: 'Aer Lingus',
    url: 'https://www.aerlingus.com/upload/',
  },
  {
    id: 'klm',
    logo: 'https://res.cloudinary.com/dzrn3khsd/image/upload/v1754918366/logos/klm.svg',
    companyName: 'KLM',
    url: 'https://www.klm.com/',
  },
  // Note: etihad logo not found in Cloudinary, keeping existing entry
  {
    id: 'etihad',
    logo: 'https://www.etihad.com/content/dam/eag/etihadairways/etihadcom/2025/global/logo/etihad/Etihad_Logo_BB_White.svg',
    companyName: 'Etihad',
    url: 'https://www.etihad.com/',
  },
]

// Update existing document with new logo URL
async function updateDocumentLogo(
  name: string, 
  category: string, 
  newLogoUrl: string,
  dryRun: boolean = true
): Promise<boolean> {
  if (!sanityClient) {
    console.error('Sanity client not available')
    return false
  }

  try {
    // Find the document
    const query = `*[_type == "link" && name == $name && category == $category][0]`
    const params = { name, category }
    const document = await sanityClient.fetch(query, params)
    
    if (!document) {
      console.log(`  ❌ Document not found: ${name}`)
      return false
    }

    console.log(`  📝 Current logo: ${document.logo}`)
    console.log(`  🔄 New logo: ${newLogoUrl}`)

    if (dryRun) {
      console.log(`  🔍 DRY RUN: Would update document ID ${document._id}`)
      return true
    } else {
      // Actually update the document
      const result = await sanityClient
        .patch(document._id)
        .set({ logo: newLogoUrl })
        .commit()
      
      console.log(`  ✅ Updated document ID: ${result._id}`)
      return true
    }
  } catch (error) {
    console.error(`  ❌ Error updating document:`, error)
    return false
  }
}

// Update existing Airlines with correct logo URLs
async function updateAirlinesLogos(dryRun: boolean = true): Promise<{ success: number; errors: number }> {
  console.log(`\n=== Updating Airlines Logo URLs ===`)
  
  let success = 0
  let errors = 0

  for (const airline of airlinesData) {
    console.log(`\nProcessing: ${airline.companyName}`)
    
    const updated = await updateDocumentLogo(
      airline.companyName, 
      'Airlines', 
      airline.logo,
      dryRun
    )
    
    if (updated) {
      success++
    } else {
      errors++
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log(`\nUpdate Summary:`)
  console.log(`  ✅ Success: ${success}`)
  console.log(`  ❌ Errors: ${errors}`)

  return { success, errors }
}

// Main migration function
async function main() {
  console.log('🚀 Starting Sanity Links Migration Script')
  console.log(`📅 ${new Date().toISOString()}`)
  
  // Check if Sanity client is available
  if (!sanityClient) {
    console.error('❌ Sanity client not configured. Please check your environment variables.')
    process.exit(1)
  }

  console.log('✅ Sanity client configured')

  // Check for update mode
  const isUpdate = process.argv.includes('--update')
  const dryRun = process.argv.includes('--dry-run') !== false // Default to dry run unless --live is specified
  const isLive = process.argv.includes('--live')
  
  console.log(`\n🔧 Mode: ${isUpdate ? 'UPDATE' : 'CREATE'} ${isLive ? 'LIVE' : 'DRY RUN'}`)
  
  if (isLive) {
    console.log('⚠️  WARNING: This will modify actual documents in Sanity!')
    console.log('⚠️  Make sure you have backed up your data!')
  }

  try {
    if (isUpdate) {
      // Update existing documents with new logo URLs
      const results = await updateAirlinesLogos(!isLive)
      
      console.log(`\n📊 Update Results:`)
      console.log(`   ✅ Total Success: ${results.success}`)
      console.log(`   ❌ Total Errors: ${results.errors}`)

      if (results.errors === 0) {
        console.log(`\n🎉 Update completed successfully!`)
        if (!isLive) {
          console.log(`\n💡 To run this for real, use: npm run migrate-links -- --update --live`)
        }
      } else {
        console.log(`\n⚠️  Update completed with errors. Please review the logs above.`)
        process.exit(1)
      }
    } else {
      // Create new documents (original functionality)
      const results = await migrateCategory('airlinesData', airlinesData, !isLive)
      
      console.log(`\n📊 Overall Results:`)
      console.log(`   ✅ Total Success: ${results.success}`)
      console.log(`   ⏭️  Total Skipped: ${results.skipped}`)
      console.log(`   ❌ Total Errors: ${results.errors}`)

      if (results.errors === 0) {
        console.log(`\n🎉 Migration completed successfully!`)
        if (!isLive) {
          console.log(`\n💡 To run this for real, use: npm run migrate-links -- --live`)
        }
      } else {
        console.log(`\n⚠️  Migration completed with errors. Please review the logs above.`)
        process.exit(1)
      }
    }

  } catch (error) {
    console.error('💥 Migration failed with error:', error)
    process.exit(1)
  }
}

// Run the migration
if (require.main === module) {
  main().catch(console.error)
}

export { migrateCategory, extractLogoId, CATEGORY_MAP }