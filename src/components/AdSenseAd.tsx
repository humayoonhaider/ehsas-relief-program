import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSenseAd: React.FC<{
  slot: string;
  layout?: string;
  format?: string;
  style?: React.CSSProperties;
}> = ({ slot, layout = 'in-article', format = 'fluid', style = { display: 'block', textAlign: 'center' } }) => {
  
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-layout={layout}
      data-ad-format={format}
      data-ad-client="ca-pub-3469572139071472"
      data-ad-slot={slot}
    />
  );
};
