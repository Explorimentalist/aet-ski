// src/app/test-route-transfer/page.tsx
'use client';

import { RouteTransfer } from '@/components/RouteTransfer';
import { Navigation } from '@/components/Navigation';

export default function TestRouteTransfer() {
  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-[72px]">
        {/* Lyon Transfer Example */}
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

        {/* Geneva Transfer Example */}
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

        {/* Chambery Transfer Example */}
        <RouteTransfer
          heading="Chambery"
          transferStats={{
            departure: "Chambery Airport",
            distance: "120 km",
            eta: "Under 1:30 hour after departure",
            cost: "€€"
          }}
          transferDescription="In our experience, disruption can be widespread due to many factors including, flights significantly delayed, localised bad weather, overcrowding in the airport and a general lack of information available to passengers. We suggest to avoid a Saturday transfer."
          mapImageSrc="https://via.placeholder.com/948x358/CFE0F6/F5F5F5?text=Chambery+Transfer+Map"
          mapImageAlt="Map showing transfer route from Chambery Airport to ski resorts"
        />

        {/* Grenoble Transfer Example */}
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
      </div>
    </main>
  );
} 