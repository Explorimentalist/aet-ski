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
import { useEffect } from 'react';

export default function TravelInfoPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [cmsLifeInResortLinks, setCmsLifeInResortLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsAirlinesLinks, setCmsAirlinesLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);

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

  // Fetch CMS-powered sections
  useEffect(() => {
    (async () => {
      try {
        // Fetch Life in resort info
        const lifeInResortRes = await fetch(`/api/links?category=${encodeURIComponent('Life in resort info')}`);
        if (lifeInResortRes.ok) {
          const lifeInResortJson = await lifeInResortRes.json();
          if (lifeInResortJson.success && Array.isArray(lifeInResortJson.data) && lifeInResortJson.data.length > 0) {
            setCmsLifeInResortLinks(lifeInResortJson.data);
          }
        }

        // Fetch Airlines
        const airlinesRes = await fetch(`/api/links?category=${encodeURIComponent('Airlines')}`);
        if (airlinesRes.ok) {
          const airlinesJson = await airlinesRes.json();
          if (airlinesJson.success && Array.isArray(airlinesJson.data) && airlinesJson.data.length > 0) {
            setCmsAirlinesLinks(airlinesJson.data);
          }
        }
      } catch {
        // silent fail, page shows built-in sections
      }
    })();
  }, []);

  // Resorts data - Three Valleys ski resorts with SEO-rich descriptions
  const resortsData = [
    {
      id: 'val-thorens',
      logo: getLogoUrl('valthorens', { format: 'svg' }),
      companyName: 'Val Thorens',
      url: 'https://www.valthorens.com/',
      description: 'At 2,300m altitude, Val Thorens is Europe\'s highest ski resort with guaranteed snow from November to May. Part of the world\'s largest ski area, it offers 600km of slopes and stunning panoramic views of the French Alps.',
    },
    {
      id: 'courchevel',
      logo: getLogoUrl('courchevel', { format: 'svg' }),
      companyName: 'Courchevel',
      url: 'https://www.courchevel.com/',
      description: 'Courchevel is synonymous with luxury skiing. Famous for its pristine pistes, world-class dining, and exclusive boutiques, it\'s where royalty and celebrities come to ski. The resort offers skiing for all levels across four villages.',
    },
    {
      id: 'meribel',
      logo: getLogoUrl('meribel', { format: 'svg' }),
      companyName: 'Méribel',
      url: 'https://www.meribel.net/',
      description: 'Méribel offers authentic alpine charm in the heart of the Three Valleys. Known for its traditional chalet architecture and excellent ski schools, it\'s perfect for families and intermediate skiers.',
    },
    {
      id: 'les-menuires',
      logo: getLogoUrl('menuires', { format: 'svg' }),
      companyName: 'Les Menuires',
      url: 'https://www.lesmenuires.com/',
      description: 'Les Menuires provides excellent value skiing with direct access to the Three Valleys. Modern apartments and reliable snow conditions make it popular with budget-conscious families.',
    },
    {
      id: 'saint-martin-de-belleville',
      logo: getLogoUrl('stmartin', { format: 'svg' }),
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
      id: 'flybe',
      logo: getLogoUrl('flybe', { format: 'svg' }),
      companyName: 'Flybe',
      url: 'https://www.flybe.com/',
    },
    {
      id: 'swiss-air',
      logo: getLogoUrl('swiss-air', { format: 'svg' }),
      companyName: 'Swiss Air',
      url: 'https://www.swiss.com/',
    },
    {
      id: 'aer-lingus',
      logo: getLogoUrl('aer-lingus', { format: 'svg' }),
      companyName: 'Aer Lingus',
      url: 'https://www.aerlingus.com/upload/',
    },
    {
      id: 'klm',
      logo: getLogoUrl('klm', { format: 'svg' }),
      companyName: 'KLM',
      url: 'https://www.klm.com/',
    },
    {
      id: 'etihad',
      logo: getLogoUrl('etihad', { format: 'svg' }),
      companyName: 'Etihad',
      url: 'https://www.etihad.com/',
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
      id: 'rail-europe',
      logo: getLogoUrl('rail-europe', { format: 'svg' }),
      companyName: 'Rail Europe',
      url: 'https://www.raileurope.com/',
      description: 'Book train tickets for travel across Europe. Convenient connections to major ski destinations in the Alps.',
    },
    {
      id: 'rtm',
      logo: getLogoUrl('rtm', { format: 'svg' }),
      companyName: 'RTM',
      url: 'https://cdn.worldvectorlogo.com/logos/rtm.svg',
      description: 'Regional transport operator (logo provided for completeness).',
    },
    {
      id: 'trainline',
      logo: getLogoUrl('trainline', { format: 'svg' }),
      companyName: 'Trainline',
      url: 'https://www.thetrainline.com/',
      description: 'Plan and book European train journeys in one place.',
    },
  ];

  // Chalet accommodation data - luxury chalet providers
  const chaletAccommodationData = [
    {
      id: 'oxford-ski',
      logo: getLogoUrl('oxford-ski', { format: 'svg' }),
      companyName: 'Oxford Ski',
      url: 'https://www.oxfordski.com/',
      description: 'Tailor-made luxury ski holidays and chalets across premier Alpine resorts.',
    },
    {
      id: 'meriski',
      logo: getLogoUrl('meriski', { format: 'svg' }),
      companyName: 'Meriski',
      url: 'https://www.meriski.com/',
      description: 'Luxury chalet holidays in Méribel with exceptional service and attention to detail.',
    },
    {
      id: 'alpine-escape',
      logo: getLogoUrl('alpine-escape'),
      companyName: 'Alpine Escape',
      url: 'https://www.alpine-escape.co.uk/',
      description: 'Beautiful catered chalets with exceptional service in Courchevel and La Tania.',
    },
    {
      id: 'fish-and-pips',
      logo: getLogoUrl('fish-and-pips', { format: 'svg' }),
      companyName: 'Fish & Pips',
      url: 'https://www.fandptravel.com/',
      description: 'Handpicked luxury chalets and hotels with a passion for food and service.',
    },
    {
      id: 'ski-cuisine',
      logo: getLogoUrl('ski-cuisine', { format: 'svg' }),
      companyName: 'Ski Cuisine',
      url: 'https://www.skicuisine.com/',
      description: 'Gourmet ski holidays combining exceptional skiing with world-class dining experiences.',
    },
    {
      id: 'elegant-resorts',
      logo: getLogoUrl('elegant-resorts', { format: 'svg' }),
      companyName: 'Elegant Resorts',
      url: 'https://www.elegantresorts.co.uk/',
      description: 'Luxury travel company offering tailor-made ski holidays.',
    },
    {
      id: 'meribel-ski-chalets',
      logo: getLogoUrl('meribel-ski-chalets', { height: 80, width: 300, format: 'auto', crop: 'fit' }),
      companyName: 'Méribel Ski Chalet',
      url: 'https://www.meribel-chalets.co.uk/',
      description: 'Independent specialist with a range of catered and self-catered chalets in Méribel.',
    },
    {
      id: 'com-ski',
      logo: getLogoUrl('com-ski', { format: 'svg' }),
      companyName: 'com-ski.com',
      url: 'https://www.com-ski.com/',
      description: 'Comprehensive ski holiday booking platform with a wide selection of chalets and resorts.',
    },
    {
      id: 'leski',
      logo: getLogoUrl('leski', { format: 'svg' }),
      companyName: 'Le Ski',
      url: 'https://www.leski.com/',
      description: 'British ski company offering catered chalets and quality ski instruction in the French Alps.',
    },
    {
      id: 'alpine-answers',
      logo: getLogoUrl('alpine-answers', { format: 'svg' }),
      companyName: 'Alpine Answers',
      url: 'https://www.alpineanswers.co.uk/',
      description: 'Specialist ski holiday agency with extensive resort knowledge.',
    },
    {
      id: 'ski-blanc',
      logo: getLogoUrl('ski-blanc', { format: 'svg' }),
      companyName: 'Ski Blanc',
      url: 'https://www.skiblanc.co.uk/',
      description: 'Luxury ski holidays with a focus on exceptional service and beautiful chalets.',
    },
    {
      id: 'ski-basics',
      logo: getLogoUrl('ski-basics', { format: 'svg' }),
      companyName: 'Ski Basics',
      url: 'https://www.skibasics.com/',
      description: 'Quality catered chalets and services in Méribel.',
    },
    {
      id: 'delicious-mountain',
      logo: getLogoUrl('delicious-mountain', { format: 'svg' }),
      companyName: 'Delicious Mountain',
      url: 'https://www.deliciousmountain.com/',
      description: 'Food-focused ski holidays with gourmet dining and exceptional chalet experiences.',
    },
    {
      id: 'alpine-ethos',
      logo: getLogoUrl('alpine-ethos', { format: 'svg' }),
      companyName: 'Alpine Ethos',
      url: 'https://www.alpineethos.com/',
      description: 'Boutique ski holiday specialist offering unique and authentic Alpine experiences.',
    },
    {
      id: 'skivo',
      logo: getLogoUrl('skivo', { format: 'svg' }),
      companyName: 'Skivo',
      url: 'https://www.skivo.co.uk/',
      description: 'Independent ski holiday specialist with a personal touch and extensive resort knowledge.',
    },
    {
      id: 'firefly',
      logo: getLogoUrl('firefly', { format: 'svg' }),
      companyName: 'Firefly',
      url: 'https://www.fireflyski.com/',
      description: 'Luxury ski holidays with a focus on exceptional service and beautiful properties.',
    },
    {
      id: 'alpine-independence',
      logo: getLogoUrl('alpine-independence', { format: 'svg' }),
      companyName: 'Alpine Independence',
      url: 'https://www.alpineindependence.com/',
      description: 'Independent ski holiday specialist offering personalized service and expert advice.',
    },
  ];

  // Self-catered Accommodation data - independent rental specialists
  const selfCateredAccommodationData = [
    {
      id: 'courchevel-rentals',
      logo: getLogoUrl('courchevel-chalets', { format: 'svg' }),
      companyName: 'Courchevel Chalet and Apartment Rentals',
      url: 'https://www.courchevelchaletrentals.com/',
      description: 'Extensive portfolio of luxury chalets and apartments throughout all Courchevel villages. From intimate retreats to large group properties.',
    },
    {
      id: 'meribel-rentals',
      logo: getLogoUrl('meribel-chalets', { format: 'svg' }),
      companyName: 'Meribel Chalet and Apartment Rentals',
      url: 'https://www.meribelchaletrentals.com/',
      description: 'Authentic alpine properties in Méribel village and surrounding areas. Traditional chalets with modern amenities.',
    },
    {
      id: 'ams-rentals',
      logo: getLogoUrl('ams', { format: 'svg' }),
      companyName: 'AMS Rentals',
      url: 'https://www.amsrentals.com/',
      description: 'Exclusive Méribel Valley specialist offering premium self-catered properties. Weekly and seasonal rentals available.',
    },
    {
      id: 'ski-lettings',
      logo: getLogoUrl('ski-lettings', { format: 'svg' }),
      companyName: 'Ski Lettings',
      url: 'https://www.skilettings.com/',
      description: 'Specialist in self-catered ski accommodation across the French Alps with a focus on quality and value.',
    },
    {
      id: 'sno-mobi',
      logo: getLogoUrl('sno-mobi', { format: 'svg' }),
      companyName: 'Sno.mobi',
      url: 'https://www.sno.mobi/',
      description: 'Innovative platform for finding and booking self-catered ski accommodation with real-time availability.',
    },
  ];

  // Weather data - mountain weather specialists
  const weatherData = [
    {
      id: 'meteo-france',
      logo: getLogoUrl('meteo-france', { format: 'svg' }),
      companyName: 'Météo France',
      url: 'https://meteofrance.com/meteo-montagne/alpes-du-nord',
      description: 'Official French weather service with detailed mountain forecasts, avalanche bulletins, and snow reports.',
    },
    {
      id: 'snow-forecast',
      logo: getLogoUrl('snow-forecast', { format: 'svg' }),
      companyName: 'Snow Forecast',
      url: 'https://www.snow-forecast.com/',
      description: 'Reliable snow forecasts and ski conditions for resorts worldwide.',
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
      logo: getLogoUrl('new-generation', { format: 'svg' }),
      companyName: 'New Generation Ski School',
      url: 'https://www.skinewgen.com/',
      description: 'British-run ski school offering English instruction in major Three Valleys resorts. Small groups and performance-focused teaching.',
    },
    {
      id: 'supreme-ski',
      logo: getLogoUrl('supreme', { format: 'svg' }),
      companyName: 'Supreme Ski & Snowboard School',
      url: 'https://www.supremeski.com/',
      description: 'Established British ski school operating across top French resorts, offering private and group lessons with experienced instructors.',
    },
    {
      id: 'snow-limits',
      logo: getLogoUrl('snow-limits', { format: 'svg' }),
      companyName: 'Snow Limits',
      url: 'https://www.snowlimits.com/',
      description: 'Specialist ski school focusing on advanced techniques and off-piste skiing for experienced skiers.',
    },
    {
      id: 'rtm-snowboarding',
      logo: getLogoUrl('rtm-snowboarding', { format: 'svg' }),
      companyName: 'RTM Snowboarding',
      url: 'https://www.rtmsnowboarding.com/',
      description: 'Dedicated snowboard school with expert instructors specializing in freestyle and freeride techniques.',
    },
    {
      id: 'oxygene',
      logo: getLogoUrl('oxygene', { format: 'svg' }),
      companyName: 'Oxygene',
      url: 'https://www.oxygene.ski/',
      description: 'International ski school with English-speaking instructors offering lessons in multiple languages.',
    },
    {
      id: 'momentum',
      logo: getLogoUrl('momentum', { format: 'svg' }),
      companyName: 'Momentum',
      url: 'https://www.momentumski.com/',
      description: 'Performance-focused ski school specializing in advanced techniques and competition preparation.',
    },
    {
      id: 'marmalade',
      logo: getLogoUrl('marmalade', { format: 'svg' }),
      companyName: 'Marmalade',
      url: 'https://www.marmaladeski.com/',
      description: 'Boutique ski school offering personalized instruction and small group lessons in a friendly atmosphere.',
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
    {
      id: 'freeride-france',
      logo: getLogoUrl('freeride-france', { format: 'svg' }),
      companyName: 'Freeride France',
      url: 'https://www.freeridefrance.com/',
      description: 'Specialist freeride equipment rental with high-performance gear for off-piste adventures and backcountry skiing.',
    },
    {
      id: 'slide-candy',
      logo: getLogoUrl('slide-candy', { format: 'svg' }),
      companyName: 'Slide Candy',
      url: 'https://www.slidecandy.com/',
      description: 'Premium ski and snowboard rental with the latest equipment and personalized fitting service.',
    },
  ];

  // Aches and pains data - wellness and recovery services
  const achesAndPainsData = [
    {
      id: 'ski-physio',
      logo: getLogoUrl('ski-physio', { format: 'svg' }),
      companyName: 'Ski-Physio',
      url: 'https://www.ski-physio.com/',
      description: 'Physiotherapy services specializing in ski-related injuries and recovery in the Alps.',
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
  ];

  // Information websites data - comprehensive ski resources
  const informationWebsitesData = [
    {
      id: 'meribel-unplugged',
      logo: getLogoUrl('meribel-unplugged', { format: 'svg' }),
      companyName: 'Meribel Unplugged',
      url: 'https://www.meribelunplugged.com/',
      description: 'Comprehensive guide to Méribel with insider tips, restaurant reviews, and local knowledge.',
    },
    {
      id: 'thesnowco',
      logo: getLogoUrl('thesnowco', { format: 'svg' }),
      companyName: 'Thesnowco',
      url: 'https://www.thesnowco.com/',
      description: 'Expert ski holiday advice and resort information from experienced ski professionals.',
    },
    {
      id: 'merinet',
      logo: getLogoUrl('merinet', { format: 'svg' }),
      companyName: 'Merinet',
      url: 'https://www.merinet.com/',
      description: 'Local Méribel information portal with weather updates, snow reports, and resort news.',
    },
    {
      id: 'welove2ski',
      logo: getLogoUrl('welove2ski', { format: 'svg' }),
      companyName: 'Welove2ski',
      url: 'https://www.welove2ski.com/',
      description: 'Passionate ski community sharing resort reviews, ski tips, and holiday planning advice.',
    },
    {
      id: 'courchnet',
      logo: getLogoUrl('courchnet', { format: 'svg' }),
      companyName: 'Courchnet',
      url: 'https://www.courchnet.com/',
      description: 'Dedicated Courchevel information site with resort guides, weather updates, and local insights.',
    },
    {
      id: 'snowheads',
      logo: getLogoUrl('snowheads', { format: 'svg' }),
      companyName: 'Snowheads',
      url: 'https://www.snowheads.co.uk/',
      description: 'UK\'s largest ski community forum with expert advice, trip reports, and ski holiday planning.',
    },
    {
      id: 'natives',
      logo: getLogoUrl('natives', { format: 'svg' }),
      companyName: 'Natives.co.uk',
      url: 'https://www.natives.co.uk/',
      description: 'Comprehensive ski resort guides with detailed information, photos, and user reviews.',
    },
    {
      id: 'unplugged-courchevel',
      logo: getLogoUrl('unplugged-courchevel', { format: 'svg' }),
      companyName: 'Unplugged Courchevel',
      url: 'https://www.unpluggedcourchevel.com/',
      description: 'Insider\'s guide to Courchevel with restaurant recommendations, events, and local knowledge.',
    },
  ];

  // Self catering data - grocery delivery and local suppliers
  const selfCateringData = [

    {
      id: 'extreme-cuisine',
      logo: getLogoUrl('extreme-cuisine', { format: 'svg' }),
      companyName: 'Extreme Cuisine',
      url: 'https://www.extremecuisine.com/',
      description: 'Gourmet food delivery service offering premium ingredients, prepared meals, and specialty items for your ski holiday.',
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
              },
              {
                "@type": "Place",
                "name": "Les Menuires",
                "description": "Value-focused ski resort with modern accommodation"
              },
              {
                "@type": "Place",
                "name": "Saint-Martin-de-Belleville",
                "description": "Traditional Savoyard village with authentic mountain culture"
              },
              {
                "@type": "Place",
                "name": "La Tania",
                "description": "Purpose-built Olympic resort with easy access to major ski areas"
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


        {/* Resorts Section */}
        <LinksList
          heading="Resorts"
          description="The Three Valleys ski area offers some of the world's finest ski resorts, each with its own unique character and charm. From the high-altitude snow-sure slopes of Val Thorens to the luxury of Courchevel, discover the perfect resort for your ski holiday in the French Alps."
          links={resortsData}
        />


        {/* Airlines Section */}
        <LinksList
          heading="Airlines"
          description="The low-cost airlines provide a multitude of flights into Geneva during the winter months. Several of them fly into Chambery during the week so have a look as to which will be most convenient to you."
          links={cmsAirlinesLinks.length > 0 ? cmsAirlinesLinks : airlinesData}
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

        {/* Information Websites Section */}
        <LinksList
          heading="Information Websites"
          description="For comprehensive ski resort information, local knowledge, and community engagement, check out these websites."
          links={informationWebsitesData}
        />


        {/* Information Websites Section */}
        <LinksList
          heading="Information Websites"
          description="For comprehensive ski resort information, local knowledge, and community engagement, check out these websites. They provide insider tips, resort guides, weather updates, and community forums to help you make the most of your ski holiday."
          links={informationWebsitesData}
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