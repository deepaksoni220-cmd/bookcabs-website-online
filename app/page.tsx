'use client';

import { BookingWidget } from '@/components/BookingWidget';
import Image from 'next/image';
import { ArriveCardsCarousel } from '@/components/ArriveCardsCarousel';
import { StepInStickyScroll } from '@/components/StepInStickyScroll';
import { TestimonialsSection } from '@/components/ui/testimonials-6';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  return (
    <main className="Layout_main__h283P">
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section
        className="Hero_hero__L3_jO"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '140px 24px 70px',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 30,
        }}
        aria-label="Hero section"
      >
        <Image
          src="/assets/bgbannerbg.png"
          alt="Premium Chauffeur"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 35%', zIndex: -2 }}
        />
        {/* Luxury Vignette & Dark Readability Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(8, 12, 20, 0.35) 0%, rgba(8, 12, 20, 0.15) 30%, rgba(8, 12, 20, 0.65) 65%, #080c14 100%)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
        <div className="Hero_content__69IIW" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <h1
            className="Typography_display__MFaXd Typography_sm__E6Yzg Hero_title__I_fKT"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 400,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '10px',
              textShadow: '0 4px 30px rgba(0,0,0,0.85)',
            }}
          >
            Your travel feels first class...
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: '28px',
              fontWeight: 400,
              letterSpacing: '0.3px',
              textShadow: '0 2px 14px rgba(0,0,0,0.85)',
            }}
          >
            Exceptional rides. Punctual chauffeurs.
          </p>

          {/* Interactive Booking Widget */}
          <BookingWidget />
        </div>
      </section>

      {/* ── 2. ARRIVE AT YOUR BEST (SWIPABLE CAROUSEL) ─────────────────────── */}
      <section className="BookSection_bookSection__icco5" style={{ padding: '100px 48px', background: '#0b0e14' }}>
        <div className="BookSection_firstScreenContainer__tWKIL" style={{ maxWidth: '1280px', margin: '0 auto 48px' }}>
          <div className="BookSection_titleWrapper__Bb4Sy">
            <h3
              className="Typography_display__MFaXd Typography_lg__eZWnf BookSection_subtitle__C22At gradient-text"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                marginBottom: '12px',
              }}
            >
              Arrive exceptionally.
            </h3>
            <h4
              className="Typography_subheadline__OTYvI Typography_md__MMzMN"
              style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
            >
              Effortless travel, tailored to you.
            </h4>
          </div>
        </div>

        <div className="BookSection_cardsSection__uty_u">
          <ArriveCardsCarousel />
        </div>
      </section>

      {/* ── 3. STEP IN. BREATHE OUT. (3D STICKY SCROLL ANIMATION) ───────── */}
      <StepInStickyScroll />

      {/* ── 4. EFFORTLESS TRAVEL, AT YOUR COMMAND ──────────────────────────── */}
      <section className="BookAnyWhereSection_section__0f_l9" style={{ padding: '100px 48px', background: '#eaf2ff', color: '#0F1319' }}>
        <div className="BookAnyWhereSection_container__mel9a" style={{ maxWidth: '1280px', margin: '0 auto', alignItems: 'center' }}>
          <div className="BookAnyWhereSection_textContainer__eyaUE">
            <h2 className="BookAnyWhereSection_title__mV_FA" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px' }}>
              Effortless Travel, At Your Command.
            </h2>
            <p className="BookAnyWhereSection_subtitle__Mjufm" style={{ fontSize: '18px', color: '#334155', marginBottom: '32px', lineHeight: 1.65 }}>
              Seamlessly manage, reserve, and track every ride across Melbourne and Victoria. Enjoy instant bookings, live flight tracking, and 24/7 dedicated executive chauffeur care.
            </p>
            <div style={{ display: 'flex', gap: '16px' }} className="BookAnyWhereSection_buttons__o6_Wt">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('booking-widget');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const input = document.getElementById('pickup-location');
                    if (input) setTimeout(() => input.focus(), 500);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '1px',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(15, 99, 189, 0.35)',
                }}
              >
                <span>RESERVE ONLINE</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          <div className="BookAnyWhereSection_imageContainer__5LDyw" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Image
              src="/assets/big-banner-only.png"
              alt="Bookcabs Australia Chauffeur Booking"
              width={580}
              height={387}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 5. DISTINCTION IN EVERY MILE (BELOW WE MOVE WITH YOU) ──────── */}
      <section className="Arrive_arrive__7XKKN" style={{ padding: '100px 48px', background: '#eaf2ff', color: '#0F1319' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#0F1319', marginBottom: '12px' }}>
              Distinction in Every Mile.
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(15,19,25,0.7)' }}>
              Where flawless punctuality meets uncompromising comfort.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Card 1: Precision Navigation */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <span style={{ color: '#0F63BD', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  PRECISION NAVIGATION
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>
                  Every route, effortlessly mastered.
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)', lineHeight: 1.6 }}>
                  Accomplished Melbourne chauffeurs with live route insights and impeccable timing, delivering you calmly to your destination.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <div style={{ width: '104px', height: '104px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="100" height="100" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Rotating Globe Orbit */}
                    <circle cx="30" cy="30" r="26" stroke="#0F63BD" strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: 'spinSlow 20s linear infinite', transformOrigin: 'center' }} />
                    <circle cx="30" cy="30" r="18" stroke="#0F63BD" strokeWidth="1.2" strokeOpacity="0.4" />
                    {/* Pulsing Radar Ring */}
                    <circle cx="30" cy="30" r="22" stroke="#d4a359" strokeWidth="1.5" strokeOpacity="0.8" style={{ animation: 'pulseWave 2.2s ease-in-out infinite', transformOrigin: 'center' }} />
                    {/* Center Location Pin */}
                    <g style={{ animation: 'floatSmooth 3s ease-in-out infinite' }}>
                      <path d="M30 16C24.4772 16 20 20.4772 20 26C20 32.5 28 41 30 42.5C32 41 40 32.5 40 26C40 20.4772 35.5228 16 30 16Z" fill="#0F63BD" />
                      <circle cx="30" cy="25" r="4" fill="#ffffff" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Immaculate Fleet */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <span style={{ color: '#0F63BD', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  IMMACULATE FLEET
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>
                  First-class on four wheels.
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)', lineHeight: 1.6 }}>
                  A curated fleet of pristine, late-model luxury vehicles providing a sanctuary of quiet refinement, climate perfection, and executive comfort.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <div style={{ width: '124px', height: '96px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="120" height="92" viewBox="0 0 70 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Headlight Beam Shimmer */}
                    <path d="M58 32L68 28V40L58 36Z" fill="url(#beamGrad)" style={{ animation: 'beamShimmer 2s ease-in-out infinite' }} />
                    {/* Car Silhouette Body */}
                    <path d="M10 36C10 36 12 28 18 24C24 20 34 18 44 20C48 21 54 26 58 31L60 36C61 37.5 60 40 58 40H12C10 40 9.5 37.5 10 36Z" fill="#0F63BD" />
                    {/* Windows */}
                    <path d="M22 24H35V30H18C19 28 20.5 25 22 24Z" fill="#eaf2ff" fillOpacity="0.85" />
                    <path d="M37 24H45C48 25 51 28 52 30H37V24Z" fill="#eaf2ff" fillOpacity="0.85" />
                    {/* Front Wheel */}
                    <g style={{ transformOrigin: '48px 40px', animation: 'spinSlow 3s linear infinite' }}>
                      <circle cx="48" cy="40" r="7" fill="#1e293b" />
                      <circle cx="48" cy="40" r="4" fill="#d4a359" />
                      <line x1="48" y1="33" x2="48" y2="47" stroke="#ffffff" strokeWidth="1" />
                      <line x1="41" y1="40" x2="55" y2="40" stroke="#ffffff" strokeWidth="1" />
                    </g>
                    {/* Rear Wheel */}
                    <g style={{ transformOrigin: '20px 40px', animation: 'spinSlow 3s linear infinite' }}>
                      <circle cx="20" cy="40" r="7" fill="#1e293b" />
                      <circle cx="20" cy="40" r="4" fill="#d4a359" />
                      <line x1="20" y1="33" x2="20" y2="47" stroke="#ffffff" strokeWidth="1" />
                      <line x1="13" y1="40" x2="27" y2="40" stroke="#ffffff" strokeWidth="1" />
                    </g>
                    <defs>
                      <linearGradient id="beamGrad" x1="58" y1="34" x2="68" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#d4a359" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#d4a359" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Bespoke Hospitality */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <span style={{ color: '#0F63BD', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  BESPOKE CARE
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>
                  Excellence, quietly delivered.
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)', lineHeight: 1.6 }}>
                  From live flight monitoring to discreet hospitality, every fine nuance is managed so you can relax, focus, or unwind.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <div style={{ width: '104px', height: '104px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="98" height="98" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Protective Shield Outline Pulse */}
                    <path d="M29 6L47 13V27C47 38.5 39.5 48.5 29 52C18.5 48.5 11 38.5 11 27V13L29 6Z" stroke="#d4a359" strokeWidth="2" strokeOpacity="0.5" style={{ animation: 'pulseWave 2.4s ease-in-out infinite', transformOrigin: 'center' }} />
                    {/* Main Solid Shield */}
                    <path d="M29 9L44 15V26.5C44 36.5 37.5 45.5 29 48.5C20.5 45.5 14 36.5 14 26.5V15L29 9Z" fill="#0F63BD" />
                    {/* Animated Checkmark */}
                    <path d="M22 28L27 33L36 23" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'floatSmooth 2.5s ease-in-out infinite' }} />
                    <circle cx="29" cy="9" r="2.5" fill="#d4a359" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. AUSTRALIAN CLIENT TESTIMONIALS & REVIEWS ───────────────── */}
      <TestimonialsSection />

      {/* ── 7. REACT BITS PRO FAQ 1 SECTION ───────────────────────────── */}
      <FaqSection />
    </main>
  );
}
