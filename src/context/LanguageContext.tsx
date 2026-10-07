import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ur' | 'en' | 'dual';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isUrdu: boolean;
  isEnglish: boolean;
  isDual: boolean;
  t: (key: string, fallbackEn?: string, fallbackUr?: string) => string;
}

const translations: Record<string, { en: string; ur: string }> = {
  // Navigation
  'nav.home': { en: 'Home', ur: 'ہوم' },
  'nav.apply_grant': { en: 'Apply for Rs. 10,000 Grant', ur: '10,000 روپے گرانٹ کے لیے اپلائی کریں' },
  'nav.apply_data': { en: 'Free 50GB Mobile Data', ur: 'مفت 50GB انٹرنیٹ ڈیٹا' },
  'nav.track_status': { en: 'Track Status', ur: 'درخواست کا اسٹیٹس معلوم کریں' },
  'nav.admin_portal': { en: 'Admin Portal', ur: 'ایڈمن لاگ ان' },
  'nav.official_portal': { en: 'Official Public Welfare Portal', ur: 'سرکاری پبلک ریلیف و ویلفیئر پورٹل' },
  'nav.lang_toggle': { en: 'Language', ur: 'زبان' },

  // Home Page
  'home.badge': { en: 'Government Citizen Relief Initiative 2026', ur: 'حکومتی ریلیف و احساس پبلک ویلفیئر اسکیم 2026' },
  'home.title': { en: 'Direct Financial Assistance & Mobile Connectivity', ur: 'براہ راست 10,000 روپے امداد اور مفت 50GB موبائل ڈیٹا اسکیم' },
  'home.subtitle': {
    en: 'Eligible citizens can apply for instant direct Rs. 10,000 bank/wallet transfer and activate 50GB free 4G/5G mobile internet across all Pakistani networks.',
    ur: 'تمام پاکستانی شہری اپنے شناختی کارڈ اور موبائل نمبر کے ذریعے فوری 10,000 روپے گرانٹ اور 50GB مفت 4G/5G انٹرنیٹ ڈیٹا حاصل کرنے کے لیے آن لائن درخواست جمع کروائیں۔',
  },
  'home.btn_grant': { en: 'Apply for Rs. 10,000 Grant', ur: '10,000 روپے کیش گرانٹ فارم' },
  'home.btn_data': { en: 'Activate Free 50GB Data', ur: 'مفت 50GB ڈیٹا ایکٹیویٹ کریں' },
  'home.btn_track': { en: 'Track Existing Application', ur: 'درخواست کی تصدیق چیک کریں' },
  'home.quick_track_title': { en: 'Quick Application Status Lookup', ur: 'فوری درخواست ٹریکنگ' },
  'home.quick_track_placeholder': { en: 'Enter Application Reference ID (e.g. APP-2026-000101)', ur: 'درخواست نمبر درج کریں (مثلاً APP-2026-000101)' },
  'home.quick_track_btn': { en: 'Check Status', ur: 'اسٹیٹس دیکھیں' },

  // Features
  'features.title': { en: 'Key Citizen Benefits', ur: 'اسکیم کی اہم خصوصیات اور فوائد' },
  'features.feat1_title': { en: 'Direct 10k Transfer', ur: 'براہ راست 10,000 روپے ٹرانسفر' },
  'features.feat1_desc': {
    en: 'Funds sent directly to your verified Easypaisa, JazzCash, or Bank Account upon eligibility approval.',
    ur: 'درخواست کی منظوری کے بعد گرانٹ کی رقم فوری طور پر آپ کے ایزی پیسہ، جاز کیش یا بینک اکاؤنٹ میں بھیجی جائے گی۔',
  },
  'features.feat2_title': { en: 'Free 50GB 4G/5G Data', ur: 'مفت 50GB تیز رفتار انٹرنیٹ' },
  'features.feat2_desc': {
    en: '50,000 MB high-speed data package for Jazz, Zong, Telenor, and Ufone SIM users valid for 30 days.',
    ur: 'جاز، زونگ، ٹیلینار اور یو فون سِم صارفین کے لیے 30 دن کی میعاد کے ساتھ 50,000 MB مفت ڈیٹا۔',
  },
  'features.feat3_title': { en: 'Instant Online Verification', ur: 'فوری آن لائن تصدیق اور ٹریکنگ' },
  'features.feat3_desc': {
    en: 'Real-time application reference ID generation with 24/7 online status tracking.',
    ur: 'درخواست جمع ہوتے ہی یونیک ریفرنس نمبر اور 24 گھنٹے لائیو اسٹیٹس ٹریکنگ کی سہولت۔',
  },

  // Steps
  'steps.title': { en: 'How to Apply in 3 Simple Steps', ur: 'درخواست جمع کرنے کا آسان طریقہ' },
  'steps.step1_title': { en: '1. Enter Details', ur: '1. بنیادی معلومات درج کریں' },
  'steps.step1_desc': { en: 'Provide your Name, CNIC, Phone, Address, and Payment Account (50% Meter).', ur: 'اپنا نام، شناختی کارڈ، فون، پتہ اور اکاؤنٹ نمبر درج کریں (50% میٹر مکمل ہوگا)۔' },
  'steps.step2_title': { en: '2. WhatsApp Share', ur: '2. واٹس ایپ پر شیئر کریں' },
  'steps.step2_desc': { en: 'Share with 10 contacts and 1 WhatsApp group to complete 100% eligibility meter.', ur: '10 دوستوں اور 1 گروپ میں واٹس ایپ میسج بھیج کر میٹر 100% مکمل کریں۔' },
  'steps.step3_title': { en: '3. Instant Submission', ur: '3. درخواست جمع کروائیں' },
  'steps.step3_desc': { en: 'Submit your application and get an instant Tracking Reference ID.', ur: 'سبمٹ بٹن دبائیں اور فوری ٹریکنگ آئی ڈی حاصل کریں۔' },

  // FAQ
  'faq.title': { en: 'Frequently Asked Questions', ur: 'عام طور پر پوچھے جانے والے سوالات' },
  'faq.q1': { en: 'Who is eligible for Rs. 10,000 grant and 50GB data?', ur: '10,000 روپے گرانٹ اور 50GB ڈیٹا کے لیے کون اہل ہے؟' },
  'faq.a1': {
    en: 'All Pakistani citizens with a valid 13-digit CNIC and an active mobile number who complete the eligibility meter.',
    ur: 'تمام پاکستانی شہری جن کے پاس درست 13 ہندسوں کا قومی شناختی کارڈ اور فعال موبائل نمبر موجود ہے وہ اہل ہیں۔',
  },
  'faq.q2': { en: 'How long does the approval process take?', ur: 'رقم اور ڈیٹا کی منتقلی میں کتنا وقت لگتا ہے؟' },
  'faq.a2': {
    en: 'Applications are evaluated within 24-48 hours. Successful applicants receive funds directly in their wallet/bank.',
    ur: 'درخواست کی جانچ 24 سے 48 گھنٹوں میں مکمل ہوتی ہے اور رقم براہ راست آپ کے اکاؤنٹ میں منتقل کر دی جاتی ہے۔',
  },

  // Footer
  'footer.rights': { en: 'All Rights Reserved. Official Citizen Welfare Portal.', ur: 'جملہ حقوق محفوظ ہیں۔ آفیشل پبلک ویلفیئر پورٹل۔' },
  'footer.disclaimer': {
    en: 'This service facilitates citizen financial inclusion and connectivity across Pakistan.',
    ur: 'یہ پلیٹ فارم پاکستان بھر کے شہریوں کو مالی امداد اور تیز رفتار انٹرنیٹ کنیکٹیویٹی فراہم کرنے کے لیے وقف ہے۔',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('citizengrant_lang');
    return (saved as Language) || 'dual';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('citizengrant_lang', lang);
    if (lang === 'ur') {
      document.documentElement.setAttribute('lang', 'ur');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  useEffect(() => {
    if (language === 'ur') {
      document.documentElement.setAttribute('lang', 'ur');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const isUrdu = language === 'ur';
  const isEnglish = language === 'en';
  const isDual = language === 'dual';

  const t = (key: string, fallbackEn?: string, fallbackUr?: string): string => {
    const item = translations[key];
    if (item) {
      if (language === 'ur') return item.ur;
      if (language === 'en') return item.en;
      // Dual mode: Show both (Urdu primary + English subtitle / combined)
      return `${item.ur} (${item.en})`;
    }
    if (language === 'ur' && fallbackUr) return fallbackUr;
    if (language === 'en' && fallbackEn) return fallbackEn;
    if (fallbackUr && fallbackEn) return `${fallbackUr} (${fallbackEn})`;
    return fallbackEn || fallbackUr || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isUrdu, isEnglish, isDual, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
