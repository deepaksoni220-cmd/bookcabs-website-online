'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FLEET_TIERS = [
  { title: 'Business Sedan', img: '/assets/sedan%20png.png', model: 'Mercedes-Benz E-Class, BMW 5 Series', pass: '3 Passengers', bag: '2 Luggage' },
  { title: 'Business Luxury Cars', img: '/assets/luxury%20png.png', model: 'Mercedes-Benz S-Class, BMW 7 Series', pass: '3 Passengers', bag: '3 Luggage' },
  { title: 'Luxury SUV', img: '/assets/big%20suv%20png.png', model: 'Audi Q7, Lexus RX, Mercedes GLE', pass: '4 Passengers', bag: '4 Luggage' },
  { title: 'Business Van', img: '/assets/big%20car%20png.png', model: 'Mercedes-Benz V-Class, Valente', pass: '7 Passengers', bag: '7 Luggage' },
];

export default function AboutUsPage() {
  const [activeFleetIdx, setActiveFleetIdx] = useState(0);
  const fleetScrollRef = useRef<HTMLDivElement>(null);

  const handleFleetScroll = () => {
    if (fleetScrollRef.current) {
      const scrollLeft = fleetScrollRef.current.scrollLeft;
      const card = fleetScrollRef.current.firstElementChild as HTMLElement | null;
      const cardWidth = card ? card.offsetWidth + 16 : 280;
      const newIdx = Math.round(scrollLeft / cardWidth);
      if (newIdx >= 0 && newIdx < FLEET_TIERS.length) {
        setActiveFleetIdx(newIdx);
      }
    }
  };

  const scrollToFleet = (idx: number) => {
    if (fleetScrollRef.current) {
      const card = fleetScrollRef.current.firstElementChild as HTMLElement | null;
      const cardWidth = card ? card.offsetWidth + 16 : 280;
      fleetScrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth',
      });
      setActiveFleetIdx(idx);
    }
  };
  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* ── 1. HERO SECTION (LIGHT LUXURY) ──────────────────────────────── */}
      <section style={{ position: 'relative', padding: '60px 24px 70px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(234,242,255,0) 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>


          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', color: '#0F1319' }}>
            Crafting Exceptional Chauffeur Services <br />
            <span style={{ color: '#0F63BD', fontStyle: 'italic' }}>Across Melbourne & Victoria.</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#475569', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Where timeless elegance meets Melbourne precision. We deliver premium, reliable, and discreet chauffeured transport tailored for discerning individuals and corporate executives.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.8px',
                padding: '14px 30px',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 6px 22px rgba(15, 99, 189, 0.3)',
              }}
            >
              <span>GET INSTANT QUOTE</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>

            <a
              href="tel:+61417833137"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#ffffff',
                border: '1.5px solid rgba(15,99,189,0.3)',
                color: '#0F63BD',
                fontWeight: 600,
                fontSize: '14px',
                padding: '14px 28px',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F63BD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+61 417 833 137</span>
            </a>
          </div>
        </div>

        {/* Banner Graphic */}
        <div style={{ maxWidth: '1200px', margin: '50px auto 0', position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(15,99,189,0.15)', boxShadow: '0 20px 50px rgba(15,23,42,0.12)' }}>
          <Image
            src="/assets/about-us.png"
            alt="About Bookcabs Australia Chauffeur Fleet"
            width={1200}
            height={498}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            priority
          />
        </div>
      </section>

      {/* ── 2. KEY STATS (LIGHT CARDS) ─────────────────────────────────── */}
      <section style={{ padding: '50px 24px 70px', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { num: '100%', title: 'On-Time Pickups', desc: 'Real-time flight tracking & proactive Melbourne dispatch.' },
            { num: '60 Min', title: 'Airport Wait Time', desc: 'Complimentary grace period for delayed domestic & intl arrivals.' },
            { num: '24/7', title: 'VIP Dispatch', desc: 'Dedicated concierge team available day and night.' },
            { num: '5★', title: 'Rated Chauffeurs', desc: 'Accredited, fully licensed, suited, and immaculately presented.' },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '38px', fontWeight: 800, color: '#0F63BD', fontFamily: "'Playfair Display', Georgia, serif", marginBottom: '6px' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '8px' }}>
                {stat.title}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. OUR STORY & STANDARDS (ELEGANT LIGHT SECTION) ─────────────── */}
      <section style={{ padding: '90px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#0F63BD', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              OUR HERITAGE & MISSION
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 3.5vw, 46px)', fontWeight: 400, color: '#0F1319', marginBottom: '24px', lineHeight: 1.25 }}>
              Redefining Luxury Ground Transportation in Melbourne.
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              Founded with the commitment to elevate the standard of private travel in Australia, Bookcabs Australia is Melbourne’s premier luxury chauffeur provider. We understand that time, comfort, and privacy are your highest priorities.
            </p>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '32px' }}>
              Whether you are landing at Tullamarine Airport after a long-haul flight, heading to a high-stakes board meeting in the Melbourne CBD, or celebrating a special winery tour across the Yarra Valley, our pristine fleet and courteous chauffeurs ensure you arrive refreshed and on schedule.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Fixed transparent pricing with zero surge rates',
                'Flight radar integration for automatic arrival adjustments',
                'Sanitized, premium latest-model European sedans, SUVs, and vans',
                'Personalized meet & greet service inside airport terminals',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e0f2fe', border: '1px solid #0F63BD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F63BD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(15,23,42,0.08)' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', background: '#dce8fd', color: '#0F63BD', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                Executive Standards
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', color: '#0F1319', marginBottom: '14px' }}>
                The Bookcabs Promise
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px' }}>
                Every private ride is executed with discretion, safety, and utmost punctuality. Our chauffeurs undergo rigorous background checks and customer service training to guarantee an executive travel experience.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#0F63BD', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Airport Transfers</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>Direct terminal pickups with luggage assistance.</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#0F63BD', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Corporate Accounts</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>Consolidated monthly invoicing & dedicated manager.</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#0F63BD', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>By The Hour</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>Chauffeur on standby for continuous multi-stop travel.</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#0F63BD', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Winery & Events</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>Bespoke tours in Victoria’s premier wine regions.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FLEET TIERS OVERVIEW (CLEAN LIGHT CARDS) ──────────────────── */}
      <section style={{ padding: '80px 24px', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#0F63BD', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            OUR DISTINGUISHED FLEET
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px' }}>
            Curated For Maximum Comfort
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', margin: '0 auto 48px' }}>
            Choose from our premium selection of luxury vehicles, equipped with complimentary Wi-Fi, bottled water, and phone chargers.
          </p>

          <style>{`
            .about-fleet-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 24px;
              width: 100%;
              box-sizing: border-box;
            }
            .about-swipe-indicator {
              display: none;
            }
            @media (max-width: 768px) {
              .about-fleet-container {
                display: flex !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
                -webkit-overflow-scrolling: touch !important;
                gap: 16px !important;
                padding: 12px 16px 20px !important;
                margin: 0 -24px !important;
                scrollbar-width: none !important;
              }
              .about-fleet-container::-webkit-scrollbar {
                display: none !important;
              }
              .about-fleet-card {
                flex: 0 0 82% !important;
                max-width: 320px !important;
                scroll-snap-align: center !important;
                box-sizing: border-box !important;
              }
              .about-swipe-indicator {
                display: flex !important;
              }
            }
          `}</style>

          <div
            ref={fleetScrollRef}
            onScroll={handleFleetScroll}
            className="about-fleet-container"
          >
            {FLEET_TIERS.map((tier, index) => (
              <div
                key={index}
                className="about-fleet-card"
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  boxShadow: '0 6px 20px rgba(15,23,42,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: '#f8fafc', borderRadius: '12px', padding: '10px' }}>
                  <Image src={tier.img} alt={tier.title} width={220} height={120} style={{ objectFit: 'contain', maxHeight: '120px' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F1319', marginBottom: '4px' }}>{tier.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{tier.model}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: 'auto', fontWeight: 500 }}>
                  <span>👤 {tier.pass}</span>
                  <span>🧳 {tier.bag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="about-swipe-indicator" style={{ alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {FLEET_TIERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToFleet(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  width: activeFleetIdx === idx ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: activeFleetIdx === idx ? '#0F63BD' : '#cbd5e1',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <Link
              href="/cars-fleet"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0F63BD',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              <span>Explore our Available Car fleets</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CTA BANNER (ICE BLUE LIGHT LUXURY) ────────────────── */}
      <section style={{ padding: '90px 24px', background: 'linear-gradient(180deg, #eaf2ff 0%, #dce8fd 100%)', textAlign: 'center', borderTop: '1px solid rgba(15,99,189,0.15)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 400, color: '#0F1319', marginBottom: '18px' }}>
            Ready For A Superior Travel Experience?
          </h2>
          <p style={{ fontSize: '17px', color: '#475569', marginBottom: '36px', lineHeight: 1.6 }}>
            Book your next Melbourne airport transfer, city trip, or corporate chauffeur today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.8px',
                padding: '16px 36px',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 6px 22px rgba(15, 99, 189, 0.35)',
              }}
            >
              <span>BOOK ONLINE NOW</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/connect-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#ffffff',
                border: '1.5px solid rgba(15,99,189,0.3)',
                color: '#0F63BD',
                fontWeight: 700,
                fontSize: '15px',
                padding: '16px 32px',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <span>CONTACT DISPATCH</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
