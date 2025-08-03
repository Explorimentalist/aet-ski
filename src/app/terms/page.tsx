// src/app/terms/page.tsx
'use client';

import { useState, useEffect } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useStickyNavigation } from '@/hooks/useStickyNavigation';
import { Download } from 'lucide-react';

interface TermsSection {
  id: string;
  number: string;
  title: string;
  content: string;
}

const termsSections: TermsSection[] = [
  {
    id: 'definitions',
    number: '1',
    title: 'Definitions',
    content: 'Lead Passenger - person that has made the booking for them self or on behalf of the party travelling under the same reference number. Passenger Party - are the rest of the group under the same reference number as the Lead Passenger. AET – Alps en route Transfers SARL. Services - the provision of transfers of persons, luggage and equipment from one location to another as requested by the Lead Passenger. Partners - other transfer operators who from time to time may provide services on behalf of AET.'
  },
  {
    id: 'bookings',
    number: '2',
    title: 'Bookings and reservations',
    content: 'All bookings are to be made by email. AET will email the Lead Passenger with an invoice and its Terms and Conditions. Once the invoice has been paid in total, the booking is subject to, and the Lead Passenger accepts AET\'s Terms and Conditions. AET will then email the Lead Passenger with confirmation and the booking is reserved.'
  },
  {
    id: 'cancellations',
    number: '3',
    title: 'Cancellations/Refunds/Credits',
    content: 'Any Cancellations must be e-mailed. Cancellations made 4 or more weeks before date of travel 75% refund. Cancellations made 2 to 4 weeks before date of travel 50% refund. Cancellations made 2 or less weeks before date of travel 100% loss. Cancelation refunds will be made via bank transfer if the Cancellation Credit is not accepted by the Lead Passenger. Local or Global pandemics forcing airports or resorts to close, in which Cancellations/Refunds/Credits section above comes into effect at AET\'s discretion.'
  },
  {
    id: 'data-security',
    number: '4',
    title: 'Data security and privacy',
    content: 'Only required details are held on file by AET for either contacting the lead passenger or important information regarding the completion of the paid services. AET will only supply Partners with relevant information should we need to book another service.'
  },
  {
    id: 'flight-delays',
    number: '5',
    title: 'Flight Delays, Cancellations and Diversions',
    content: 'If your flight is delayed, we will attempt to monitor flights, but it is the responsibility of the Lead Passenger or a member of the Passenger Party to contact AET as soon as possible. Failure to contact AET may result in the driver unable to undergo the transfer. This will be at the cost of the Lead Passenger. Any delay over 1 hour is subject to 45€ per hour waiting time fee, payable to the driver upon arrival. AET will endeavour to arrange alternate travel if AET cannot wait for the delay. If alternate travel is not available then the transfer will be cancelled and no refund given. In the case you will need to pay for a substitute transfer you may be able to claim from insurances or the airline providing the receipt is kept. If a flight is diverted extra charges will apply, paid directly to the AET driver on arrival in cash. The driver will not leave the original arrival airport until there is an agreement between the lead passenger and AET.'
  },
  {
    id: 'property-baggage',
    number: '6',
    title: 'Property and Baggage',
    content: 'All of the AET vehicles are fully insured for passenger and third party claims. Whilst every care is always taken however, your property is carried entirely at your own risk and no responsibility can be accepted for loss or damage. Customers are therefore advised to check that their own travel insurance covers such damage and/or losses. Each person travelling are limited to two items of luggage including a ski or snowboard bag. Any excess luggage must be declared at the time of booking. In the event of a client having excess luggage, AET reserve the right to refuse to transport the items. If any excess baggage cannot travel AET holds the right to deny the travel of the excess baggage at the Lead Passenger\'s expense.'
  },
  {
    id: 'child-seats',
    number: '7',
    title: 'Baby, Child, and Booster Seats',
    content: 'Baby, child, and booster seats are provided free of charge providing they are pre-booked by the customer at least 72 hours before travel. It is the responsibility of the Lead Passenger or the parent of the child to notify AET of the child\'s age, height and weight at least 72 hours before travel. Failure to do so could result in refusal to carry the child if the child is not in the correct seat required by law. Children of all ages are required by law to have their own appropriate seat.'
  },
  {
    id: 'failure-outside-control',
    number: '8',
    title: 'Failure to provide confirmed Services due to reasons out of AET\'s control',
    content: 'AET will use every reasonable means to ensure that the vehicle(s) arrives on time to begin the period of hire and that it reaches its destination on time. AET will not incur any liability whatsoever in the event of any delay due to causes beyond its control. However, circumstances beyond our control may prevent the achievement of this responsibility. The following are examples (not an exhaustive list) of circumstances which are not within our control: • Road accidents, road closures or un-predicted traffic delays. • Vehicle breakdown. • Restricted vehicular access. • Exceptional or severe weather conditions such as heavy snowfall, avalanche, or landslides. • Industrial action. • The vehicle being held or delayed by a police officer or government official. • Local or global pandemics forcing airports and/or resorts to close. • Other circumstances affecting passenger safety. • Previous customer problems or delays.'
  },
  {
    id: 'failure-within-control',
    number: '9',
    title: 'Failure to provide confirmed Services due to reasons within AET\'s control',
    content: 'If AET fail for any reason within our control to deliver its passengers to their confirmed destination, AET will provide suitable alternative transport to carry its clients to their stated destination. Any reimbursement made by AET for the costs of an alternative means of transport incurred by the passenger to get to their ticketed destination shall be no more than the cost of getting to that destination by taxi.'
  },
  {
    id: 'damage-soiling',
    number: '10',
    title: 'Damage and Soiling of Vehicles',
    content: 'Any soiling that cannot be easily cleaned by the driver and needs to be professionally cleaned, will be charged to the Lead Passenger. Any other damage caused by a member of the party, the Lead Passenger is liable for any costs for repairs to the damage.'
  },
  {
    id: 'refusal-carriage',
    number: '11',
    title: 'Refusal of Carriage',
    content: 'Smoking and alcohol are prohibited in any of AET\'s vehicles. AET can refuse carriage to any passenger or eject any party members at any point that are: displaying Covid related symptoms, violent, engaged in sexual acts, under the influence of alcohol or drugs. AET can refuse carriage to any passenger or eject any party members if there is any risk to the driver or AET property.'
  }
];

export default function TermsPage() {
  const [navigationItems, setNavigationItems] = useState(
    termsSections.map(section => ({
      id: section.id,
      number: section.number,
      title: section.title,
      isActive: section.id === 'definitions'
    }))
  );

  // Use sticky navigation hook with 84px trigger offset
  const { navigationRef, containerRef } = useStickyNavigation({
    triggerOffset: 84,
    enabled: true
  });

  // Scroll spy functionality
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setNavigationItems(prev => 
            prev.map(item => ({
              ...item,
              isActive: item.id === sectionId
            }))
          );
        }
      });
    }, observerOptions);

    // Observe all section elements
    termsSections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setNavigationItems(prev => 
      prev.map(item => ({
        ...item,
        isActive: item.id === sectionId
      }))
    );

    // Scroll to section with proper offset
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset to account for fixed header and provide better positioning
      const headerHeight = window.innerWidth >= 1024 ? 72 : 56; // Desktop vs mobile header height
      const offset = headerHeight + 100; // Additional offset for better visibility
      
      const elementTop = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download functionality
    console.log('Download PDF clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content with proper spacing for fixed navigation */}
      <div className="pt-14 md:pt-[72px]"> {/* Add top padding to account for fixed navigation on all devices */}
        {/* Header */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight tracking-tight">
              Terms and conditions
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Side Navigation Container */}
            <div className="lg:col-span-4" ref={containerRef}>
              {/* Side Navigation */}
              <div ref={navigationRef}>
                <SideNavigation 
                  items={navigationItems}
                  onItemClick={handleSectionClick}
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-start-7 lg:col-span-6">
              <div className="space-y-12">
                {termsSections.map((section) => (
                  <section 
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 leading-relaxed tracking-tight">
                      {section.number}. {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-base font-medium text-gray-700 leading-relaxed tracking-tight">
                        {section.content}
                      </p>
                    </div>
                  </section>
                ))}
              </div>

              {/* Download Button */}
              <div className="mt-12 pt-8 flex justify-end">
                <Button
                  onClick={handleDownloadPDF}
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center gap-2" data-download-button
                >
                  <Download className="w-4 h-4" />
                  Download T&Cs in PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 