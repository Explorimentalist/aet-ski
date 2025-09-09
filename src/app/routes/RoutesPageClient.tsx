'use client';

// src/app/routes/RoutesPageClient.tsx
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { RouteTransfer } from '@/components/RouteTransfer';
import { PageHero } from '@/components/PageHero';
import { MultiStepForm } from '@/components/MultiStepForm';
import { useState, useCallback } from 'react';
import { BookingFormData } from '@/types';
import { PageWrapper, PageContent, PageSection } from '@/motion/PageWrapper';

export default function RoutesPageClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleFormSubmit = useCallback((data: BookingFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission (API call, etc.)
    // Don't close modal here - let the success page handle closing
    // The MultiStepForm will show the success page, and user can close it
  }, []);

  return (
    <>
      {/* Fixed Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />
      
      {/* Main Content */}
      <PageWrapper className="pt-[72px] bg-background-primary">
        {/* Page Hero */}
        <PageHero
          heading="Airport Transfer Routes from Geneva, Lyon & Grenoble"
          description="Deciding which airport to fly into can often be a simple case of choosing the most convenient flight from your local airport in the UK. You may find that the cost of the flight is the deciding factor but it's also important to understand the geography of where you'll arrive as well."
          cloudinaryPublicId="v1754484387/routes_top_map_scw9bx"
          imageAlt="Map showing routes from various airports to ski resorts in the French Alps"
          imageWidth={1200}
          imageHeight={600}
          deviceType="desktop"
          format="auto"
          priority={true}
        />

        {/* Geneva Transfer */}
        <RouteTransfer
          heading="Geneva"
          isRecommended={true}
          transferStats={{
            departure: "Geneva airport / City",
            distance: "120 km",
            eta: "Between 2:30 - 3:30",
            cost: "€€€"
          }}
          transferDescription={"Leaving Geneva airport by motorway to Annecy, we then travel south along the shores of Lake Annecy to the town of Albertville and then to Moutiers. Once at Moutiers it is a further:<ul><li>- <strong>30 mins</strong> to Meribel / Courchevel / St.Martin de Belleville.</li><li>- <strong>1 hour</strong> to Val Thorens / La Plagne / Les Arcs / Tignes / Val d'Isere.</li></ul>"}
          cloudinaryPublicId="v1754484486/Geneva_airport_-_Moutiers_jdaunu"
          mapImageAlt="Map showing transfer route from Geneva Airport to ski resorts"
        />

        {/* Lyon Transfer */}
        <RouteTransfer
          heading="Lyon"
          transferStats={{
            departure: "Lyon airport / City",
            distance: "160 km",
            eta: "Between 2:30 - 4:30",
            cost: "€€€€€"
          }}
          transferDescription={"Leaving Lyon airport the majority of the transfer is via motorway, heavy traffic is to be expected on Saturdays. Once at Moutiers it is a further:<ul><li>- <strong>30 mins</strong> to Meribel / Courchevel / St.Martin de Belleville.</li><li>- <strong>1 hour</strong> to Val Thorens / La Plagne / Les Arcs / Tignes / Val d'Isere.</li></ul>"}
          cloudinaryPublicId="v1755189874/3839c0a0-0adc-4f18-aa8c-230b485e033b"
          mapImageAlt="Map showing transfer route from Lyon Airport to ski resorts"
        />

        {/* Chambéry Transfer */}
        <RouteTransfer
          heading="Chambéry"
          transferStats={{
            departure: "Chambery airport / Town",
            distance: "90 km",
            eta: "Between 1:30 - 2:30",
            cost: "€€€"
          }}
          transferDescription={"Leaving Chambery airport the majority of the transfer is via motorway, heavy traffic is to be expected on Saturdays and bad weather will shut the airport where your arriving will be redirected to the nearest available airport or departing flight be delayed/postponed. Once at Moutiers it is a further:<ul><li>- <strong>30 mins</strong> to Meribel / Courchevel / St.Martin de Belleville.</li><li>- <strong>1 hour</strong> to Val Thorens / La Plagne / Les Arcs / Tignes / Val d'Isere.</li></ul>"}
          cloudinaryPublicId="v1754484385/Chambery_airport_-_Moutiers_fgpzdw"
          mapImageAlt="Map showing transfer route from Chambéry Airport to ski resorts"
        />

        {/* Grenoble Transfer */}
        <RouteTransfer
          heading="Grenoble"
          transferStats={{
            departure: "Grenoble airport / City",
            distance: "160 km",
            eta: "Between 2:30 - 4:30",
            cost: "€€€€€"
          }}
          transferDescription={"Leaving Grenoble airport the majority of the transfer is via motorway, heavy traffic is to be expected on Saturdays. Once at Moutiers it is a further:<ul><li>- <strong>30 mins</strong> to Meribel / Courchevel / St.Martin de Belleville.</li><li>- <strong>1 hour</strong> to Val Thorens / La Plagne / Les Arcs / Tignes / Val d'Isere.</li></ul>"}
          cloudinaryPublicId="v1754484486/Grenoble_airport_-_Moutiers_iggjgv"
          mapImageAlt="Map showing transfer route from Grenoble Airport to ski resorts"
        />

        {/* Moutiers */}
        <RouteTransfer
          heading="Eurostar and TGV - Moutiers Station"
          transferStats={{
            departure: "Moutiers train station / Town",
            distance: "N/A",
            eta: "Between 0:30 - 1:00",
            cost: "€"
          }}
          transferDescription={"A very popular transport hub with the Eurostar Snow train service operating from London, however finding transport from Moutiers to your resort can be challenging.<ul><li>- <strong>30 mins</strong> to Meribel / Courchevel / St.Martin de Belleville.</li><li>- <strong>1 hour</strong> to Val Thorens / La Plagne / Les Arcs / Tignes / Val d'Isere.</li></ul>"}
          cloudinaryPublicId="v1755189664/a3f3c9ce-f1ef-4476-8716-b533c3ca9f00"
          mapImageAlt="Map showing Eurostar and TGV routes to Moutiers Station"
        />
      </PageWrapper>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}



