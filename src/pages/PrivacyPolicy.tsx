import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const PrivacyPolicy: React.FC = () => {
  const { isUrdu } = useLanguage();

  return (
    <div style={{ backgroundColor: 'var(--navy-50)', minHeight: 'calc(100vh - 56px)', padding: '1.5rem 0 3rem' }}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-800)',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <Lock size={12} />
            <span>Official Privacy Compliance (2026 Updated)</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'پرائیویسی پالیسی و رازداری کی شرائط' : 'Privacy Policy & Data Protection'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'شہریوں کے ڈیٹا کے تحفظ، گوگل ایڈسینس کوکیز اور معلومات کے استعمال کا سرکاری بیان'
              : 'Our commitment to protecting your personal information, AdSense cookies disclosure, and digital privacy rights.'}
          </p>
        </div>

        {/* Ad Space Leaderboard */}
        <AdSenseSlot format="horizontal" />

        {/* Content Card */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--navy-500)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <strong>Last Updated:</strong> October 2026 • <strong>Effective Date:</strong> Immediate
          </div>

          {/* Section 1: Introduction */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '1. تعارف و عمومی اصول' : '1. Introduction & Overview'}
            </h2>
            <p>
              {isUrdu
                ? 'احساس قومی ریلیف و پبلک ویلفیئر پورٹل ("ہم"، "ہمارا") شہریوں کے ذاتی ڈیٹا کی رازداری اور تحفظ کو اولین ترجیح دیتا ہے۔ یہ دستاویز وضاحت کرتی ہے کہ جب آپ ہمارے پورٹل، گرانٹ رجسٹریشن فارم اور ڈیٹا ایکٹیویشن خدمات کا استعمال کرتے ہیں تو ہم آپ کی معلومات کیسے جمع، محفوظ اور استعمال کرتے ہیں۔'
                : 'Ehsaas Qaumi Relief Portal ("we", "our", or "us") is dedicated to safeguarding the privacy and personal data of all users. This Privacy Policy outlines our procedures regarding the collection, use, disclosure, and protection of information obtained through our welfare assistance portal, online applications, and related civic outreach tools.'}
            </p>
          </section>

          {/* Section 2: Google AdSense and DoubleClick DART Cookies */}
          <section
            style={{
              marginBottom: '1.5rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={18} />
              {isUrdu ? '2. گوگل ایڈسینس اور ڈی اے آر ٹی (DART) کوکیز پالیسی' : '2. Google AdSense & DoubleClick DART Cookies Disclosure'}
            </h2>
            <p style={{ color: '#064e3b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {isUrdu
                ? 'گوگل ہمارے پورٹل پر ایک فریق ثالث (Third-Party Vendor) کے طور پر اشتہارات فراہم کرتا ہے۔ گوگل کوکیز (Cookies) کا استعمال کر کے صارفین کو ان کے انٹرنیٹ براؤزنگ ریکارڈ کی بنیاد پر متعلقہ اشتہارات دکھاتا ہے۔'
                : 'Google is a third-party vendor on our website. Google utilizes cookies, specifically the DoubleClick DART cookie, to serve tailored advertisements to visitors based upon their browsing history and visits to our website and other websites across the Internet.'}
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.825rem', color: '#065f46' }}>
              <li>
                <strong>Third-Party Ad Networks:</strong> Google and its certified ad partners serve personalized ads to support public hosting and digital services without charging any fee from citizens.
              </li>
              <li>
                <strong>DART Cookie Opt-Out:</strong> Users may opt out of personalized advertising by visiting the official Google Ad and Content Network Privacy Policy at{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#047857', fontWeight: 700, textDecoration: 'underline' }}
                >
                  https://policies.google.com/technologies/ads
                </a>.
              </li>
              <li>
                <strong>Network Advertising Initiative:</strong> You may also opt out of third-party vendor cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#047857', fontWeight: 700, textDecoration: 'underline' }}
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 3: Information We Collect */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '3. معلومات جو ہم جمع کرتے ہیں' : '3. Types of Information Collected'}
            </h2>
            <p>
              {isUrdu
                ? 'ہم صرف وہی معلومات جمع کرتے ہیں جو درخواست کی تصدیق اور براہ راست منتقلی کے لیے ناگزیر ہوتی ہیں:'
                : 'We collect information strictly necessary for grant qualification, SIM data quota allocation, and case evaluation:'}
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--navy-800)' }}>
              <li>
                <strong>Personal Identifiers:</strong> Full Name, Computerized National Identity Card (CNIC) number, and residential city.
              </li>
              <li>
                <strong>Contact Information:</strong> Active mobile telephone number and registered WhatsApp number.
              </li>
              <li>
                <strong>Disbursement Details:</strong> Preferred payment account type (Easypaisa, JazzCash, or Bank Account), title of account, and account/IBAN number.
              </li>
              <li>
                <strong>Automated Log Data:</strong> Browser user-agent, operating system, timestamp of submission, and non-identifying telemetry for anti-fraud validation.
              </li>
            </ul>
          </section>

          {/* Section 4: Use of Information */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '4. معلومات کا استعمال اور مقاصد' : '4. How Your Information Is Used'}
            </h2>
            <p>
              {isUrdu
                ? 'فراہم کردہ تمام کوائف صرف فلاحی امداد اور 50GB ڈیٹا ایکٹیویشن کی جانچ، اینٹی فراڈ تصدیق، اور ریفرنس نمبر کی بنیاد پر اسٹیٹس ٹریکنگ کے لیے استعمال کیے جاتے ہیں۔ ہم کبھی بھی صارفین کا ڈیٹا کسی تجارتی مارکیٹنگ کمپنی کو فروخت نہیں کرتے۔'
                : 'All information provided is utilized solely to evaluate public grant eligibility, disburse verified relief funds, queue telecom data activations, prevent duplicate or fraudulent entries, and allow users to track their case via their unique Reference ID. We never sell, rent, or trade your personal information to third-party commercial marketing entities.'}
            </p>
          </section>

          {/* Section 5: Data Security and Storage */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '5. ڈیٹا سیکیورٹی اور انکرپشن' : '5. Data Security & Encryption Standards'}
            </h2>
            <p>
              {isUrdu
                ? 'صارفین کی تمام ٹرانزیکشنز 256-bit SSL/TLS انکرپشن پروٹوکول کے ذریعے محفوظ کی جاتی ہیں۔ حساس معلومات (جیسے شناختی کارڈ اور اکاؤنٹ نمبرز) کو ماسکڈ (Masked) فارمیٹ میں رکھا جاتا ہے تاکہ غیر مجاز رسائی کو روکا جا سکے۔'
                : 'We implement industry-standard administrative, physical, and electronic security safeguards, including HTTPS SSL/TLS 256-bit data encryption in transit, strict role-based access control, and automated masking of sensitive national identity records.'}
            </p>
          </section>

          {/* Section 6: Children's Privacy */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '6. بچوں کی پرائیویسی (COPPA)' : '6. Children’s Online Privacy Protection (COPPA)'}
            </h2>
            <p>
              {isUrdu
                ? 'ہماری خدمات 18 سال یا اس سے زیادہ عمر کے بالغ پاکستانی شہریوں کے لیے مختص ہیں۔ ہم دانستہ طور پر 13 سال سے کم عمر بچوں سے کوئی ذاتی ڈیٹا اکٹھا نہیں کرتے۔'
                : 'Our platform is designed for eligible adult citizens aged 18 and older possessing legal national identity credentials. We do not knowingly solicit or collect personal records from children under the age of 13 in compliance with COPPA.'}
            </p>
          </section>

          {/* Section 7: Contact Data Protection Officer */}
          <section style={{ backgroundColor: 'var(--navy-50)', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
              {isUrdu ? '7. رابطہ برائے رازداری و شکایات' : '7. Contacting Our Data Privacy Officer'}
            </h2>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              If you have any questions, inquiries, or requests regarding this Privacy Policy or your personal records, please reach out directly:
            </p>
            <div style={{ fontSize: '0.825rem', color: 'var(--navy-700)' }}>
              <div><strong>Official Email:</strong> privacy@citizengrantportal.org / support@citizengrant.gov.pk</div>
              <div><strong>Helpline:</strong> 0800-24624 (Toll-Free Assistance)</div>
              <div><strong>Office:</strong> Public Citizen Relief & Digital Oversight Directorate, Islamabad, Pakistan</div>
            </div>
          </section>
        </div>

        {/* Ad Space In-Article */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
