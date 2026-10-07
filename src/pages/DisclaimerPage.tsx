import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const DisclaimerPage: React.FC = () => {
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
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <ShieldAlert size={12} />
            <span>Official Advisory & Legal Disclaimer (2026)</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'قانونی ڈس کلیمر و عوامی انتباہ' : 'Legal Disclaimer & Public Advisory'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'احساس قومی ریلیف پورٹل کی خدمات، معلوماتی کردار اور شہریوں کی سیکیورٹی کے حوالے سے ضروری وضاحت'
              : 'Important clarification regarding independent digital facilitation, scam warnings, and public guidance.'}
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdSenseSlot format="horizontal" />

        {/* Content Card */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          {/* Box 1: Independent Informational Facilitator */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '1. سہولت کاری اور معلوماتی کردار کی وضاحت' : '1. Facilitation & Informational Purpose'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'احساس قومی ریلیف پورٹل ایک خود مختار ڈیجیٹل سہولت کاری پلیٹ فارم ہے جس کا مقصد مستحق شہریوں، طلبہ اور خاندانوں کو فلاحی امداد (10,000 روپے گرانٹ) اور مفت 50GB موبائل انٹرنیٹ ڈیٹا کے لیے رہنمائی اور آن لائن اندراج کی مفت سہولت فراہم کرنا ہے۔ تمام امدادی اسکیموں کی حتمی توثیق متعلقہ حکومتی اور ٹیلی کام ڈیٹا بیسز کی جانچ کے بعد عمل میں لائی جاتی ہے۔'
                : 'Ehsaas Qaumi Relief Portal operates as an independent public assistance and information portal designed to streamline citizen registrations, verify eligibility credentials, and educate applicants on welfare schemes (such as the Rs. 10,000 Direct Support Grant and telecom-sponsored 50GB data initiatives). Final sanction of public relief is governed by official program databases and eligibility quotas.'}
            </p>
          </section>

          {/* Box 2: Fraud Alert */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.35rem' }}>
              <AlertCircle size={20} />
              <span>{isUrdu ? '2. مالی تحفظ اور سائبر سیکیورٹی انتباہ' : '2. Financial Security & Anti-Phishing Advisory'}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#78350f', margin: 0, lineHeight: '1.55' }}>
              {isUrdu
                ? 'شہریوں کو سختی سے مطلع کیا جاتا ہے کہ وہ کسی بھی کال، ایس ایم ایس یا واٹس ایپ پیغام پر اپنے بینک کا خفیہ پن کوڈ (PIN)، اے ٹی ایم کارڈ کا سی وی وی (CVV) کوڈ، یا موبائل پر آنے والا او ٹی پی (OTP) کسی کے ساتھ شیئر نہ کریں۔ ہم کبھی بھی آپ کے پاس ورڈ یا بینکنگ پن کوڈ کا مطالبہ نہیں کرتے۔'
                : 'Citizens are sternly advised NEVER to disclose banking PIN numbers, ATM card security codes (CVV), or SMS OTP verification codes to any individual claiming to represent our portal or government agencies. Legitimate verification representatives will NEVER request your banking passwords.'}
            </p>
          </div>

          {/* Box 3: Accuracy of Content */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '3. معلومات کی درستگی اور اپ ڈیٹس' : '3. Content Accuracy & Ongoing Revisions'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'ہم اس بات کی ہر ممکن کوشش کرتے ہیں کہ پورٹل پر دی گئی تمام معلومات (جیسے اہلیت کے اسکور، ٹیلی کام سِم کے قواعد، اور تصدیقی طریقہ کار) تازہ ترین اور مستند ہوں۔ تاہم، مختلف ٹیلی کام آپریٹرز اور ریلیف فنڈز کے ضوابط وقتاً فوقتاً تبدیل ہو سکتے ہیں، جن کی تازہ ترین تفصیلات اس پورٹل پر مسلسل اپ ڈیٹ کی جاتی ہیں۔'
                : 'While we make every reasonable effort to ensure that eligibility criteria, telecommunications network parameters, and application guidelines remain accurate and up-to-date, program terms are subject to adjustment by respective authorities. Users are encouraged to cross-reference with our latest published guidelines.'}
            </p>
          </section>

          {/* Box 4: Official Helpline */}
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#166534', marginBottom: '0.25rem' }}>
              {isUrdu ? 'رسمی شکایت و ہیلپ لائن رابطہ:' : 'Official Verification Inquiries:'}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#14532d' }}>
              Toll-Free Helpline: <strong>0800-24624</strong> | Official Email: <strong>support@citizengrantportal.org</strong>
            </div>
          </div>
        </div>

        {/* In-Article Ad Unit */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
