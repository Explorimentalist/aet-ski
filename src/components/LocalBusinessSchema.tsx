// src/components/LocalBusinessSchema.tsx
import Script from 'next/script'

interface LocalBusinessSchemaProps {
  page?: 'home' | 'contact' | 'routes' | 'travel-info' | 'terms'
}

export function LocalBusinessSchema({ page = 'home' }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.aet.ski/#business",
    "name": "AET - Alps en route Transfers",
    "alternateName": "AET Ski Transfers",
    "description": "Premium private airport transfers to French Alps ski resorts. Over 15 years experience serving Les 3 Vallées, Espace Killy & Paradiski regions.",
    "url": "https://www.aet.ski",
    "telephone": "+33 (0)6.72.19.02.30", // Add your phone number
    "email": "hq@aet.ski",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "55 Rue Derrière le Château",
      "addressLocality": "Salins-Fontaine",
      "postalCode": "73600",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.466621859096435, // Add your exact coordinates
      "longitude": 6.52941299701966
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.4215,
        "longitude": 6.5234
      },
      "geoRadius": "200000" // 200km radius
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Airport Transfer Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Geneva Airport to Ski Resorts Transfer",
            "description": "Private transfers from Geneva Airport to Val d'Isère, Courchevel, Val Thorens and other French Alps ski resorts"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Lyon Airport to Ski Resorts Transfer",
            "description": "Private transfers from Lyon Airport to French Alps ski destinations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grenoble Airport to Ski Resorts Transfer",
            "description": "Private transfers from Grenoble Airport to Tignes, Alpe d'Huez and other ski resorts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chambéry Airport to Ski Resorts Transfer",
            "description": "Private transfers from Chambéry Airport to Meribel, Courchevel and surrounding ski areas"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150+"
    },
    "sameAs": [
      // Add your social media links when available
    ]
  }

  // Breadcrumb schema for internal pages
  const breadcrumbSchema = page !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.aet.ski"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' '),
        "item": `https://www.aet.ski/${page}`
      }
    ]
  } : null

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </>
  )
}
