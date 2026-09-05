'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface LocationItem {
  name: string;
  sub: string;
  type: 'airport' | 'hotel' | 'landmark' | 'station' | 'suburb' | 'address';
}

const POPULAR_LOCATIONS: LocationItem[] = [
  { name: 'Melbourne Airport (MEL – Tullamarine)', sub: 'Arrivals Dr, Melbourne Airport VIC 3045', type: 'airport' },
  { name: 'Avalon Airport (AVV)', sub: '80 Beach Rd, Lara VIC 3212', type: 'airport' },
  { name: 'Essendon Fields Airport (MEB)', sub: '72 Hargrave Ave, Essendon Fields VIC 3041', type: 'airport' },
  { name: 'Crown Towers Melbourne', sub: '8 Whiteman St, Southbank VIC 3006', type: 'hotel' },
  { name: 'The Ritz-Carlton Melbourne', sub: '650 Lonsdale St, Melbourne VIC 3000', type: 'hotel' },
  { name: 'Grand Hyatt Melbourne', sub: '123 Collins St, Melbourne VIC 3000', type: 'hotel' },
  { name: 'W Melbourne', sub: '408 Flinders Ln, Melbourne VIC 3000', type: 'hotel' },
  { name: 'Southern Cross Station', sub: 'Spencer St, Docklands VIC 3008', type: 'station' },
  { name: 'Flinders Street Railway Station', sub: 'Flinders St, Melbourne VIC 3000', type: 'station' },
  { name: 'Melbourne CBD', sub: 'Melbourne VIC 3000', type: 'suburb' },
  { name: 'St Albans Market', sub: 'Main Rd East, St Albans VIC 3021', type: 'address' },
  { name: 'Brighton', sub: 'Melbourne VIC 3186', type: 'suburb' },
  { name: 'Toorak', sub: 'Melbourne VIC 3142', type: 'suburb' },
  { name: 'South Yarra', sub: 'Melbourne VIC 3141', type: 'suburb' },
];

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  const periods = ['AM', 'PM'];
  for (let p = 0; p < 2; p++) {
    for (let h = 0; h < 12; h++) {
      const hour = h === 0 ? 12 : h;
      for (let m = 0; m < 60; m += 15) {
        const min = m === 0 ? '00' : m.toString();
        slots.push(`${hour}:${min} ${periods[p]}`);
      }
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

interface VehicleClass {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  passengers: number;
  luggage: number;
  bgGradient: string;
  image: string;
  features: string[];
}

const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: 'business',
    name: 'Business Sedan',
    subtitle: 'Mercedes-Benz EQE, E-Class or similar',
    badge: 'Popular Choice',
    passengers: 3,
    luggage: 2,
    bgGradient: 'linear-gradient(180deg, #cde3db 0%, #f4f0eb 100%)',
    image: '/assets/fleet/sedan.png',
    features: [
      'Complimentary 60 mins airport wait time',
      'Flight tracking & dynamic arrival adjustment',
      'Professional certified chauffeur in suit & tie',
      'Free cancellation up to 1 hour before pickup',
      'Complimentary bottled water & Wi-Fi',
    ],
  },
  {
    id: 'first',
    name: 'Business Luxury Cars',
    subtitle: 'Mercedes-Benz S-Class, BMW 7 or similar',
    badge: 'VIP Flagship',
    passengers: 3,
    luggage: 2,
    bgGradient: 'linear-gradient(180deg, #cad8e6 0%, #f4f0eb 100%)',
    image: '/assets/fleet/first-class.png',
    features: [
      'Top-tier flagship European luxury vehicles',
      'Elite executive chauffeur service',
      'Whisper-quiet acoustic cabin & recliner seating',
      'Complimentary luxury amenities & refreshments',
      'Priority 24/7 VIP Concierge dispatch support',
    ],
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    subtitle: 'BMW X7, Audi Q7, Mercedes GLE/GLS',
    badge: 'Elevated Comfort',
    passengers: 4,
    luggage: 4,
    bgGradient: 'linear-gradient(180deg, #d3e4ea 0%, #f5f2ec 100%)',
    image: '/assets/fleet/suv.png',
    features: [
      'Elevated ride height & panoramic cabin view',
      'Spacious luxury seating with large cargo boot',
      'Complimentary 60 mins airport wait time',
      'Real-time flight tracking & meet-and-greet',
      'Complimentary Wi-Fi, refreshments & child seats',
    ],
  },
  {
    id: 'van',
    name: 'Business Van',
    subtitle: 'Mercedes-Benz V-Class or similar',
    badge: 'Spacious & Groups',
    passengers: 5,
    luggage: 5,
    bgGradient: 'linear-gradient(180deg, #fce0cd 0%, #f7f1ea 100%)',
    image: '/assets/fleet/van.png',
    features: [
      'Extra spacious luxury conference seating',
      'Large luggage trunk capacity (5+ suitcases)',
      'Complimentary 60 mins wait time for airports',
      'Child booster seats available on request',
      'Free cancellation up to 1 hour before pickup',
    ],
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const QUOTE_FAQS: FaqItem[] = [
  {
    question: 'How quickly will I receive my quote on WhatsApp or Email?',
    answer:
      'Our dedicated 24/7 concierge team typically delivers your all-inclusive fixed quote within 5 to 15 minutes with vehicle availability confirmed.',
  },
  {
    question: 'Are tolls, taxes, and airport fees included in the quote?',
    answer:
      'Yes, all bookcabs aus quotes are 100% all-inclusive. Road tolls, airport access charges, flight tracking, and GST are bundled with zero surprise charges.',
  },
  {
    question: 'What happens if my flight arrives late or is rescheduled?',
    answer:
      'We monitor all flights in real time. Your chauffeur automatically adjusts pickup time according to your actual flight touchdown, with up to 60 minutes of complimentary wait time at the airport.',
  },
  {
    question: 'What is your cancellation and amendment policy?',
    answer:
      'You can cancel or modify your reservation free of charge up to 1 hour before the scheduled pickup time for one-way transfers, and up to 24 hours for hourly charters.',
  },
  {
    question: 'Can I book a Luxury SUV or Business Van for extra luggage?',
    answer:
      'Yes! Our Luxury SUV and Business Van options accommodate 4 to 5 passengers with up to 5 large suitcases, making them perfect for family airport transfers, golf trips, and roadshows.',
  },
  {
    question: 'Can I book a ride for a guest, VIP client, or corporate partner?',
    answer:
      'Absolutely. Choose "Book for a guest" and provide their contact details. Your chauffeur will provide a discreet, executive meet-and-greet service with personalized name signage if desired.',
  },
];

function QuoteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Location & Booking Form States
  const [pickup, setPickup] = useState(searchParams.get('pickup') || 'Melbourne Airport (MEL – Tullamarine)');
  const [dropoff, setDropoff] = useState(searchParams.get('dropoff') || 'St Albans Market, Main Rd East VIC');
  const [date, setDate] = useState(searchParams.get('date') || 'Today');
  const [time, setTime] = useState(searchParams.get('time') || '12:00 PM');
  const [tripType, setTripType] = useState<'transfer' | 'hourly'>((searchParams.get('type') as any) || 'transfer');

  // Dropdown states for location editing
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showLocationEditorMobile, setShowLocationEditorMobile] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState<LocationItem[]>(POPULAR_LOCATIONS.slice(0, 6));
  const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationItem[]>(POPULAR_LOCATIONS.slice(0, 6));

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('business');
  const [bookingMode, setBookingMode] = useState<'myself' | 'guest'>('myself');
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // FAQ open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Details Modal
  const [detailsModalVehicle, setDetailsModalVehicle] = useState<VehicleClass | null>(null);

  // Email Quote Modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Carousel ref for horizontal swipe sync
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const selectedIndex = VEHICLE_CLASSES.findIndex((v) => v.id === selectedVehicleId);
  const selectedVehicle = VEHICLE_CLASSES[selectedIndex >= 0 ? selectedIndex : 0];

  // Search filter
  const filterLocations = (query: string, setResults: (items: LocationItem[]) => void) => {
    if (!query.trim()) {
      setResults(POPULAR_LOCATIONS.slice(0, 6));
      return;
    }
    const q = query.toLowerCase();
    const matches = POPULAR_LOCATIONS.filter(
      (loc) => loc.name.toLowerCase().includes(q) || loc.sub.toLowerCase().includes(q)
    );
    setResults(matches.length > 0 ? matches : [{ name: query, sub: 'Custom Address', type: 'address' }]);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth * 0.86;
      carouselRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: 'smooth',
      });
      setSelectedVehicleId(VEHICLE_CLASSES[index].id);
      setActiveSlideIndex(index);
    }
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.clientWidth * 0.86 + 16;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < VEHICLE_CLASSES.length && newIndex !== activeSlideIndex) {
        setActiveSlideIndex(newIndex);
        setSelectedVehicleId(VEHICLE_CLASSES[newIndex].id);
      }
    }
  };

  // WhatsApp Link Builder
  const getWhatsAppUrl = () => {
    const message = `Hello Bookcabs Australia, I would like to request an instant quote for a chauffeur booking:

🚘 Vehicle: ${selectedVehicle.name} (${selectedVehicle.subtitle})
📍 Pick-up: ${pickup}
🏁 Drop-off: ${dropoff}
📅 Date: ${date}
⏰ Time: ${time}
👥 Service: ${tripType === 'hourly' ? 'Hourly Chauffeur Service' : 'Direct Luxury Transfer'}
${guestName ? `👤 Passenger: ${guestName}` : ''}

Please send me the quote and chauffeur availability. Thank you!`;
    return `https://wa.me/61417833137?text=${encodeURIComponent(message)}`;
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', overflowX: 'hidden', backgroundColor: '#fbf8f2', color: '#0f1319', fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          width: 100% !important;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .quote-page-wrapper {
          max-width: 1360px;
          width: 100%;
          box-sizing: border-box;
          margin: 0 auto;
          padding: 24px 20px 80px;
          overflow-x: hidden;
        }
        .quote-main-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .desktop-vehicle-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        .mobile-carousel-container {
          display: none;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .mobile-map-top {
          display: none;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          margin-bottom: 20px;
        }
        .desktop-map-preview {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .mobile-bottom-bar {
          display: none;
        }
        
        .quote-header {
          background: rgba(8, 12, 20, 0.92);
          background-image: linear-gradient(180deg, rgba(15, 20, 32, 0.96) 0%, rgba(8, 12, 20, 0.92) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
          padding: 12px 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
        }
        .quote-header-inner {
          max-width: 1360px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-sizing: border-box;
        }
        .quote-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .quote-header-logo-img {
          height: 36px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: brightness(0) invert(1) drop-shadow(0 2px 10px rgba(56, 189, 248, 0.45));
          transition: transform 0.2s ease;
        }
        .quote-back-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .quote-back-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1px);
        }
        /* MOBILE & TABLET STYLES */
        @media (max-width: 960px) {
          .quote-header {
            padding: 10px 14px !important;
          }
          .quote-header-inner {
            gap: 10px !important;
          }
          .quote-header-left {
            gap: 10px !important;
          }
          .quote-header-logo-img {
            height: 30px !important;
          }
          .quote-back-btn {
            padding: 6px 12px !important;
            font-size: 12.5px !important;
          }
          .quote-page-wrapper {
            padding: 16px 14px 110px !important;
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          .quote-main-layout {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            gap: 20px;
          }
          .desktop-vehicle-grid {
            display: none !important;
          }
          .mobile-carousel-container {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            margin-bottom: 20px;
          }
          .mobile-map-top {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .desktop-map-preview {
            display: none !important;
          }
          .mobile-bottom-bar {
            display: flex !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
            background: #ffffff;
            border-top: 1px solid #e3e7eb;
            padding: 12px 14px;
            box-shadow: 0 -6px 25px rgba(0,0,0,0.12);
            z-index: 90;
            align-items: center;
            justifyContent: space-between;
            gap: 10px;
          }
          .desktop-location-bar {
            display: none !important;
          }
          .mobile-location-summary-card {
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .breadcrumb-steps {
            display: none !important;
          }
        }
        
        @media (min-width: 961px) {
          .desktop-location-bar {
            display: block !important;
          }
          .mobile-location-summary-card {
            display: none !important;
          }
        }
        
        /* Hide scrollbar for carousel */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── CLEAN LUXURY TOP NAVIGATION BAR ─────────────────────────────────── */}
      <header className="quote-header">
        <div className="quote-header-inner">
          {/* Logo & Back button */}
          <div className="quote-header-left">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="quote-back-btn"
              aria-label="Back to Homepage"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <span>Home</span>
            </button>
            <Link href="/" aria-label="Bookcabs Home" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <Image
                src="/assets/bookcabs%20logo.png"
                alt="Bookcabs Australia"
                width={130}
                height={42}
                priority
                className="quote-header-logo-img"
              />
            </Link>
          </div>

          {/* Step Progress Tracker */}
          <div className="breadcrumb-steps" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>1. Choose vehicle</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>→</span>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>2. Route Details</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>→</span>
            <span>3. Instant Quote</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <main className="quote-page-wrapper">

        {/* ── 1. ENTERING LOCATION DETAILS WIDGET (DESKTOP BAR) ──────────────── */}
        <div
          className="desktop-location-bar"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e3e7eb',
            padding: '16px 20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setTripType('transfer')}
                style={{
                  background: tripType === 'transfer' ? '#0f63bd' : '#f0f3f6',
                  color: tripType === 'transfer' ? '#ffffff' : '#0f1319',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                One-way Transfer
              </button>
              <button
                type="button"
                onClick={() => setTripType('hourly')}
                style={{
                  background: tripType === 'hourly' ? '#0f63bd' : '#f0f3f6',
                  color: tripType === 'hourly' ? '#ffffff' : '#0f1319',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                By the Hour
              </button>
            </div>
            <span style={{ fontSize: '12px', color: '#6e6e73' }}>
              Edit ride locations & time anytime
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1.3fr) 140px 140px', gap: '12px', alignItems: 'center' }}>
            {/* Pick-up Input */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #d0d7de',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f63bd', flexShrink: 0 }} />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    filterLocations(e.target.value, setPickupSuggestions);
                    setShowPickupDropdown(true);
                  }}
                  onFocus={() => setShowPickupDropdown(true)}
                  placeholder="Enter pick-up location..."
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', fontWeight: 600, color: '#0f1319' }}
                />
              </div>

              {showPickupDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e3e7eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginTop: '4px',
                    zIndex: 200,
                    maxHeight: '220px',
                    overflowY: 'auto',
                  }}
                >
                  {pickupSuggestions.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setPickup(item.name);
                        setShowPickupDropdown(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid #f0f3f6',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f1319' }}>{item.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#6e6e73' }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drop-off Input */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #d0d7de',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f1319', flexShrink: 0 }} />
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => {
                    setDropoff(e.target.value);
                    filterLocations(e.target.value, setDropoffSuggestions);
                    setShowDropoffDropdown(true);
                  }}
                  onFocus={() => setShowDropoffDropdown(true)}
                  placeholder="Enter drop-off destination..."
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', fontWeight: 600, color: '#0f1319' }}
                />
              </div>

              {showDropoffDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e3e7eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginTop: '4px',
                    zIndex: 200,
                    maxHeight: '220px',
                    overflowY: 'auto',
                  }}
                >
                  {dropoffSuggestions.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setDropoff(item.name);
                        setShowDropoffDropdown(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid #f0f3f6',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f1319' }}>{item.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#6e6e73' }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Input */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                style={{
                  border: '1px solid #d0d7de',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f1319',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>📅 {date}</span>
                <span style={{ fontSize: '10px', color: '#6e6e73' }}>▼</span>
              </div>

              {showDateDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e3e7eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginTop: '4px',
                    zIndex: 200,
                  }}
                >
                  {['Today', 'Tomorrow', 'This Weekend', 'Custom Date'].map((d) => (
                    <div
                      key={d}
                      onClick={() => {
                        setDate(d);
                        setShowDateDropdown(false);
                      }}
                      style={{ padding: '8px 12px', fontSize: '12.5px', cursor: 'pointer', borderBottom: '1px solid #f0f3f6' }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Time Input */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                style={{
                  border: '1px solid #d0d7de',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f1319',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>⏰ {time}</span>
                <span style={{ fontSize: '10px', color: '#6e6e73' }}>▼</span>
              </div>

              {showTimeDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '160px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e3e7eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginTop: '4px',
                    zIndex: 200,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {TIME_SLOTS.slice(0, 24).map((t) => (
                    <div
                      key={t}
                      onClick={() => {
                        setTime(t);
                        setShowTimeDropdown(false);
                      }}
                      style={{ padding: '8px 12px', fontSize: '12.5px', cursor: 'pointer', borderBottom: '1px solid #f0f3f6' }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 2. MOBILE LOCATION SUMMARY & EXPANDABLE EDITOR ──────────────── */}
        <div
          className="mobile-location-summary-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e3e7eb',
            padding: '14px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f63bd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Trip Details
            </span>
            <button
              type="button"
              onClick={() => setShowLocationEditorMobile(!showLocationEditorMobile)}
              style={{
                background: '#f0f3f6',
                border: 'none',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#0f1319',
                cursor: 'pointer',
              }}
            >
              {showLocationEditorMobile ? 'Close edit' : 'Edit locations ✏️'}
            </button>
          </div>

          {!showLocationEditorMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f63bd' }} />
                <span style={{ fontWeight: 600, color: '#0f1319', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pickup}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f1319' }} />
                <span style={{ fontWeight: 600, color: '#0f1319', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {dropoff}
                </span>
              </div>
              <div style={{ color: '#6e6e73', fontSize: '11.5px', marginTop: '2px' }}>
                📅 {date} · ⏰ {time}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pick-up Location"
                style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '12.5px' }}
              />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Drop-off Location"
                style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '12.5px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '12.5px' }}
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Time"
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '12.5px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Top Route Map Card */}
        <div className="mobile-map-top">
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e3e7eb',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              position: 'relative',
              height: '190px',
              background: '#e8ecef',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 500 190" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.9, overflow: 'hidden' }}>
              <rect width="100%" height="100%" fill="#f4f3f0" />
              <path d="M0,40 Q150,60 300,30 T600,50" stroke="#e0e0e0" strokeWidth="8" fill="none" />
              <path d="M0,120 Q200,90 400,140 T800,100" stroke="#ffffff" strokeWidth="12" fill="none" />
              <path d="M120,0 Q180,120 220,240" stroke="#e6e6e6" strokeWidth="6" fill="none" />
              <path d="M350,0 Q320,120 380,240" stroke="#e6e6e6" strokeWidth="8" fill="none" />
              <path d="M50,180 L500,200" stroke="#ffffff" strokeWidth="10" fill="none" />
              <path
                d="M260,35 C280,80 200,130 140,155"
                stroke="#0f63bd"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Pickup Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                display: 'flex',
                overflow: 'hidden',
                border: '1px solid #e3e7eb',
                maxWidth: '200px',
              }}
            >
              <div style={{ padding: '5px 8px', fontSize: '11px', lineHeight: 1.2 }}>
                <div style={{ fontWeight: 700, color: '#0f1319' }}>Pick up</div>
                <div style={{ color: '#6e6e73', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                  {pickup}
                </div>
              </div>
              <div style={{ backgroundColor: '#0f63bd', color: '#ffffff', padding: '5px 8px', fontSize: '10px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span>{time.split(' ')[0]}</span>
                <span>{time.split(' ')[1] || 'PM'}</span>
              </div>
            </div>

            {/* Dropoff Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                display: 'flex',
                overflow: 'hidden',
                border: '1px solid #e3e7eb',
                maxWidth: '200px',
              }}
            >
              <div style={{ padding: '5px 8px', fontSize: '11px', lineHeight: 1.2 }}>
                <div style={{ fontWeight: 700, color: '#0f1319' }}>Drop-off</div>
                <div style={{ color: '#6e6e73', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                  {dropoff}
                </div>
              </div>
              <div style={{ backgroundColor: '#0f1319', color: '#ffffff', padding: '5px 8px', fontSize: '10px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span>+18</span>
                <span>min</span>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '4px', right: '8px', fontSize: '9px', color: '#6e6e73' }}>
              Map data ©2026 Google · bookcabs aus
            </div>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: 400,
              color: '#0f1319',
              margin: '0 0 6px 0',
              letterSpacing: '-0.5px',
            }}
          >
            Choose your experience
          </h1>
          <p style={{ color: '#6e6e73', fontSize: '13.5px', margin: 0 }}>
            Select your preferred luxury vehicle class. Receive an instant quote via WhatsApp or Email.
          </p>
        </div>

        {/* ── MOBILE SWIPEABLE CAROUSEL FOR VEHICLES ──────────────────────── */}
        <div className="mobile-carousel-container">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="no-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              gap: '14px',
              padding: '4px 2px 14px',
            }}
          >
            {VEHICLE_CLASSES.map((car, idx) => {
              const isSelected = selectedVehicleId === car.id;
              return (
                <div
                  key={car.id}
                  onClick={() => {
                    setSelectedVehicleId(car.id);
                    scrollToSlide(idx);
                  }}
                  style={{
                    flex: '0 0 85%',
                    scrollSnapAlign: 'center',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #0f63bd' : '1px solid #e3e7eb',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSelected
                      ? '0 12px 28px rgba(15, 99, 189, 0.18), 0 0 0 1px #0f63bd'
                      : '0 4px 14px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: '#0f63bd',
                        color: '#ffffff',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 8px rgba(15,99,189,0.4)',
                      }}
                    >
                      <span>✓ Selected</span>
                    </div>
                  )}

                  {/* Vehicle Ambient Banner */}
                  <div
                    style={{
                      background: car.bgGradient,
                      height: '210px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '16px',
                    }}
                  >
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 768px) 85vw, 320px"
                      style={{
                        objectFit: 'contain',
                        padding: '12px',
                        filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))',
                      }}
                    />
                  </div>

                  {/* Card Details */}
                  <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1319', margin: '0 0 2px 0' }}>
                            {car.name}
                          </h3>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f63bd', backgroundColor: '#eaf2ff', padding: '3px 8px', borderRadius: '6px' }}>
                            {car.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#6e6e73' }}>
                          {car.subtitle}
                        </div>
                      </div>

                      {/* Specs */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#6e6e73', fontSize: '13px', margin: '10px 0' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          <span>{car.passengers} Passengers</span>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="14" x="4" y="7" rx="2"/><path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/><path d="M4 12h16"/></svg>
                          <span>{car.luggage} Bags</span>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f0f3f6' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailsModalVehicle(car);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: '#0f63bd',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        View inclusions →
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedVehicleId(car.id)}
                        style={{
                          background: isSelected ? '#0f63bd' : '#f0f3f6',
                          color: isSelected ? '#ffffff' : '#0f1319',
                          border: 'none',
                          borderRadius: '999px',
                          padding: '6px 14px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe Dots Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            {VEHICLE_CLASSES.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  width: activeSlideIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: activeSlideIndex === idx ? '#0f63bd' : '#d0d7de',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP + MOBILE STRUCTURED LAYOUT ───────────────────────────── */}
        <div className="quote-main-layout">
          {/* ── LEFT COLUMN: 4 VEHICLE CARDS (DESKTOP 2x2 GRID) ──────────────── */}
          <div className="desktop-vehicle-grid">
            {VEHICLE_CLASSES.map((car) => {
              const isSelected = selectedVehicleId === car.id;
              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedVehicleId(car.id)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #0f63bd' : '1px solid #e3e7eb',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected
                      ? '0 12px 30px rgba(15, 99, 189, 0.15), 0 0 0 1px #0f63bd'
                      : '0 4px 16px rgba(0,0,0,0.04)',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                  }}
                >
                  {/* Top Ambient Vehicle Area */}
                  <div
                    style={{
                      background: car.bgGradient,
                      height: '210px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '16px',
                    }}
                  >
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="320px"
                      style={{
                        objectFit: 'contain',
                        padding: '14px',
                        filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.18))',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Card Bottom Details */}
                  <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: '#0f1319', margin: 0, lineHeight: 1.2 }}>
                            {car.name}
                          </h3>
                          <div style={{ fontSize: '11.5px', color: '#6e6e73', marginTop: '2px' }}>
                            {car.subtitle}
                          </div>
                        </div>
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f63bd', backgroundColor: '#eaf2ff', padding: '3px 7px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          {car.badge}
                        </span>
                      </div>

                      {/* Specs: Passengers & Luggage */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#6e6e73', fontSize: '12.5px', marginBottom: '14px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          <span>{car.passengers}</span>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="14" x="4" y="7" rx="2"/><path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/><path d="M4 12h16"/></svg>
                          <span>{car.luggage}</span>
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailsModalVehicle(car);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#0f63bd',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                    >
                      View inclusions & details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT COLUMN: MAP PREVIEW & INSTANT QUOTE ACTIONS ──────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Desktop Map Route Preview Card */}
            <div
              className="desktop-map-preview"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e3e7eb',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                position: 'relative',
                height: '240px',
                background: '#e8ecef',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 600 240" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.9, overflow: 'hidden' }}>
                <rect width="100%" height="100%" fill="#f4f3f0" />
                <path d="M0,40 Q150,60 300,30 T600,50" stroke="#e0e0e0" strokeWidth="8" fill="none" />
                <path d="M0,120 Q200,90 400,140 T800,100" stroke="#ffffff" strokeWidth="12" fill="none" />
                <path d="M120,0 Q180,120 220,240" stroke="#e6e6e6" strokeWidth="6" fill="none" />
                <path d="M350,0 Q320,120 380,240" stroke="#e6e6e6" strokeWidth="8" fill="none" />
                <path d="M50,180 L500,200" stroke="#ffffff" strokeWidth="10" fill="none" />
                <path
                  d="M330,45 C350,90 280,140 220,165"
                  stroke="#0f63bd"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Pickup Pin Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  display: 'flex',
                  overflow: 'hidden',
                  border: '1px solid #e3e7eb',
                  maxWidth: '240px',
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '11px', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 700, color: '#0f1319' }}>Pick up</div>
                  <div style={{ color: '#6e6e73', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                    {pickup}
                  </div>
                </div>
                <div style={{ backgroundColor: '#0f63bd', color: '#ffffff', padding: '6px 8px', fontSize: '10px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span>{time.split(' ')[0]}</span>
                  <span>{time.split(' ')[1] || 'PM'}</span>
                </div>
              </div>

              {/* Drop-off Pin Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  display: 'flex',
                  overflow: 'hidden',
                  border: '1px solid #e3e7eb',
                  maxWidth: '240px',
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '11px', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 700, color: '#0f1319' }}>Drop-off</div>
                  <div style={{ color: '#6e6e73', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                    {dropoff}
                  </div>
                </div>
                <div style={{ backgroundColor: '#0f1319', color: '#ffffff', padding: '6px 8px', fontSize: '10px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span>+18</span>
                  <span>min</span>
                </div>
              </div>

              <div style={{ position: 'absolute', bottom: '6px', right: '10px', fontSize: '9px', color: '#6e6e73' }}>
                Map data ©2026 Google · bookcabs aus
              </div>
            </div>

            {/* Selected Vehicle & Instant Quote Request Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e3e7eb',
                padding: '22px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              {/* Top Selected Fleet Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f1319', margin: 0 }}>
                  {selectedVehicle.name}
                </h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '999px' }}>
                  All-Inclusive Chauffeur
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '18px' }}>
                {selectedVehicle.subtitle}
              </div>

              {/* Trip Inclusions Highlights */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', marginBottom: '18px', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0f1319' }}>
                  <span style={{ color: '#0f63bd', fontWeight: 700 }}>✓</span>
                  <span>Flight tracking & 60-min complimentary airport wait</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0f1319' }}>
                  <span style={{ color: '#0f63bd', fontWeight: 700 }}>✓</span>
                  <span>All tolls, airport surcharges & GST included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f1319' }}>
                  <span style={{ color: '#0f63bd', fontWeight: 700 }}>✓</span>
                  <span>Free cancellation up to 1 hour before pickup</span>
                </div>
              </div>

              {/* Passenger Toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {/* Book for myself */}
                <div
                  onClick={() => {
                    setBookingMode('myself');
                    setShowGuestForm(false);
                  }}
                  style={{
                    border: bookingMode === 'myself' ? '1.5px solid #0f63bd' : '1px solid #e3e7eb',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    backgroundColor: bookingMode === 'myself' ? 'rgba(15, 99, 189, 0.03)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: bookingMode === 'myself' ? '#0f63bd' : '#eaf2ff',
                      color: bookingMode === 'myself' ? '#ffffff' : '#0f63bd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f1319' }}>Book for myself</div>
                    <div style={{ fontSize: '11.5px', color: '#6e6e73' }}>Instant quote for your ride</div>
                  </div>
                </div>

                {/* Book for a guest */}
                <div
                  onClick={() => {
                    setBookingMode('guest');
                    setShowGuestForm(!showGuestForm);
                  }}
                  style={{
                    border: bookingMode === 'guest' ? '1.5px solid #0f63bd' : '1px solid #e3e7eb',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    backgroundColor: bookingMode === 'guest' ? 'rgba(15, 99, 189, 0.03)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#f0f3f6',
                          color: '#6e6e73',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f1319' }}>Book for a guest</div>
                        <div style={{ fontSize: '11.5px', color: '#6e6e73' }}>Chauffeur will meet guest</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#0f63bd', fontWeight: 600 }}>
                      {showGuestForm ? 'Close' : 'Add info'}
                    </span>
                  </div>

                  {showGuestForm && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        paddingTop: '8px',
                        borderTop: '1px solid #e3e7eb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Guest Full Name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #d0d7de',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input
                          type="email"
                          placeholder="Guest Email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #d0d7de',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        />
                        <input
                          type="tel"
                          placeholder="Guest Phone"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #d0d7de',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── ACTION BUTTONS: GET QUOTE ON WHATSAPP & GET QUOTE ON EMAIL ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* 1. WhatsApp Quote CTA */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '999px',
                    padding: '15px 20px',
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '0.2px',
                    boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.652-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Get Quote on WhatsApp</span>
                </a>

                {/* 2. Email Quote CTA */}
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #0F63BD 0%, #083c7a 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '15px 20px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(15, 99, 189, 0.35)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>Get Quote on Email</span>
                </button>
              </div>

              <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#6e6e73', marginTop: '14px' }}>
                Instant response within 5 minutes · 24/7 VIP Concierge
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. FAQ SECTION ON QUOTE PAGE ─────────────────────────────────── */}
        <section style={{ marginTop: '64px', borderTop: '1px solid #e3e7eb', paddingTop: '48px' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#0f63bd', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                HAVE QUESTIONS?
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(26px, 3.5vw, 36px)',
                  fontWeight: 400,
                  color: '#0f1319',
                  margin: '0 0 10px 0',
                }}
              >
                Frequently Asked Questions
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '14px', margin: 0 }}>
                Everything you need to know about our chauffeur services, quotes, and VIP guarantees.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {QUOTE_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      border: isOpen ? '1px solid #0f63bd' : '1px solid #e3e7eb',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      boxShadow: isOpen ? '0 8px 24px rgba(15, 99, 189, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: '15px', fontWeight: 600, color: isOpen ? '#0f63bd' : '#0f1319' }}>
                        {faq.question}
                      </span>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: isOpen ? '#eaf2ff' : '#f4f4f5',
                          color: isOpen ? '#0f63bd' : '#6e6e73',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '16px',
                          fontWeight: 700,
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 20px 18px', color: '#4b5563', fontSize: '13.5px', lineHeight: 1.6, borderTop: '1px solid #f0f3f6', paddingTop: '12px' }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── MOBILE FIXED BOTTOM ACTION BAR ─────────────────────────────────── */}
      <div className="mobile-bottom-bar">
        {/* WhatsApp Quote Mobile */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '999px',
            padding: '13px 12px',
            fontSize: '13.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 3px 14px rgba(37, 211, 102, 0.35)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.652-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>WhatsApp Quote</span>
        </a>

        {/* Email Quote Mobile */}
        <button
          type="button"
          onClick={() => setShowEmailModal(true)}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #0F63BD 0%, #083c7a 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            padding: '12px 10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 3px 12px rgba(15, 99, 189, 0.35)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>Email Quote</span>
        </button>
      </div>

      {/* ── VEHICLE DETAILS MODAL ───────────────────────────────────────────── */}
      {detailsModalVehicle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 12, 20, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setDetailsModalVehicle(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ position: 'relative', height: '220px', background: detailsModalVehicle.bgGradient, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src={detailsModalVehicle.image}
                alt={detailsModalVehicle.name}
                fill
                style={{ objectFit: 'contain', padding: '16px', filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.2))' }}
              />
              <button
                type="button"
                onClick={() => setDetailsModalVehicle(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f1319', margin: 0 }}>
                  {detailsModalVehicle.name}
                </h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f63bd', backgroundColor: '#eaf2ff', padding: '4px 10px', borderRadius: '6px' }}>
                  {detailsModalVehicle.badge}
                </span>
              </div>
              <p style={{ color: '#6e6e73', fontSize: '14px', margin: '0 0 16px 0' }}>
                {detailsModalVehicle.subtitle}
              </p>

              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f1319', marginBottom: '10px' }}>
                Included with this luxury service:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151', fontSize: '13.5px' }}>
                {detailsModalVehicle.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setSelectedVehicleId(detailsModalVehicle.id);
                  setDetailsModalVehicle(null);
                }}
                style={{
                  width: '100%',
                  marginTop: '24px',
                  backgroundColor: '#0f63bd',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Select this class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── GET QUOTE ON EMAIL MODAL ────────────────────────────────────────── */}
      {showEmailModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 12, 20, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
          onClick={() => setShowEmailModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px 24px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#f0f3f6',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {!emailSubmitted ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eaf2ff', color: '#0f63bd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1319', margin: 0 }}>
                    Get Instant Quote by Email
                  </h3>
                </div>
                <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '18px' }}>
                  We will send a detailed quote and confirmation directly to your inbox.
                </p>

                {/* Ride Summary Box */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', marginBottom: '18px', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#0f63bd', fontWeight: 700 }}>Vehicle:</span>
                    <span style={{ color: '#0f1319', fontWeight: 600 }}>{selectedVehicle.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b', fontWeight: 700 }}>Pickup:</span>
                    <span style={{ color: '#0f1319', fontWeight: 600 }}>{pickup}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b', fontWeight: 700 }}>Drop-off:</span>
                    <span style={{ color: '#0f1319', fontWeight: 600 }}>{dropoff}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#64748b', fontWeight: 700 }}>Schedule:</span>
                    <span style={{ color: '#0f1319', fontWeight: 600 }}>{date} at {time}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#0f1319', marginBottom: '4px' }}>
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#0f1319', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Smith"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#0f1319', marginBottom: '4px' }}>
                      Phone / Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +61 417 833 137"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#0f1319', marginBottom: '4px' }}>
                      Special Requests / Flight Number (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flight QF440, child booster seat, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!userEmail) {
                      alert('Please enter your email address to receive the quote.');
                      return;
                    }
                    setEmailSubmitted(true);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#0f63bd',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '15px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15, 99, 189, 0.35)',
                  }}
                >
                  Send My Tailored Quote
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f1319', marginBottom: '8px' }}>
                  Quote Sent to Your Email!
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6e6e73', marginBottom: '24px', lineHeight: 1.5 }}>
                  We have dispatched your luxury quote for <strong>{selectedVehicle.name}</strong> to <strong>{userEmail || 'your email'}</strong>.<br />
                  Our concierge team is available 24/7 if you need any adjustments.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '13px 18px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 3px 12px rgba(37, 211, 102, 0.35)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.652-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailSubmitted(false);
                      setShowEmailModal(false);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#f0f3f6',
                      color: '#0f1319',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '999px',
                      fontWeight: 600,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fbf8f2' }}>Loading quote experience...</div>}>
      <QuoteContent />
    </Suspense>
  );
}
