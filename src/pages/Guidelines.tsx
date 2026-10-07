import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, HelpCircle, FileCheck, PhoneCall, Smartphone, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Link } from 'react-router-dom';

export const Guidelines: React.FC = () => {
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
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <BookOpen size={12} />
            <span>{isUrdu ? 'سرکاری رہنمائی اور اہلیت کے قواعد 2026' : 'Official Guidelines & Eligibility Manual 2026'}</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'اہلیت کے معیارات و تفصیلی رہنمائی' : 'Eligibility Criteria & Application Guidelines'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? '10,000 روپے مالی امداد اور 50GB انٹرنیٹ ڈیٹا اسکیم کے لیے تمام شرائط، تقاضے اور طریقہ کار'
              : 'Complete official instructions, verification standards, and prerequisite checklists for prospective applicants.'}
          </p>
        </div>

        {/* AdSense Top Unit */}
        <AdSenseSlot format="horizontal" />

        {/* Section 1: 10,000 Grant Eligibility */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.35rem', borderRadius: '6px' }}>
              <FileCheck size={20} />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
              {isUrdu ? '1. 10,000 روپے نقد گرانٹ کے لیے اہلیت کے تقاضے' : '1. Eligibility Standards for Rs. 10,000 Financial Grant'}
            </h2>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)', marginBottom: '1rem' }}>
            {isUrdu
              ? 'مالی امداد کے لیے درخواست دینے سے قبل اس بات کی تسلی کر لیں کہ آپ درج ذیل بنیادی معیارات پر پورا اترتے ہیں:'
              : 'Before initiating your grant submission, please verify that your household satisfies the following mandatory criteria:'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
            {[
              {
                title: isUrdu ? 'قومی شناختی کارڈ (CNIC)' : 'Valid Pakistani CNIC',
                desc: isUrdu
                  ? 'درخواست گزار کا نادرا کا جاری کردہ 13 ہندسوں کا اصل اور فعال قومی شناختی کارڈ ہونا لازمی ہے۔'
                  : 'Applicant must hold a valid 13-digit Computerized National Identity Card issued by NADRA.',
              },
              {
                title: isUrdu ? 'ماہانہ گھریلو آمدنی' : 'Income Threshold',
                desc: isUrdu
                  ? 'گھریلو ماہانہ مجموعی آمدنی 50,000 روپے سے کم ہونی چاہیے یا غربت اسکور (PMT) 32 یا اس سے کم ہو۔'
                  : 'Household total monthly income must fall below PKR 50,000 or poverty score (PMT) below 32.',
              },
              {
                title: isUrdu ? 'موبائل والٹ یا بینک اکاؤنٹ' : 'Active Account in Own Name',
                desc: isUrdu
                  ? 'ایزی پیسہ، جاز کیش، سادا پے یا بینک اکاؤنٹ درخواست گزار کے اپنے نام پر رجسٹرڈ ہونا چاہیے۔'
                  : 'Easypaisa, JazzCash, or bank account must match the applicant name for automated disbursement.',
              },
              {
                title: isUrdu ? 'ایک خاندان، ایک درخواست' : 'Single Household Entry',
                desc: isUrdu
                  ? 'ایک شناختی کارڈ پر صرف ایک درخواست قابل قبول ہوگی۔ ڈپلیکیٹ اندراجات خودکار طور پر خارج ہو جائیں گے۔'
                  : 'Only one registration per CNIC is permitted in a grant quarter to guarantee fair distribution.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy-900)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle size={15} color="#059669" />
                  <span>{item.title}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--navy-600)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 50GB Free Data Activation Guidelines */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.35rem', borderRadius: '6px' }}>
              <Smartphone size={20} />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
              {isUrdu ? '2. مفت 50GB موبائل ڈیٹا حاصل کرنے کے قواعد' : '2. 50GB Free 4G Mobile Data Activation Rules'}
            </h2>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)', marginBottom: '1rem' }}>
            {isUrdu
              ? 'سٹوڈنٹ اور پبلک انٹرنیٹ پیکیج پاکستان کے تمام 4G نیٹ ورکس پر دستیاب ہے:'
              : 'The nationwide educational and digital connectivity quota is supported across all major telecommunication operators:'}
          </p>

          <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--navy-700)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <strong>{isUrdu ? 'نیٹ ورکس کی مطابقت:' : 'Supported Networks:'}</strong>{' '}
              {isUrdu
                ? 'جاز (Jazz)، زونگ (Zong)، ٹیلی نار (Telenor) اور یوفون (Ufone) کے تمام پری پیڈ اور پوسٹ پیڈ صارفین اس پیکیج کے اہل ہیں۔'
                : 'Jazz, Zong 4G, Telenor Pakistan, and Ufone 4G prepaid and postpaid connections.'}
            </li>
            <li>
              <strong>{isUrdu ? 'سِم بائیو میٹرک ویریفیکیشن:' : 'SIM Biometric Registration:'}</strong>{' '}
              {isUrdu
                ? 'موبائل نمبر پی ٹی اے (PTA) اور نادرا کے ریکارڈ کے مطابق درخواست گزار کے اپنے قومی شناختی کارڈ پر رجسٹرڈ ہونا چاہیے۔'
                : 'The phone SIM must be biologically verified and officially linked to the applicant CNIC in PTA databases.'}
            </li>
            <li>
              <strong>{isUrdu ? 'استعمال کی مدت اور رفتار:' : 'Validity Period & Speeds:'}</strong>{' '}
              {isUrdu
                ? 'ڈیٹا کوٹہ ایکٹیویشن کے بعد 30 دن تک قابل استعمال رہے گا اور اس کی رفتار 4G LTE فل اسپیڈ ہوگی بغیر کسی وقت کی پابندی کے۔'
                : 'Data remains active for 30 consecutive calendar days from activation at unrestricted high-speed 4G LTE bandwidth.'}
            </li>
          </ul>
        </div>

        {/* Section 3: Important Warning & Fraud Prevention */}
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            <ShieldAlert size={18} />
            <span>{isUrdu ? 'اہم ترین انتباہ: جعلسازی اور فراڈ سے ہوشیار رہیں' : 'Important Security Notice: Beware of Fraudsters'}</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#7f1d1d', margin: 0, lineHeight: '1.5' }}>
            {isUrdu
              ? 'احساس قومی ریلیف پورٹل مکمل طور پر مفت ہے۔ ہم کبھی بھی رجسٹریشن، فارم پراسیسنگ یا گرانٹ کی منتقلی کے لیے کسی فیس، ایزی پیسہ کوڈ یا بینک کے خفیہ او ٹی پی (OTP) کا تقاضا نہیں کرتے۔ اگر کوئی شخص آپ سے پیسے مانگے تو فوری طور پر 0800-24624 پر اطلاع دیں۔'
              : 'Our public assistance service is strictly 100% free of charge. We will NEVER solicit cash payments, processing charges, ATM PINs, or SMS OTP passwords. Report any suspicious impersonators to the official helpline immediately.'}
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/apply" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
            {isUrdu ? 'ابھی درخواست جمع کروائیں' : 'Proceed to Application'}
          </Link>
          <Link to="/faq" className="btn btn-outline">
            {isUrdu ? 'اکثر پوچھے جانے والے سوالات (FAQ)' : 'Read FAQ'}
          </Link>
        </div>

        {/* In-Article Ad Unit */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
