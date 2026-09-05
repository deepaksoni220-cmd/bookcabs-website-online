'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StepInStickyScroll } from '@/components/StepInStickyScroll';
import { TestimonialsSection } from '@/components/ui/testimonials-6';
import { FaqSection } from '@/components/FaqSection';
import { BookingWidget } from '@/components/BookingWidget';

const CarCanvas = dynamic(() => import('@/components/CarCanvas'), {
  ssr: false,
  loading: () => null,
});

const CARS = [
  { name: 'BIG LUXURY Q', url: '/assets/_next/static/media/audi_a7.glb' },
  { name: 'SEDAN CARS',  url: '/assets/_next/static/media/tesla_model_s.glb' },
];

export default function Demo2Page() {
  const [mounted, setMounted] = useState(false);
  const [carIdx, setCarIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('INITIALIZING 3D ENGINE...');

  useEffect(() => {
    setMounted(true);

    // Simulated / Preloader step progression
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('LOADING LUXURY FLEET ASSETS...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStatusText('CONFIGURING LIGHTING & SHADERS...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('SHOWROOM READY');
    }, 1400);

    const timer4 = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const prev = () => setCarIdx(i => (i - 1 + CARS.length) % CARS.length);
  const next = () => setCarIdx(i => (i + 1) % CARS.length);

  const car = CARS[carIdx];

  return (
    <main className="Layout_main__h283P" style={{ position: 'relative' }}>
      {/* ── LUXURY 3D SHOWROOM PRELOADER OVERLAY ────────────────────────── */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#080c14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            transition: 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s ease',
            opacity: progress === 100 ? 0 : 1,
            pointerEvents: progress === 100 ? 'none' : 'auto',
          }}
        >
          <style>{`
            @keyframes logoPulseGlow {
              0%, 100% {
                transform: scale(1);
                filter: brightness(0) invert(1) drop-shadow(0 4px 22px rgba(56, 189, 248, 0.5));
              }
              50% {
                transform: scale(1.025);
                filter: brightness(0) invert(1) drop-shadow(0 8px 36px rgba(56, 189, 248, 0.85));
              }
            }
            @keyframes clockSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes chauffeurBounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-3px);
              }
            }
            @keyframes carDriveGlide {
              0%, 100% {
                transform: translateX(0) translateY(0);
              }
              25% {
                transform: translateX(2px) translateY(-1px);
              }
              75% {
                transform: translateX(-1px) translateY(1px);
              }
            }
            @keyframes wheelRoll {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .Demo2_FeatureIcon:hover svg {
              filter: drop-shadow(0 0 8px #38BDF8);
            }
          `}</style>

          {/* Ambient Background Radial Glow */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(15,99,189,0.08) 45%, rgba(8,12,20,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* 1. Official Bookcabs Logo */}
          <div style={{ position: 'relative', marginBottom: '28px', textAlign: 'center' }}>
            <Image
              src="/assets/bookcabs%20logo.png"
              alt="Bookcabs Australia"
              width={260}
              height={88}
              priority
              style={{
                height: '76px',
                width: 'auto',
                maxHeight: '84px',
                objectFit: 'contain',
                display: 'block',
                animation: 'logoPulseGlow 2.4s ease-in-out infinite',
              }}
            />
          </div>

          {/* 2. Status Text */}
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12.5px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '18px', height: '20px' }}>
            {statusText}
          </div>

          {/* 4. Luxury Progress Bar */}
          <div
            style={{
              width: 'min(320px, 85vw)',
              height: '5px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #0F63BD 0%, #38BDF8 70%, #ffffff 100%)',
                borderRadius: '999px',
                transition: 'width 0.35s ease-out',
                boxShadow: '0 0 14px #38BDF8',
              }}
            />
          </div>

          {/* 5. Progress Percentage & Location */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 'min(320px, 85vw)', marginTop: '10px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.5px' }}>
              MELBOURNE, VIC
            </span>
            <span style={{ color: '#38BDF8', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
        </div>
      )}

      {/* ── 3D SHOWROOM HERO SECTION ────────────────────────────────────── */}
      <section className="Demo2_HeroSection">
        <div className="Demo2_HeroBg" id="demo2HeroBg" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <Image src="/assets/backroundbig.png" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 75%' }} />
        </div>
        <div className="Demo2_HeroOverlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,20,0.4) 0%, rgba(8,12,20,0.1) 40%, rgba(8,12,20,0.4) 100%)', zIndex: 1 }}></div>

        <div className="Demo2_Container" style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          {/* Top Grid: Left headline, Right 3D Car Showcase */}
          <div className="Demo2_TopGrid">
            {/* BIGGER HEADLINE SECTION */}
            <div className="Demo2_LeftCol">
              <span className="Demo2_Eyebrow" style={{ color: '#38BDF8', fontWeight: 800, letterSpacing: '3.5px', textShadow: '0 0 20px rgba(56, 189, 248, 0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                PREMIUM CHAUFFEUR SERVICE
              </span>
              <h1 className="Demo2_Title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, color: '#ffffff' }}>
                Driven by<br />
                <span style={{ color: '#38BDF8', fontStyle: 'italic' }}>Excellence</span>
              </h1>
              <p className="Demo2_Subtitle">
                Luxury chauffeur driven car service in Melbourne, tailored for you.
              </p>
              <div className="Demo2_ActionRow">
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
                  className="Demo2_BookBtn"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <span>BOOK A RIDE NOW</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* 3D Car Showcase: Full Size 3D Car + Side Arrows + Dual Segmented Category Pill */}
            <div className="Demo2_TurntableArea" id="carShowcaseArea" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
              <div className="Demo2_Stage" id="carStage" style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Small Left Arrow on side of car */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous Car"
                  className="Demo2_SideArrow Demo2_SideArrowLeft"
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(15,19,25,0.85)',
                    border: '1px solid rgba(56,189,248,0.5)',
                    color: '#38BDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {/* 3D WebGL Canvas */}
                <div className="Demo2_ThreeCanvasContainer" id="threeCanvasContainer" style={{ width: '100%' }}>
                  {mounted && <CarCanvas modelUrl={car.url} />}
                </div>

                {/* Small Right Arrow on side of car */}
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next Car"
                  className="Demo2_SideArrow Demo2_SideArrowRight"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(15,19,25,0.85)',
                    border: '1px solid rgba(56,189,248,0.5)',
                    color: '#38BDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* LUXURY CARS / SEDAN CARS Dual Segmented Switcher */}
                <div className="Demo2_CategoryToggleRow">
                  <div className="Demo2_SegmentedPill">
                    <button
                      type="button"
                      onClick={() => setCarIdx(0)}
                      className={`Demo2_SegmentTab ${carIdx === 0 ? 'active' : ''}`}
                      aria-label="Select Big Luxury Q"
                    >
                      <span className="Demo2_TabDot"></span>
                      <span>BIG LUXURY Q</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarIdx(1)}
                      className={`Demo2_SegmentTab ${carIdx === 1 ? 'active' : ''}`}
                      aria-label="Select Sedan Cars"
                    >
                      <span className="Demo2_TabDot"></span>
                      <span>SEDAN CARS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features Glass Bar */}
          <div className="Demo2_FeaturesBar">
            {/* 1. Reliable on Time */}
            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                className="Demo2_FeatureIcon"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 99, 189, 0.08) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
                  <circle cx="12" cy="12" r="10" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.8" />
                  {/* Hour hand */}
                  <line x1="12" y1="12" x2="12" y2="7.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                  {/* Rotating Minute hand */}
                  <line
                    x1="12"
                    y1="12"
                    x2="16.5"
                    y2="12"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: '12px 12px',
                      animation: 'clockSpin 6s linear infinite',
                    }}
                  />
                  <circle cx="12" cy="12" r="1.5" fill="#38BDF8" />
                </svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Reliable on Time</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '4px 0 0' }}>Punctuality you can depend on.</p>
              </div>
            </div>

            {/* 2. Professional Chauffeurs */}
            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                className="Demo2_FeatureIcon"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 99, 189, 0.08) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: 'chauffeurBounce 2.8s ease-in-out infinite',
                  }}
                >
                  <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" fill="rgba(56,189,248,0.18)" />
                  <path d="M4 11h16a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2z" stroke="#ffffff" strokeWidth="1.8" />
                  <path d="M6 14v4a6 6 0 0 0 12 0v-4" />
                  <line x1="12" y1="18" x2="12" y2="22" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Professional Chauffeurs</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '4px 0 0' }}>Experienced, trained and dedicated to you.</p>
              </div>
            </div>

            {/* 3. Latest Fleets */}
            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                className="Demo2_FeatureIcon"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 99, 189, 0.08) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: 'carDriveGlide 3s ease-in-out infinite',
                  }}
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2" fill="rgba(56,189,248,0.18)" />
                  <circle cx="7" cy="17" r="2.2" stroke="#ffffff" strokeWidth="2" style={{ transformOrigin: '7px 17px', animation: 'wheelRoll 1.5s linear infinite' }} />
                  <circle cx="17" cy="17" r="2.2" stroke="#ffffff" strokeWidth="2" style={{ transformOrigin: '17px 17px', animation: 'wheelRoll 1.5s linear infinite' }} />
                </svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Latest Fleets</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '4px 0 0' }}>Luxury vehicles, always immaculate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING WIDGET SECTION ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 100px', background: '#080c14', position: 'relative', overflow: 'visible' }}>
        {/* Subtle Ambient Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.07) 0%, rgba(8, 12, 20, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: '36px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#38BDF8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              RESERVE YOUR CHAUFFEUR
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 400,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              Book your private chauffeur.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '540px', margin: '0 auto' }}>
              Instant luxury car reservation with upfront fixed pricing across Melbourne and Victoria.
            </p>
          </div>

          <BookingWidget />
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Card 1: Precision Navigation */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
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
                    <path d="M58 32L68 28V40L58 36Z" fill="url(#beamGrad2)" style={{ animation: 'beamShimmer 2s ease-in-out infinite' }} />
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
                      <linearGradient id="beamGrad2" x1="58" y1="34" x2="68" y2="34" gradientUnits="userSpaceOnUse">
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
