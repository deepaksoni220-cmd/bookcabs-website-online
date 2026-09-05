'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English (AU)', flag: '🇦🇺' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'en', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
];

export function Header() {
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState('English (AU)');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Restore language from cookie on mount
  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        const code = match[1];
        const found = LANGUAGES.find((l) => l.code === code);
        if (found) {
          setSelectedLang(found.label);
        }
      }
    } catch {
      // Ignore cookie read error
    }
  }, []);

  const handleLanguageChange = (code: string, label: string) => {
    setSelectedLang(label);
    setLangOpen(false);
    setMobileLangOpen(false);
    setMobileMenuOpen(false);

    try {
      const hostname = window.location.hostname;
      if (code === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
        
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }
        window.location.reload();
      } else {
        const val = `/en/${code}`;
        document.cookie = `googtrans=${val}; path=/;`;
        document.cookie = `googtrans=${val}; path=/; domain=${hostname};`;
        document.cookie = `googtrans=${val}; path=/; domain=.${hostname};`;

        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          select.value = code;
          select.dispatchEvent(new Event('change'));
        } else {
          window.location.reload();
        }
      }
    } catch (e) {
      console.error('Translation error:', e);
    }
  };

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langOpen]);

  if (pathname === '/quote') {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Airport - Melbourne' },
    { href: '/cars-fleet', label: 'Our car fleets' },
    { href: '/about-us', label: 'About us' },
    { href: '/blog', label: 'Blog' },
    { href: '/connect-us', label: 'Connect Us' },
  ];

  return (
    <header
      className="Header_header__DfAB0 Header_colorMode-dark__mOHc7"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(8, 12, 20, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
        transition: 'all 0.3s ease',
      }}
    >
      <Link href="/" aria-label="Go to Homepage" className="Header_logoWrapper__jGiqc" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
        <Image
          src="/assets/bookcabs%20logo.png"
          alt="Bookcabs Chauffeured Cars Australia"
          width={220}
          height={76}
          priority
          className="header-logo-img"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
        <ul className="NavigationMenu_navList__DpxWT NavigationMenu_layout-horizontal__245As" style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN ${isActive ? 'active-demo-btn' : ''}`}
                  style={{
                    borderRadius: '999px',
                    border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
                    background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                    padding: '6px 14px',
                    textDecoration: 'none',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          
          {/* Interactive Language Dropdown */}
          <li ref={dropdownRef} className="NavigationMenuDropdown_dropdown__nfmEJ" style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN NavigationMenuDropdown_dropdownTrigger__Vq_nM"
              aria-expanded={langOpen}
              aria-label="Select Language"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: langOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '999px',
                padding: '6px 12px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{selectedLang}</span>
              <svg
                width="14"
                height="14"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: langOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  color: '#38BDF8',
                }}
              >
                <path d="M6 9L12 15L18 9"></path>
              </svg>
            </button>

            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'rgba(15, 20, 32, 0.98)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '14px',
                  padding: '6px',
                  minWidth: '170px',
                  zIndex: 200,
                  boxShadow: '0 12px 36px rgba(0,0,0,0.7), 0 0 20px rgba(56,189,248,0.15)',
                }}
              >
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.label;
                  return (
                    <button
                      key={lang.label}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code, lang.label)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        color: isSelected ? '#38BDF8' : '#ffffff',
                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger Toggle */}
      <div className="mobile-toggle" style={{ display: 'none' }}>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(11, 14, 20, 0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 150,
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
        }}>
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(56,189,248,0.15)' : 'transparent',
                  color: isActive ? '#38BDF8' : '#ffffff',
                  border: isActive ? '1px solid rgba(56,189,248,0.3)' : '1px solid transparent',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Interactive Mobile Language Section */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setMobileLangOpen(!mobileLangOpen)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#fff',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Language</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontWeight: 700 }}>
                <span>{selectedLang}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: mobileLangOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <path d="M6 9L12 15L18 9"></path>
                </svg>
              </span>
            </button>

            {mobileLangOpen && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '10px' }}>
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.label;
                  return (
                    <button
                      key={lang.label}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code, lang.label)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.04)',
                        border: isSelected ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)',
                        color: isSelected ? '#38BDF8' : '#ffffff',
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

