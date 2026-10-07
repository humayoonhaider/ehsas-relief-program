import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, RotateCcw, ShieldCheck, Globe, Mail, Phone } from 'lucide-react';
import { ProgramSettings } from '../types';
import { settingsService } from '../services/settingsService';
import { authService } from '../services/authService';
import { DEFAULT_PROGRAM_SETTINGS } from '../utils/constants';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const ProgramSettingsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [settings, setSettings] = useState<ProgramSettings>(settingsService.getProgramSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  useEffect(() => {
    setSettings(settingsService.getProgramSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    settingsService.updateProgramSettings(settings, currentUser.email, currentUser.name);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    if (!currentUser) return;
    settingsService.updateProgramSettings(DEFAULT_PROGRAM_SETTINGS, currentUser.email, currentUser.name);
    setSettings(DEFAULT_PROGRAM_SETTINGS);
    setResetConfirmOpen(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

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
          <span>Program settings saved and updated across the portal!</span>
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
            Program & Branding Settings
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure organization branding, titles, instructions, contact details, and compliance terms.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => setResetConfirmOpen(true)} icon={<RotateCcw size={16} />}>
          Restore Defaults
        </Button>
      </div>

      <form onSubmit={handleSave}>
        {/* Section 1: Organization & Identity */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
            1. Organization & Program Identity
          </h3>

          <div className="form-grid-2">
            <Input
              label="Organization Name"
              value={settings.orgName}
              onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
              required
            />

            <Input
              label="Logo Display Text"
              value={settings.logoText}
              onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
              required
            />
          </div>

          <Input
            label="Grant / Program Title"
            value={settings.programName}
            onChange={(e) => setSettings({ ...settings, programName: e.target.value })}
            required
          />

          <Textarea
            rows={3}
            label="Program Short Summary"
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            required
          />

          <div className="form-grid-2">
            <Input
              label="Primary CTA Button Label"
              value={settings.primaryCtaText}
              onChange={(e) => setSettings({ ...settings, primaryCtaText: e.target.value })}
              required
            />

            <Input
              label="Footer Tagline / Attribution"
              value={settings.footerText}
              onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
            2. Citizen Help Desk Contact
          </h3>

          <div className="form-grid-3">
            <Input
              type="email"
              label="Support Email Address"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              required
            />

            <Input
              label="Helpline Phone Number"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              required
            />

            <Input
              label="Official Website URL"
              value={settings.website}
              onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Section 3: Legal, Instructions, & Compliance */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
            3. Guidelines & Legal Notices
          </h3>

          <Textarea
            rows={4}
            label="Application Instructions & Rules (Shown on Landing Page)"
            value={settings.instructions}
            onChange={(e) => setSettings({ ...settings, instructions: e.target.value })}
            required
          />

          <Textarea
            rows={3}
            label="Privacy Notice Statement"
            value={settings.privacyNotice}
            onChange={(e) => setSettings({ ...settings, privacyNotice: e.target.value })}
            required
          />

          <Textarea
            rows={3}
            label="Program Terms & Applicant Truth Declaration Statement"
            value={settings.termsText}
            onChange={(e) => setSettings({ ...settings, termsText: e.target.value })}
            required
          />
        </div>

        {/* Section 4: Google AdSense & Publisher Monetization */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', border: '1.5px solid #059669' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', margin: '0 0 0.25rem 0' }}>
                4. Google AdSense & Publisher Settings
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Configure your verified Google AdSense Publisher Client ID and slot codes for live ad delivery.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-800)' }}>
                <input
                  type="checkbox"
                  checked={settings.adsenseEnabled ?? true}
                  onChange={(e) => setSettings({ ...settings, adsenseEnabled: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#059669' }}
                />
                <span>Enable Google AdSense</span>
              </label>
            </div>
          </div>

          <div className="alert alert-info" style={{ marginBottom: '1.25rem', fontSize: '0.825rem' }}>
            <div>
              <strong>AdSense Approval Checklist:</strong> Your site includes all required pages:{' '}
              <code>/privacy-policy</code>, <code>/terms</code>, <code>/about</code>, <code>/contact</code>, <code>/guidelines</code>, <code>/faq</code>, and <code>/disclaimer</code>.
              Your <code>/ads.txt</code> is pre-configured in <code>/public/ads.txt</code>.
            </div>
          </div>

          <div className="form-grid-3">
            <Input
              label="AdSense Publisher Client ID"
              value={settings.adsenseClientId || ''}
              onChange={(e) => setSettings({ ...settings, adsenseClientId: e.target.value })}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              hint="Found in your Google AdSense account (e.g. ca-pub-1234567890123456)"
            />

            <Input
              label="Header / Leaderboard Slot ID"
              value={settings.adsenseHeaderSlotId || ''}
              onChange={(e) => setSettings({ ...settings, adsenseHeaderSlotId: e.target.value })}
              placeholder="e.g. 1234567890"
              hint="Ad unit slot ID created in AdSense"
            />

            <Input
              label="In-Article / Content Slot ID"
              value={settings.adsenseInArticleSlotId || ''}
              onChange={(e) => setSettings({ ...settings, adsenseInArticleSlotId: e.target.value })}
              placeholder="e.g. 0987654321"
              hint="Secondary responsive ad unit slot ID"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" size="lg" icon={<Save size={18} />}>
            Save All Program Settings
          </Button>
        </div>
      </form>

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        onConfirm={handleReset}
        title="Reset All Program Settings?"
        message="This will restore all default organization names, contact details, and guidelines."
        confirmText="Reset Settings"
        variant="primary"
      />
    </div>
  );
};
