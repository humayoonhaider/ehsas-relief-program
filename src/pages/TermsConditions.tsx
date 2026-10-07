import React from 'react';
import { FileText, Shield, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const TermsConditions: React.FC = () => {
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
              backgroundColor: '#e2e8f0',
              color: '#334155',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <Scale size={12} />
            <span>Legal Compliance & Terms of Use (2026)</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'قواعد، ضوابط اور شرائطِ استعمال' : 'Terms of Service & Portal Conditions'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'احساس قومی ریلیف و پبلک ویلفیئر پورٹل، گرانٹ رجسٹریشن اور ڈیٹا سروسز کے قانونی رہنما اصول'
              : 'Official terms and conditions governing the access, participation, and usage of our public facilitation portal.'}
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdSenseSlot format="horizontal" />

        {/* Content Card */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--navy-500)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <strong>Effective Date:</strong> October 2026 • <strong>Version:</strong> 2.4 (AdSense & Public Compliance)
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '1. شرائط کی منظوری اور قانونی پابندی' : '1. Acceptance of Terms'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'اس ویب سائٹ یا متعلقہ گرانٹ فارمز کا استعمال کرتے ہوئے، آپ ان تمام شرائط، رازداری کی پالیسی اور متعلقہ قواعد و ضوابط پر عمل کرنے کے پابند ہیں۔ اگر آپ ان میں سے کسی بھی شرط سے متفق نہیں ہیں، تو آپ کو پورٹل کا استعمال ترک کر دینا چاہیے۔'
                : 'By visiting or registering through the Ehsaas Qaumi Relief Portal ("the Portal"), you agree to be legally bound by these Terms of Service, applicable Pakistani laws, and our Privacy Policy. If you do not agree to these terms, you must refrain from using this service.'}
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '2. درخواست گزار کی اہلیت اور سچائی کا اقرار' : '2. Applicant Eligibility & Truth Declaration'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'درخواست جمع کرواتے وقت صارف اقرار کرتا ہے کہ درج کردہ تمام معلومات (شناختی کارڈ، رابطہ نمبر اور ادائیگی کا اکاؤنٹ) درست، حقیقی اور اس کی ذاتی ملکیت ہیں۔ غلط یا جعلی کوائف جمع کروانے پر درخواست فوری خارج کر دی جائے گی اور قانونی کارروائی کی جا سکتی ہے۔'
                : 'Each applicant explicitly certifies that all information supplied—including CNIC number, mobile identity, and financial disbursement account title—is true, complete, and legally owned by the applicant. Providing counterfeit identity credentials will lead to immediate disqualification.'}
            </p>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '3. 100% مفت سروس اور زیرو فیس پالیسی' : '3. Strict Zero-Fee Policy'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'احساس قومی ریلیف پورٹل شہریوں سے رجسٹریشن، تصدیق یا فنڈز کی ترسیل کے لیے کوئی فیس، چارجز یا کمیشن نہیں لیتا۔ کسی بھی ایجنٹ، فریق ثالث یا دھوکہ دہی کرنے والے شخص کو کسی قسم کی رقم ادا نہ کریں۔'
                : 'Ehsaas Qaumi Relief Portal operates under an absolute zero-fee directive. We do not assess fees, service charges, or transaction deductions. Any entity demanding payment in exchange for accelerated evaluation is operating fraudulently.'}
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '4. ممنوعہ سرگرمیاں اور خودکار سیکیورٹی' : '4. Prohibited Conduct & Automated Protections'}
            </h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--navy-700)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>
                <strong>Anti-Bot & Anti-Scraping:</strong> Automated scraping, bot script injection, or programmatic bulk CNIC queries are strictly barred.
              </li>
              <li>
                <strong>No Multi-Account Abuse:</strong> Submitting repeated redundant applications for the same citizen identity in an active evaluation cycle.
              </li>
              <li>
                <strong>Security Integrity:</strong> Any attempt to compromise server infrastructure, intercept traffic, or inject malicious payload codes.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
              {isUrdu ? '5. ذمہ داری کی حدود اور وارنٹی کا اخراج' : '5. Limitation of Liability'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
              {isUrdu
                ? 'یہ پورٹل شہریوں کی سہولت اور رجسٹریشن کے لیے نیک نیتی کے ساتھ چلایا جاتا ہے۔ ہم تکنیکی خرابی، ٹیلی کام سگنل، یا بینک سرور کے مسائل کی وجہ سے کسی تاخیر کے براہ راست یا بالواسطہ نقصانات کے ذمہ دار نہیں ہوں گے۔'
                : 'The Portal and its digital verification tools are provided "as is" and "as available". To the maximum extent permitted by applicable law, we disclaim liability for telecom network outages, third-party wallet maintenance delays, or bank processing downtime.'}
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ backgroundColor: 'var(--navy-50)', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
              {isUrdu ? '6. رابطہ اور قانونی استفسار' : '6. Legal Inquiries & Governance'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--navy-700)', margin: 0 }}>
              Questions regarding these Terms of Service should be directed to our Legal & Compliance Office at{' '}
              <a href="mailto:legal@citizengrantportal.org" style={{ color: '#059669', fontWeight: 700 }}>
                legal@citizengrantportal.org
              </a>{' '}
              or by writing to Sector G-5/2, Islamabad, Pakistan.
            </p>
          </section>
        </div>

        {/* In-Article Ad Unit */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
