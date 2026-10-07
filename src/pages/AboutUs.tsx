import React from 'react';
import { ShieldCheck, Target, HeartHandshake, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  const { isUrdu } = useLanguage();

  return (
    <div style={{ backgroundColor: 'var(--navy-50)', minHeight: 'calc(100vh - 56px)', padding: '1.5rem 0 3rem' }}>
      <div className="container-narrow">
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <ShieldCheck size={12} />
            <span>{isUrdu ? 'پبلک ویلفیئر و ڈیجیٹل رسائی مشن 2026' : 'Public Welfare & Digital Inclusion Mission 2026'}</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'ہمارے بارے میں — احساس قومی ریلیف پورٹل' : 'About Us — Ehsaas Qaumi Relief Portal'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'پاکستانی شہریوں کو شفاف مالی ریلیف اور تیز رفتار انٹرنیٹ کنیکٹیویٹی فراہم کرنے کا سرکاری سہولت کاری پلیٹ فارم'
              : 'An independent digital facilitation initiative empowering Pakistani citizens with direct relief grants and accessible internet connectivity.'}
          </p>
        </div>

        {/* Top Responsive Ad Unit */}
        <AdSenseSlot format="horizontal" />

        {/* Core Mission Card */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={20} color="var(--primary-600)" />
            {isUrdu ? 'ہمارا مشن اور ویژن' : 'Our Mission & Strategic Vision'}
          </h2>
          <p style={{ color: 'var(--navy-700)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {isUrdu
              ? 'احساس قومی ریلیف پورٹل کا قیام مستحق گھرانوں، نوجوانوں اور طالب علموں کو جدید ڈیجیٹل ٹیکنالوجی کے ذریعے بنیادی ریلیف تک براہ راست رسائی فراہم کرنے کے مقصد سے عمل میں لایا گیا ہے۔ ہم کاغذی کارروائی اور درمیانی ایجنٹوں کے کردار کو ختم کر کے شفافیت اور فوری امداد کو یقینی بناتے ہیں۔'
              : 'Ehsaas Qaumi Relief Portal was established to bridge the socio-economic and digital divide across Pakistan. By leveraging automated digital channels, we ensure direct citizen access to essential welfare support without intermediaries, administrative friction, or hidden service fees.'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                <HeartHandshake size={18} />
                <span>{isUrdu ? '10,000 روپے نقد ریلیف' : 'Direct Financial Aid'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#14532d', margin: 0 }}>
                {isUrdu
                  ? 'مستحق شہریوں کو ضروری گھریلو اخراجات اور افراط زر سے نپٹنے کے لیے ایزی پیسہ، جاز کیش یا بینک میں براہ راست رقم کی منتقلی۔'
                  : 'Direct financial assistance disbursements channeled directly to verified recipient Easypaisa, JazzCash, or bank accounts.'}
              </p>
            </div>

            <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                <Award size={18} />
                <span>{isUrdu ? '50GB مفت انٹرنیٹ ڈیٹا' : '50GB Free Student & Civic Data'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#0c4a6e', margin: 0 }}>
                {isUrdu
                  ? 'طالب علموں اور نوجوانوں کو آن لائن تعلیم، روزگار اور ہنر سیکھنے کے لیے تمام معروف سِم نیٹ ورکس پر 50GB ڈیٹا کوٹہ۔'
                  : 'High-speed 4G mobile internet allocations across all major networks (Jazz, Zong, Telenor, Ufone) for education and remote work.'}
              </p>
            </div>
          </div>
        </div>

        {/* Operating Pillars */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} color="var(--primary-600)" />
            {isUrdu ? 'شفافیت اور اینٹی فراڈ پالیسی' : 'Transparency & Anti-Fraud Standards'}
          </h2>
          <p style={{ color: 'var(--navy-700)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {isUrdu
              ? 'ہم صارفین کے قومی شناختی کارڈ (CNIC) اور سم رجسٹریشن کو جدید الگورتھمز اور مستند ریفرنس نمبرز کے ساتھ ویریفائی کرتے ہیں تاکہ ایک شناختی کارڈ پر ڈپلیکیٹ درخواستوں کی روک تھام کی جا سکے اور صرف حقدار افراد کو ریلیف ملے۔'
              : 'Every application undergoes strict automated validations: 13-digit CNIC checksum verification, active telephone network binding, and encrypted tracking codes to prevent fraudulent duplicates.'}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              {
                en: '100% Free of Cost: We never demand fees, charges, or banking OTP codes from any citizen.',
                ur: 'مکمل طور پر مفت سروس: ہم کسی بھی شہری سے کوئی فیس، چارجز یا خفیہ او ٹی پی کوڈ طلب نہیں کرتے۔',
              },
              {
                en: 'Reference ID Tracking: Applicants receive a real-time Reference ID to track application progress anytime.',
                ur: 'ریفرنس کوڈ ٹریکنگ: تمام درخواست گزاروں کو ریفرنس کوڈ ملتا ہے جس سے وہ کسی بھی وقت اپنا اسٹیٹس دیکھ سکتے ہیں۔',
              },
              {
                en: 'Data Security First: Citizen personal data is encrypted in transit and never shared with commercial marketers.',
                ur: 'ڈیٹا کا تحفظ: شہریوں کی تمام معلومات انکرپٹڈ رکھی جاتی ہیں اور کبھی کسی کمرشل کمپنی کو فروخت نہیں کی جاتیں۔',
              },
            ].map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--navy-800)' }}>
                <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{isUrdu ? item.ur : item.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)', margin: '0 0 0.25rem 0' }}>
              {isUrdu ? 'کیا آپ نے ابھی تک درخواست نہیں دی؟' : 'Ready to Submit Your Application?'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              {isUrdu ? 'چند آسان مراحل میں اپنی رجسٹریشن مکمل کریں اور ریفرنس نمبر حاصل کریں۔' : 'Complete the quick verification process in just 2 minutes.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn btn-primary btn-sm">
              {isUrdu ? '10 ہزار گرانٹ کے لیے اپلائی کریں' : 'Apply for Rs. 10k'}
            </Link>
            <Link to="/apply-data" className="btn btn-outline btn-sm">
              {isUrdu ? '50GB ڈیٹا حاصل کریں' : 'Get 50GB Free Data'}
            </Link>
          </div>
        </div>

        {/* In-Article Responsive Ad Space */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
