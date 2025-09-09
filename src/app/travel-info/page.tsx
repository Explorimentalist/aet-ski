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
  
  // CMS State for all sections
  const [cmsAirlinesLinks, setCmsAirlinesLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsResortsLinks, setCmsResortsLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsTrainsLinks, setCmsTrainsLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsChaletAccommodationLinks, setCmsChaletAccommodationLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsSelfCateredAccommodationLinks, setCmsSelfCateredAccommodationLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsWeatherLinks, setCmsWeatherLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsSkiSchoolsLinks, setCmsSkiSchoolsLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsSkiHireLinks, setCmsSkiHireLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsAchesAndPainsLinks, setCmsAchesAndPainsLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsLifeInResortLinks, setCmsLifeInResortLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsInformationWebsitesLinks, setCmsInformationWebsitesLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);
  const [cmsSelfCateringLinks, setCmsSelfCateringLinks] = useState<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>([]);

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

  // Fetch all CMS-powered sections
  useEffect(() => {
    const fetchCategoryData = async (category: string, setter: React.Dispatch<React.SetStateAction<Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>>>) => {
      try {
        const res = await fetch(`/api/links?category=${encodeURIComponent(category)}`);
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setter(json.data);
        }
      } catch {
        // silent fail, page shows built-in sections
      }
    };

    // Fetch data for all categories
    fetchCategoryData('Airlines', setCmsAirlinesLinks);
    fetchCategoryData('Resorts', setCmsResortsLinks);
    fetchCategoryData('Trains', setCmsTrainsLinks);
    fetchCategoryData('Chalet accommodation', setCmsChaletAccommodationLinks);
    fetchCategoryData('Self-catered Accommodation', setCmsSelfCateredAccommodationLinks);
    fetchCategoryData('Weather', setCmsWeatherLinks);
    fetchCategoryData('Ski Schools', setCmsSkiSchoolsLinks);
    fetchCategoryData('Ski hire', setCmsSkiHireLinks);
    fetchCategoryData('Aches and pains', setCmsAchesAndPainsLinks);
    fetchCategoryData('Life in resort info', setCmsLifeInResortLinks);
    fetchCategoryData('Information Websites', setCmsInformationWebsitesLinks);
    fetchCategoryData('Self catering', setCmsSelfCateringLinks);
  }, []);

  // 🚀 PHASE 3: CMS-First Architecture with Smart Fallbacks
  const mergeWithCMS = (cmsData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>, fallbackData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }>, categoryName: string) => {
    if (cmsData.length > 0) {
      console.log(`✅ ${categoryName}: Using CMS data (${cmsData.length} items)`);
      return cmsData;
    }
    console.warn(`⚠️  ${categoryName}: Fallback to hardcoded data (${fallbackData.length} items)`);
    return fallbackData;
  };

  // ✅ PHASE 3: Resorts - REMOVED HARDCODED ARRAY (migrated to CMS)
  const resortsData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Airlines - REMOVED HARDCODED ARRAY (migrated to CMS)
  const airlinesData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Trains - REMOVED HARDCODED ARRAY (migrated to CMS)
  const trainsData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Chalet Accommodation - REMOVED HARDCODED ARRAY (migrated to CMS)
  const chaletAccommodationData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Self-catered Accommodation - REMOVED HARDCODED ARRAY (migrated to CMS)
  const selfCateredAccommodationData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Weather - REMOVED HARDCODED ARRAY (migrated to CMS)
  const weatherData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Ski Schools - REMOVED HARDCODED ARRAY (migrated to CMS)
  const skiSchoolsData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Ski Hire - REMOVED HARDCODED ARRAY (migrated to CMS)
  const skiHireData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Aches and Pains - REMOVED HARDCODED ARRAY (migrated to CMS)
  const achesAndPainsData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Life in Resort Info - REMOVED HARDCODED ARRAY (migrated to CMS)
  const lifeInResortData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Information Websites - REMOVED HARDCODED ARRAY (migrated to CMS)
  const informationWebsitesData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

  // ✅ PHASE 3: Self Catering - REMOVED HARDCODED ARRAY (migrated to CMS)
  const selfCateringData: Array<{ id: string; logo: string; companyName: string; url: string; description?: string }> = [];

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
      <div className="pt-[72px] bg-background-primary">
        {/* Page Hero */}
        <PageHero
          heading="Helpful travel information"
          description="We highlight companies who provide extremely successful services both in getting to les Trois Vallées and enhancing your enjoyment once here. Read more about the ways in which they can help you get more from your time on the slopes."
          cloudinaryPublicId="v1754489630/links_s1uucr"
          imageAlt="Travel information links and resources for skiing in the French Alps"
          imageWidth={1200}
          imageHeight={600}
          deviceType="desktop"
          format="auto"
          priority={true}
        />


        {/* Resorts Section */}
        <LinksList
          heading="Resorts"
          description="The Three Valleys ski area offers some of the world's finest ski resorts, each with its own unique character and charm. From the high-altitude snow-sure slopes of Val Thorens to the luxury of Courchevel, discover the perfect resort for your ski holiday in the French Alps."
          links={mergeWithCMS(cmsResortsLinks, resortsData, 'Resorts')}
        />


        {/* Airlines Section */}
        <LinksList
          heading="Airlines"
          description="The low-cost airlines provide a multitude of flights into Geneva during the winter months. Several of them fly into Chambery during the week so have a look as to which will be most convenient to you."
          links={mergeWithCMS(cmsAirlinesLinks, airlinesData, 'Airlines')}
        />

        {/* Trains Section */}
        <LinksList
          heading="Trains"
          description="If you want to be in resort early on a Saturday morning then catch the overnight Eurostar direct from London. We can collect you from the station in Moutiers and get you to your accommodation for as little as 15€ per person. Another popular option is to travel via Paris on the TGV."
          links={mergeWithCMS(cmsTrainsLinks, trainsData, 'Trains')}
        />

        {/* Chalet Accommodation Section */}
        <LinksList
          heading="Chalet accommodation"
          description="High quality, great value for money chalet holidays can be found by clicking below."
          links={mergeWithCMS(cmsChaletAccommodationLinks, chaletAccommodationData, 'Chalet Accommodation')}
        />

        {/* Self-catered Accommodation Section */}
        <LinksList
          heading="Self-catered Accommodation"
          description="If you're looking for self-catered accommodation then look no further than Courchevel Chalet and Apartment Rentals, Meribel Chalet and Apartment Rentals or AMS Rentals. As the names suggest, Courchevel and Meribel Chalet and Apartment Rentals have a vast array of properties available throughout both Courchevel and Meribel. However, AMS Rentals offer some of the very best skiing self-catered chalets and apartments exclusively within the Meribel Valley. These privately-owned properties are available to rent by the week or for longer periods, summer and winter. Some are available for seasonal rental and others for long weekends."
          links={mergeWithCMS(cmsSelfCateredAccommodationLinks, selfCateredAccommodationData, 'Self-catered Accommodation')}
        />

        {/* Weather Section */}
        <LinksList
          heading="Weather"
          description="We often find that the most popular links from our site are those to do with the weather. Our drivers love the fact that you'll know far more about the weather for the week ahead when you arrive at the airport than they ever will. Have a read of the websites here so that you can let them know whether they'll be skiing in deep powder!"
          links={mergeWithCMS(cmsWeatherLinks, weatherData, 'Weather')}
        />

        {/* Ski Schools Section */}
        <LinksList
          heading="Ski Schools"
          description="Whether you're a beginner looking to learn the basics or an advanced skier wanting to perfect your technique, these ski schools offer professional instruction from qualified instructors. Book your lessons in advance to secure the best instructors and times that suit your schedule."
          links={mergeWithCMS(cmsSkiSchoolsLinks, skiSchoolsData, 'Ski Schools')}
        />

        {/* Ski Hire Section */}
        <LinksList
          heading="Ski hire"
          description="Ski Higher provide quality rental equipment at very reasonable prices. The even better news is that we have secured a massive 20% discount if you book online through their new website! They have shops in Courchevel 1850, Le Praz, La Tania, Meribel and Les Allues so click on the link below to take advantage of this fantastic offer!"
          links={mergeWithCMS(cmsSkiHireLinks, skiHireData, 'Ski Hire')}
        />

        {/* Aches and pains Section */}
        <LinksList
          heading="Aches and pains"
          description="After a long day on the slopes, your body might need some professional care. These physiotherapy and massage services specialize in treating ski-related injuries and helping you recover quickly so you can get back to enjoying your time on the mountain."
          links={mergeWithCMS(cmsAchesAndPainsLinks, achesAndPainsData, 'Aches and Pains')}
        />

        {/* Life in resort info Section */}
        <LinksList
          heading="Life in resort info"
          description="Get the most out of your ski holiday with insider information about resort life, local events, and mountain culture. These resources will help you discover the best restaurants, activities, and hidden gems that make each resort unique."
          links={mergeWithCMS(cmsLifeInResortLinks, lifeInResortData, 'Life in Resort Info')}
        />

        {/* Information Websites Section */}
        <LinksList
          heading="Information Websites"
          description="For comprehensive ski resort information, local knowledge, and community engagement, check out these websites."
          links={mergeWithCMS(cmsInformationWebsitesLinks, informationWebsitesData, 'Information Websites')}
        />


        {/* Self catering Section */}
        <LinksList
          heading="Self catering"
          description="If you're staying in self-catered accommodation, these local suppliers and delivery services will ensure you have everything you need for a comfortable stay. From fresh groceries to specialty items, they'll help you stock up without the hassle."
          links={mergeWithCMS(cmsSelfCateringLinks, selfCateringData, 'Self Catering')}
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