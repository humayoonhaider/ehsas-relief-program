import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Globe, MessageSquare, Lock, HelpCircle } from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { ShareButton } from './ShareButton';

export const Footer: React.FC = () => {
  const settings = settingsService.getProgramSettings();
  const { isUrdu, isDual } = useLanguage();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b',
        paddingTop: '2rem',
        paddingBottom: '1.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Column 1: Organization & Program */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary-600)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>
                {isUrdu ? 'احساس قومی ریلیف پورٹل' : isDual ? 'احساس ریلیف پورٹل (Ehsaas Relief)' : (settings.orgName || 'احساس ریلیف پورٹل')}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem' }}>
              {isUrdu
                ? 'حکومتِ پاکستان کے تعاون سے مستحق شہریوں کو 10,000 روپے کیش اور 50GB مفت انٹرنیٹ ڈیٹا فراہم کرنے کا باضابطہ ڈیجیٹل پورٹل۔'
                : 'Official digital relief portal distributing direct financial grants and 4G internet quotas across Pakistan.'}
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              {isUrdu ? 'قومی پبلک ویلفیئر و احساس ایمرجنسی اسکیم 2026' : 'National Ehsaas Public Welfare & Emergency Grant 2026'}
            </div>
          </div>

          {/* Column 2: Portals & Applications */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', marginBottom: '0.85rem', fontWeight: 700 }}>
              {isUrdu ? 'پورٹلز و فارمز' : isDual ? 'Citizen Portals (اہم پورٹلز)' : 'Citizen Portals'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li>
                <Link to="/" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'ہوم پیج' : 'Public Portal Home'}
                </Link>
              </li>
              <li>
                <Link to="/apply" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? '10,000 روپے گرانٹ فارم' : 'Apply for Rs. 10,000 Grant'}
                </Link>
              </li>
              <li>
                <Link to="/apply-data" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'مفت 50GB موبائل ڈیٹا' : 'Free 50GB 4G Mobile Data'}
                </Link>
              </li>
              <li>
                <Link to="/application-status" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'درخواست کا اسٹیٹس چیک کریں' : 'Track Application Status'}
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: '#94a3b8' }}>
                  {isUrdu ? 'ایڈمن کنٹرول پینل' : 'Administrator Access'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & Guides (Crucial for AdSense) */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', marginBottom: '0.85rem', fontWeight: 700 }}>
              {isUrdu ? 'معلومات و رہنمائی' : isDual ? 'Information & Help (رہنمائی)' : 'Information & Support'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li>
                <Link to="/about" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'ہمارے بارے میں (About Us)' : 'About Us & Mission'}
                </Link>
              </li>
              <li>
                <Link to="/guidelines" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'اہلیت کے معیارات و قواعد' : 'Eligibility & Application Guidelines'}
                </Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'اکثر پوچھے گئے سوالات (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'شہری رابطہ و ہیلپ ڈیسک' : 'Citizen Contact & Grievance Desk'}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" style={{ color: '#cbd5e1' }}>
                  {isUrdu ? 'قانونی ڈس کلیمر و سیکیورٹی' : 'Official Legal Disclaimer'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Outreach */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', marginBottom: '0.85rem', fontWeight: 700 }}>
              {isUrdu ? 'ہیلپ لائن اور رابطہ' : isDual ? 'Citizen Helpline (رابطہ)' : 'Helpline & Assistance'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                <Phone size={15} color="#34d399" />
                <span>0800-24624 (Toll-Free)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                <Mail size={15} color="#38bdf8" />
                <span>support@ehsasreliefprogram.vercel.app</span>
              </div>
            </div>
            <ShareButton placement="general" variant="compact" showHelperText={false} />
          </div>
        </div>

        {/* Bottom Bar with direct links to AdSense compliance pages */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#64748b',
          }}
        >
          <div>
            {isUrdu
              ? '© 2026 حکومتِ پاکستان احساس پبلک ریلیف و ویلفیئر پورٹل۔ تمام حقوق محفوظ ہیں۔'
              : '© 2026 Ehsaas Qaumi Relief & Digital Empowerment Portal. All Rights Reserved.'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
            </Link>
            <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              {isUrdu ? 'قواعد و ضوابط' : 'Terms of Service'}
            </Link>
            <Link to="/disclaimer" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              {isUrdu ? 'ڈس کلیمر' : 'Disclaimer'}
            </Link>
            <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              {isUrdu ? 'رابطہ' : 'Contact'}
            </Link>
            <span>•</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>
              {isUrdu ? '100% مفت سروس' : '100% Zero Fee'}
            </span>
          </div>
        </div>
      </div>

      {/* Privacy Notice Modal */}
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title={isUrdu ? 'پرائیویسی اور ڈیٹا تحفظ کی معلومات' : 'Privacy & Data Protection Notice'}
        footer={
          <Button variant="secondary" onClick={() => setPrivacyModalOpen(false)}>
            {isUrdu ? 'بند کریں' : 'Close'}
          </Button>
        }
      >
        <div style={{ fontSize: '0.9375rem', color: 'var(--navy-800)', lineHeight: '1.6' }}>
          <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
            <Lock size={20} className="alert-icon" />
            <div className="alert-content">
              <strong>Applicant Data Confidentiality (ڈیٹا کا تحفظ)</strong>
              <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                آپ کا ڈیٹا مکمل طور پر محفوظ ہے اور صرف فلاحی اسکیم کی تصدیق کے لیے استعمال کیا جاتا ہے۔
              </p>
            </div>
          </div>
          <p style={{ marginBottom: '0.75rem' }}>
            درخواست گزار کا قومی شناختی کارڈ اور موبائل نمبر صرف متعلقہ گرانٹ یا مفت 50GB ڈیٹا ایکٹیویشن کے لیے استعمال ہوتا ہے۔
          </p>
        </div>
      </Modal>

      {/* Program Terms Modal */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title={isUrdu ? 'پروگرام کے قواعد و شرائط' : 'Program Participation Terms'}
        footer={
          <Button variant="secondary" onClick={() => setTermsModalOpen(false)}>
            {isUrdu ? 'میں متفق ہوں' : 'I Understand'}
          </Button>
        }
      >
        <div style={{ fontSize: '0.9375rem', color: 'var(--navy-800)', lineHeight: '1.6' }}>
          <div className="alert alert-warning" style={{ margin: '1rem 0' }}>
            <HelpCircle size={20} className="alert-icon" />
            <div className="alert-content">
              <strong>Zero-Fee Policy Notice (کوئی فیس نہیں)</strong>
              <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                یہ اسکیم 100% مفت ہے۔ کسی بھی شخص یا ایجنٹ کو کوئی فیس ادا نہ کریں۔
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </footer>
  );
};
