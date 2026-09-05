'use client';

import Link from 'next/link';

interface CookieService {
  name: string;
  category: 'Essential' | 'Functional' | 'Analytics' | 'Marketing';
  description: string;
  company: string;
  address: string;
  privacyUrl: string;
}

const cookieServices: CookieService[] = [
  {
    name: 'Braze',
    category: 'Essential',
    description: 'Cross-channel campaign management and customer communication platform.',
    company: 'Braze, Inc.',
    address: '330 W 34th St 18th floor, New York, NY 10001, USA',
    privacyUrl: 'https://www.braze.com/company/legal/privacy',
  },
  {
    name: 'Google Syndication',
    category: 'Essential',
    description: 'Domain owned by Google used for storing and loading ad content and resources from Google CDN.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'Google Tag Manager',
    category: 'Essential',
    description: 'Centralized tag management system controlling when script codes and tags are triggered.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'gstatic.com',
    category: 'Essential',
    description: 'Google domain used to off-load static content to reduce bandwidth and enhance performance.',
    company: 'Alphabet Inc.',
    address: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
    privacyUrl: 'http://www.google.com/intl/de/policies/privacy/',
  },
  {
    name: 'Intercom',
    category: 'Essential',
    description: 'Customer messaging platform enabling real-time support and concierge communication.',
    company: 'Intercom, Inc.',
    address: '55 2nd Street, San Francisco, CA 94105, USA',
    privacyUrl: 'https://www.intercom.com/terms-and-policies#privacy',
  },
  {
    name: 'Usercentrics CMP',
    category: 'Essential',
    description: 'Consent Management Platform ensuring compliance with privacy choices and cookie consent.',
    company: 'Usercentrics GmbH',
    address: 'Sendlinger Str. 7, 80331 Munich, Germany',
    privacyUrl: 'https://usercentrics.com/privacy-policy/',
  },
  {
    name: 'Amazon Web Services (AWS)',
    category: 'Functional',
    description: 'Secure cloud computing infrastructure, data hosting, and application delivery.',
    company: 'Amazon Web Services EMEA SARL',
    address: '38 Avenue John F. Kennedy, L-1855, Luxembourg',
    privacyUrl: 'https://aws.amazon.com/privacy/?nc1=f_pr',
  },
  {
    name: 'Cloudflare',
    category: 'Functional',
    description: 'Content delivery network (CDN), DDoS mitigation, and website security acceleration.',
    company: 'Cloudflare Inc.',
    address: '101 Townsend St., San Francisco, CA 94107, USA',
    privacyUrl: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    name: 'Contentful',
    category: 'Functional',
    description: 'Enterprise headless CMS to manage content and publish across digital channels.',
    company: 'Contentful GmbH',
    address: 'Max-Urich-Straße 3, 13355 Berlin, Germany',
    privacyUrl: 'https://www.contentful.com/legal/privacy-at-contentful/privacy-notice/',
  },
  {
    name: 'Datadog, Inc',
    category: 'Functional',
    description: 'Cloud monitoring and performance analytics service for infrastructure and servers.',
    company: 'Datadog, Inc.',
    address: '620 8th Avenue, Floor 45, New York, NY 10018, USA',
    privacyUrl: 'https://www.datadoghq.com/legal/privacy/',
  },
  {
    name: 'Fontawesome',
    category: 'Functional',
    description: 'Icon library and vector assets toolkit delivery service.',
    company: 'Fonticons, Inc.',
    address: '6 Porter Road, Apt 3R, Cambridge, MA 02140, USA',
    privacyUrl: 'https://fontawesome.com/privacy',
  },
  {
    name: 'Google Fonts',
    category: 'Functional',
    description: 'Web font delivery infrastructure for high-fidelity typography rendering.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin 4, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'LaunchDarkly',
    category: 'Functional',
    description: 'Feature management and dynamic flag release platform.',
    company: 'LaunchDarkly',
    address: '1999 Harrison St Suite 1100, Oakland, CA 94612, USA',
    privacyUrl: 'https://launchdarkly.com/policies/privacy/',
  },
  {
    name: 'reCAPTCHA',
    category: 'Functional',
    description: 'Fraud prevention system that distinguishes human users from automated bots.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'RudderStack',
    category: 'Functional',
    description: 'Customer Data Platform (CDP) for privacy-first event streaming.',
    company: 'RudderStack, Inc.',
    address: '96 S. Park Street, San Francisco, CA 94107, USA',
    privacyUrl: 'https://www.rudderstack.com/privacy-policy/',
  },
  {
    name: 'Trustpilot',
    category: 'Functional',
    description: 'Review collection and authentic client feedback aggregation service.',
    company: 'Trustpilot A/S',
    address: 'Pilestraede 58, 5th floor, 1112 Copenhagen, Denmark',
    privacyUrl: 'https://legal.trustpilot.com/for-reviewers/end-user-privacy-terms',
  },
  {
    name: 'Google Analytics',
    category: 'Analytics',
    description: 'Web analytics service measuring visitor traffic, user behaviour, and campaign performance.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'Taggrs.io',
    category: 'Analytics',
    description: 'Server-side and client-side privacy-first tag management and tracking compliance.',
    company: 'TAGGRS B.V.',
    address: 'K.R. Poststraat 131, 8448 EB Heerenveen, Netherlands',
    privacyUrl: 'https://taggrs.io/wp-content/uploads/2025/06/V.2025.6-DPA-TAGGRS-EN.pdf',
  },
  {
    name: 'AppsFlyer',
    category: 'Marketing',
    description: 'Mobile marketing analytics, deep linking, and mobile app attribution platform.',
    company: 'AppsFlyer Ltd.',
    address: '14 Maskit St., Herzliya, 4673314, Israel',
    privacyUrl: 'https://www.appsflyer.com/services-privacy-policy/',
  },
  {
    name: 'Conversion Linker',
    category: 'Marketing',
    description: 'Stores first-party click data to accurately measure ad conversions across domains.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'DoubleClick / Google Ads',
    category: 'Marketing',
    description: 'Digital advertising platform for relevant ad delivery and attribution reporting.',
    company: 'Google Ireland Limited',
    address: 'Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    privacyUrl: 'https://business.safety.google/privacy/?hl=en',
  },
  {
    name: 'Facebook Pixel & Meta Plugins',
    category: 'Marketing',
    description: 'Conversion tracking and targeted audience delivery via Meta Platforms.',
    company: 'Meta Platforms Ireland Ltd.',
    address: '4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Ireland',
    privacyUrl: 'https://www.facebook.com/privacy/explanation',
  },
  {
    name: 'LinkedIn Insight Tag',
    category: 'Marketing',
    description: 'B2B conversion tracking, retargeting, and audience demographic insights.',
    company: 'LinkedIn Ireland Unlimited Company',
    address: 'Wilton Place, Dublin 2, Ireland',
    privacyUrl: 'https://www.linkedin.com/legal/privacy-policy',
  },
  {
    name: 'Microsoft Advertising',
    category: 'Marketing',
    description: 'Remarketing and search audience targeting across Microsoft advertising network.',
    company: 'Microsoft Corporation',
    address: 'One Microsoft Way, Redmond, WA 98052, USA',
    privacyUrl: 'https://privacy.microsoft.com/en-us/PrivacyStatement',
  },
  {
    name: 'Outbrain',
    category: 'Marketing',
    description: 'Personalized content recommendation and native advertising network.',
    company: 'Outbrain UK Limited',
    address: 'Craven House, 121 Kingsway, London, WC2B 6PA, UK',
    privacyUrl: 'https://www.outbrain.com/legal/privacy',
  },
  {
    name: 'TikTok Advertising',
    category: 'Marketing',
    description: 'Video advertising measurement and campaign analytics platform.',
    company: 'TikTok Information Technologies UK Limited',
    address: 'Aviation House, 125 Kingsway Holborn, London, WC2B 6NH, UK',
    privacyUrl: 'https://www.tiktok.com/legal/privacy-policy?lang=en#section-1',
  },
  {
    name: 'Hotjar',
    category: 'Marketing',
    description: 'User experience insights, heatmaps, and customer satisfaction surveys.',
    company: 'Hotjar Limited',
    address: 'Dragonara Business Centre, 5th Floor, Dragonara Road, St Julian\'s STJ 3141, Malta',
    privacyUrl: 'https://www.hotjar.com/legal/policies/privacy',
  },
  {
    name: 'Greenhouse Group / LemonPI',
    category: 'Marketing',
    description: 'Dynamic creative optimization and ad display technology.',
    company: 'GroupM UK Limited',
    address: '40 The Strand, London WC2N 5RW, UK',
    privacyUrl: 'https://www.lemonpi.io/privacy-policy/',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* Hero Header */}
      <section style={{ position: 'relative', padding: '60px 24px 40px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(15,99,189,0.08)', borderRadius: '999px', color: '#0F63BD', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
            Data Protection & Australian Privacy Compliance
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px', lineHeight: 1.15 }}>
            Privacy Policy and Cookie Policy
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive information regarding the collection, processing, and protection of personal data across Bookcabs Australia digital platforms, chauffeured ride bookings, and mobile services.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 100px', lineHeight: 1.8, fontSize: '15px', color: '#334155' }}>
        
        {/* Table of Contents Navigation Card */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px 32px', marginBottom: '40px', boxShadow: '0 4px 20px rgba(15,23,42,0.03)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '16px' }}>
            Table of Contents
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px 24px', fontSize: '14px' }}>
            <a href="#section-1" style={{ color: '#0F63BD', textDecoration: 'none' }}>1. Scope</a>
            <a href="#section-2" style={{ color: '#0F63BD', textDecoration: 'none' }}>2. Name & Contact of Controller</a>
            <a href="#section-3" style={{ color: '#0F63BD', textDecoration: 'none' }}>3. Data Protection & Privacy Officer</a>
            <a href="#section-4" style={{ color: '#0F63BD', textDecoration: 'none' }}>4. Data Security</a>
            <a href="#section-5" style={{ color: '#0F63BD', textDecoration: 'none' }}>5. Provision of the Websites</a>
            <a href="#section-6" style={{ color: '#0F63BD', textDecoration: 'none' }}>6. Cookies & Similar Technologies</a>
            <a href="#section-7" style={{ color: '#0F63BD', textDecoration: 'none' }}>7. Special Features for Mobile Platforms</a>
            <a href="#section-8" style={{ color: '#0F63BD', textDecoration: 'none' }}>8. Social Media & Networks</a>
            <a href="#section-9" style={{ color: '#0F63BD', textDecoration: 'none' }}>9. Registered Use & Booking Rides</a>
            <a href="#section-10" style={{ color: '#0F63BD', textDecoration: 'none' }}>10. Payment & Fraud Prevention</a>
            <a href="#section-11" style={{ color: '#0F63BD', textDecoration: 'none' }}>11. Communication & Support</a>
            <a href="#section-12" style={{ color: '#0F63BD', textDecoration: 'none' }}>12. Email Notifications & Newsletters</a>
            <a href="#section-13" style={{ color: '#0F63BD', textDecoration: 'none' }}>13. Involvement of Data Processors</a>
            <a href="#section-14" style={{ color: '#0F63BD', textDecoration: 'none' }}>14. Rights of Data Subjects & Australian Privacy</a>
            <a href="#section-15" style={{ color: '#0F63BD', textDecoration: 'none' }}>15. Automated Decisions</a>
            <a href="#section-16" style={{ color: '#0F63BD', textDecoration: 'none' }}>16. Data Erasure & Retention</a>
            <a href="#section-17" style={{ color: '#0F63BD', textDecoration: 'none' }}>17. Amendments & Updates</a>
            <a href="#cookie-policy" style={{ color: '#0F63BD', textDecoration: 'none', fontWeight: 600 }}>→ Cookie Policy & Processors</a>
          </div>
        </div>

        {/* Policy Body */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '44px 36px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Section 1 */}
          <div id="section-1" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              1. Scope
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We, <strong>Bookcabs Australia</strong> (&quot;Bookcabs&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), take the protection of your personal data seriously and protect your privacy in strict accordance with the Australian Privacy Principles (APPs) set out in the <em>Privacy Act 1988 (Cth)</em> and applicable global standards including the General Data Protection Regulation (GDPR).
            </p>
            <p style={{ marginBottom: '12px' }}>
              This privacy policy informs you as a visitor of the Bookcabs websites, as a user or customer of the Bookcabs online platform, mobile interfaces, or other chauffeured transportation services (together &quot;Bookcabs Services&quot;) which of your personal data is processed and for which purpose. Bookcabs Services are not aimed at minors.
            </p>
            <p>
              Information on the processing of personal data of chauffeurs and driver partners is governed by our Chauffeur Partner Agreement & Accreditation Policy.
            </p>
          </div>

          {/* Section 2 */}
          <div id="section-2" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              2. Name and Contact Information of the Controller
            </h2>
            <p style={{ marginBottom: '14px' }}>
              The controller for the processing of data within the meaning of the Privacy Act and applicable data protection frameworks is:
            </p>
            <div style={{ padding: '18px 22px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0F1319', fontSize: '16px' }}>Bookcabs Chauffeured Cars Australia</div>
              <div style={{ color: '#475569', marginTop: '4px' }}>Headquarters & Executive Dispatch: Melbourne, Victoria, Australia</div>
              <div style={{ color: '#475569' }}>Direct Phone: +61 417 833 137</div>
              <div style={{ color: '#0F63BD', fontWeight: 600, marginTop: '6px' }}>
                Primary Contact E-Mail: <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', textDecoration: 'none' }}>Contact@bookcabs.com.au</a>
              </div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#64748b' }}>
              You can find further licensing and regulatory information in our <Link href="/legal-notice" style={{ color: '#0F63BD', fontWeight: 600 }}>Legal Notice</Link>.
            </p>
          </div>

          {/* Section 3 */}
          <div id="section-3" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              3. Contact Information for the Data Protection & Privacy Officer
            </h2>
            <p style={{ marginBottom: '14px' }}>
              Our appointed Data Protection & Privacy Officer can be reached directly regarding privacy matters:
            </p>
            <div style={{ padding: '18px 22px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0F1319' }}>Privacy Officer • Bookcabs Australia</div>
              <div style={{ color: '#475569', marginTop: '4px' }}>Melbourne, Victoria, Australia</div>
              <div style={{ color: '#475569', marginTop: '4px' }}>
                You can contact our privacy officer confidentially by e-mail at: <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none' }}>Contact@bookcabs.com.au</a> or telephone at: <a href="tel:+61417833137" style={{ color: '#0F63BD', textDecoration: 'none' }}>+61 417 833 137</a>.
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              4. Data Security
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Bookcabs Australia uses appropriate technical and organizational security measures to ensure a high level of protection for personal data, taking into account modern industry standards, implementation costs, and the risk context.
            </p>
            <p style={{ marginBottom: '12px' }}>
              The transfer of personal data between your device and Bookcabs servers is carried out in encrypted form using Transport Layer Security (TLS/SSL encryption). You can identify an encrypted connection by the padlock icon in your browser address bar.
            </p>
            <p>
              We enforce transport encryption for all electronic inquiries, booking data, and concierge communications.
            </p>
          </div>

          {/* Section 5 */}
          <div id="section-5" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              5. Provision of the Websites
            </h2>
            <p style={{ marginBottom: '12px' }}>
              When visiting Bookcabs websites for informational purposes (i.e. even without registration or booking), data is automatically collected regarding usage through your browser (hereinafter &quot;surf data&quot;). This includes your IP address, status codes, pages visited, date and time of request, browser version, and data volume transferred. If you visit without an account, we do not identify who you are.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Surf data is processed to establish and maintain technical stability, evaluate website usability in pseudonymized format, troubleshoot disruptions, and safeguard the platform against unauthorized access and cyberattacks.
            </p>
            <p>
              Stored server logs are automatically erased or anonymized once they are no longer required for system operational integrity.
            </p>
          </div>

          {/* Section 6 */}
          <div id="section-6" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              6. Cookies, Pixels and Similar Technologies
            </h2>
            <p style={{ marginBottom: '12px' }}>
              When using Bookcabs Services, cookies, pixels, and web beacons may be used. Cookies are small text files stored on your device that allow us to remember your preferences (e.g. currency, booking inputs, cookie choices).
            </p>
            <p style={{ marginBottom: '12px' }}>
              With your consent, we also use first-party and third-party analytical and performance cookies to improve user experience and evaluate marketing effectiveness. You can manage or revoke your cookie settings at any time via your browser settings.
            </p>
            <p>
              For full disclosure on every individual service and cookie lifetime, please review the <a href="#cookie-policy" style={{ color: '#0F63BD', fontWeight: 600 }}>Cookie Policy below</a>.
            </p>
          </div>

          {/* Section 7 */}
          <div id="section-7" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              7. Special Features for Mobile Platforms
            </h2>
            <p style={{ marginBottom: '12px' }}>
              When accessing Bookcabs Services via mobile web or dedicated mobile applications, similar processing of personal data is carried out as via the web platform.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Device-specific metadata (such as operating system version, screen resolution, and device model) may be processed to optimize the mobile booking and 3D car showroom interface.
            </p>
            <p>
              Push notifications and SMS trip alerts (such as chauffeur arrival updates and flight delay adjustments) are delivered based on your booking requirements and communication preferences.
            </p>
          </div>

          {/* Section 8 */}
          <div id="section-8" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              8. Social Media & Digital Channels
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>8.1 Social Media Channels</h3>
                <p>Bookcabs Australia maintains official profiles on platforms including LinkedIn, Instagram, and Facebook. Each platform processes personal data according to its own privacy terms.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>8.2 Messaging & Social Authentication</h3>
                <p>If you reach out to Bookcabs via official WhatsApp, Messenger, or social channels, data provided is processed solely to fulfill your chauffeur reservation and answer your concierge inquiry.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>8.3 Google Customer Match & Analytics</h3>
                <p>Where consented, hashed contact lists may be utilized with Google Customer Match to present tailored luxury transport options to prospective corporate and private clients.</p>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              9. Data Processing During Registered Use & Booking Rides
            </h2>
            <p style={{ marginBottom: '12px' }}>
              When booking chauffeur transfers or creating a corporate account with Bookcabs Australia, we process the following customer data:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <li><strong>Personal Master Data:</strong> Name, title, company name, address, and login credentials.</li>
              <li><strong>Contact Information:</strong> Mobile telephone number and email address.</li>
              <li><strong>Ride Details:</strong> Pickup and drop-off addresses, flight numbers, flight arrival times, vehicle preferences, and special requests.</li>
              <li><strong>Billing & Invoicing:</strong> Tax invoices, corporate billing accounts, and transaction records.</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              Customer data is shared with our accredited Victorian and Australian chauffeur partners solely to execute the transport agreement and coordinate greeting at airport terminals or hotel lobbies.
            </p>
            <p>
              Client feedback and ride ratings are retained in anonymized format to maintain exceptional service and chauffeur standards.
            </p>
          </div>

          {/* Section 10 */}
          <div id="section-10" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              10. Payment & Fraud Prevention
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>10.1 Payment Security</h3>
                <p>All Bookcabs Australia bookings are processed via secure, PCI DSS Level 1 compliant financial payment gateways (including Stripe, Braintree, and certified Australian banks). Bookcabs does not store full credit card numbers on its servers.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>10.2 Fraud Prevention</h3>
                <p>To safeguard cardholders against fraud and unauthorized bookings, payment metadata and transaction signatures are verified via automated fraud mitigation systems.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>10.3 Compliance & Ethics Reporting</h3>
                <p>Bookcabs Australia is committed to transparent and ethical business operations. Stakeholders can report potential compliance or safety concerns directly to <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD' }}>Contact@bookcabs.com.au</a>.</p>
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div id="section-11" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              11. Communication with VIP Concierge & Support
            </h2>
            <p style={{ marginBottom: '12px' }}>
              When contacting Bookcabs Australia via telephone, inquiry form, email, or WhatsApp, the information provided is processed to resolve your inquiry, provide instant quotes, and coordinate personalized transfers.
            </p>
            <p>
              Customer communications are managed securely to uphold total confidentiality for VIP and executive clientele.
            </p>
          </div>

          {/* Section 12 */}
          <div id="section-12" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              12. Email Notifications & Newsletters
            </h2>
            <p style={{ marginBottom: '12px' }}>
              If you have opted in to receive promotional updates or service bulletins from Bookcabs Australia, we may use your contact details to share seasonal luxury packages (such as Yarra Valley wine tours and Grand Prix corporate transfers).
            </p>
            <p>
              You may unsubscribe from marketing communications at any time with immediate effect by clicking &quot;Unsubscribe&quot; or emailing <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD' }}>Contact@bookcabs.com.au</a>.
            </p>
          </div>

          {/* Section 13 */}
          <div id="section-13" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              13. Involvement of Data Processors
            </h2>
            <p>
              Where Bookcabs engages third-party technical vendors (e.g. cloud hosting, mapping APIs, analytics), processing is conducted strictly under written agreements guaranteeing compliance with Australian privacy standards and international data protection laws.
            </p>
          </div>

          {/* Section 14 */}
          <div id="section-14" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              14. Rights of Data Subjects & Australian Privacy Rights
            </h2>
            <p style={{ marginBottom: '14px' }}>
              Under the Australian Privacy Principles and applicable data protection regulations, you have enforceable rights regarding personal data held by Bookcabs Australia:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.1 Right to Access:</strong> Request access to any personal information we hold about you.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.2 Right to Correction:</strong> Request immediate correction of inaccurate or incomplete records.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.3 Right to Erasure:</strong> Request deletion of your personal account data when retention is no longer legally required.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.4 Right to Restrict Processing:</strong> Request restrictions on how your data is used during contested accuracy.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.5 Right to Object:</strong> Opt out of direct marketing communications at any time.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.6 Data Portability:</strong> Receive a copy of your booking and account records in a structured electronic format.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.7 Right to Lodge a Complaint:</strong> Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) or relevant state regulator.
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong>14.8 Revocation of Consent:</strong> Withdraw consent for analytical or marketing processing at any time by contacting <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD' }}>Contact@bookcabs.com.au</a>.
              </div>
            </div>
          </div>

          {/* Section 15 */}
          <div id="section-15" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              15. Automated Decisions
            </h2>
            <p>
              Automated decisions occur only in exceptional circumstances to mitigate credit card fraud or prevent suspicious booking activity. Clients can request manual concierge review of any automated booking decision.
            </p>
          </div>

          {/* Section 16 */}
          <div id="section-16" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              16. Data Erasure and Storage Duration
            </h2>
            <p>
              Personal data is erased once the primary purpose for processing is fulfilled, unless statutory accounting, tax, and transport regulatory retention obligations (such as Australian commercial record requirements) mandate retention for a defined statutory period.
            </p>
          </div>

          {/* Section 17 */}
          <div id="section-17" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              17. Amendment or Update of this Privacy Policy
            </h2>
            <p style={{ marginBottom: '8px' }}>
              Bookcabs Australia reserves the right to amend this Privacy Policy to reflect regulatory, legal, or technical developments.
            </p>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Last Reviewed & Updated: September 2026 • Bookcabs Australia.
            </p>
          </div>

        </div>

        {/* ── COOKIE POLICY & DATA PROCESSORS SECTION ─────────────────────── */}
        <div id="cookie-policy" style={{ marginTop: '50px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '44px 36px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(56,189,248,0.1)', borderRadius: '999px', color: '#0284c7', fontSize: '13px', fontWeight: 700, marginBottom: '14px' }}>
            Technical & Analytical Disclosure
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#0F1319', marginBottom: '16px' }}>
            Cookie Policy & Authorized Data Processors
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Cookies, pixels, and web beacons are utilized to ensure technical integrity, authenticate sessions, store user preferences (e.g. vehicle type, booking selections), and analyze performance. Below is the itemized list of all authorized digital services and processors utilized across Bookcabs Australia digital services:
          </p>

          {/* Service Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {cookieServices.map((svc) => (
              <div
                key={svc.name}
                style={{
                  padding: '20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319' }}>
                      {svc.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        background:
                          svc.category === 'Essential'
                            ? '#dcfce7'
                            : svc.category === 'Analytics'
                            ? '#e0e7ff'
                            : svc.category === 'Marketing'
                            ? '#fef3c7'
                            : '#f1f5f9',
                        color:
                          svc.category === 'Essential'
                            ? '#166534'
                            : svc.category === 'Analytics'
                            ? '#3730a3'
                            : svc.category === 'Marketing'
                            ? '#92400e'
                            : '#475569',
                      }}
                    >
                      {svc.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '8px' }}>
                    {svc.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    <strong>Processor:</strong> {svc.company}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    {svc.address}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                  <a
                    href={svc.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Read Privacy Policy</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Navigation Bar */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ color: '#0F63BD', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Home</span>
          </Link>
          <div style={{ display: 'flex', gap: '12px' }}>
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
