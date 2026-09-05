'use client';

import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <main className="Layout_main__h283P" style={{ background: '#f8fafc', color: '#0F1319', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* Hero Header */}
      <section style={{ position: 'relative', padding: '60px 24px 40px', background: 'linear-gradient(180deg, #eaf2ff 0%, #f8fafc 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(15,99,189,0.08)', borderRadius: '999px', color: '#0F63BD', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
            Commercial Chauffeur & Service Agreement
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, color: '#0F1319', marginBottom: '16px', lineHeight: 1.15 }}>
            Terms and Conditions
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '750px', margin: '0 auto' }}>
            General Terms and Conditions governing Bookcabs Australia digital booking platforms, chauffeur transportation services, airport transfers, and hourly bookings.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 100px', lineHeight: 1.8, fontSize: '15px', color: '#334155' }}>
        
        {/* Table of Contents Navigation Card */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px 32px', marginBottom: '40px', boxShadow: '0 4px 20px rgba(15,23,42,0.03)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F1319', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📑</span>
            <span>Table of Contents</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px 24px', fontSize: '14px' }}>
            <div>
              <a href="#section-1" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                1. General Provisions
              </a>
            </div>

            <div>
              <a href="#section-2" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                2. Contractual Relationship & Conclusion
              </a>
            </div>

            <div>
              <a href="#section-3" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                3. User Obligations & Accuracy of Info
              </a>
            </div>

            <div style={{ gridColumn: '1 / -1', background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <a href="#section-4" style={{ color: '#0F63BD', fontWeight: 700, textDecoration: 'none', display: 'block', marginBottom: '8px', fontSize: '15px' }}>
                4. Transportation Contract Terms (Key Passenger Conditions)
              </a>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px 16px', paddingLeft: '8px' }}>
                <a href="#section-4-1" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.1 Ride Types & Service Changes
                </a>
                <a href="#section-4-2" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.2 Pickup Time & Flight Tracking
                </a>
                <a href="#section-4-3" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.3 Vehicle Classes & Upgrades
                </a>
                <a href="#section-4-4" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.4 Luggage, Safety & Minor Passengers
                </a>
                <a href="#section-4-5" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.5 Exceptional Delays & Force Majeure
                </a>
                <a href="#section-4-6" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.6 Cancellations & No-Shows
                </a>
                <a href="#section-4-7" style={{ color: '#0F63BD', textDecoration: 'none', fontSize: '13px' }}>
                  → 4.7 Behavioral Standards in Vehicles
                </a>
              </div>
            </div>

            <div>
              <a href="#section-5" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                5. Remuneration & Transparent Payment
              </a>
            </div>

            <div>
              <a href="#section-6" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                6. Liability & Disclaimers
              </a>
            </div>

            <div>
              <a href="#section-7" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                7. Amendment of Offerings & Digital Tools
              </a>
            </div>

            <div>
              <a href="#section-8" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                8. Intellectual Property & Usage Rights
              </a>
            </div>

            <div>
              <a href="#section-9" style={{ color: '#0F63BD', fontWeight: 600, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                9. Final Provisions & Governing Law
              </a>
            </div>
          </div>
        </div>

        {/* Terms Body */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '44px 36px', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Section 1 */}
          <div id="section-1" style={{ scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              1. General Provisions
            </h2>
            <p style={{ marginBottom: '12px' }}>
              <strong>Bookcabs Australia</strong> (hereinafter referred to as &quot;Bookcabs&quot;) enables users to book luxury chauffeured transportation services via its online booking platform, website, mobile interfaces, and concierge dispatch (collectively referred to as &quot;Bookcabs Tools&quot;). Bookcabs&apos; service consists of arranging transportation for users with accredited, licensed independent ride and limousine service providers (&quot;Transportation Service Providers&quot; or &quot;TSPs&quot;). Bookcabs arranges this business service for the user and coordinates dispatch with certified chauffeur partners.
            </p>
            <p style={{ marginBottom: '12px' }}>
              These General Terms and Conditions (hereinafter referred to as &quot;T&Cs&quot;) form an integral part of every agreement between the user and Bookcabs concerning the arrangement of chauffeur bookings. They also describe the specific terms of the transportation services for which Bookcabs provides the user a direct entitlement against an accredited TSP.
            </p>
            <p>
              Conflicting terms and conditions of the user are expressly excluded unless the management of Bookcabs has given explicit written consent.
            </p>
          </div>

          {/* Section 2 */}
          <div id="section-2" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              2. Contractual Relationship and Contract Conclusion
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>2.1 Contractual Relationship</h3>
                <p>
                  Bookcabs arranges for transportation services with independent, accredited TSPs. For this purpose, Bookcabs concludes agreements providing the user with a direct claim for transport against the TSP (&quot;contract for the benefit of third parties&quot;). The user is entitled to request the booked ride and service standards directly from the assigned TSP. The claim for compensation by Bookcabs includes the arrangement fee as well as the remuneration distributed to the TSP for executing the transportation.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>2.2 Conclusion of Contract</h3>
                <p>
                  By submitting a completed booking inquiry via Bookcabs Tools, WhatsApp, email, or telephone, the user transmits an offer to conclude a transportation service contract (&quot;ride request&quot;).
                </p>
                <p style={{ marginTop: '8px' }}>
                  Upon receiving a ride request, Bookcabs transmits an automated receipt confirmation. The binding contract for the ride is concluded upon separate issuance of a <strong>Booking Confirmation</strong> containing scheduled dates, times, vehicle category, and chauffeur contact details.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              3. User Obligations & Accuracy of Information
            </h2>
            <p>
              The user assures that all information transmitted to Bookcabs (including passenger names, contact numbers, flight numbers, pickup locations, luggage details, and payment authorization) is complete, accurate, and up to date. Automated, bot-driven reservations without human authorization are prohibited.
            </p>
          </div>

          {/* Section 4 */}
          <div id="section-4" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              4. Transportation Contract Terms for the Benefit of the User
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
              
              <div id="section-4-1" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.1 Ride Types and Service Changes</h3>
                <p style={{ marginBottom: '8px' }}>
                  Depending on regional availability, users can select:
                </p>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Transfer Rides:</strong> Point-to-point journeys calculated between designated start and destination addresses. Additional unbooked stopovers incur supplemental charges based on distance and wait time.</li>
                  <li><strong>Long-Distance Rides:</strong> Intercity and regional transfers starting at 200 km.</li>
                  <li><strong>Hourly As-Directed Bookings:</strong> Time-based chauffeur hire commencing at the scheduled pickup time and concluding within the city metropolitan radius. Additional kilometers or hours beyond the reservation will be billed per our published rate schedule.</li>
                </ul>
              </div>

              <div id="section-4-2" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.2 Pickup Time & Real-Time Flight Tracking</h3>
                <p>
                  The scheduled pickup time is specified in the Booking Confirmation. For airport pickups (such as Melbourne Tullamarine or Avalon Airport) where a correct commercial flight number was supplied, Bookcabs and the assigned chauffeur track live radar landing times. In case of flight delays, the pickup time is adjusted automatically at no extra penalty.
                </p>
              </div>

              <div id="section-4-3" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.3 Vehicle Classes and Complimentary Upgrades</h3>
                <p>
                  Vehicle classes include <strong>Business Class</strong> (Audi A6/A7, Mercedes E-Class), <strong>Business Van / SUV</strong> (Mercedes V-Class, Audi Q7), <strong>First Class</strong> (Mercedes S-Class, BMW 7-Series), <strong>Sprinter Class</strong> (Luxury Passenger Minibuses), and <strong>Electric Luxury Class</strong> (Tesla Model S/X, Porsche Taycan).
                </p>
                <p style={{ marginTop: '8px' }}>
                  Vehicles displayed in 3D showroom tools are illustrative of vehicle standards. Bookcabs reserves the right to provide a complimentary upgrade to a higher vehicle class at zero additional cost to the customer based on fleet dispatch availability.
                </p>
              </div>

              <div id="section-4-4" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.4 Transport Safety, Luggage, and Minor Passengers</h3>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Luggage:</strong> The confirmed fare includes standard luggage allowances (typically 1 large suitcase and 1 carry-on bag per passenger). Bulky items (wheelchairs, surfboards, golf sets) or live domestic animals must be declared during booking. Animals must be housed in approved transport carriers unless certified guide/assistance animals.</li>
                  <li><strong>Child Restraints:</strong> Under Australian road safety laws, children under 7 years must use approved child booster seats or baby capsules. Users must specify the age and number of children in the booking request.</li>
                  <li><strong>Unaccompanied Minors:</strong> Chauffeur partners reserve the right to decline transport of unaccompanied minors without prior adult authorization.</li>
                  <li><strong>Impeded Transport:</strong> The TSP may refuse transport if space, safety, or intoxication conditions pose a hazard. Full trip compensation remains payable if transport is denied due to undisclosed conditions.</li>
                </ul>
              </div>

              <div id="section-4-5" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.5 Delays & Exceptional Situations</h3>
                <p>
                  Exceptional force majeure events (such as severe weather disruptions, emergency road closures, or airport air-traffic strikes) can only be compensated to a reasonable extent. Chauffeurs will endeavor to find alternative routing.
                </p>
              </div>

              <div id="section-4-6" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.6 Cancellations, Rebookings, and No-Show Policies</h3>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Free Cancellation:</strong> For standard transfer rides, long-distance journeys, and hourly bookings, cancellation is completely free if made <strong>more than 1 hour</strong> before the agreed pickup time. If cancellation occurs within 1 hour of pickup, 100% of the trip fare is payable.</li>
                  <li><strong>Rebookings:</strong> Rescheduling within the free cancellation window is treated as an updated booking. Changes requested under 1 hour are subject to chauffeur availability and standard short-notice fees.</li>
                  <li><strong>City Transfer No-Shows:</strong> A ride is deemed a no-show if the passenger does not appear within <strong>30 minutes</strong> after scheduled pickup without telephone communication. The full fare is charged.</li>
                  <li><strong>Airport Transfer No-Shows:</strong> A ride is deemed a no-show if the passenger does not appear within <strong>60 minutes</strong> after actual flight landing / scheduled train arrival without contacting the chauffeur or concierge. Full fare is charged.</li>
                </ul>
              </div>

              <div id="section-4-7" style={{ scrollMarginTop: '110px', paddingTop: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>4.7 Behavioral Standards in Luxury Vehicles</h3>
                <p style={{ marginBottom: '8px' }}>
                  All passengers must adhere to Australian road traffic regulations, including mandatory seatbelt use at all times. Instructions from the chauffeur regarding safe vehicle operation must be followed.
                </p>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Strict Non-Smoking Policy:</strong> Smoking, vaping, and e-cigarettes are strictly prohibited inside all vehicles. Violations will incur professional sanitization and vehicle detailing charges (minimum $350 AUD).</li>
                  <li><strong>Food & Beverages:</strong> Light bottled water is complimentary. Consumption of messy hot foods is discouraged. Alcoholic beverages may only be consumed with prior written arrangement and in compliance with liquor licensing rules.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              5. Remuneration and Payment
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>5.1 Transparent Pricing</h3>
                <p>The confirmed booking amount includes vehicle dispatch, chauffeur compensation, applicable tolls, taxes (GST in Australia), and complimentary wait time.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>5.2 Complimentary Wait Time Schedule</h3>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Airport & Train Station Pickups:</strong> 60 minutes of complimentary wait time is included starting from actual flight touchdown.</li>
                  <li><strong>Standard City / Address Pickups:</strong> 15 minutes of complimentary wait time from scheduled time.</li>
                  <li>Excess waiting time beyond the complimentary period is billed in 15-minute increments according to vehicle class rates.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>5.3 Payment Methods & Processing</h3>
                <p>Payments can be made via credit card, corporate debit card, or approved commercial account billing. By submitting a card, the user authorizes Bookcabs and its PCI-DSS Level 1 payment processors to charge all confirmed trip fares, verified waiting times, and incidental detailing fees.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>5.4 Invoicing & Receipts</h3>
                <p>Tax invoices with full GST breakdowns are generated electronically and transmitted via email immediately upon trip completion.</p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              6. Liability & Disclaimers
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>6.1 General Principles</h3>
                <p>
                  Bookcabs is liable for damages caused by intent or gross negligence. Accredited TSPs and chauffeurs are independent commercial transportation contractors holding mandatory commercial passenger vehicle accreditation, comprehensive commercial insurance, and public liability coverage.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>6.2 Platform Availability</h3>
                <p>
                  Bookcabs endeavors to maintain 99.9% uptime for digital booking tools. We accept no liability for telecommunications failures, third-party internet outages, or force majeure events beyond our direct control.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>6.3 Objects Left in Vehicles</h3>
                <p>
                  Passengers are responsible for all personal belongings upon disembarking. While chauffeurs will immediately secure and report items left behind to executive dispatch, Bookcabs assumes no direct liability for forgotten property. Courier return fees may apply.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              7. Amendment of Offerings and Digital Tools
            </h2>
            <p>
              Bookcabs reserves the right to modify, enhance, or adjust the features of its digital booking tools and 3D fleet showroom at any time to deliver continuous technological and service improvements.
            </p>
          </div>

          {/* Section 8 */}
          <div id="section-8" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              8. Intellectual Property and Usage Rights
            </h2>
            <p>
              All software, algorithms, 3D interactive assets, imagery, and text on Bookcabs Australia platforms are protected by international copyright and intellectual property laws. Users are granted a limited, revocable license to book services for personal or corporate travel.
            </p>
          </div>

          {/* Section 9 */}
          <div id="section-9" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', scrollMarginTop: '110px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#0F1319', marginBottom: '12px' }}>
              9. Final Provisions & Governing Law
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>9.1 Entire Agreement</h3>
                <p>These Terms and Conditions constitute the entire legal agreement between Bookcabs Australia and the user for the arrangement of chauffeured transportation services.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>9.2 Governing Law & Jurisdiction</h3>
                <p>
                  These T&Cs are governed by and construed in accordance with the laws of the State of Victoria and the Commonwealth of Australia. The courts of Melbourne, Victoria, Australia shall have exclusive jurisdiction over any disputes arising under or in connection with these terms.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1319', marginBottom: '6px' }}>9.3 Severability</h3>
                <p>
                  If any provision of these T&Cs is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '20px', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0F1319' }}>Bookcabs Australia Legal & Chauffeur Dispatch</div>
              <div style={{ color: '#475569' }}>Melbourne, Victoria, Australia • Phone: +61 417 833 137</div>
              <div style={{ color: '#0F63BD', fontWeight: 600, marginTop: '4px' }}>Inquiries: <a href="mailto:Contact@bookcabs.com.au" style={{ color: '#0F63BD', textDecoration: 'none' }}>Contact@bookcabs.com.au</a></div>
            </div>
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
            <Link href="/connect-us" style={{ background: '#0F63BD', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
              Contact Concierge
            </Link>
          </div>
        </div>

      </section>

    </main>
  );
}
