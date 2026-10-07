import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Save,
  CheckCircle,
  ExternalLink,
  PhoneCall,
  RotateCcw,
  Sparkles,
  Smartphone,
  Users,
  Award,
} from 'lucide-react';
import { WhatsAppSettings } from '../types';
import { settingsService } from '../services/settingsService';
import { whatsappService } from '../services/whatsappService';
import { authService } from '../services/authService';
import { DEFAULT_WHATSAPP_SETTINGS } from '../utils/constants';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Checkbox } from '../components/Checkbox';

export const WhatsAppSettingsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [settings, setSettings] = useState<WhatsAppSettings>(settingsService.getWhatsAppSettings());
  const [previewMode, setPreviewMode] = useState<'contacts' | 'group'>('contacts');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(settingsService.getWhatsAppSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    settingsService.updateWhatsAppSettings(settings, currentUser.email, currentUser.name);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    if (!currentUser) return;
    settingsService.updateWhatsAppSettings(DEFAULT_WHATSAPP_SETTINGS, currentUser.email, currentUser.name);
    setSettings(DEFAULT_WHATSAPP_SETTINGS);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  // Generate live interpolated message preview
  const activeTemplate =
    previewMode === 'group'
      ? settings.groupShareMessageTemplate ||
        '📢 Urgent: Direct {GRANT_AMOUNT} Grant Support from {ORG_NAME}. Apply online now: {URL}'
      : settings.shareMessageTemplate;

  const livePreviewMessage = whatsappService.formatShareMessage(activeTemplate, {
    url: settings.campaignUrl || window.location.origin,
    applicationId: 'APP-2026-000101',
  });

  const testShareUrl = whatsappService.generateShareUrl(livePreviewMessage);

  return (
    <div>
      {/* Save Success Alert */}
      {savedSuccess && (
        <div
          className="alert alert-success"
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 100,
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <CheckCircle size={18} />
          <span>WhatsApp outreach configurations saved!</span>
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            WhatsApp Outreach & Message Settings
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure WhatsApp messages, grant amounts (e.g. Rs. 10,000), share targets, and test preview live.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw size={16} />}>
          Restore Defaults
        </Button>
      </div>

      <div className="case-grid">
        {/* Left Form: Settings Controls */}
        <form onSubmit={handleSave}>
          <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
              Grant & WhatsApp Message Configuration
            </h3>

            {/* Enable/Disable switch */}
            <div
              style={{
                backgroundColor: 'var(--navy-50)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border)',
              }}
            >
              <Checkbox
                id="wa-enable-chk"
                label={
                  <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>
                    Enable WhatsApp Community Share & 100% Meter Requirement
                  </span>
                }
                checked={settings.enabled}
                onChange={(val) => setSettings({ ...settings, enabled: val })}
                hint="Enforces 10 Contacts + 1 Group share meter verification before application submission."
              />
            </div>

            <div className="form-grid-2">
              <Input
                label="Grant Amount Display (e.g. Rs. 10,000)"
                value={settings.grantAmountText || 'Rs. 10,000'}
                onChange={(e) => setSettings({ ...settings, grantAmountText: e.target.value })}
                hint="Injected into messages wherever {GRANT_AMOUNT} is used"
                required
              />

              <Input
                label="Public Campaign / Portal URL"
                value={settings.campaignUrl}
                onChange={(e) => setSettings({ ...settings, campaignUrl: e.target.value })}
                hint="Injected into messages wherever {URL} is used"
                required
              />
            </div>

            <div className="form-grid-2">
              <Input
                type="number"
                min="1"
                max="50"
                label="Target Contacts Count (to reach 90%)"
                value={settings.targetContactsCount || 10}
                onChange={(e) => setSettings({ ...settings, targetContactsCount: parseInt(e.target.value) || 10 })}
                required
              />

              <Input
                type="number"
                min="1"
                max="10"
                label="Target Groups Count (to reach 100%)"
                value={settings.targetGroupsCount || 1}
                onChange={(e) => setSettings({ ...settings, targetGroupsCount: parseInt(e.target.value) || 1 })}
                required
              />
            </div>

            {/* Task 1 Message Template */}
            <Textarea
              rows={4}
              label="1. Friends / Contacts WhatsApp Message Template"
              value={settings.shareMessageTemplate}
              onChange={(e) => setSettings({ ...settings, shareMessageTemplate: e.target.value })}
              hint="Sent when user shares with 10 friends. Tokens: {GRANT_AMOUNT}, {PROGRAM_NAME}, {ORG_NAME}, {URL}"
              required
            />

            {/* Task 2 Group Message Template */}
            <Textarea
              rows={3}
              label="2. Group WhatsApp Message Template"
              value={
                settings.groupShareMessageTemplate ||
                '📢 Urgent Notification: Direct {GRANT_AMOUNT} Grant Support from {ORG_NAME}. Apply online now with your CNIC and account details: {URL}'
              }
              onChange={(e) => setSettings({ ...settings, groupShareMessageTemplate: e.target.value })}
              hint="Sent when user shares in WhatsApp groups."
              required
            />

            {/* Dynamic Tokens Cheat Sheet */}
            <div
              style={{
                backgroundColor: 'var(--surface-subtle)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
                fontSize: '0.75rem',
                color: 'var(--navy-700)',
              }}
            >
              <strong>Available Placeholders:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                <code>{'{GRANT_AMOUNT}'}</code>
                <code>{'{PROGRAM_NAME}'}</code>
                <code>{'{ORG_NAME}'}</code>
                <code>{'{URL}'}</code>
                <code>{'{APP_ID}'}</code>
              </div>
            </div>

            <Input
              label="Citizen Helpline WhatsApp Number (Optional)"
              placeholder="e.g. +92 300 1234567"
              value={settings.helplineNumber}
              onChange={(e) => setSettings({ ...settings, helplineNumber: e.target.value })}
              hint="Direct support line for applicant inquiries"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <Button type="submit" variant="primary" size="lg" icon={<Save size={18} />}>
                Save WhatsApp Settings
              </Button>
            </div>
          </div>
        </form>

        {/* Right Column: Live Phone Mockup Simulator */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={20} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  Live Message Preview
                </h3>
              </div>

              {/* Toggle Contacts vs Group Preview */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => setPreviewMode('contacts')}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid var(--border)',
                    backgroundColor: previewMode === 'contacts' ? 'var(--primary-700)' : 'var(--surface)',
                    color: previewMode === 'contacts' ? '#ffffff' : 'var(--navy-700)',
                    cursor: 'pointer',
                  }}
                >
                  Contacts
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('group')}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid var(--border)',
                    backgroundColor: previewMode === 'group' ? 'var(--primary-700)' : 'var(--surface)',
                    color: previewMode === 'group' ? '#ffffff' : 'var(--navy-700)',
                    cursor: 'pointer',
                  }}
                >
                  Group
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Showing live simulation for <strong>{previewMode === 'group' ? 'Group Share Message' : '10 Contacts Share Message'}</strong>.
            </p>

            {/* WhatsApp Phone Mockup */}
            <div className="whatsapp-phone-mockup">
              <div className="phone-screen-header">
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#075e54',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  {previewMode === 'group' ? 'GRP' : 'WA'}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>
                    {previewMode === 'group' ? 'Family & Community Group' : 'Friends Contact'}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#a7f3d0' }}>Online</div>
                </div>
              </div>

              <div className="phone-screen-chat">
                <div className="chat-bubble-outgoing">
                  <div style={{ whiteSpace: 'pre-wrap' }}>{livePreviewMessage}</div>
                  <div className="chat-bubble-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                  </div>
                </div>
              </div>
            </div>

            {/* Test Link Button */}
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <a
                href={testShareUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ width: '100%' }}
              >
                <ExternalLink size={15} />
                <span>Test Live Share in WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
