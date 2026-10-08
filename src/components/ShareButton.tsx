import React, { useState } from 'react';
import { MessageSquare, Share2, Check, Copy } from 'lucide-react';
import { whatsappService } from '../services/whatsappService';
import { Button } from './Button';

interface ShareButtonProps {
  placement: 'landing_hero' | 'submission_success' | 'status_page' | 'admin_preview' | 'general';
  applicationId?: string;
  customMessage?: string;
  targetUrl?: string;
  variant?: 'prominent' | 'compact' | 'outline' | 'banner';
  buttonText?: string;
  className?: string;
  showHelperText?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  placement,
  applicationId,
  customMessage,
  targetUrl,
  variant = 'prominent',
  buttonText,
  className = '',
  showHelperText = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [justShared, setJustShared] = useState(false);
  const waSettings = whatsappService.getSettings();

  if (!waSettings.enabled) {
    return null;
  }

  const label = buttonText || waSettings.buttonText || 'Share on WhatsApp';

  const handleWhatsAppClick = () => {
    whatsappService.executeShare({
      placement,
      applicationId,
      customMessage,
      targetUrl: targetUrl || `${window.location.origin}/apply`,
    });
    setJustShared(true);
    setTimeout(() => setJustShared(false), 5000);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const formattedMsg = whatsappService.formatShareMessage(
      customMessage || waSettings.shareMessageTemplate,
      { applicationId, url: targetUrl || `${window.location.origin}/apply` }
    );
    navigator.clipboard.writeText(formattedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (variant === 'banner') {
    return (
      <div className="whatsapp-outreach-card">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(37, 211, 102, 0.2)',
                color: '#25D366',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <MessageSquare size={14} /> Community Outreach
            </span>
          </div>

          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Share This Program on WhatsApp
          </h3>

          <p style={{ color: '#d1fae5', fontSize: '0.9375rem', maxWidth: '580px', marginBottom: '1.25rem' }}>
            {waSettings.descriptionText ||
              'Help friends, neighbors, and community members learn about this grant opportunity directly on WhatsApp.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <Button
              variant="whatsapp"
              onClick={handleWhatsAppClick}
              icon={<MessageSquare size={16} />}
            >
              {label}
            </Button>

            <Button
              variant="secondary"
              onClick={handleCopyLink}
              icon={copied ? <Check size={16} color="var(--primary-600)" /> : <Copy size={16} />}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            >
              {copied ? 'Message Copied!' : 'Copy Share Text'}
            </Button>
          </div>

          {showHelperText && (
            <div style={{ marginTop: '0.85rem', fontSize: '0.75rem', color: '#a7f3d0' }}>
              ✓ Direct WhatsApp intent link • Free & instant • No app permissions required
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="whatsapp"
        size="sm"
        onClick={handleWhatsAppClick}
        icon={<MessageSquare size={16} />}
        className={className}
      >
        {label}
      </Button>
    );
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.35rem' }}>
      <Button
        variant="whatsapp"
        size={variant === 'prominent' ? 'lg' : 'md'}
        onClick={handleWhatsAppClick}
        icon={<MessageSquare size={18} />}
        className={className}
      >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3469572139071472"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3469572139071472"
     data-ad-slot="8531903117"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
        {label}
      </Button>

      {showHelperText && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Opens WhatsApp with pre-filled message
        </span>
      )}

      {justShared && (
        <span style={{ fontSize: '0.75rem', color: 'var(--primary-700)', fontWeight: 600, textAlign: 'center' }}>
          ✓ WhatsApp share initiated
        </span>
      )}
    </div>
  );
};
