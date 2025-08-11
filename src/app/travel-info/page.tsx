// src/app/travel-info/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { LinksList } from '@/components/LinksList';
import { MultiStepForm } from '@/components/MultiStepForm';
import { BookingFormData } from '@/types';
import { getLogoUrl } from '@/lib/cloudinary';

export default function TravelInfoPage() {
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

  // Resorts data - Three Valleys ski resorts with SEO-rich descriptions
  const resortsData = [
    {
      id: 'val-thorens',
      logo: 'ski-resorts/val-thorens-logo', // Cloudinary public ID
      companyName: 'Val Thorens',
      url: 'https://www.valthorens.com/',
      description: 'At 2,300m altitude, Val Thorens is Europe\'s highest ski resort with guaranteed snow from November to May. Part of the world\'s largest ski area, it offers 600km of slopes and stunning panoramic views of the French Alps.',
    },
    {
      id: 'courchevel',
      logo: 'ski-resorts/courchevel-logo', // Cloudinary public ID
      companyName: 'Courchevel',
      url: 'https://www.courchevel.com/',
      description: 'Courchevel is synonymous with luxury skiing. Famous for its pristine pistes, world-class dining, and exclusive boutiques, it\'s where royalty and celebrities come to ski. The resort offers skiing for all levels across four villages.',
    },
    {
      id: 'meribel',
      logo: 'ski-resorts/meribel-logo', // Cloudinary public ID
      companyName: 'Méribel',
      url: 'https://www.meribel.net/',
      description: 'Méribel offers authentic alpine charm in the heart of the Three Valleys. Known for its traditional chalet architecture and excellent ski schools, it\'s perfect for families and intermediate skiers.',
    },
    {
      id: 'les-menuires',
      logo: 'ski-resorts/les-menuires-logo', // Cloudinary public ID
      companyName: 'Les Menuires',
      url: 'https://www.lesmenuires.com/',
      description: 'Les Menuires provides excellent value skiing with direct access to the Three Valleys. Modern apartments and reliable snow conditions make it popular with budget-conscious families.',
    },
    {
      id: 'saint-martin-de-belleville',
      logo: 'ski-resorts/saint-martin-logo', // Cloudinary public ID
      companyName: 'Saint Martin de Belleville',
      url: 'https://www.saintmartindebelleville.com/',
      description: 'A charming traditional Savoyard village offering authentic mountain culture and direct access to the Three Valleys ski area.',
    },
    {
      id: 'la-tania',
      logo: 'ski-resorts/la-tania-logo', // Cloudinary public ID
      companyName: 'La Tania',
      url: 'https://www.latania.com/',
      description: 'Built for the 1992 Olympics, La Tania is a purpose-built resort offering modern amenities and easy access to Courchevel and Méribel slopes.',
    },
  ];

  // Airlines data - using Cloudinary logos
  const airlinesData = [
    {
      id: 'british-airways',
      logo: getLogoUrl('british-airways', { format: 'svg' }),
      companyName: 'British Airways',
      url: 'https://www.britishairways.com/',
    },
    {
      id: 'easyjet',
      logo: getLogoUrl('easyjet', { format: 'svg' }),
      companyName: 'easyJet',
      url: 'https://www.easyjet.com/',
    },
    {
      id: 'jet2',
      logo: getLogoUrl('jet2', { format: 'svg' }),
      companyName: 'Jet2.com',
      url: 'https://www.jet2.com/',
    },
    {
      id: 'airfrance',
      logo: getLogoUrl('airfrance', { format: 'svg' }),
      companyName: 'Air France',
      url: 'https://www.airfrance.com/',
    },
    {
      id: 'swiss-air',
      logo: getLogoUrl('swiss-air', { format: 'svg' }),
      companyName: 'Swiss Air',
      url: 'https://www.swiss.com/',
    },
    {
      id: 'klm',
      logo: getLogoUrl('klm', { format: 'svg' }),
      companyName: 'KLM',
      url: 'https://www.klm.com/',
    },
  ];

  

  // Trains data - eco-friendly ski travel options
  const trainsData = [
    {
      id: 'eurostar',
      logo: getLogoUrl('eurostar', { format: 'svg' }),
      companyName: 'Eurostar',
      url: 'https://www.eurostar.com/',
      description: 'Direct overnight service from London to Moutiers every Saturday during ski season. Arrive refreshed and avoid airport queues.',
    },
    {
      id: 'tgv',
      logo: getLogoUrl('tgv', { format: 'svg' }),
      companyName: 'TGV / Rail Europe',
      url: 'https://www.raileurope.com/',
      description: 'Book TGV trains from Paris to ski resorts. High-speed, comfortable, and environmentally friendly travel option.',
    },
  ];

  // Accommodation data - luxury chalet providers
  const chaletAccommodationData = [
    {
      id: 'powder-byrnes',
      logo: 'accommodation/powder-byrnes-logo', // Cloudinary public ID
      companyName: 'Powder Byrnes',
      url: 'https://www.powderbyrnes.com/',
      description: 'Luxury catered ski chalets in premium locations across the French Alps. Professional service and gourmet cuisine included.',
    },
    {
      id: 'ski-total',
      logo: 'accommodation/ski-total-logo', // Cloudinary public ID
      companyName: 'Ski Total',
      url: 'https://www.skitotal.com/',
      description: 'Quality catered chalets and hotels with excellent value. Family-friendly service and convenient resort locations.',
    },
  ];

  // Self-catered Accommodation data - independent rental specialists
  const selfCateredAccommodationData = [
    {
      id: 'courchevel-rentals',
      logo: 'accommodation/courchevel-rentals-logo', // Cloudinary public ID
      companyName: 'Courchevel Chalet and Apartment Rentals',
      url: 'https://www.courchevelchaletrentals.com/',
      description: 'Extensive portfolio of luxury chalets and apartments throughout all Courchevel villages. From intimate retreats to large group properties.',
    },
    {
      id: 'meribel-rentals',
      logo: 'accommodation/meribel-rentals-logo', // Cloudinary public ID
      companyName: 'Meribel Chalet and Apartment Rentals',
      url: 'https://www.meribelchaletrentals.com/',
      description: 'Authentic alpine properties in Méribel village and surrounding areas. Traditional chalets with modern amenities.',
    },
    {
      id: 'ams-rentals',
      logo: 'accommodation/ams-rentals-logo', // Cloudinary public ID
      companyName: 'AMS Rentals',
      url: 'https://www.amsrentals.com/',
      description: 'Exclusive Méribel Valley specialist offering premium self-catered properties. Weekly and seasonal rentals available.',
    },
  ];

  // Weather data - mountain weather specialists
  const weatherData = [
    {
      id: 'meteo-france',
      logo: 'weather/meteo-france-logo', // Cloudinary public ID
      companyName: 'Météo France',
      url: 'https://meteofrance.com/meteo-montagne/alpes-du-nord',
      description: 'Official French weather service with detailed mountain forecasts, avalanche bulletins, and snow reports.',
    },
    {
      id: 'chamonix-weather',
      logo: 'weather/chamonix-weather-logo', // Cloudinary public ID
      companyName: 'Chamonix Weather',
      url: 'https://www.chamonix.com/weather',
      description: 'Local alpine weather specialists providing accurate mountain forecasts and real-time conditions.',
    },
  ];

  // Ski Schools data - certified mountain instruction
  const skiSchoolsData = [
    {
      id: 'esf',
      logo: getLogoUrl('esf', { format: 'svg' }),
      companyName: 'ESF (École du Ski Français)',
      url: 'https://www.esf.net/',
      description: 'France\'s largest ski school network with qualified instructors in every resort. Group and private lessons for all levels.',
    },
    {
      id: 'new-generation',
      logo: getLogoUrl('newgen', { format: 'svg' }),
      companyName: 'New Generation Ski School',
      url: 'https://www.skinewgen.com/',
      description: 'British-run ski school offering English instruction in major Three Valleys resorts. Small groups and performance-focused teaching.',
    },
  ];

  // Ski hire data - equipment rental with AET exclusive discounts
  const skiHireData = [
    {
      id: 'white-storm',
      logo: getLogoUrl('whitestorm35', { height: 40 }),
      companyName: 'White Storm',
      url: 'https://www.whitestorm.com/',
      description: 'Whitestorm have ski rental shops in Courchevel (1850), Courchevel Moriond (1650) and Le Praz with mobile delivery in Courchevel Village (1550). There\'s a massive 35% off if using the promo code "3VT" on their site and during the quiet times of the season, this may increase to 50%... so what are you waiting for...?!',
    },
    {
      id: 'ski-higher',
      logo: getLogoUrl('skihigher', { height: 40 }),
      companyName: 'Ski Higher',
      url: 'https://www.skihigher.com/',
      description: 'Ski Higher provide quality rental equipment at very reasonable prices. The even better news is that we have secured a massive 20% discount if you book online through their new website! They have shops in Courchevel 1850, Le Praz, La Tania, Meribel and Les Allues.',
    },
  ];

  // Aches and pains data - wellness and recovery services
  const achesAndPainsData = [
    {
      id: 'courchevel-physio',
      logo: 'wellness/courchevel-physio-logo', // Cloudinary public ID
      companyName: 'Courchevel Physiotherapy',
      url: 'https://www.courchevelphysio.com/',
      description: 'Specialized sports physiotherapy for ski injuries. English-speaking therapists with experience treating ski-related conditions.',
    },
    {
      id: 'alpine-wellness',
      logo: 'wellness/alpine-wellness-logo', // Cloudinary public ID
      companyName: 'Alpine Wellness & Spa',
      url: 'https://www.alpinewellness.com/',
      description: 'Luxury spa treatments and therapeutic massage. Perfect for post-ski recovery and relaxation.',
    },
  ];

  // Life in resort info data - local guides and culture
  const lifeInResortData = [
    {
      id: 'trois-vallees-guide',
      logo: 'resort-info/trois-vallees-guide-logo', // Cloudinary public ID
      companyName: 'Three Valleys Resort Guide',
      url: 'https://www.les3vallees.com/',
      description: 'Official Three Valleys guide with events, restaurant recommendations, and insider tips for mountain life.',
    },
    {
      id: 'mountain-culture',
      logo: 'resort-info/mountain-culture-logo', // Cloudinary public ID
      companyName: 'Alpine Culture & Events',
      url: 'https://www.alpineculture.com/',
      description: 'Discover local traditions, seasonal festivals, and authentic Savoyard culture in the French Alps.',
    },
  ];

  // Self catering data - grocery delivery and local suppliers
  const selfCateringData = [
    {
      id: 'sherpa-livraison',
      logo: 'groceries/sherpa-logo', // Cloudinary public ID
      companyName: 'Sherpa Livraison',
      url: 'https://www.sherpa-courses.com/',
      description: 'Local grocery delivery service throughout the Three Valleys. Fresh produce, wine, and specialty items delivered to your chalet.',
    },
    {
      id: 'carrefour-montagne',
      logo: 'groceries/carrefour-montagne-logo', // Cloudinary public ID
      companyName: 'Carrefour Montagne',
      url: 'https://www.carrefour.fr/magasin/montagne',
      description: 'Supermarket chain with mountain locations. Online ordering available with pickup or delivery options.',
    },
  ];

  return (
    <>
      {/* Structured Data - Travel Guide */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": "French Alps Ski Transfer Travel Guide",
            "description": "Essential travel information for your French Alps ski holiday. Find the best airlines, resorts, trains, accommodation, and ski hire services for Val Thorens, Courchevel, and Méribel.",
            "url": "https://www.aet.ski/travel-info",
            "author": {
              "@type": "Organization",
              "name": "AET Ski Transfers",
              "url": "https://www.aet.ski"
            },
            "about": [
              {
                "@type": "Place",
                "name": "French Alps",
                "description": "Premier ski destination in Europe"
              },
              {
                "@type": "Place", 
                "name": "Three Valleys (Les Trois Vallées)",
                "description": "World's largest ski area"
              }
            ],
            "mentions": [
              {
                "@type": "Place",
                "name": "Val Thorens",
                "description": "Europe's highest ski resort at 2,300m altitude"
              },
              {
                "@type": "Place",
                "name": "Courchevel", 
                "description": "Luxury ski resort in French Alps"
              },
              {
                "@type": "Place",
                "name": "Méribel",
                "description": "Traditional alpine ski resort with authentic charm"
              }
            ],
            "publisher": {
              "@type": "LocalBusiness",
              "name": "AET Ski Transfers",
              "@id": "https://www.aet.ski/#organization",
              "url": "https://www.aet.ski",
              "telephone": "+33-XXX-XXX-XXX",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressRegion": "Savoie",
                "addressLocality": "French Alps"
              },
              "serviceArea": [
                {
                  "@type": "Place",
                  "name": "Geneva Airport (GVA)"
                },
                {
                  "@type": "Place", 
                  "name": "Lyon Airport (LYS)"
                },
                {
                  "@type": "Place",
                  "name": "Chambéry Airport (CMF)"
                }
              ]
            }
          })
        }}
      />
      
      <main className="min-h-screen">
        {/* Fixed Navigation */}
        <Navigation onQuoteClick={handleOpenForm} />
      
      {/* Main Content */}
      <div className="pt-[72px]">
        {/* Page Hero */}
        <PageHero
          heading="Helpful travel information"
          description="We highlight companies who provide extremely successful services both in getting to les Trois Vallées and enhancing your enjoyment once here. Read more about the ways in which they can help you get more from your time on the slopes."
          imageSrc="https://res.cloudinary.com/dzrn3khsd/image/upload/v1754489630/links_s1uucr.png"
          imageAlt="Travel information links and resources for skiing in the French Alps"
        />

        {/* Airlines Section */}
        <LinksList
          heading="Airlines"
          description="The low-cost airlines provide a multitude of flights into Geneva during the winter months. Several of them fly into Chambery during the week so have a look as to which will be most convenient to you."
          links={airlinesData}
        />

        {/* Resorts Section */}
        <LinksList
          heading="Resorts"
          description="The Three Valleys ski area offers some of the world's finest ski resorts, each with its own unique character and charm. From the high-altitude snow-sure slopes of Val Thorens to the luxury of Courchevel, discover the perfect resort for your ski holiday in the French Alps."
          links={resortsData}
        />

        {/* Trains Section */}
        <LinksList
          heading="Trains"
          description="If you want to be in resort early on a Saturday morning then catch the overnight Eurostar direct from London. We can collect you from the station in Moutiers and get you to your accommodation for as little as 15€ per person. Another popular option is to travel via Paris on the TGV."
          links={trainsData}
        />

        {/* Chalet Accommodation Section */}
        <LinksList
          heading="Chalet accommodation"
          description="High quality, great value for money chalet holidays can be found by clicking below."
          links={chaletAccommodationData}
        />

        {/* Self-catered Accommodation Section */}
        <LinksList
          heading="Self-catered Accommodation"
          description="If you're looking for self-catered accommodation then look no further than Courchevel Chalet and Apartment Rentals, Meribel Chalet and Apartment Rentals or AMS Rentals. As the names suggest, Courchevel and Meribel Chalet and Apartment Rentals have a vast array of properties available throughout both Courchevel and Meribel. However, AMS Rentals offer some of the very best skiing self-catered chalets and apartments exclusively within the Meribel Valley. These privately-owned properties are available to rent by the week or for longer periods, summer and winter. Some are available for seasonal rental and others for long weekends."
          links={selfCateredAccommodationData}
        />

        {/* Weather Section */}
        <LinksList
          heading="Weather"
          description="We often find that the most popular links from our site are those to do with the weather. Our drivers love the fact that you'll know far more about the weather for the week ahead when you arrive at the airport than they ever will. Have a read of the websites here so that you can let them know whether they'll be skiing in deep powder!"
          links={weatherData}
        />

        {/* Ski Schools Section */}
        <LinksList
          heading="Ski Schools"
          description="Whether you're a beginner looking to learn the basics or an advanced skier wanting to perfect your technique, these ski schools offer professional instruction from qualified instructors. Book your lessons in advance to secure the best instructors and times that suit your schedule."
          links={skiSchoolsData}
        />

        {/* Ski Hire Section */}
        <LinksList
          heading="Ski hire"
          description="Ski Higher provide quality rental equipment at very reasonable prices. The even better news is that we have secured a massive 20% discount if you book online through their new website! They have shops in Courchevel 1850, Le Praz, La Tania, Meribel and Les Allues so click on the link below to take advantage of this fantastic offer!"
          links={skiHireData}
        />

        {/* Aches and pains Section */}
        <LinksList
          heading="Aches and pains"
          description="After a long day on the slopes, your body might need some professional care. These physiotherapy and massage services specialize in treating ski-related injuries and helping you recover quickly so you can get back to enjoying your time on the mountain."
          links={achesAndPainsData}
        />

        {/* Life in resort info Section */}
        <LinksList
          heading="Life in resort info"
          description="Get the most out of your ski holiday with insider information about resort life, local events, and mountain culture. These resources will help you discover the best restaurants, activities, and hidden gems that make each resort unique."
          links={lifeInResortData}
        />

        {/* Self catering Section */}
        <LinksList
          heading="Self catering"
          description="If you're staying in self-catered accommodation, these local suppliers and delivery services will ensure you have everything you need for a comfortable stay. From fresh groceries to specialty items, they'll help you stock up without the hassle."
          links={selfCateringData}
        />
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
    </>
  );
}