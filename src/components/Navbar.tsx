import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Search, Shield, Menu, X, ShieldCheck, Globe } from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const settings = settingsService.getProgramSettings();
  const { language, setLanguage, isUrdu, isEnglish, isDual, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
        {/* Brand / Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={18} strokeWidth={2.4} />
          </div>
          <div>
            <div
              style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: 'var(--navy-900)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
              }}
            >
              {isUrdu ? 'احساس قومی ریلیف پورٹل' : isDual ? 'احساس ریلیف (Ehsaas Relief)' : (settings.logoText || 'احساس ریلیف پورٹل')}
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                color: 'var(--navy-500)',
                fontWeight: 600,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {isUrdu ? 'حکومتِ پاکستان پبلک امداد 2026' : 'Govt Public Relief Scheme 2026'}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link
            to="/"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/') ? 'var(--primary-700)' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/') ? 'var(--primary-50)' : 'transparent',
            }}
          >
            {isUrdu ? 'ہوم' : 'Home'}
          </Link>

          <Link
            to="/apply"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/apply') ? 'var(--primary-700)' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/apply') ? 'var(--primary-50)' : 'transparent',
            }}
          >
            {isUrdu ? '10 ہزار گرانٹ' : isDual ? 'Rs. 10k Grant' : 'Grant (10k)'}
          </Link>

          <Link
            to="/apply-data"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/apply-data') ? '#0284c7' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/apply-data') ? '#e0f2fe' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '0.625rem', padding: '0.05rem 0.3rem', borderRadius: '3px', fontWeight: 800 }}>50GB</span>
            <span>{isUrdu ? 'مفت ڈیٹا' : 'Free Data'}</span>
          </Link>

          <Link
            to="/guidelines"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/guidelines') ? 'var(--primary-700)' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/guidelines') ? 'var(--primary-50)' : 'transparent',
            }}
          >
            {isUrdu ? 'رہنمائی' : 'Guides'}
          </Link>

          <Link
            to="/faq"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/faq') ? 'var(--primary-700)' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/faq') ? 'var(--primary-50)' : 'transparent',
            }}
          >
            {isUrdu ? 'سوالات' : 'FAQ'}
          </Link>

          <Link
            to="/application-status"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: isActive('/application-status') ? 'var(--primary-700)' : 'var(--navy-600)',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              backgroundColor: isActive('/application-status') ? 'var(--primary-50)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Search size={13} />
            <span>{isUrdu ? 'اسٹیٹس' : 'Track'}</span>
          </Link>

          {/* Compact Clean Language Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--navy-100)',
              padding: '0.12rem',
              borderRadius: '6px',
              border: '1px solid var(--navy-200)',
              gap: '0.1rem',
              marginLeft: '0.25rem',
            }}
          >
            <button
              type="button"
              onClick={() => setLanguage('ur')}
              title="Urdu"
              style={{
                background: language === 'ur' ? '#059669' : 'transparent',
                color: language === 'ur' ? '#ffffff' : 'var(--navy-700)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.18rem 0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              اردو
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              title="English"
              style={{
                background: language === 'en' ? 'var(--primary-800)' : 'transparent',
                color: language === 'en' ? '#ffffff' : 'var(--navy-700)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.18rem 0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('dual')}
              title="Both Languages"
              style={{
                background: language === 'dual' ? '#0284c7' : 'transparent',
                color: language === 'dual' ? '#ffffff' : 'var(--navy-700)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.18rem 0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Both
            </button>
          </div>
        </nav>

        {/* Mobile Header Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="nav-menu-mobile-btn">
          {/* Quick Language Toggle on Mobile */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'ur' ? 'en' : language === 'en' ? 'dual' : 'ur')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-800)',
              border: '1px solid var(--primary-200)',
              borderRadius: 'var(--radius-full)',
              padding: '0.25rem 0.5rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Globe size={12} />
            <span>{language === 'ur' ? 'اردو' : language === 'en' ? 'EN' : 'دونوں'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ padding: '0.35rem' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Mobile Language Selector */}
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--navy-50)', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-700)', marginBottom: '0.4rem' }}>
              Select Language (زبان کا انتخاب کریں):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => { setLanguage('ur'); setMobileMenuOpen(false); }}
                style={{
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: language === 'ur' ? '2px solid #059669' : '1px solid var(--navy-200)',
                  backgroundColor: language === 'ur' ? '#ecfdf5' : '#ffffff',
                  color: language === 'ur' ? '#065f46' : 'var(--navy-800)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                اردو
              </button>
              <button
                type="button"
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                style={{
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: language === 'en' ? '2px solid var(--primary-700)' : '1px solid var(--navy-200)',
                  backgroundColor: language === 'en' ? 'var(--primary-50)' : '#ffffff',
                  color: language === 'en' ? 'var(--primary-900)' : 'var(--navy-800)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => { setLanguage('dual'); setMobileMenuOpen(false); }}
                style={{
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: language === 'dual' ? '2px solid #0284c7' : '1px solid var(--navy-200)',
                  backgroundColor: language === 'dual' ? '#e0f2fe' : '#ffffff',
                  color: language === 'dual' ? '#0369a1' : 'var(--navy-800)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                دونوں (Both)
              </button>
            </div>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            {isUrdu ? 'ہوم پیج' : isDual ? 'Home (ہوم پیج)' : 'Home'}
          </Link>
          <Link
            to="/apply"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ justifyContent: 'flex-start' }}
          >
            <FileText size={18} />
            <span>{isUrdu ? '10,000 روپے کیش گرانٹ فارم' : isDual ? 'Apply for Rs. 10,000 (10 ہزار گرانٹ)' : 'Apply for Rs. 10,000 Grant'}</span>
          </Link>
          <Link
            to="/apply-data"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', border: '1px solid #0284c7', color: '#0284c7' }}
          >
            <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 800 }}>50GB</span>
            <span>{isUrdu ? 'مفت 50GB موبائل ڈیٹا فارم' : isDual ? 'Free 50GB Mobile Data (مفت انٹرنیٹ ڈیٹا)' : 'Free 50GB Mobile Data'}</span>
          </Link>
          <Link
            to="/application-status"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <Search size={18} />
            <span>{isUrdu ? 'درخواست کا لائیو اسٹیٹس چیک کریں' : isDual ? 'Track Status (درخواست کی تصدیق)' : 'Track Application Status'}</span>
          </Link>
          <Link
            to="/guidelines"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <span>{isUrdu ? 'اہلیت کے معیارات و قواعد (Guidelines)' : 'Eligibility Guidelines'}</span>
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <span>{isUrdu ? 'اکثر پوچھے گئے سوالات (FAQ)' : 'Frequently Asked Questions'}</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <span>{isUrdu ? 'ہمارے بارے میں (About Us)' : 'About Us & Mission'}</span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <span>{isUrdu ? 'رابطہ و ہیلپ ڈیسک (Contact)' : 'Contact Support'}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
