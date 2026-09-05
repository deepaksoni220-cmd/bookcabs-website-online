'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const CARDS = [
  {
    tag: '✈️ AIRPORT TRANSFERS',
    title: 'Arrive without the wait.',
    desc: 'Flight delayed? No problem. We monitor your arrival and adjust your pickup accordingly, with complimentary wait time included.',
    image: '/assets/small card 1.png',
    alt: 'Airport transfers',
  },
  {
    tag: '🕐 HOURLY & FULL-DAY HIRE',
    title: 'Your time, your chauffeur.',
    desc: 'Keep a professional chauffeur at your service for a few hours or the entire day. Stay flexible and go wherever business or plans take you.',
    image: '/assets/small card 2.jpeg',
    alt: 'Hourly and full day hire',
  },
  {
    tag: '🛣️ CITY-TO-CITY',
    title: 'Go further, comfortably.',
    desc: 'Travel between cities in premium comfort, with a dedicated chauffeur and a smoother way to cover the distance.',
    image: '/assets/small card 3.jpeg',
    alt: 'City-to-city',
  },
  {
    tag: '💼 CORPORATE & AGENCY SOLUTIONS',
    title: 'Travel, managed beautifully.',
    desc: 'One seamless solution for corporates, businesses and agencies to book, manage and keep track of every ride.',
    image: '/assets/small card 4a.jpeg',
    alt: 'Corporate and agency solutions',
  },
];

export function ArriveCardsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollBy = (offset: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="BookSection_cardsSectionContainer__H6Qd5" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
      <div
        ref={trackRef}
        className="Carousel_trackViewport__O_bZ8"
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          paddingBottom: '16px',
          display: 'flex',
        }}
      >
        <div
          className="Carousel_track__RC3x9"
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            padding: '0 4px',
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="Carousel_slide__GNfI8"
              style={{
                listStyle: 'none',
                flex: '0 0 280px',
                width: '280px',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="ImageCard_card__e9GJD"
                style={{
                  background: '#131822',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '480px',
                }}
              >
                <div style={{ width: '100%', height: '210px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="280px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <small
                      style={{
                        color: '#0F63BD',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '11px',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {card.tag}
                    </small>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '24px' }}>
                      {card.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('booking-widget');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        const input = document.getElementById('pickup-location');
                        if (input) setTimeout(() => input.focus(), 500);
                      } else {
                        window.location.href = '/#booking-widget';
                      }
                    }}
                    className="StandardButton_standard-button__uILct StandardButton_variant-outlined__xn2x4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrow Buttons */}
      <div
        className="Carousel_navigation__MCVtp"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => scrollBy(-300)}
          disabled={!canScrollLeft}
          aria-label="Previous slide"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: canScrollLeft ? '#ffffff' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollLeft ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(300)}
          disabled={!canScrollRight}
          aria-label="Next slide"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: canScrollRight ? '#ffffff' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollRight ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
