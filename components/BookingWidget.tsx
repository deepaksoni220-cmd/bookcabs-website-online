'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LocationItem {
  name: string;
  sub: string;
  type: 'airport' | 'hotel' | 'landmark' | 'station' | 'suburb' | 'address';
}

const POPULAR_LOCATIONS: LocationItem[] = [
  { name: 'Melbourne Airport (MEL – Tullamarine)', sub: 'Arrivals Dr, Melbourne Airport VIC 3045', type: 'airport' },
  { name: 'Avalon Airport (AVV)', sub: '80 Beach Rd, Lara VIC 3212', type: 'airport' },
  { name: 'Essendon Fields Airport (MEB)', sub: '72 Hargrave Ave, Essendon Fields VIC 3041', type: 'airport' },
  { name: 'Sydney Kingsford Smith Airport (SYD)', sub: 'Mascot NSW 2020', type: 'airport' },
  { name: 'Brisbane Airport (BNE)', sub: 'Airport Dr, Brisbane Airport QLD 4008', type: 'airport' },
  { name: 'Crown Towers Melbourne', sub: '8 Whiteman St, Southbank VIC 3006', type: 'hotel' },
  { name: 'The Ritz-Carlton Melbourne', sub: '650 Lonsdale St, Melbourne VIC 3000', type: 'hotel' },
  { name: 'Grand Hyatt Melbourne', sub: '123 Collins St, Melbourne VIC 3000', type: 'hotel' },
  { name: 'W Melbourne', sub: '408 Flinders Ln, Melbourne VIC 3000', type: 'hotel' },
  { name: 'Park Hyatt Melbourne', sub: '1 Parliament Square, Melbourne VIC 3002', type: 'hotel' },
  { name: 'The Langham Melbourne', sub: '1 Southgate Ave, Southbank VIC 3006', type: 'hotel' },
  { name: 'Southern Cross Station', sub: 'Spencer St, Docklands VIC 3008', type: 'station' },
  { name: 'Flinders Street Railway Station', sub: 'Flinders St, Melbourne VIC 3000', type: 'station' },
  { name: 'Melbourne Convention & Exhibition Centre (MCEC)', sub: '1 Convention Centre Pl, South Wharf VIC 3006', type: 'landmark' },
  { name: 'Melbourne Cricket Ground (MCG)', sub: 'Brunton Ave, Richmond VIC 3002', type: 'landmark' },
  { name: 'Marvel Stadium', sub: '740 Bourke St, Docklands VIC 3008', type: 'landmark' },
  { name: 'Melbourne CBD', sub: 'Melbourne VIC 3000', type: 'suburb' },
  { name: 'Southbank', sub: 'Melbourne VIC 3006', type: 'suburb' },
  { name: 'St Kilda', sub: 'Melbourne VIC 3182', type: 'suburb' },
  { name: 'Brighton', sub: 'Melbourne VIC 3186', type: 'suburb' },
  { name: 'Toorak', sub: 'Melbourne VIC 3142', type: 'suburb' },
  { name: 'South Yarra', sub: 'Melbourne VIC 3141', type: 'suburb' },
  { name: 'Docklands', sub: 'Melbourne VIC 3008', type: 'suburb' },
];

function LocationIcon({ type }: { type: LocationItem['type'] }) {
  if (type === 'airport') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    );
  }
  if (type === 'hotel') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 22v-6.57a2 2 0 0 1 1.07-1.78l3.93-2.21a2 2 0 0 1 2 0l3.93 2.21A2 2 0 0 1 22 15.43V22" />
        <path d="M2 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M6 8h4" />
        <path d="M6 12h4" />
        <path d="M6 16h4" />
      </svg>
    );
  }
  if (type === 'station') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="3" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m16 19 2 3" />
        <circle cx="9" cy="15" r="1" />
        <circle cx="15" cy="15" r="1" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Generate Time slots in 15 minute increments
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

export function BookingWidget() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'transfer' | 'hourly'>('transfer');
  
  // Location States
  const [pickup, setPickup] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<LocationItem[]>([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);

  const [dropoff, setDropoff] = useState('');
  const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationItem[]>([]);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);

  // Date States
  const [date, setDate] = useState('Today');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Time States
  const [time, setTime] = useState('1:15 PM');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Summary Modal & Selected Car
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('First Class Luxury');

  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  // Search locations
  const searchLocations = async (query: string, setResults: (res: LocationItem[]) => void) => {
    if (!query.trim()) {
      setResults(POPULAR_LOCATIONS.slice(0, 6));
      return;
    }
    const qLower = query.toLowerCase();
    const localMatches = POPULAR_LOCATIONS.filter(
      (loc) => loc.name.toLowerCase().includes(qLower) || loc.sub.toLowerCase().includes(qLower)
    );

    if (localMatches.length > 0) {
      setResults(localMatches);
    }

    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lat=-37.8136&lon=144.9631`
      );
      if (res.ok) {
        const text = await res.text();
        if (!text) return;
        const data = JSON.parse(text);
        if (data && data.features && data.features.length > 0) {
          const apiMatches: LocationItem[] = data.features.map((f: any) => {
            const props = f.properties || {};
            const name = props.name || props.street || query;
            const sub = [props.street, props.city, props.state, props.country]
              .filter(Boolean)
              .join(', ');
            let type: LocationItem['type'] = 'address';
            if (props.osm_value === 'aerodrome' || (name && name.toLowerCase().includes('airport'))) {
              type = 'airport';
            } else if (props.osm_value === 'hotel' || props.osm_key === 'tourism') {
              type = 'hotel';
            } else if (props.osm_value === 'station' || props.osm_value === 'halt') {
              type = 'station';
            }
            return { name, sub: sub || 'Australia', type };
          });

          const combined = [...localMatches];
          for (const item of apiMatches) {
            if (!combined.some((c) => c.name.toLowerCase() === item.name.toLowerCase())) {
              combined.push(item);
            }
          }
          setResults(combined.slice(0, 6));
        }
      }
    } catch {
      // Fallback cleanly on local matches
      setResults(localMatches);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(e.target as Node)) {
        setShowDropoffDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) {
        setShowTimeDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calendar generation helpers
  const today = new Date();
  const displayDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  const monthName = displayDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const firstDayIndex = displayDate.getDay(); // 0 is Sun
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();

  return (
    <div id="booking-widget" data-cy="booking-widget" className="BookingWidget_bookingWidgetWrapper__uVukG" style={{ position: 'relative', width: '100%', maxWidth: '1080px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div role="presentation">
        <div role="radiogroup" aria-label="Category selection" className="SegmentedControl_group__eYWdG SegmentedControl_mode-dark__0wkdf BookingWidget_categoryToggleButton__Kl37V" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(15, 22, 36, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '999px', padding: '4px', gap: '4px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <label
            className={`SegmentedControlItem_option__qIJgI SegmentedControlItem_mode-dark__UChb6 ${tripType === 'transfer' ? 'SegmentedControlItem_selected__b4f1' : ''}`}
            onClick={() => setTripType('transfer')}
            style={{ cursor: 'pointer', padding: '8px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: tripType === 'transfer' ? 600 : 500, color: '#ffffff', background: tripType === 'transfer' ? 'linear-gradient(135deg, #38BDF8 0%, #0F63BD 100%)' : 'transparent', boxShadow: tripType === 'transfer' ? '0 2px 12px rgba(15, 99, 189, 0.5)' : 'none', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <input type="radio" name="trip-type" checked={tripType === 'transfer'} onChange={() => setTripType('transfer')} value="transfer" style={{ display: 'none' }} />
            One way
          </label>
          <label
            className={`SegmentedControlItem_option__qIJgI SegmentedControlItem_mode-dark__UChb6 ${tripType === 'hourly' ? 'SegmentedControlItem_selected__b4f1' : ''}`}
            onClick={() => setTripType('hourly')}
            style={{ cursor: 'pointer', padding: '8px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: tripType === 'hourly' ? 600 : 500, color: '#ffffff', background: tripType === 'hourly' ? 'linear-gradient(135deg, #38BDF8 0%, #0F63BD 100%)' : 'transparent', boxShadow: tripType === 'hourly' ? '0 2px 12px rgba(15, 99, 189, 0.5)' : 'none', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <input type="radio" name="trip-type" checked={tripType === 'hourly'} onChange={() => setTripType('hourly')} value="hourly" style={{ display: 'none' }} />
            By the hour
          </label>
        </div>
      </div>

      <div data-expanded="false" className="BookingWidget_bookingWindow__yxntP" style={{ width: '100%', maxWidth: '1080px', background: 'linear-gradient(135deg, rgba(15, 22, 36, 0.88) 0%, rgba(8, 12, 20, 0.94) 100%)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderTopColor: 'rgba(255, 255, 255, 0.38)', borderRadius: '20px', padding: '14px 20px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.12)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', overflow: 'visible' }}>
        <div className="BookingWidget_searchBar__yrr_r" style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', flex: '1 1 auto', gap: '0', minWidth: 0, width: '100%' }}>
          {/* Location Section */}
          <div className="BookingWidget_locationSection__ows_i BookingWidget_sectionGroup__3Oh2H" data-attr="locationSection" style={{ display: 'flex', flexDirection: 'row', flex: '2 1 0%', gap: '20px', alignItems: 'center', minWidth: 0 }}>
            {/* Pickup Location Input & Dropdown */}
            <div className="BookingWidget_fieldWrapper__vaH_6" ref={pickupRef} style={{ position: 'relative', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div className="Dropdown_triggerContainer__QkmxC" style={{ width: '100%' }}>
                <div className="Dropdown_triggerInner__LLi0L" style={{ width: '100%' }}>
                  <div className="mobile-field-row" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div className="mobile-field-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96" style={{ flex: 1, minWidth: 0 }}>
                      <label htmlFor="pickup-location" className="FieldWrapper_label__HOD_S" style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px', display: 'block', whiteSpace: 'nowrap' }}>
                        Pickup location
                      </label>
                      <div className="FieldWrapper_inputContainer__qXY8R" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.35)', paddingBottom: '4px' }}>
                        <input
                          id="pickup-location"
                          className="Input_input__IHYPL Input_dark__U_gXZ"
                          aria-invalid="false"
                          autoComplete="off"
                          placeholder="Address, airport, hotel, ..."
                          name="pickup-location"
                          value={pickup}
                          style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none', textOverflow: 'ellipsis', padding: '2px 0' }}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPickup(val);
                            setShowPickupDropdown(true);
                            searchLocations(val, setPickupSuggestions);
                          }}
                          onFocus={() => {
                            setShowPickupDropdown(true);
                            setShowDropoffDropdown(false);
                            setShowDateDropdown(false);
                            setShowTimeDropdown(false);
                            searchLocations(pickup, setPickupSuggestions);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mobile-field-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pickup Suggestions Dropdown */}
              {showPickupDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    width: 'min(420px, 92vw)',
                    maxWidth: '440px',
                    minWidth: '320px',
                    maxHeight: '340px',
                    overflowY: 'auto',
                    background: '#0a0f1d',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    borderRadius: '16px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 25px rgba(56, 189, 248, 0.2)',
                    zIndex: 99999,
                    padding: '8px 0',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  <div style={{ padding: '8px 18px 6px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {pickup ? 'Matching Locations' : 'Popular Pickup Points'}
                  </div>
                  {pickupSuggestions.length === 0 ? (
                    <div style={{ padding: '14px 18px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Searching locations...</div>
                  ) : (
                    pickupSuggestions.map((loc, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setPickup(loc.name);
                          setShowPickupDropdown(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px 18px',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                          borderBottom: i < pickupSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.14)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <LocationIcon type={loc.type} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginBottom: '2px', wordBreak: 'break-word' }}>
                            {loc.name}
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.35, wordBreak: 'break-word' }}>
                            {loc.sub}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Drop-off Location Input & Dropdown */}
            {tripType === 'transfer' && (
              <div className="BookingWidget_fieldWrapper__vaH_6" ref={dropoffRef} style={{ position: 'relative', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <div className="Dropdown_triggerContainer__QkmxC" style={{ width: '100%' }}>
                  <div className="Dropdown_triggerInner__LLi0L" style={{ width: '100%' }}>
                    <div className="mobile-field-row" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <div className="mobile-field-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="6" cy="6" r="3" />
                          <circle cx="18" cy="18" r="3" />
                          <path d="M6 9v3a3 3 0 0 0 3 3h6" />
                        </svg>
                      </div>
                      <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96" style={{ flex: 1, minWidth: 0 }}>
                        <label htmlFor="dropoff-location" className="FieldWrapper_label__HOD_S" style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px', display: 'block', whiteSpace: 'nowrap' }}>
                          Drop-off location
                        </label>
                        <div className="FieldWrapper_inputContainer__qXY8R" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.35)', paddingBottom: '4px' }}>
                          <input
                            id="dropoff-location"
                            className="Input_input__IHYPL Input_dark__U_gXZ"
                            aria-invalid="false"
                            autoComplete="off"
                            placeholder="Address, airport, hotel, ..."
                            name="dropoff-location"
                            value={dropoff}
                            style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none', textOverflow: 'ellipsis', padding: '2px 0' }}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDropoff(val);
                              setShowDropoffDropdown(true);
                              searchLocations(val, setDropoffSuggestions);
                            }}
                            onFocus={() => {
                              setShowDropoffDropdown(true);
                              setShowPickupDropdown(false);
                              setShowDateDropdown(false);
                              setShowTimeDropdown(false);
                              searchLocations(dropoff, setDropoffSuggestions);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mobile-field-chevron">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dropoff Suggestions Dropdown */}
                {showDropoffDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: 0,
                      width: 'min(420px, 92vw)',
                      maxWidth: '440px',
                      minWidth: '320px',
                      maxHeight: '340px',
                      overflowY: 'auto',
                      background: '#0a0f1d',
                      border: '1px solid rgba(56, 189, 248, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 25px rgba(56, 189, 248, 0.2)',
                      zIndex: 99999,
                      padding: '8px 0',
                      backdropFilter: 'blur(24px)',
                    }}
                  >
                    <div style={{ padding: '8px 18px 6px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {dropoff ? 'Matching Locations' : 'Popular Destinations'}
                    </div>
                    {dropoffSuggestions.length === 0 ? (
                      <div style={{ padding: '14px 18px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Searching locations...</div>
                    ) : (
                      dropoffSuggestions.map((loc, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setDropoff(loc.name);
                            setShowDropoffDropdown(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '12px 18px',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                            borderBottom: i < dropoffSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.14)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                            <LocationIcon type={loc.type} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginBottom: '2px', wordBreak: 'break-word' }}>
                              {loc.name}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.35, wordBreak: 'break-word' }}>
                              {loc.sub}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <hr aria-orientation="vertical" aria-hidden="true" className="Divider_divider__NDhMz Divider_orientation-vertical__AaiZj Divider_type-inverse__RxhXg BookingWidget_divider__cecmo" style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)', border: 'none', margin: '0 16px' }} />

          {/* Schedule Section */}
          <div className="BookingWidget_scheduleSection__LA4W0 BookingWidget_sectionGroup__3Oh2H" style={{ display: 'flex', flexDirection: 'row', flex: '1.5 1 0%', gap: '20px', alignItems: 'center', minWidth: 0 }}>
            {/* Interactive Date Picker Field & Calendar Dropdown */}
            <div className="BookingWidget_fieldWrapper__vaH_6" ref={dateRef} style={{ position: 'relative', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div data-booking-field="date" style={{ width: '100%' }}>
                <div
                  className="mobile-field-row"
                  onClick={() => {
                    setShowDateDropdown(!showDateDropdown);
                    setShowTimeDropdown(false);
                    setShowPickupDropdown(false);
                    setShowDropoffDropdown(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer' }}
                >
                  <div className="mobile-field-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96 DatePickerInput_dateInput__uf_om" style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                    <label htmlFor="booking-date" className="FieldWrapper_label__HOD_S" style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px', display: 'block', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                      Date
                    </label>
                    <div className="FieldWrapper_inputContainer__qXY8R" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.35)', paddingBottom: '4px' }}>
                      <input
                        id="booking-date"
                        className="Input_input__IHYPL Input_dark__U_gXZ"
                        placeholder="Select a date"
                        value={date}
                        readOnly
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none', textOverflow: 'ellipsis', padding: '2px 0', cursor: 'pointer' }}
                      />
                      <span className="FieldWrapper_endAdornment__Dcnms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down" style={{ transform: showDateDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'rgba(255,255,255,0.7)' }}>
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="mobile-field-chevron">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interactive Calendar Dropdown */}
              {showDateDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    width: '320px',
                    background: '#0a0f1d',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    borderRadius: '16px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 25px rgba(56, 189, 248, 0.2)',
                    zIndex: 99999,
                    padding: '16px',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  {/* Quick Select Preset Buttons */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    {['Today', 'Tomorrow', 'This Weekend'].map((label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (label === 'Today') {
                            setDate('Today');
                          } else if (label === 'Tomorrow') {
                            const d = new Date();
                            d.setDate(d.getDate() + 1);
                            setDate(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
                          } else {
                            const d = new Date();
                            const day = d.getDay();
                            const dist = (6 - day + 7) % 7 || 7;
                            d.setDate(d.getDate() + dist);
                            setDate(`Sat, ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
                          }
                          setShowDateDropdown(false);
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          borderRadius: '8px',
                          background: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          color: '#38BDF8',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Month Navigation */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setCurrentMonthOffset((o) => Math.max(0, o - 1))}
                      disabled={currentMonthOffset === 0}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: currentMonthOffset === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        cursor: currentMonthOffset === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      ‹
                    </button>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                      {monthName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentMonthOffset((o) => o + 1)}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      ›
                    </button>
                  </div>

                  {/* Day of Week Headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '6px' }}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, idx) => (
                      <span key={idx} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Month Days Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {Array.from({ length: firstDayIndex }).map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNumber = idx + 1;
                      const isPast = currentMonthOffset === 0 && dayNumber < today.getDate();
                      const isCurrentDay = currentMonthOffset === 0 && dayNumber === today.getDate();

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          disabled={isPast}
                          onClick={() => {
                            const selected = new Date(displayDate.getFullYear(), displayDate.getMonth(), dayNumber);
                            const formatted = selected.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                            setDate(isCurrentDay ? 'Today' : formatted);
                            setShowDateDropdown(false);
                          }}
                          style={{
                            aspectRatio: '1/1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            border: isCurrentDay ? '1px solid #38BDF8' : 'none',
                            background: isCurrentDay ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                            color: isPast ? 'rgba(255,255,255,0.2)' : '#ffffff',
                            fontSize: '12px',
                            fontWeight: isCurrentDay ? 700 : 500,
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isPast) e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isPast) e.currentTarget.style.background = isCurrentDay ? 'rgba(56, 189, 248, 0.2)' : 'transparent';
                          }}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Time Picker Field & Dropdown */}
            <div className="BookingWidget_fieldWrapper__vaH_6" ref={timeRef} style={{ position: 'relative', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div className="Dropdown_triggerContainer__QkmxC" style={{ width: '100%' }}>
                <div className="Dropdown_triggerInner__LLi0L" style={{ width: '100%' }}>
                  <div
                    className="mobile-field-row"
                    onClick={() => {
                      setShowTimeDropdown(!showTimeDropdown);
                      setShowDateDropdown(false);
                      setShowPickupDropdown(false);
                      setShowDropoffDropdown(false);
                    }}
                    style={{ display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer' }}
                  >
                    <div className="mobile-field-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div
                      className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_hasValue__XxSTH FieldWrapper_staticLabel__FWv96 Combobox_readOnly__sLWN5"
                      style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
                    >
                      <label htmlFor="booking-time" className="FieldWrapper_label__HOD_S" style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px', display: 'block', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        Pickup time
                      </label>
                      <div className="FieldWrapper_inputContainer__qXY8R" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.35)', paddingBottom: '4px' }}>
                        <input
                          id="booking-time"
                          className="Input_input__IHYPL Input_dark__U_gXZ"
                          value={time}
                          readOnly
                          style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '14px', width: '100%', outline: 'none', textOverflow: 'ellipsis', padding: '2px 0', cursor: 'pointer' }}
                        />
                        <span className="FieldWrapper_endAdornment__Dcnms">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down" style={{ transform: showTimeDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'rgba(255,255,255,0.7)' }}>
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="mobile-field-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Time Selection Dropdown */}
              {showTimeDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    width: '260px',
                    maxHeight: '320px',
                    overflowY: 'auto',
                    background: '#0a0f1d',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    borderRadius: '16px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 25px rgba(56, 189, 248, 0.2)',
                    zIndex: 99999,
                    padding: '8px 0',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  <div style={{ padding: '8px 16px 6px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Select Pickup Time
                  </div>
                  {TIME_SLOTS.map((slot, idx) => {
                    const isSelected = slot === time;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setTime(slot);
                          setShowTimeDropdown(false);
                        }}
                        style={{
                          padding: '10px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                          color: isSelected ? '#38BDF8' : '#ffffff',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '13px',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>{slot}</span>
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <hr aria-orientation="vertical" aria-hidden="true" className="Divider_divider__NDhMz Divider_orientation-vertical__AaiZj Divider_type-inverse__RxhXg BookingWidget_divider__cecmo" style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)', border: 'none', margin: '0 16px' }} />

          {/* Action Button */}
          <div className="BookingWidget_actionSection__r7HOH" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => {
                const queryParams = new URLSearchParams({
                  pickup: pickup || 'Melbourne Airport (MEL – Tullamarine)',
                  dropoff: dropoff || 'St Albans Market, Main Rd East VIC',
                  date: date || 'Today',
                  time: time || '1:15 PM',
                  type: tripType,
                });
                router.push(`/quote?${queryParams.toString()}`);
              }}
              className="BaseButton_baseButton__RgDvP BaseButton_size-large___KryX StandardButton_standard-button__uILct StandardButton_variant-filled__ZEiIH BookingWidget_searchButton__0z5yQ"
              data-cy="search-button"
              style={{
                background: 'linear-gradient(135deg, #38BDF8 0%, #0F63BD 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14.5px',
                letterSpacing: '0.3px',
                padding: '14px 28px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              View options
            </button>
          </div>
        </div>
      </div>

      {/* Options Summary & Fleet Modal */}
      {showOptionsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 12, 20, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 12px',
            overflowY: 'auto',
          }}
          onClick={() => setShowOptionsModal(false)}
        >
          <div
            style={{
              background: '#0d1220',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '94vh',
              overflowY: 'auto',
              padding: '24px 20px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <Image
                  src="/assets/bookcabs%20logo.png"
                  alt="Bookcabs Chauffeured Cars Australia"
                  width={120}
                  height={42}
                  style={{ height: '42px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 3px 14px rgba(56, 189, 248, 0.5))', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#fff', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Available Vehicles
                  </h3>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', display: 'block', marginTop: '2px' }}>
                    Select your preferred car to get a custom quote
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                ✕
              </button>
            </div>

            {/* Journey Summary */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '14px 16px', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#ffffff', wordBreak: 'break-word' }}>
                <span style={{ color: '#38BDF8', fontWeight: 700, flexShrink: 0 }}>Pickup:</span>
                <span>{pickup || 'Melbourne Airport (MEL)'}</span>
              </div>
              {tripType === 'transfer' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#ffffff', wordBreak: 'break-word' }}>
                  <span style={{ color: '#38BDF8', fontWeight: 700, flexShrink: 0 }}>Drop-off:</span>
                  <span>{dropoff || 'Crown Towers Melbourne'}</span>
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                <span>📅 {date}</span>
                <span>⏰ {time}</span>
                <span>🔄 {tripType === 'transfer' ? 'One way transfer' : 'By the hour'}</span>
              </div>
            </div>

            {/* Available Vehicle Options (Interactive Selection with studio photography) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {[
                {
                  name: 'First Class Luxury',
                  model: 'Audi A7 / Mercedes-Benz S-Class',
                  pax: '3 Passengers',
                  bags: '2 Luggage',
                  badge: 'VIP Chauffeur',
                  badgeColor: '#38BDF8',
                  image: '/assets/fleet/audi-a7.jpg',
                },
                {
                  name: 'Business Electric',
                  model: 'BMW i7 / Model X',
                  pax: '4 Passengers',
                  bags: '3 Luggage',
                  badge: 'Zero Emission',
                  badgeColor: '#2DD4BF',
                  image: '/assets/fleet/bmw-i7.jpg',
                },
                {
                  name: 'Executive Van',
                  model: 'Mercedes-Benz V-Class',
                  pax: '6-7 Passengers',
                  bags: '6 Luggage',
                  badge: 'Group Luxury',
                  badgeColor: '#60A5FA',
                  image: '/assets/fleet/v-class.jpg',
                },
              ].map((car, idx) => {
                const isSelected = selectedCar === car.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCar(car.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(15, 19, 25, 0.98) 100%)'
                        : 'rgba(15, 19, 25, 0.95)',
                      border: isSelected
                        ? '1.5px solid #38BDF8'
                        : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: isSelected
                        ? '0 6px 20px rgba(56, 189, 248, 0.2)'
                        : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          width: '72px',
                          height: '44px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isSelected ? '1.5px solid #38BDF8' : '1px solid rgba(255,255,255,0.12)',
                          background: '#050811',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                        }}
                      >
                        <Image
                          src={car.image}
                          alt={car.name}
                          width={72}
                          height={44}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <h4 style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{car.name}</h4>
                          <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '999px', background: `${car.badgeColor}20`, color: car.badgeColor, border: `1px solid ${car.badgeColor}40`, whiteSpace: 'nowrap' }}>
                            {car.badge}
                          </span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11.5px', margin: '2px 0 0', lineHeight: 1.25, wordBreak: 'break-word' }}>{car.model} • {car.pax} • {car.bags}</p>
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: isSelected ? '#080c14' : '#38BDF8',
                          background: isSelected ? '#38BDF8' : 'rgba(56, 189, 248, 0.1)',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          border: isSelected ? '1px solid #38BDF8' : '1px solid rgba(56, 189, 248, 0.3)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isSelected ? '✓ Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Quote Buttons: WhatsApp & Email (Dynamic with selected car) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '12px' }}>
              {/* WhatsApp Quote Button */}
              <a
                href={`https://wa.me/61417833137?text=${encodeURIComponent(`Hello Bookcabs Aus, I would like to get a quote for a luxury chauffeur ride:\n• Selected Vehicle: ${selectedCar}\n• Pickup: ${pickup || 'Melbourne Airport (MEL)'}\n• Drop-off: ${tripType === 'transfer' ? (dropoff || 'Melbourne CBD') : 'By the hour'}\n• Date: ${date}\n• Time: ${time}\n• Service: ${tripType === 'transfer' ? 'One way transfer' : 'Hourly charter'}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
                  transition: 'transform 0.15s ease',
                  textAlign: 'center',
                }}
              >
                {/* Crisp Clean WhatsApp Vector Icon */}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.408A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.846 14.28c-.203.571-1.18.995-1.625 1.059-.444.064-.984.089-2.73-.59-2.23-.865-3.667-3.13-3.778-3.278-.11-.148-.905-1.203-.905-2.296 0-1.092.571-1.628.775-1.85.203-.222.443-.277.592-.277.148 0 .296.002.425.008.136.006.319-.052.499.38.185.443.628 1.533.684 1.644.055.111.092.24.018.388-.074.148-.111.24-.222.37-.11.129-.232.29-.332.389-.111.111-.227.23-.098.452.129.222.574.947 1.23 1.533.844.753 1.556.986 1.778 1.097.222.111.351.092.48-.056.129-.148.554-.646.702-.868.148-.222.296-.185.499-.111.203.074 1.294.61 1.516.721.222.111.37.166.425.259.055.092.055.536-.148 1.107z" />
                </svg>
                <span>GET QUOTE ON WHATSAPP</span>
              </a>

              {/* Email Quote Button */}
              <a
                href={`mailto:Contact@bookcabs.com.au?subject=${encodeURIComponent(`Luxury Chauffeur Quote Request (${selectedCar}) - bookcabs aus`)}&body=${encodeURIComponent(`Hello Bookcabs Aus,\n\nI would like to request a quote for chauffeur transportation:\n\n• Selected Vehicle: ${selectedCar}\n• Pickup Location: ${pickup || 'Melbourne Airport (MEL)'}\n• Drop-off Location: ${tripType === 'transfer' ? (dropoff || 'Melbourne CBD') : 'By the hour'}\n• Date: ${date}\n• Time: ${time}\n• Transfer Type: ${tripType === 'transfer' ? 'One way transfer' : 'By the hour'}\n\nPlease provide available fleet rates for ${selectedCar}.\n\nThank you.`)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #0F63BD 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.3)',
                  transition: 'transform 0.15s ease',
                  textAlign: 'center',
                }}
              >
                {/* Email SVG Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>GET QUOTE ON EMAIL</span>
              </a>
            </div>

            {/* Direct Call & Close Row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="tel:+61417833137"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '12px',
                  textDecoration: 'none',
                }}
              >
                📞 CALL DIRECT: +61 417 833 137
              </a>
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                style={{
                  padding: '11px 20px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
