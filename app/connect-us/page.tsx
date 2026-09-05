'use client';

import { useState } from 'react';

export default function ConnectUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Airport Transfer',
    pickup: '',
    dropoff: '',
    dateTime: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateAllFields = () => {
    if (!formData.name.trim()) return 'Please enter your Full Name.';
    if (!formData.phone.trim()) return 'Please enter your Phone Number.';
    if (!formData.email.trim()) return 'Please enter your Email Address.';
    if (!formData.serviceType.trim()) return 'Please select a Service Type.';
    if (!formData.dateTime.trim()) return 'Please enter your Date & Time.';
    if (!formData.pickup.trim()) return 'Please enter your Pickup Location.';
    if (!formData.dropoff.trim()) return 'Please enter your Drop-off Location.';
    if (!formData.message.trim()) return 'Please enter your Message or Special Requests.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateAllFields();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  const handleWhatsAppSend = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const error = validateAllFields();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    const text = `*New Booking Inquiry via Bookcabs Website*%0A` +
      `*Name:* ${encodeURIComponent(formData.name.trim())}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone.trim())}%0A` +
      `*Email:* ${encodeURIComponent(formData.email.trim())}%0A` +
      `*Service:* ${encodeURIComponent(formData.serviceType)}%0A` +
      `*Pickup:* ${encodeURIComponent(formData.pickup.trim())}%0A` +
      `*Dropoff:* ${encodeURIComponent(formData.dropoff.trim())}%0A` +
      `*Date/Time:* ${encodeURIComponent(formData.dateTime.trim())}%0A` +
      `*Message:* ${encodeURIComponent(formData.message.trim())}`;
    window.open(`https://wa.me/61417833137?text=${text}`, '_blank');
  };

  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* ── 1. HERO HEADER (LIGHT LUXURY) ─────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '60px 24px 40px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(234,242,255,0) 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', color: '#0F1319' }}>
            Connect With Our <br />
            <span style={{ color: '#0F63BD', fontStyle: 'italic' }}>Melbourne Chauffeur Team.</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#475569', maxWidth: '720px', margin: '0 auto 24px', lineHeight: 1.65 }}>
            Our team is available 24 hours a day, 7 days a week to coordinate executive airport transfers, private itineraries, and corporate fleet bookings.
          </p>
        </div>
      </section>

      {/* ── 2. THREE DIRECT CHANNELS (CRISP WHITE CARDS) ──────────────────── */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Phone */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#e0f2fe', border: '1px solid rgba(15,99,189,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F63BD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>Direct Phone Call</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
                Immediate dispatch & bookings assistance.
              </p>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F63BD', marginBottom: '24px' }}>
                +61 417 833 137
              </div>
            </div>
            <a
              href="tel:+61417833137"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.5px',
                padding: '12px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(15,99,189,0.3)',
              }}
            >
              <span>CALL DISPATCH NOW</span>
            </a>
          </div>

          {/* WhatsApp */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 30px rgba(37,211,102,0.08)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.2 1.26-1.68 1.33-.45.07-.98.11-3.23-.8-2.67-1.08-4.38-3.8-4.51-3.98-.13-.18-1.07-1.43-1.07-2.73 0-1.3.68-1.94.92-2.2.24-.26.53-.33.71-.33.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.45 1.81.99.88 1.83 1.15 2.09 1.28.26.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.35-.22.59-.13.24.09 1.54.73 1.8.86.26.13.44.2.5.31.06.11.06.66-.18 1.34z"/></svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>WhatsApp VIP Chat</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
                Real-time quotes, vehicle photos & chauffeur status.
              </p>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', marginBottom: '24px' }}>
                Instant Live Response
              </div>
            </div>
            <a
              href="https://wa.me/61417833137?text=Hello%20Bookcabs%20Australia,%20I%20would%20like%20to%20inquire%20about%20a%20chauffeur%20booking."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.5px',
                padding: '12px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
              }}
            >
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>

          {/* Email */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#fef3c7', border: '1px solid rgba(217,119,6,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>Email & Corporate</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
                Custom quotes, long-distance & corporate setups.
              </p>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#b45309', marginBottom: '24px', wordBreak: 'break-all' }}>
                Contact@bookcabs.com.au
              </div>
            </div>
            <a
              href="mailto:Contact@bookcabs.com.au?subject=Bookcabs%20Chauffeur%20Inquiry"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                color: '#0F1319',
                fontWeight: 700,
                fontSize: '13px',
                padding: '12px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <span>SEND AN EMAIL</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── 3. INTERACTIVE INQUIRY FORM & DETAILS (LIGHT PALETTE) ─────────── */}
      <section style={{ padding: '60px 24px 90px', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
          
          {/* Form */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 40px rgba(15,23,42,0.06)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#0F1319', marginBottom: '8px' }}>
              Send a Booking Inquiry
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Please fill in all the details below. All fields marked with an asterisk (<span style={{ color: '#e11d48', fontWeight: 700 }}>*</span>) are required.
            </p>

            {errorMessage && (
              <div style={{ background: '#fff1f2', border: '1.5px solid #f43f5e', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#be123c', fontSize: '14px', fontWeight: 600 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {submitted ? (
              <div style={{ background: '#e0f2fe', border: '1px solid #0F63BD', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
                <h3 style={{ fontSize: '20px', color: '#0F1319', marginBottom: '8px', fontWeight: 700 }}>Inquiry Received</h3>
                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
                  Thank you, {formData.name || 'valued client'}. Our concierge team will contact you shortly via phone or email.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                  }}
                >
                  Send to WhatsApp for Faster Reply
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#e11d48' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g. James Smith"
                    style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Phone Number <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="+61 400 000 000"
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="james@example.com"
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Service Type <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <select
                      required
                      value={formData.serviceType}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceType: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    >
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="Hourly Hire">Hourly Hire (2–24 hrs)</option>
                      <option value="Corporate Account">Corporate Account</option>
                      <option value="Event / Wedding">Event / Wedding</option>
                      <option value="Yarra Valley Winery">Yarra Valley Winery Tour</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Date & Time <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.dateTime}
                      onChange={(e) => {
                        setFormData({ ...formData, dateTime: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. 15 Sep, 10:30 AM"
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Pickup Location <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pickup}
                      onChange={(e) => {
                        setFormData({ ...formData, pickup: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. Melbourne Airport (MEL)"
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Drop-off Location <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.dropoff}
                      onChange={(e) => {
                        setFormData({ ...formData, dropoff: e.target.value });
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. Crown Towers, Melbourne"
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Message or Special Requests <span style={{ color: '#e11d48' }}>*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Flight number, child seats, luggage count..."
                    style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '12px 16px', color: '#0F1319', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(15, 99, 189, 0.3)',
                    }}
                  >
                    SUBMIT INQUIRY
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#25D366',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.2 1.26-1.68 1.33-.45.07-.98.11-3.23-.8-2.67-1.08-4.38-3.8-4.51-3.98-.13-.18-1.07-1.43-1.07-2.73 0-1.3.68-1.94.92-2.2.24-.26.53-.33.71-.33.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.45 1.81.99.88 1.83 1.15 2.09 1.28.26.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.35-.22.59-.13.24.09 1.54.73 1.8.86.26.13.44.2.5.31.06.11.06.66-.18 1.34z"/></svg>
                    <span>Instant WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Melbourne Operating Coverage & FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '16px' }}>
                Melbourne & Victoria Coverage
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                We operate across all key hubs in Victoria with seamless airport, suburban, and regional interstate transfers:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#1e293b', fontWeight: 600 }}>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  ✈️ Melbourne Airport (MEL)
                </div>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  🏢 Melbourne CBD & Southbank
                </div>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  🍷 Winery Tours
                </div>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  🛩️ Avalon Airport
                </div>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  🌊 Geelong & Great Ocean Rd
                </div>
                <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  🇦🇺 Sydney & Interstate
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '16px' }}>
                Frequently Asked Questions
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F63BD', marginBottom: '4px' }}>
                    What happens if my flight is delayed?
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                    We track all arriving flights in real-time. Your complimentary 60-minute wait time starts from when your flight actually touches down.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F63BD', marginBottom: '4px' }}>
                    How do I locate my chauffeur at Melbourne Airport?
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                    Your chauffeur will send you a text upon landing and greet you inside the terminal with a personalized digital name board at the baggage carousel.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F63BD', marginBottom: '4px' }}>
                    Can I make changes or cancel?
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                    Free cancellations and schedule adjustments are available up to 2 hours prior to scheduled one-way pickups.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
