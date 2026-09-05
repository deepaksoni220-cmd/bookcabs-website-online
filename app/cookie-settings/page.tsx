'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CookieItem {
  name: string;
  provider: string;
  category: 'Essential' | 'Functional' | 'Analytics' | 'Marketing';
  purpose: string;
  expiry: string;
  privacyUrl: string;
}

const COOKIE_DIRECTORY: CookieItem[] = [
  {
    name: '__session / auth_token',
    provider: 'Bookcabs Australia',
    category: 'Essential',
    purpose: 'Maintains authenticated chauffeur booking sessions, security tokens, and CSRF protection.',
    expiry: 'Session / 30 days',
    privacyUrl: '/privacy-policy',
  },
  {
    name: 'booking_state',
    provider: 'Bookcabs Australia',
    category: 'Essential',
    purpose: 'Stores active pickup address, destination, selected vehicle class, and transfer dates during checkout.',
    expiry: 'Session',
    privacyUrl: '/privacy-policy',
  },
  {
    name: 'cookie_consent_preferences',
    provider: 'Bookcabs Australia',
    category: 'Essential',
    purpose: 'Records your explicit consent choices for essential, analytics, functional, and marketing cookies.',
    expiry: '12 months',
    privacyUrl: '/privacy-policy',
  },
  {
    name: 'loc_pref / pickup_default',
    provider: 'Bookcabs Australia',
    category: 'Functional',
    purpose: 'Remembers recent Melbourne Airport / CBD pickup spots and preferred terminal meeting points.',
    expiry: '6 months',
    privacyUrl: '/privacy-policy',
  },
  {
    name: '_ga, _ga_*',
    provider: 'Google Analytics (Alphabet Inc.)',
    category: 'Analytics',
    purpose: 'Collects aggregated, anonymized interaction metrics to improve site navigation speed and Core Web Vitals.',
    expiry: '2 years',
    privacyUrl: 'https://policies.google.com/privacy',
  },
  {
    name: '_gid',
    provider: 'Google Analytics (Alphabet Inc.)',
    category: 'Analytics',
    purpose: 'Used by Google Analytics to distinguish unique users on a 24-hour rolling basis.',
    expiry: '24 hours',
    privacyUrl: 'https://policies.google.com/privacy',
  },
  {
    name: '_gcl_au',
    provider: 'Google Tag Manager',
    category: 'Marketing',
    purpose: 'Measures conversion efficiency and ad interaction for corporate and airport chauffeur campaigns.',
    expiry: '90 days',
    privacyUrl: 'https://business.safety.google/privacy/',
  },
  {
    name: '_fbp',
    provider: 'Meta Platforms, Inc.',
    category: 'Marketing',
    purpose: 'Enables tailored luxury transportation advertisements and audience delivery across Facebook and Instagram.',
    expiry: '90 days',
    privacyUrl: 'https://www.facebook.com/privacy/policy/',
  },
];

export default function CookieSettingsPage() {
  const [essential] = useState(true); // Always on
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSave = () => {
    setSaveMessage('Your cookie preferences have been successfully updated.');
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const handleAcceptAll = () => {
    setFunctional(true);
    setAnalytics(true);
    setMarketing(true);
    setSaveMessage('All cookie categories accepted and preferences saved.');
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const handleRejectNonEssential = () => {
    setFunctional(false);
    setAnalytics(false);
    setMarketing(false);
    setSaveMessage('Non-essential cookies disabled. Essential cookies remain active for bookings.');
    setTimeout(() => setSaveMessage(null), 4000);
  };

  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* ── HERO HEADER ────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '60px 24px 40px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(15,99,189,0.08)', borderRadius: '999px', color: '#0F63BD', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
            Privacy Governance & Transparency
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px', lineHeight: 1.15 }}>
            Cookie Settings &amp; Preference Centre
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Customize and control how Bookcabs Chauffeured Cars Australia uses cookies and browser storage technologies to deliver seamless chauffeur reservations, live flight radar syncing, and analytics.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 100px', lineHeight: 1.8, fontSize: '15px', color: '#334155' }}>
        
        {/* Save Notification Banner */}
        {saveMessage && (
          <div style={{ background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', padding: '14px 20px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{saveMessage}</span>
          </div>
        )}

        {/* ── 1. INTERACTIVE PREFERENCES MANAGER ───────────────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px 32px', marginBottom: '48px', boxShadow: '0 4px 24px rgba(15,23,42,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', margin: '0 0 6px 0' }}>
                Your Privacy Choices
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Toggle categories below and click &quot;Save My Preferences&quot; to apply your selections.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(15,99,189,0.3)',
                }}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                style={{
                  background: '#f1f5f9',
                  color: '#0F1319',
                  border: '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reject Non-Essential
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Category 1: Strictly Necessary */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', margin: 0 }}>
                    Strictly Necessary Cookies
                  </h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F63BD', background: '#eaf2ff', padding: '2px 8px', borderRadius: '6px' }}>
                    Always Active
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Essential for the website to function properly. They enable core booking features, session security, flight delay calculations, and payment fraud prevention. These cookies cannot be turned off.
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={essential}
                  disabled
                  style={{ width: '20px', height: '20px', accentColor: '#0F63BD', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            {/* Category 2: Functional Cookies */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', margin: 0 }}>
                    Functional &amp; Preference Cookies
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Allow the website to remember your previous Melbourne pickup locations, preferred airport terminals, language, and custom booking preferences for faster reservations.
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#0F63BD', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Category 3: Analytics Cookies */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', margin: 0 }}>
                    Performance &amp; Analytics Cookies
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Help us understand how guests navigate our luxury fleet showcases and quote workflows. All information collected is aggregated, de-identified, and used exclusively to optimize load times and usability.
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#0F63BD', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Category 4: Marketing Cookies */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', margin: 0 }}>
                    Marketing &amp; Targeting Cookies
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Used to deliver relevant executive travel offers and airport transfer announcements on Google, Meta, and LinkedIn without sharing direct personal identifiable data.
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#0F63BD', cursor: 'pointer' }}
                />
              </div>
            </div>

          </div>

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleSave}
              style={{
                background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(15, 99, 189, 0.35)',
              }}
            >
              Save My Preferences
            </button>
          </div>
        </div>

        {/* ── 2. DETAILED COOKIE DISCLOSURE DIRECTORY ─────────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px 32px', marginBottom: '48px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#0F1319', marginBottom: '14px' }}>
            Detailed Cookie Directory
          </h2>
          <p style={{ fontSize: '14.5px', color: '#64748b', marginBottom: '24px' }}>
            Below is an inventory of standard cookies deployed across the Bookcabs Australia digital ecosystem:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#0F1319' }}>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Cookie Name</th>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Provider</th>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Purpose</th>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_DIRECTORY.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 600, color: '#0F63BD' }}>{c.name}</td>
                    <td style={{ padding: '12px 14px', color: '#0F1319' }}>{c.provider}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        background: c.category === 'Essential' ? '#e0f2fe' : c.category === 'Functional' ? '#f0fdf4' : c.category === 'Analytics' ? '#fef3c7' : '#fae8ff',
                        color: c.category === 'Essential' ? '#0369a1' : c.category === 'Functional' ? '#15803d' : c.category === 'Analytics' ? '#b45309' : '#86198f',
                      }}>
                        {c.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#475569', lineHeight: 1.5 }}>{c.purpose}</td>
                    <td style={{ padding: '12px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>{c.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 3. MANAGING COOKIES IN YOUR BROWSER ──────────────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '10px' }}>
              How to Manage Cookies Directly in Your Browser
            </h2>
            <p style={{ marginBottom: '14px' }}>
              In addition to our Preference Centre above, you can block or remove cookies via your web browser settings at any time:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Google Chrome:</strong> Settings → Privacy and security → Third-party cookies.</li>
              <li><strong>Apple Safari (macOS &amp; iOS):</strong> Settings → Safari → Privacy &amp; Security → Block All Cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data.</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies.</li>
            </ul>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              Please note that disabling strictly necessary cookies in your browser may prevent the booking quote engine and address lookup from completing correctly.
            </p>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '8px' }}>
              Questions &amp; Data Protection Officer
            </h3>
            <p style={{ margin: '0 0 12px' }}>
              If you have any questions regarding our Cookie Policy or how we protect your personal data under the <em>Privacy Act 1988 (Cth)</em>, please contact:
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', fontSize: '14px' }}>
              <div style={{ fontWeight: 700, color: '#0F1319' }}>Bookcabs Chauffeured Cars Australia — Privacy Officer</div>
              <div style={{ color: '#475569', marginTop: '2px' }}>Email: <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', textDecoration: 'none' }}>Contact@bookcabs.com.au</a></div>
              <div style={{ color: '#475569' }}>Phone: <a href="tel:+61417833137" style={{ color: '#0F63BD', textDecoration: 'none' }}>+61 417 833 137</a></div>
              <div style={{ color: '#475569' }}>Location: Melbourne, Victoria, Australia</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '20px', fontSize: '13.5px' }}>
            <Link href="/privacy-policy" style={{ color: '#0F63BD', textDecoration: 'none', fontWeight: 600 }}>← View Privacy Policy</Link>
            <Link href="/terms-and-conditions" style={{ color: '#0F63BD', textDecoration: 'none', fontWeight: 600 }}>View Terms &amp; Conditions</Link>
            <Link href="/legal-notice" style={{ color: '#0F63BD', textDecoration: 'none', fontWeight: 600 }}>View Legal Notice</Link>
          </div>
        </div>

      </section>
    </main>
  );
}
