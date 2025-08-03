// src/app/routes/page.tsx
'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { RouteTransfer } from '@/components/RouteTransfer';
import { PageHero } from '@/components/PageHero';

export default function RoutesPage() {
  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-[72px]">
        {/* Page Hero */}
        <PageHero
          heading="Routes"
          description="Deciding which airport to fly into can often be a simple case of choosing the most convenient flight from your local airport in the UK. You may find that the cost of the flight is the deciding factor but it's also important to understand the geography of where you'll arrive as well."
          imageSrc="https://via.placeholder.com/1271x706/CFE0F6/F5F5F5?text=Routes+Map"
          imageAlt="Map showing routes from various airports to ski resorts in the French Alps"
        />

        {/* Geneva Transfer */}
        <RouteTransfer
          heading="Geneva"
          transferStats={{
            departure: "Geneva Airport",
            distance: "135 km",
            eta: "Over 2 hours after departure",
            cost: "€€€"
          }}
          transferDescription="Route description: Takes you away from Geneva via the motorway to Annecy. We then travel south along the shores of Lake Annecy and then onto the town of Albertville. Once in Moutiers it's just a short climb to resort."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Geneva+Transfer+Map"
          mapImageAlt="Map showing transfer route from Geneva Airport to ski resorts"
        />

        {/* Lyon Transfer */}
        <RouteTransfer
          heading="Lyon"
          transferStats={{
            departure: "Lyon Airport",
            distance: "200 km",
            eta: "Over 2 hours after departure",
            cost: "€€€€€"
          }}
          transferDescription="The majority of the transfer is via motorway. there can be a great deal of traffic during the month of February and peak holiday times throughout Europe where journey times can be significantly longer."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Lyon+Transfer+Map"
          mapImageAlt="Map showing transfer route from Lyon Airport to ski resorts"
        />

        {/* Chambéry Transfer */}
        <RouteTransfer
          heading="Chambéry"
          transferStats={{
            departure: "Chambéry Airport",
            distance: "120 km",
            eta: "Under 1:30 hour after departure",
            cost: "€€"
          }}
          transferDescription="In our experience, disruption can be widespread due to many factors including, flights significantly delayed, localised bad weather, overcrowding in the airport and a general lack of information available to passengers. We suggest to avoid a Saturday transfer."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Chambéry+Transfer+Map"
          mapImageAlt="Map showing transfer route from Chambéry Airport to ski resorts"
        />

        {/* Grenoble Transfer */}
        <RouteTransfer
          heading="Grenoble"
          transferStats={{
            departure: "Grenoble Airport",
            distance: "190 km",
            eta: "over 2:15 hours after departure",
            cost: "€€€€"
          }}
          transferDescription="Most of the journey is via motorway as it's a long way from here to the resort. Please don't be fooled into thinking that Grenoble Airport is close to Grenoble. We only carry out Grenoble transfers from Monday to Friday as a rule, due to our focus on the other airports at the weekend. However, please contact us to see if we can accommodate your Saturday or Sunday requests as we will endeavour to do so wherever possible."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Grenoble+Transfer+Map"
          mapImageAlt="Map showing transfer route from Grenoble Airport to ski resorts"
        />

        {/* Eurostar and TGV - Moutiers Station */}
        <RouteTransfer
          heading="Eurostar and TGV - Moutiers Station"
          transferStats={{
            departure: "Moutiers Station",
            distance: "N/A",
            eta: "Around 30 minutes after departure",
            cost: "€"
          }}
          transferDescription="A very popular transport hub due to its close proximity to resort. There is a direct Eurostar service from London twice each Saturday throughout the winter. You will avoid all major hold-ups en route during the busiest weekends on the roads during the season. Online bookings are not available for this journey so please contact us to see if we can accommodate your particular dates. Unfortunately, this service is not available to resorts within the Val Thorens valley."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Eurostar+TGV+Moutiers+Station+Map"
          mapImageAlt="Map showing Eurostar and TGV routes to Moutiers Station"
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 