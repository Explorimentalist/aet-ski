'use client';

// src/app/routes/geneva-to-val-disere/GenevaToValDisereClient.tsx
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { RouteTransfer } from '@/components/RouteTransfer'
import { MultiStepForm } from '@/components/MultiStepForm'
import { Button } from '@/components/Button'
import { Clock, MapPin, CheckCircle, Shield, Users } from 'lucide-react'
import { CardSmall } from '@/components/CardSmall'
import { useState, useCallback } from 'react'
import { BookingFormData } from '@/types'

export default function GenevaToValDisereClient() {
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
  }, []);

  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />
      
      {/* Main Content */}
      <div className="pt-[72px]">
        {/* Page Hero */}
        <PageHero
          heading="Private Transfer from Geneva to Val d&apos;Isère"
          description="Premium door-to-door airport transfer from Geneva Airport to Val d&apos;Isère ski resort. Professional drivers, comfortable vehicles, and reliable service for your ski holiday."
          imageSrc="https://res.cloudinary.com/dzrn3khsd/image/upload/v1754484486/Geneva_airport_-_Moutiers_jdaunu.png"
          imageAlt="Map showing transfer route from Geneva Airport to Val d'Isère ski resort"
        />

        {/* Breadcrumb Navigation */}
        <div className="bg-background-primary py-4">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center space-x-2 text-sm text-text-secondary">
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/routes" className="hover:text-text-primary transition-colors">
                Routes
              </Link>
              <span>/</span>
              <span className="text-text-primary">Geneva to Val d&apos;Isère</span>
            </nav>
          </div>
        </div>

        {/* Route Details */}
        <RouteTransfer
          heading="Geneva to Val d&apos;Isère Transfer"
          isRecommended={true}
          transferStats={{
            departure: "Geneva Airport",
            distance: "120 km",
            eta: "2:30 - 3:30 hours",
            cost: "€€€"
          }}
          transferDescription={`
            <p class="mb-4">Our premium private transfer service from Geneva Airport to Val d&apos;Isère offers the most comfortable and convenient way to reach this world-class ski resort.</p>
            <p class="mb-4">The journey takes you through the beautiful French countryside, passing Lake Annecy and the town of Albertville before reaching Moutiers, from where it&apos;s approximately 1 hour to Val d&apos;Isère.</p>
            <h3 class="font-semibold mb-2">Route Highlights:</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Geneva Airport</strong> → Annecy (motorway)</li>
              <li><strong>Annecy</strong> → Albertville (Lake Annecy scenic route)</li>
              <li><strong>Albertville</strong> → Moutiers (mountain roads)</li>
              <li><strong>Moutiers</strong> → Val d&apos;Isère (final ascent to resort)</li>
            </ul>
          `}
          mapImageSrc="https://res.cloudinary.com/dzrn3khsd/image/upload/v1754484486/Geneva_airport_-_Moutiers_jdaunu.png"
          mapImageAlt="Detailed map showing transfer route from Geneva Airport to Val d'Isère ski resort"
        />

        {/* Why Choose This Route */}
        <section className="py-24 bg-background-primary">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              Why Choose Geneva to Val d&apos;Isère Transfer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSmall
                icon={Clock}
                title="Optimal Travel Time"
                description="2.5-3.5 hours door-to-door, perfect for morning arrivals and afternoon skiing."
                variant="flex"
              />
              <CardSmall
                icon={MapPin}
                title="Scenic Route"
                description="Beautiful journey through Lake Annecy and French Alps countryside."
                variant="flex"
              />
              <CardSmall
                icon={Shield}
                title="Professional Service"
                description="Experienced drivers who know the route and local conditions."
                variant="flex"
              />
              <CardSmall
                icon={Users}
                title="Family Friendly"
                description="Comfortable vehicles with space for ski equipment and luggage."
                variant="flex"
              />
              <CardSmall
                icon={CheckCircle}
                title="Reliable Schedule"
                description="Fixed departure times with flexibility for flight delays."
                variant="flex"
              />
            </div>
          </div>
        </section>

        {/* Val d'Isère Resort Information */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  About Val d&apos;Isère Ski Resort
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    Val d&apos;Isère is one of the most prestigious ski resorts in the French Alps, 
                    offering world-class skiing with access to the vast Espace Killy ski area.
                  </p>
                  <p>
                    The resort is known for its high-altitude skiing (1,850m - 3,456m), 
                    excellent snow conditions, and challenging terrain for all skill levels.
                  </p>
                  <p>
                    With over 300km of pistes, Val d&apos;Isère provides endless skiing opportunities 
                    from December through May.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Resort Quick Facts</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Altitude:</strong> 1,850m - 3,456m</li>
                  <li><strong>Ski Area:</strong> 300km+ of pistes</li>
                  <li><strong>Season:</strong> December - May</li>
                  <li><strong>Closest Airport:</strong> Geneva (120km)</li>
                  <li><strong>Transfer Time:</strong> 2.5-3.5 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Book Your Geneva to Val d&apos;Isère Transfer?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get a quote within 24 hours and secure your premium airport transfer to Val d&apos;Isère
            </p>
            <Button 
              size="lg" 
              className="mx-auto bg-white text-brand-primary hover:bg-gray-100"
              onClick={handleOpenForm}
            >
              Get Your Quote Now
            </Button>
          </div>
        </section>

        {/* Related Routes */}
        <section className="py-24 bg-background-primary">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              Other Popular Routes from Geneva
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/routes/geneva-to-courchevel" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Geneva to Courchevel</h3>
                <p className="text-text-secondary text-sm">Premium transfer to the luxury ski resort</p>
              </Link>
              <Link href="/routes/geneva-to-val-thorens" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Geneva to Val Thorens</h3>
                <p className="text-text-secondary text-sm">High-altitude skiing destination</p>
              </Link>
              <Link href="/routes/geneva-to-meribel" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Geneva to Méribel</h3>
                <p className="text-text-secondary text-sm">Family-friendly resort in Les 3 Vallées</p>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
}
