'use client';

import Link from 'next/link';

export default function LegalNoticePage() {
  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* Hero Header */}
      <section style={{ position: 'relative', padding: '60px 24px 40px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(15,99,189,0.08)', borderRadius: '999px', color: '#0F63BD', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
            Corporate Disclosures & Safety Governance
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px', lineHeight: 1.15 }}>
            Legal Notice & Regulatory Information
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '750px', margin: '0 auto' }}>
            Official corporate entity details, zero-tolerance drug & alcohol policy, non-discrimination protections, and commercial passenger vehicle accreditation for Bookcabs Australia.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 100px', lineHeight: 1.8, fontSize: '15px', color: '#334155' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '44px 36px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Section 1: Entity Details */}
          <div id="operator-details">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              1. Operator Entity Details
            </h2>
            <p style={{ marginBottom: '14px' }}>
              This digital platform, online booking system, and luxury chauffeured transportation services are operated by <strong>Bookcabs Australia</strong>.
            </p>
            
            <div style={{ padding: '22px 24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 700, color: '#0F1319', fontSize: '17px' }}>Bookcabs Chauffeured Cars Australia</div>
              <div style={{ color: '#475569' }}>Headquarters & Executive Fleet Operations: Melbourne, Victoria, Australia</div>
              <div style={{ color: '#475569' }}>Direct Telephone: <a href="tel:+61417833137" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none' }}>+61 417 833 137</a></div>
              <div style={{ color: '#475569' }}>24/7 Executive Concierge Care: <a href="tel:+61417833137" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none' }}>+61 417 833 137</a></div>
              <div style={{ color: '#0F63BD', fontWeight: 600, marginTop: '4px' }}>
                Official Contact Email: <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', textDecoration: 'none' }}>Contact@bookcabs.com.au</a>
              </div>
            </div>
          </div>

          {/* Section 2: Accreditation & Commercial Passenger Vehicle Licensing */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              2. Accreditation & Commercial Passenger Vehicle Licensing
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Bookcabs Australia operates in full compliance with state transport authorities and the <em>Commercial Passenger Vehicle Industry Act</em> (Victoria).
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Chauffeur Accreditation:</strong> All chauffeurs hold valid driver accreditations, commercial medical certifications, and state police background clearances.</li>
              <li><strong>Fleet Standards:</strong> All luxury sedans, SUVs, and passenger vans undergo rigorous annual roadworthiness and mechanical safety inspections.</li>
              <li><strong>Insurance Coverage:</strong> Every vehicle carries comprehensive commercial motor insurance and public liability insurance.</li>
            </ul>
          </div>

          {/* Section 3: Online Dispute Resolution */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              3. Online Dispute Resolution
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We are committed to resolving any client concerns swiftly and fairly through our dedicated executive management team.
            </p>
            <p>
              For international travelers and consumers, the European Commission provides an Internet platform for online dispute resolution (OS platform), accessible at: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#0F63BD', fontWeight: 600 }}>http://ec.europa.eu/consumers/odr/</a>. For Australian consumers, disputes may be addressed through state fair trading authorities and the Australian Competition and Consumer Commission (ACCC).
            </p>
          </div>

          {/* Section 4: Zero Tolerance Drug & Alcohol Policy */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#fef2f2', borderRadius: '6px', color: '#b91c1c', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
              Safety Mandate
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              4. Zero Tolerance Policy (Drugs & Alcohol)
            </h2>
            <div style={{ padding: '20px 24px', background: '#fff5f5', border: '1px solid #fee2e2', borderRadius: '12px', marginBottom: '16px' }}>
              <p style={{ color: '#991b1b', fontWeight: 600, marginBottom: '8px' }}>
                Strict Zero-Tolerance Safety Standard:
              </p>
              <p style={{ color: '#7f1d1d', fontSize: '14px', lineHeight: 1.7 }}>
                Bookcabs Australia strictly enforces a zero-tolerance drug and alcohol policy for all chauffeurs using the Bookcabs platform to provide chauffeured transportation services. Chauffeurs are subject to strict BAC 0.00% alcohol limits and random substance screenings.
              </p>
            </div>
            <p style={{ marginBottom: '12px' }}>
              If you suspect a chauffeur is under the influence of drugs or alcohol, please request to <strong>end the trip immediately at a safe location</strong>, then immediately contact emergency services (<strong>000 in Australia</strong> or <strong>911 internationally</strong>).
            </p>
            <p>
              Please also report any suspected violation immediately to Bookcabs Dispatch (<a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', fontWeight: 600 }}>Contact@bookcabs.com.au</a> or phone <a href="tel:+61417833137" style={{ color: '#0F63BD', fontWeight: 600 }}>+61 417 833 137</a>) as well as the relevant Commercial Passenger Vehicle Regulator.
            </p>
          </div>

          {/* Section 5: Non-Discrimination & Equal Access Policy */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              5. Non-Discrimination & Equal Access Policy
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Bookcabs Australia provides luxury transportation services based <strong>solely upon chauffeur and vehicle availability</strong>, without regard to geographic departure point or destination and without regard to race, color, national origin, religious belief or affiliation, sex, sexual orientation, gender identity, marital status, disability, age, or any other characteristic protected under applicable federal or state anti-discrimination law.
            </p>
            <p>
              We welcome certified assistance and guide animals at zero additional surcharge in accordance with disability service standards.
            </p>
          </div>

          {/* Section 6: Intellectual Property & Trademarks */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '12px' }}>
              6. Intellectual Property & Copyright
            </h2>
            <p>
              All branding, logos, trademarks, 3D interactive showroom assets, and digital contents presented on this platform are the property of Bookcabs Australia. Unauthorized scraping, commercial re-use, or reproduction without written permission is strictly prohibited.
            </p>
          </div>

        </div>

        {/* Footer Navigation Bar */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ color: '#0F63BD', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Home</span>
          </Link>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/privacy-policy" style={{ color: '#475569', padding: '10px 18px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" style={{ color: '#475569', padding: '10px 18px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
              Terms & Conditions
            </Link>
            <Link href="/connect-us" style={{ background: '#0F63BD', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
              Contact Concierge
            </Link>
          </div>
        </div>

      </section>

    </main>
  );
}
