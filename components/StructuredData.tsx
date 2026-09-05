import React from 'react';

interface StructuredDataProps {
  pageType?: 'home' | 'fleet' | 'about' | 'connect' | 'quote' | 'legal';
}

export function StructuredData({ pageType = 'home' }: StructuredDataProps) {
  const baseUrl = 'https://bookcabs.com.au';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LimousineService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Bookcabs Australia',
    alternateName: 'Bookcabs Chauffeured Cars Melbourne',
    description:
      'Premier luxury chauffeur and private car service in Melbourne, Victoria. Specialising in Melbourne Airport transfers, executive corporate transport, hourly charters, and city-to-city private travel.',
    url: baseUrl,
    telephone: '+61417833137',
    email: 'Contact@bookcabs.com.au',
    priceRange: '$$$',
    image: `${baseUrl}/assets/bookcabs%20logo.png`,
    logo: `${baseUrl}/assets/bookcabs%20logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      postalCode: '3000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Melbourne',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Victoria',
      },
      {
        '@type': 'Place',
        name: 'Melbourne Airport (MEL) Tullamarine',
      },
      {
        '@type': 'Place',
        name: 'Melbourne CBD',
      },
      {
        '@type': 'Place',
        name: 'Southbank',
      },
      {
        '@type': 'Place',
        name: 'Docklands',
      },
      {
        '@type': 'Place',
        name: 'South Yarra',
      },
      {
        '@type': 'Place',
        name: 'Toorak',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Melbourne Chauffeur Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Melbourne Airport Chauffeur Transfers',
            description:
              'Private chauffeured transfers to and from Melbourne Tullamarine (MEL) and Avalon (AVV) Airports with live flight monitoring and complimentary meet & greet.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hourly & Full-Day Chauffeur Hire',
            description:
              'Dedicated private chauffeur by the hour or full day for corporate meetings, roadshows, private tours, and VIP events across Melbourne.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate & Executive Chauffeur Solutions',
            description:
              'Discreet, reliable executive ground transport for business executives, corporations, and travel management agencies.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'City-to-City & Regional Private Transfers',
            description:
              'Long-distance private chauffeur travel connecting Melbourne with regional Victoria and interstate destinations.',
          },
        },
      ],
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Bookcabs Australia',
    legalName: 'Bookcabs Chauffeured Cars Australia',
    url: baseUrl,
    logo: `${baseUrl}/assets/bookcabs%20logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+61417833137',
        contactType: 'customer service',
        areaServed: 'AU',
        availableLanguage: ['en'],
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Bookcabs Australia',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far in advance can I book a chauffeur in Melbourne with Bookcabs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book rides months in advance or as little as 60 minutes before scheduled pickup. For Melbourne Airport transfers and full-day hire, advance booking is recommended to guarantee your preferred vehicle tier.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if my flight to Melbourne Airport is delayed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every Melbourne Airport transfer includes complimentary real-time flight tracking. Your chauffeur monitors your flight status and adjusts arrival automatically, with up to 60 minutes of free wait time after touchdown.',
        },
      },
      {
        '@type': 'Question',
        name: 'What vehicles are available in the Bookcabs Melbourne fleet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our premium fleet includes Luxury Sedans (Mercedes-Benz S-Class, Audi A7, BMW 7 Series, Tesla Model S), Executive Business Vans (Mercedes-Benz V-Class), and Premium First-Class SUVs. All vehicles are impeccably detailed and late-model.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I hire a private chauffeur by the hour in Melbourne?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our hourly chauffeur service allows you to book a dedicated vehicle and professional driver for 2 to 24 hours with unlimited stops across Melbourne and regional Victoria.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Bookcabs provide corporate chauffeur accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Bookcabs provides corporate accounts with streamlined booking, centralized monthly invoicing, and priority dispatch for companies and agencies.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {(pageType === 'home' || pageType === 'fleet') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
