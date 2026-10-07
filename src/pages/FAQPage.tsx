import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  category: string;
  questionEn: string;
  questionUr: string;
  answerEn: string;
  answerUr: string;
}

export const FAQPage: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-5': true });
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'grant',
      questionEn: 'How much is the citizen financial grant and who is eligible?',
      questionUr: '10,000 روپے کی مالی امداد کن افراد کو ملے گی اور کون سے شہری اہل ہیں؟',
      answerEn:
        'The direct relief grant is Rs. 10,000 (PKR 10,000) disbursed once per qualifying household. Eligibility is determined based on household income below PKR 50,000/month, valid NADRA CNIC, and verified mobile payment account.',
      answerUr:
        'یہ امدادی پیکج 10,000 روپے نقد رقم پر مشتمل ہے جو مستحق خاندان کو منتقل کیا جاتا ہے۔ وہ تمام پاکستانی شہری جن کی ماہانہ گھریلو آمدنی 50,000 روپے سے کم ہے اور ان کے پاس نادرا کا درست قومی شناختی کارڈ موجود ہے وہ اس کے اہل ہیں۔',
    },
    {
      id: 'faq-2',
      category: 'grant',
      questionEn: 'How will I receive the Rs. 10,000 grant money once approved?',
      questionUr: 'درخواست منظور ہونے کے بعد 10,000 روپے کی رقم مجھے کیسے موصول ہوگی؟',
      answerEn:
        'Funds are credited directly to the payment account specified in your application: Easypaisa mobile wallet, JazzCash mobile account, SadaPay, NayaPay, or any scheduled commercial bank account. You will receive an SMS confirmation.',
      answerUr:
        'رقم براہ راست آپ کے منتخب کردہ اکاؤنٹ یعنی ایزی پیسہ، جاز کیش، سادا پے یا بینک اکاؤنٹ میں منتقل کر دی جاتی ہے اور فوری تصدیقی ایس ایم ایس بھیجا جاتا ہے۔',
    },
    {
      id: 'faq-3',
      category: 'data',
      questionEn: 'How does the free 50GB mobile data activation work?',
      questionUr: '50GB مفت انٹرنیٹ ڈیٹا کیسے ایکٹیویٹ ہوتا ہے اور کن سمز پر کام کرتا ہے؟',
      answerEn:
        'Upon completing the quick 50GB data application and community verification, the telecom service queue activates 50GB 4G high-speed data on your registered SIM (Jazz, Zong, Telenor, or Ufone) within 24 to 48 hours for 30 days validity.',
      answerUr:
        'درخواست اور تصدیق کا عمل مکمل ہونے کے بعد آپ کی درج کردہ سِم (جاز، زونگ، ٹیلی نار یا یوفون) پر 24 سے 48 گھنٹوں کے اندر 50GB تیز رفتار 4G ڈیٹا ایکٹیویٹ ہو جاتا ہے جس کی میعاد 30 دن ہوتی ہے۔',
    },
    {
      id: 'faq-4',
      category: 'data',
      questionEn: 'Do I need to maintain any mobile balance to receive the 50GB data?',
      questionUr: 'کیا 50GB مفت ڈیٹا حاصل کرنے کے لیے موبائل میں بیلنس ہونا ضروری ہے؟',
      answerEn:
        'No mobile balance is required. This is a 100% free public welfare connectivity package designed for students, remote workers, and citizens needing internet access.',
      answerUr:
        'نہیں، آپ کے موبائل میں کسی بیلنس کا ہونا ضروری نہیں ہے۔ یہ پیکیج 100% مفت فراہم کیا جاتا ہے۔',
    },
    {
      id: 'faq-5',
      category: 'tracking',
      questionEn: 'How do I check my application status after submission?',
      questionUr: 'درخواست جمع کروانے کے بعد میں اپنا اسٹیٹس کیسے معلوم کر سکتا ہوں؟',
      answerEn:
        'You can visit the "Track Application Status" page at any time and enter your 13-digit CNIC number or unique Application Reference ID (e.g. PK-849201) to view real-time review progress.',
      answerUr:
        'آپ پورٹل پر موجود "اسٹیٹس چیک کریں" کے صفحے پر جا کر اپنا 13 ہندسوں کا شناختی کارڈ نمبر یا ریفرنس کوڈ درج کر کے اپنی درخواست کی موجودہ صورتحال فوری دیکھ سکتے ہیں۔',
    },
    {
      id: 'faq-6',
      category: 'security',
      questionEn: 'Are there any registration or processing fees charged by the portal?',
      questionUr: 'کیا اس پورٹل پر اپلائی کرنے کی کوئی فیس یا چارجز ہیں؟',
      answerEn:
        'Never! The portal does not charge any processing fees, agent commissions, or registration charges. We will never ask for your confidential banking OTP or ATM PIN codes.',
      answerUr:
        'ہرگز نہیں! یہ پورٹل مکمل طور پر مفت ہے۔ ہم کسی بھی قسم کی فیس، کمیشن یا خفیہ بینک او ٹی پی (OTP) کا مطالبہ نہیں کرتے۔ کسی بھی نامعلوم شخص کو رقم نہ دیں۔',
    },
    {
      id: 'faq-7',
      category: 'tracking',
      questionEn: 'What should I do if my application status displays "Additional Info Required"?',
      questionUr: 'اگر میری درخواست کے اسٹیٹس میں مزید معلومات درکار ہو تو مجھے کیا کرنا چاہیے؟',
      answerEn:
        'This means the evaluation committee requires an updated mobile account title or clearer verification. Reach out to our citizen helpline at 0800-24624 with your Reference ID to quickly update your record.',
      answerUr:
        'اس کا مطلب ہے کہ اکاؤنٹ یا شناختی کارڈ کی تصدیق میں کوئی وضاحت درکار ہے۔ آپ اپنے ریفرنس کوڈ کے ساتھ ہماری ٹول فری ہیلپ لائن 0800-24624 پر رابطہ کر کے اپنی معلومات درست کروا سکتے ہیں۔',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      faq.questionEn.toLowerCase().includes(query) ||
      faq.questionUr.toLowerCase().includes(query) ||
      faq.answerEn.toLowerCase().includes(query) ||
      faq.answerUr.toLowerCase().includes(query)
    );
  });

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
              backgroundColor: '#fef3c7',
              color: '#92400e',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <HelpCircle size={12} />
            <span>{isUrdu ? 'اکثر پوچھے جانے والے سوالات و جوابات' : 'Frequently Asked Questions & Citizen Support'}</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'رہنمائی و عمومی سوالات (FAQ)' : 'Frequently Asked Questions (FAQ)'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'مالی امداد، مفت ڈیٹا کی فراہمی، اکاؤنٹ ٹرانسفر اور درخواست کے طریقہ کار کے بارے میں فوری جوابات'
              : 'Clear, authoritative answers to common inquiries regarding grant approval, data delivery, and tracking.'}
          </p>

          {/* Search Box */}
          <div style={{ maxWidth: '420px', margin: '1rem auto 0', position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'سوال یا موضوع تلاش کریں...' : 'Search answers, keywords, or topics...'}
              className="form-control"
              style={{
                paddingLeft: '2.4rem',
                fontSize: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
            />
            <Search
              size={16}
              color="var(--navy-400)"
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        {/* Top AdSense Banner */}
        <AdSenseSlot format="horizontal" />

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="card"
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: '#ffffff',
                  border: isOpen ? '1px solid var(--primary-300)' : '1px solid var(--border)',
                  boxShadow: isOpen ? '0 2px 8px rgba(5, 150, 105, 0.08)' : 'var(--shadow-sm)',
                  transition: 'all 150ms ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--primary-800)' : 'var(--navy-900)',
                      lineHeight: '1.4',
                    }}
                  >
                    {isUrdu ? faq.questionUr : faq.questionEn}
                  </span>
                  <div
                    style={{
                      color: isOpen ? 'var(--primary-600)' : 'var(--navy-400)',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--navy-100)',
                      fontSize: '0.875rem',
                      color: 'var(--navy-700)',
                      lineHeight: '1.6',
                      animation: 'fadeIn 200ms ease',
                    }}
                  >
                    {isUrdu ? faq.answerUr : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
              <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem', margin: 0 }}>
                {isUrdu ? 'کوئی متعلقہ سوال نہیں ملا۔ برائے مہربانی دیگر الفاظ سے تلاش کریں۔' : 'No matching questions found. Try searching with different keywords.'}
              </p>
            </div>
          )}
        </div>

        {/* Helpline Contact Card */}
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
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={18} color="var(--primary-600)" />
              {isUrdu ? 'مزید معلومات یا سوالات درکار ہیں؟' : 'Still have questions?'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              {isUrdu
                ? 'ہماری کسٹمر سپورٹ ٹیم ٹول فری نمبر 0800-24624 پر پیر تا ہفتہ دستیاب ہے۔'
                : 'Our citizen assistance team is available Monday through Saturday on toll-free helpline 0800-24624.'}
            </p>
          </div>
          <Link to="/contact" className="btn btn-outline btn-sm">
            {isUrdu ? 'رابطہ کریں' : 'Contact Support Desk'}
          </Link>
        </div>

        {/* In-Article Ad Unit */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
