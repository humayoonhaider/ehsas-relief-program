import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
  Clock,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  Zap,
  Wifi,
  Smartphone,
} from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { useLanguage } from '../context/LanguageContext';
import { ShareButton } from '../components/ShareButton';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { BookOpen, ShieldAlert, Clock3, AlertTriangle, Flame } from 'lucide-react';

export const Home: React.FC = () => {
  const settings = settingsService.getProgramSettings();
  const navigate = useNavigate();
  const [quickTrackId, setQuickTrackId] = useState('');
  const { language, isUrdu, isEnglish, isDual, t } = useLanguage();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      navigate(`/application-status?id=${encodeURIComponent(quickTrackId.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ecfdf5 0%, #f0fdf4 40%, #ffffff 100%)',
          paddingTop: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            {/* Top Urgent Limited-Offer Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                padding: '0.22rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: 800,
                marginBottom: '0.5rem',
                border: '1px solid #fecaca',
                boxShadow: '0 1px 3px rgba(220, 38, 38, 0.1)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#dc2626',
                  display: 'inline-block',
                }}
              />
              <Flame size={13} color="#dc2626" />
              <span>
                {isUrdu
                  ? 'خصوصی ریلیف آفر: محدود مدت اور کوٹہ • رجسٹریشن آخری مراحل میں داخل!'
                  : 'LIMITED TIME EMERGENCY RELIEF OFFER • ALLOCATIONS CLOSING SOON'}
              </span>
            </div>

            {/* Official Authority Emblem Tag */}
            <div style={{ marginBottom: '0.65rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#ffffff',
                  color: '#065f46',
                  padding: '0.2rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  border: '1px solid #86efac',
                  boxShadow: '0 1px 2px rgba(5, 150, 105, 0.08)',
                }}
              >
                <ShieldCheck size={14} color="#059669" />
                <span>
                  {isUrdu
                    ? '🇵🇰 حکومتِ پاکستان پبلک ویلفیئر و احساس ایمرجنسی ریلیف فنڈ 2026'
                    : 'Pakistan National Ehsaas Public Welfare & Digital Relief Scheme 2026'}
                </span>
              </div>
            </div>

            {/* Powerful Main Hook Headline */}
            <h1
              className="hero-heading"
              style={{
                fontWeight: 800,
                color: 'var(--navy-900)',
                marginBottom: '0.65rem',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
              }}
            >
              {isUrdu ? (
                <>
                  وزیرِ اعظم احساس قومی ریلیف پیکیج 2026 <br />
                  <span style={{ color: '#059669' }}>فوری 10,000 روپے کیش امداد</span> +{' '}
                  <span style={{ color: '#0284c7' }}>50GB مفت انٹرنیٹ ڈیٹا</span>
                </>
              ) : isDual ? (
                <>
                  PM Ehsaas Public Relief Package 2026 <br />
                  <span style={{ color: '#059669' }}>Direct Rs. 10,000 Cash Support</span> +{' '}
                  <span style={{ color: '#0284c7' }}>50GB Free 4G Mobile Data</span>
                </>
              ) : (
                settings.programName
              )}
            </h1>

            {/* Sub-headline Hook */}
            <p
              className="hero-subtext"
              style={{
                color: 'var(--navy-700)',
                marginBottom: '1rem',
                maxWidth: '680px',
                marginRight: 'auto',
                marginLeft: 'auto',
                fontSize: '0.9rem',
                lineHeight: '1.6',
              }}
            >
              {isUrdu
                ? 'بڑھتی ہوئی مہنگائی کے پیشِ نظر تمام پاکستانی شہریوں اور طلبہ کے لیے ہنگامی ریلیف کی فوری فراہمی شروع کر دی گئی ہے۔ پہلے آئیں پہلے پائیں کی بنیاد پر اپنا شناختی کارڈ اور موبائل نمبر درج کر کے 10,000 روپے براہ راست اپنے اکاؤنٹ (ایزی پیسہ/جاز کیش) میں اور تمام سِمز پر 50GB ڈیٹا حاصل کریں۔'
                : 'Sanctioned emergency financial packages & free 4G data quotas deployed nationwide. Eligible citizens receive direct Rs. 10,000 mobile account transfers and high-speed SIM data activations on a first-come, first-served basis.'}
            </p>

            {/* Live Today's Quota Allocation Meter */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '0.55rem 0.85rem',
                maxWidth: '480px',
                margin: '0 auto 1.25rem',
                boxShadow: '0 2px 6px rgba(234, 88, 12, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '0.35rem',
                }}
              >
                <span style={{ color: '#c2410c', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock3 size={13} />
                  {isUrdu ? 'آج کی مختص نشستیں (Daily Quota):' : 'Today’s Verified Allocation:'}
                </span>
                <span style={{ color: '#9a3412', fontFamily: 'var(--font-mono)' }}>
                  {isUrdu ? 'صرف 1,280 سلاٹ باقی (74% پر)' : '1,280 / 5,000 Left (74% Claimed)'}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '7px',
                  backgroundColor: '#ffedd5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '74%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="responsive-btn-group" style={{ marginBottom: '1.25rem' }}>
              <Link
                to="/apply"
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.28)',
                }}
              >
                <FileText size={16} />
                <span>{isUrdu ? '⚡ ابھی 10,000 روپے کے لیے اپلائی کریں' : '⚡ Apply for Rs. 10k Grant'}</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/apply-data"
                className="btn"
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.9rem',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
                }}
              >
                <Wifi size={16} />
                <span>{isUrdu ? '📶 مفت 50GB ڈیٹا حاصل کریں' : '📶 Get Free 50GB Data'}</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/application-status"
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1rem', fontSize: '0.9rem' }}
              >
                <Search size={15} />
                <span>{isUrdu ? '🔍 اسٹیٹس چیک کریں' : 'Track Status'}</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontSize: '0.75rem',
                color: 'var(--navy-700)',
                borderTop: '1px solid var(--navy-200)',
                paddingTop: '0.75rem',
                width: '100%',
                maxWidth: '650px',
                margin: '0 auto',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} color="#059669" />
                {isUrdu ? '100% مفت سرکاری پورٹل' : '100% Free Service'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} color="#059669" />
                {isUrdu ? 'ایزی پیسہ / جاز کیش ٹرانسفر' : 'Direct Easypaisa / JazzCash'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} color="#059669" />
                {isUrdu ? 'تمام سِمز (Jazz, Zong, Telenor, Ufone)' : 'All 4G SIM Networks'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} color="#059669" />
                {isUrdu ? 'آن لائن ریفرنس ٹریکنگ' : 'Instant Tracking ID'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Top Banner */}
      <div className="container" style={{ padding: '0.5rem 1rem 0' }}>
        <AdSenseSlot format="horizontal" />
      </div>

      {/* Key Information & Dual Portal Cards Section */}
      <section style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
              {isUrdu ? 'اسکیم کی اہم خصوصیات اور پورٹلز' : isDual ? 'Key Benefits & Dual Portals (اسکیم کی تفصیلات)' : 'Key Program Information'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {isUrdu ? 'اپنی ضرورت کے مطابق متعلقہ پورٹل میں آن لائن فارم جمع کروائیں۔' : 'Choose your desired welfare scheme and submit your verified application.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {/* Card 1: Rs. 10,000 Cash Grant */}
            <div className="card responsive-card" style={{ border: '1.5px solid var(--primary-200)', position: 'relative' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-50)',
                  color: 'var(--primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--navy-900)' }}>
                {isUrdu ? '1. احساس 10,000 روپے کیش گرانٹ' : isDual ? '1. Rs. 10,000 Direct Cash Grant (10 ہزار روپے نقد)' : '1. Rs. 10,000 Direct Cash Grant'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                {isUrdu
                  ? 'اہل شہریوں کو 10,000 روپے براہ راست ایزی پیسہ، جاز کیش یا بینک اکاؤنٹ میں بھیجے جائیں گے۔ شناختی کارڈ اور اکاؤنٹ نمبر درج کر کے 10 دوستوں اور 1 گروپ میں شیئر کریں۔'
                  : 'Get Rs. 10,000 sent directly to your Easypaisa, JazzCash, or Bank account upon verified eligibility.'}
              </p>
              <Link to="/apply" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                {isUrdu ? '10 ہزار گرانٹ فارم پر کریں' : isDual ? 'Apply for Rs. 10k (10 ہزار فارم)' : 'Apply for Rs. 10k'}
              </Link>
            </div>

            {/* Card 2: Free 50GB Mobile Data */}
            <div className="card responsive-card" style={{ border: '1.5px solid #bae6fd', backgroundColor: '#f8fafc' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <Wifi size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--navy-900)' }}>
                {isUrdu ? '2. مفت 50GB انٹرنیٹ ڈیٹا اسکیم' : isDual ? '2. Free 50GB Mobile Internet (مفت 50GB ڈیٹا)' : '2. Free 50GB Mobile Internet'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                {isUrdu
                  ? 'جاز، زونگ، ٹیلینار اور یو فون سِم پر مفت 50,000 MB تیز رفتار 4G/5G ڈیٹا 30 دن کے لیے حاصل کریں۔ سِم نمبر اور شناختی کارڈ درج کریں۔'
                  : 'Activate 50GB (50,000 MB) free 4G/5G data package across all major Pakistani telecom networks.'}
              </p>
              <Link to="/apply-data" className="btn btn-sm" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#0284c7', color: '#fff' }}>
                {isUrdu ? '50GB ڈیٹا فارم پر کریں' : isDual ? 'Activate 50GB Data (50GB ڈیٹا حاصل کریں)' : 'Activate 50GB Data'}
              </Link>
            </div>

            {/* Card 3: 24/7 Application Tracking */}
            <div className="card responsive-card">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--navy-100)',
                  color: 'var(--navy-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <Search size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--navy-900)' }}>
                {isUrdu ? '3. آن لائن تصدیق و ٹریکنگ' : isDual ? '3. Live Application Tracking (لائیو تصدیق)' : '3. Live Status Tracking'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                {isUrdu
                  ? 'درخواست جمع کروانے کے بعد ریفرنس نمبر درج کر کے کسی بھی وقت اپنی درخواست کی تصدیق اور منظوری کی صورتحال چیک کریں۔'
                  : 'Track your application evaluation in real-time 24/7 using your unique Application ID.'}
              </p>
              <Link to="/application-status" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                {isUrdu ? 'اسٹیٹس تلاش کریں' : isDual ? 'Track Case (اسٹیٹس چیک کریں)' : 'Track Case'}
              </Link>
            </div>
          </div>

          {/* Prominent WhatsApp Community Outreach Feature */}
          <ShareButton placement="landing_hero" variant="banner" />
        </div>
      </section>

      {/* Quick Lookup Box */}
      <section
        style={{
          padding: '2rem 0',
          backgroundColor: 'var(--navy-50)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container-narrow">
          <div
            className="card responsive-card"
            style={{
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--primary-border)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                {isUrdu
                  ? 'کیا آپ نے پہلے درخواست جمع کروائی ہے؟ اسٹیٹس معلوم کریں'
                  : isDual
                  ? 'Already Applied? Check Application Status'
                  : 'Already Applied? Check Your Application Status'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {isUrdu
                  ? 'اپنا منفرد درخواست نمبر (مثلاً APP-2026-000101) نیچے درج کریں:'
                  : 'Enter your unique Application Reference Number (e.g. APP-2026-000101)'}
              </p>
            </div>

            <form
              onSubmit={handleTrackSubmit}
              className="responsive-flex-form"
            >
              <div style={{ flex: 1, width: '100%' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. APP-2026-000101"
                  value={quickTrackId}
                  onChange={(e) => setQuickTrackId(e.target.value)}
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem 0.75rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                  }}
                  required
                />
              </div>
              <Button type="submit" variant="primary" style={{ padding: '0.5rem 1rem' }}>
                <Search size={15} />
                <span>{isUrdu ? 'اسٹیٹس دیکھیں' : 'Track Status'}</span>
              </Button>
            </form>

            <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--navy-500)' }}>
              {isUrdu ? 'ٹیسٹنگ کے لیے نمونہ آئی ڈیز:' : 'Example Demo IDs for testing:'}{' '}
              <button
                type="button"
                onClick={() => setQuickTrackId('APP-2026-000101')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-700)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                APP-2026-000101
              </button>
              {', '}
              <button
                type="button"
                onClick={() => setQuickTrackId('APP-2026-000103')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-700)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                APP-2026-000103
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Instructions / Rules */}
      <section style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
        <div className="container-narrow">
          <div className="card responsive-card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy-900)' }}>
              {isUrdu ? 'درخواست جمع کرنے کی ضروری ہدایات' : isDual ? 'Important Application Instructions (ضروری ہدایات)' : 'Important Application Instructions'}
            </h3>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--navy-700)',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                marginBottom: '1.25rem',
              }}
            >
              {isUrdu
                ? `1. تمام معلومات (نام، شناختی کارڈ، فون، پتہ، اکاؤنٹ نمبر) بالکل درست درج کریں۔
2. معلومات درج کرنے پر اہلیت میٹر 50% ہو جائے گا۔
3. دیے گئے بٹن کے ذریعے واٹس ایپ پر 10 دوستوں کو میسج شیئر کرنے پر میٹر 90% ہوگا۔
4. 1 واٹس ایپ گروپ میں میسج شیئر کرنے پر میٹر 100% مکمل ہوگا اور سبمٹ بٹن فعال ہوگا۔
5. درخواست کی جانچ کے بعد رقم براہ راست آپ کے فراہم کردہ اکاؤنٹ میں منتقل کر دی جائے گی۔`
                : settings.instructions}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn btn-primary">
                <FileText size={16} />
                <span>{isUrdu ? '10,000 روپے فارم شروع کریں' : isDual ? 'Apply for Rs. 10,000 (10 ہزار فارم)' : 'Begin 10k Application'}</span>
              </Link>
              <Link to="/apply-data" className="btn" style={{ backgroundColor: '#0284c7', color: '#fff' }}>
                <Wifi size={16} />
                <span>{isUrdu ? 'مفت 50GB ڈیٹا فارم شروع کریں' : isDual ? 'Apply for 50GB Data (50GB ڈیٹا فارم)' : 'Begin 50GB Data Application'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Guides & Knowledge Base Section (AdSense High-Value Content) */}
      <section style={{ padding: '2rem 0', backgroundColor: 'var(--navy-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginBottom: '0.35rem',
              }}
            >
              <BookOpen size={12} />
              <span>{isUrdu ? 'شہری معلوماتی سنٹر' : 'Citizen Knowledge & Guidelines'}</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
              {isUrdu ? 'اہم رہنمائی اور اکثر پوچھے جانے والے سوالات' : 'Official Guidelines & Help Resources'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
              {isUrdu
                ? 'اہلیت کے معیارات، سم ویریفیکیشن، اور اسکیم سے متعلق تمام ضروری تفصیلات کا تفصیلی جائزہ لیں'
                : 'Learn about eligibility thresholds, biometric rules, and step-by-step verification procedures.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {/* Guide Card 1 */}
            <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.35rem', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px' }}>
                  <BookOpen size={18} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                  {isUrdu ? 'اہلیت کے مکمل معیارات' : 'Eligibility Manual'}
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--navy-600)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {isUrdu
                  ? 'شناختی کارڈ کی میعاد، غربت اسکور (PMT)، اور گھریلو آمدنی کے تقاضوں کی تفصیلی فہرست پڑھیں۔'
                  : 'Check PMT score thresholds, CNIC validity requirements, and household eligibility checks.'}
              </p>
              <Link to="/guidelines" style={{ color: 'var(--primary-700)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>{isUrdu ? 'تفصیلات دیکھیں' : 'Read Guidelines'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Guide Card 2 */}
            <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.35rem', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '6px' }}>
                  <HelpCircle size={18} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                  {isUrdu ? 'اکثر پوچھے گئے سوالات' : 'Frequently Asked Questions'}
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--navy-600)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {isUrdu
                  ? 'رقم کی منتقلی، 50GB ڈیٹا ایکٹیویشن اور ریفرنس کوڈ ٹریکنگ سے متعلق سوالات کے فوری جوابات۔'
                  : 'Get answers regarding payment channels (Easypaisa/JazzCash), SIM networks, and appeals.'}
              </p>
              <Link to="/faq" style={{ color: 'var(--primary-700)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>{isUrdu ? 'سوالات پڑھیں' : 'Browse FAQs'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Guide Card 3 */}
            <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.35rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
                  <ShieldAlert size={18} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                  {isUrdu ? 'فراڈ سے بچاؤ کی ہدایات' : 'Anti-Scam Security Notice'}
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--navy-600)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {isUrdu
                  ? 'ہماری خدمات 100% مفت ہیں۔ کسی نامعلوم شخص یا ایجنٹ کو پیسے یا خفیہ پن کوڈ نہ دیں۔'
                  : 'Strict zero-fee directive. Never share your bank ATM PIN or OTP with unauthorized persons.'}
              </p>
              <Link to="/disclaimer" style={{ color: '#b91c1c', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>{isUrdu ? 'انتباہ پڑھیں' : 'View Advisory'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Bottom Ad Unit */}
          <AdSenseSlot format="horizontal" />
        </div>
      </section>
    </div>
  );
};

