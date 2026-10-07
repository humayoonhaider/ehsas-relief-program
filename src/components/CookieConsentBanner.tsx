import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { isUrdu } = useLanguage();

  useEffect(() => {
    try {
      const consent = localStorage.getItem('citizengrant_cookie_consent_v1');
      if (!consent) {
        // Small delay so page renders smoothly first
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('citizengrant_cookie_consent_v1', 'accepted');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('citizengrant_cookie_consent_v1', 'essential_only');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderTop: '2px solid #059669',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
        zIndex: 9999,
        padding: '0.85rem 1rem',
        animation: 'slideUp 300ms ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: '1 1 320px' }}>
          <div
            style={{
              padding: '0.4rem',
              backgroundColor: 'rgba(5, 150, 105, 0.2)',
              color: '#34d399',
              borderRadius: '8px',
              flexShrink: 0,
            }}
          >
            <Cookie size={18} />
          </div>
          <div style={{ fontSize: '0.78rem', lineHeight: '1.45', color: '#cbd5e1' }}>
            {isUrdu ? (
              <span>
                یہ پورٹل صارف کے تجربے، اینالیٹکس اور گوگل ایڈسینس (Google AdSense) اشتہارات کے لیے کوکیز کا استعمال کرتا ہے۔{' '}
                <Link to="/privacy-policy" style={{ color: '#34d399', textDecoration: 'underline' }}>
                  پرائیویسی پالیسی پڑھیں
                </Link>
              </span>
            ) : (
              <span>
                We use cookies to enhance navigation, analyze site traffic, and serve personalized Google AdSense ads.{' '}
                <Link to="/privacy-policy" style={{ color: '#34d399', textDecoration: 'underline' }}>
                  Read Privacy Policy
                </Link>
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleDecline}
            style={{
              backgroundColor: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {isUrdu ? 'صرف ضروری (Essential)' : 'Essential Only'}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(5, 150, 105, 0.4)',
            }}
          >
            {isUrdu ? 'قبول کریں (Accept All)' : 'Accept All'}
          </button>
        </div>
      </div>
    </div>
  );
};
