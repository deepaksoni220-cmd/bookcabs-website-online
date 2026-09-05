import type { Metadata, Viewport } from 'next';
import './736463740f297660.css';
import './blacklane-custom.css';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { GoogleTranslate } from '@/components/GoogleTranslate';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080c14',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bookcabs.com.au'),
  title: {
    default: 'Bookcabs | Premium Chauffeur Service Melbourne',
    template: '%s | Bookcabs Melbourne',
  },
  description:
    'Experience premier chauffeur and private car services in Melbourne, Victoria. On-time Melbourne Airport transfers, corporate executive cars, hourly chauffeur hire, and luxury fleet.',
  applicationName: 'Bookcabs Australia',
  keywords: [
    'chauffeur Melbourne',
    'chauffeur service Melbourne',
    'Melbourne Airport chauffeur',
    'Melbourne Airport transfer',
    'corporate chauffeur Melbourne',
    'private chauffeur hire Melbourne',
    'luxury car service Melbourne',
    'chauffeur hire by the hour Melbourne',
  ],
  authors: [{ name: 'Bookcabs Australia' }],
  creator: 'Bookcabs Australia',
  publisher: 'Bookcabs Chauffeured Cars Australia',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: 'https://bookcabs.com.au',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://bookcabs.com.au',
    siteName: 'Bookcabs Australia',
    title: 'Bookcabs | Premium Chauffeur Service Melbourne',
    description:
      'Punctual, discreet, and luxury chauffeur services across Melbourne. Fixed upfront pricing, live flight tracking, and pristine executive fleet.',
    images: [
      {
        url: '/assets/big-banner-only.png',
        width: 1200,
        height: 630,
        alt: 'Bookcabs Melbourne Premium Chauffeur Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bookcabs | Premium Chauffeur Service Melbourne',
    description:
      'Premier luxury chauffeur services in Melbourne. Airport transfers, corporate travel, hourly hire, and prestige vehicle fleet.',
    images: ['/assets/big-banner-only.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <StructuredData pageType="home" />
      </head>
      <body>
        <div id="__next">
          <GoogleTranslate />
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
