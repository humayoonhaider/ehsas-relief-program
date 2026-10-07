import React, { useEffect } from 'react';
import { settingsService } from '../services/settingsService';
import { useLanguage } from '../context/LanguageContext';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'in-article';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}) => {
  const { isUrdu } = useLanguage();
  const programSettings = settingsService.getProgramSettings();
  const adsenseClientId = (programSettings as any).adsenseClientId || 'ca-pub-0000000000000000';
  const isAdSenseEnabled = (programSettings as any).adsenseEnabled ?? true;

  useEffect(() => {
    if (isAdSenseEnabled && adsenseClientId && !adsenseClientId.includes('00000000')) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore duplicate push errors
      }
    }
  }, [isAdSenseEnabled, adsenseClientId, slotId]);

  if (!isAdSenseEnabled) {
    return null;
  }

  const isLiveClient = adsenseClientId && !adsenseClientId.includes('00000000');

  return (
    <div
      className={`adsense-container ${className}`}
      style={{
        margin: '1.25rem auto',
        maxWidth: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Required Google AdSense Policy Label */}
      <div
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--navy-400)',
          marginBottom: '0.35rem',
          fontWeight: 700,
        }}
      >
        {isUrdu ? 'اشتہار • ADVERTISEMENT' : 'ADVERTISEMENT'}
      </div>

      {isLiveClient ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: format === 'horizontal' ? '90px' : '250px' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slotId || '1234567890'}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      ) : (
        /* AdSense Compliant Placeholder Container */
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px dashed var(--navy-300)',
            borderRadius: '8px',
            padding: format === 'horizontal' ? '0.85rem' : '1.5rem',
            minHeight: format === 'horizontal' ? '80px' : '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            color: 'var(--navy-500)',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-700)' }}>
            Google AdSense Ad Space ({format === 'horizontal' ? 'Responsive Leaderboard' : 'Display Unit'})
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--navy-400)', maxWidth: '360px' }}>
            {isUrdu
              ? 'ایڈمن سیٹنگز میں اپنا AdSense Publisher ID درج کریں تاکہ لائیو اشتہارات فعال ہو سکیں۔'
              : 'Add your AdSense Publisher ID (ca-pub-XXXXXXXX) in Admin Settings to activate live ads.'}
          </div>
        </div>
      )}
    </div>
  );
};
