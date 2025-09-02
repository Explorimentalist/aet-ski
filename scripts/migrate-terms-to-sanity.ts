// scripts/migrate-terms-to-sanity.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'hns0qja9',
  dataset: 'production',
  apiVersion: '2025-01-29',
  token: process.env.SANITY_API_TOKEN, // Make sure this is set
  useCdn: false,
})

const termsSections = [
  {
    id: 'definitions',
    number: 1,
    title: 'Definitions',
    content: 'Lead Passenger - person that has made the booking for them self or on behalf of the party travelling under the same reference number. Passenger Party - are the rest of the group under the same reference number as the Lead Passenger. AET – Alps en route Transfers SARL. Services - the provision of transfers of persons, luggage and equipment from one location to another as requested by the Lead Passenger. Partners - other transfer operators who from time to time may provide services on behalf of AET.',
    isActive: true
  },
  {
    id: 'bookings',
    number: 2,
    title: 'Bookings and reservations',
    content: 'All bookings are to be made by email. AET will email the Lead Passenger with an invoice and its Terms and Conditions. Once the invoice has been paid in total, the booking is subject to, and the Lead Passenger accepts AET\'s Terms and Conditions. AET will then email the Lead Passenger with confirmation and the booking is reserved.',
    isActive: true
  },
  {
    id: 'cancellations',
    number: 3,
    title: 'Cancellations/Refunds/Credits',
    content: 'Any Cancellations must be e-mailed. Cancellations made 4 or more weeks before date of travel 75% refund. Cancellations made 2 to 4 weeks before date of travel 50% refund. Cancellations made 2 or less weeks before date of travel 100% loss. Cancelation refunds will be made via bank transfer if the Cancellation Credit is not accepted by the Lead Passenger. Local or Global pandemics forcing airports or resorts to close, in which Cancellations/Refunds/Credits section above comes into effect at AET\'s discretion.',
    isActive: true
  },
  {
    id: 'data-security',
    number: 4,
    title: 'Data security and privacy',
    content: 'Only required details are held on file by AET for either contacting the lead passenger or important information regarding the completion of the paid services. AET will only supply Partners with relevant information should we need to book another service.',
    isActive: true
  },
  {
    id: 'flight-delays',
    number: 5,
    title: 'Flight Delays, Cancellations and Diversions',
    content: 'If your flight is delayed, we will attempt to monitor flights, but it is the responsibility of the Lead Passenger or a member of the Passenger Party to contact AET as soon as possible. Failure to contact AET may result in the driver unable to undergo the transfer. This will be at the cost of the Lead Passenger. Any delay over 1 hour is subject to 45€ per hour waiting time fee, payable to the driver upon arrival. AET will endeavour to arrange alternate travel if AET cannot wait for the delay. If alternate travel is not available then the transfer will be cancelled and no refund given. In the case you will need to pay for a substitute transfer you may be able to claim from insurances or the airline providing the receipt is kept. If a flight is diverted extra charges will apply, paid directly to the AET driver on arrival in cash. The driver will not leave the original arrival airport until there is an agreement between the lead passenger and AET.',
    isActive: true
  },
  {
    id: 'property-baggage',
    number: 6,
    title: 'Property and Baggage',
    content: 'All of the AET vehicles are fully insured for passenger and third party claims. Whilst every care is always taken however, your property is carried entirely at your own risk and no responsibility can be accepted for loss or damage. Customers are therefore advised to check that their own travel insurance covers such damage and/or losses. Each person travelling are limited to two items of luggage including a ski or snowboard bag. Any excess luggage must be declared at the time of booking. In the event of a client having excess luggage, AET reserve the right to refuse to transport the items. If any excess baggage cannot travel AET holds the right to deny the travel of the excess baggage at the Lead Passenger\'s expense.',
    isActive: true
  },
  {
    id: 'child-seats',
    number: 7,
    title: 'Baby, Child, and Booster Seats',
    content: 'Baby, child, and booster seats are provided free of charge providing they are pre-booked by the customer at least 72 hours before travel. It is the responsibility of the Lead Passenger or the parent of the child to notify AET of the child\'s age, height and weight at least 72 hours before travel. Failure to do so could result in refusal to carry the child if the child is not in the correct seat required by law. Children of all ages are required by law to have their own appropriate seat.',
    isActive: true
  },
  {
    id: 'failure-outside-control',
    number: 8,
    title: 'Failure to provide confirmed Services due to reasons out of AET\'s control',
    content: 'AET will use every reasonable means to ensure that the vehicle(s) arrives on time to begin the period of hire and that it reaches its destination on time. AET will not incur any liability whatsoever in the event of any delay due to causes beyond its control. However, circumstances beyond our control may prevent the achievement of this responsibility. The following are examples (not an exhaustive list) of circumstances which are not within our control: • Road accidents, road closures or un-predicted traffic delays. • Vehicle breakdown. • Restricted vehicular access. • Exceptional or severe weather conditions such as heavy snowfall, avalanche, or landslides. • Industrial action. • The vehicle being held or delayed by a police officer or government official. • Local or global pandemics forcing airports and/or resorts to close. • Other circumstances affecting passenger safety. • Previous customer problems or delays.',
    isActive: true
  },
  {
    id: 'failure-within-control',
    number: 9,
    title: 'Failure to provide confirmed Services due to reasons within AET\'s control',
    content: 'If AET fail for any reason within our control to deliver its passengers to their confirmed destination, AET will provide suitable alternative transport to carry its clients to their stated destination. Any reimbursement made by AET for the costs of an alternative means of transport incurred by the passenger to get to their ticketed destination shall be no more than the cost of getting to that destination by taxi.',
    isActive: true
  },
  {
    id: 'damage-soiling',
    number: 10,
    title: 'Damage and Soiling of Vehicles',
    content: 'Any soiling that cannot be easily cleaned by the driver and needs to be professionally cleaned, will be charged to the Lead Passenger. Any other damage caused by a member of the party, the Lead Passenger is liable for any costs for repairs to the damage.',
    isActive: true
  },
  {
    id: 'refusal-carriage',
    number: 11,
    title: 'Refusal of Carriage',
    content: 'Smoking and alcohol are prohibited in any of AET\'s vehicles. AET can refuse carriage to any passenger or eject any party members at any point that are: displaying Covid related symptoms, violent, engaged in sexual acts, under the influence of alcohol or drugs. AET can refuse carriage to any passenger or eject any party members if there is any risk to the driver or AET property.',
    isActive: true
  }
]

async function migrateTermsToSanity() {
  try {
    console.log('🚀 Starting Terms and Conditions migration...')
    
    // Check if terms already exist
    const existingTerms = await client.fetch('*[_type == "terms"]')
    
    if (existingTerms.length > 0) {
      console.log('⚠️  Terms already exist in Sanity. Skipping migration.')
      console.log('Existing terms:', existingTerms)
      return
    }
    
    // Create the terms document
    const result = await client.create({
      _type: 'terms',
      title: 'Terms and conditions',
      sections: termsSections,
      lastUpdated: new Date().toISOString(),
      version: '1.0',
    })
    
    console.log('✅ Successfully migrated Terms and Conditions to Sanity!')
    console.log('Document ID:', result._id)
    console.log('Sections created:', result.sections.length)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateTermsToSanity()
