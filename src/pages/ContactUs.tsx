import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

export const ContactUs: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cnic: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      return;
    }
    setFormSubmitted(true);
  };

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
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            <Mail size={12} />
            <span>{isUrdu ? 'شہری سہولت و شکایات ڈیسک' : 'Official Citizen Redressal & Support Desk'}</span>
          </div>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            {isUrdu ? 'رابطہ کریں — سٹیزن ہیلپ ڈیسک' : 'Contact Us — Citizen Support & Help Desk'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'اگر آپ کو درخواست جمع کروانے، رقم کی منتقلی یا اسٹیٹس ٹریکنگ میں کوئی دشواری پیش آئے تو ہم سے رابطہ کریں۔'
              : 'Our dedicated facilitation officers are available to assist with inquiries, verification, and appeal requests.'}
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdSenseSlot format="horizontal" />

        {/* Contact Info Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Card 1: Helpline */}
          <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Phone size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
              {isUrdu ? 'ٹول فری ہیلپ لائن' : 'Toll-Free Helpline'}
            </h3>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669', marginBottom: '0.25rem' }}>
              0800-24624
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--navy-500)', margin: 0 }}>
              {isUrdu ? 'پیر تا ہفتہ، صبح 8:00 تا شام 6:00 بجے (مفت کال)' : 'Toll-Free Support (Mon - Sat, 8 AM - 6 PM)'}
            </p>
          </div>

          {/* Card 2: Email */}
          <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Mail size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
              {isUrdu ? 'آفیشل ای میل' : 'Official Support Email'}
            </h3>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.25rem' }}>
              support@ehsasreliefprogram.vercel.app
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--navy-500)', margin: 0 }}>
              {isUrdu ? 'جوابی وقت: 24 تا 48 گھنٹوں کے اندر' : 'Expected response within 24–48 business hours'}
            </p>
          </div>

          {/* Card 3: Physical Address */}
          <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <MapPin size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
              {isUrdu ? 'مرکزی سہولت کاری دفتر' : 'Headquarters & Secretariat'}
            </h3>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--navy-800)', marginBottom: '0.25rem' }}>
              Citizen Digital Relief Directorate, Sector G-5/2, Islamabad, Pakistan
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--navy-500)', margin: 0 }}>
              {isUrdu ? 'عوامی ڈیسک اور کاؤنٹر ٹائمنگز: صبح 9 تا شام 4' : 'Public desk hours: 9:00 AM – 4:00 PM PST'}
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="card responsive-card" style={{ backgroundColor: '#ffffff', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
            {isUrdu ? 'آن لائن استفسار یا شکایت فارم' : 'Submit an Inquiry or Grievance'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            {isUrdu
              ? 'براہ کرم اپنا درست شناختی کارڈ یا ریفرنس نمبر درج کریں تاکہ کیس آفیسر فوری جائزہ لے سکے۔'
              : 'Please enter your registered telephone and application reference code to expedite our review.'}
          </p>

          {formSubmitted ? (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem' }}>
                {isUrdu ? 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے!' : 'Message Dispatched Successfully!'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#15803d', maxWidth: '420px', margin: '0 auto 1rem' }}>
                {isUrdu
                  ? 'شکریہ! ہمارے کیس اسسٹنٹ آفیسر آپ کی درخواست کا جائزہ لے کر 24 گھنٹوں کے اندر ایس ایم ایس یا کال کے ذریعے رابطہ کریں گے۔'
                  : 'Thank you. Your inquiry has been routed to the citizen grievance desk. An officer will review your case record promptly.'}
              </p>
              <Button variant="outline" size="sm" onClick={() => setFormSubmitted(false)}>
                {isUrdu ? 'ایک اور پیغام بھیجیں' : 'Send Another Inquiry'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <Input
                  label={isUrdu ? 'پورا نام (Full Name)' : 'Full Legal Name'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isUrdu ? 'محمد علی' : 'e.g. Muhammad Ali'}
                  required
                />

                <Input
                  label={isUrdu ? 'موبائل نمبر (Active Mobile)' : 'Active Mobile Number'}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="03001234567"
                  required
                />
              </div>

              <div className="form-grid-2">
                <Input
                  label={isUrdu ? 'قومی شناختی کارڈ یا ریفرنس آئی ڈی' : 'CNIC or Application Reference ID'}
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  placeholder="42101-1234567-8 / PK-123456"
                />

                <div className="form-group">
                  <label className="form-label">{isUrdu ? 'موضوع (Subject)' : 'Subject / Inquired Category'}</label>
                  <select
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="general">{isUrdu ? 'عمومی استفسار' : 'General Inquiry'}</option>
                    <option value="payment">{isUrdu ? 'رقم کی منتقلی کا مسئلہ' : 'Grant Payment / Wallet Inquiry'}</option>
                    <option value="data">{isUrdu ? '50GB ڈیٹا کی ایکٹیویشن' : '50GB Mobile Data Activation'}</option>
                    <option value="tracking">{isUrdu ? 'اسٹیٹس ٹریکنگ کی شکایت' : 'Status / Reference ID Tracking'}</option>
                    <option value="fraud">{isUrdu ? 'جعلسازی یا فراڈ کی رپورٹ' : 'Report Fraudulent Call / Agent'}</option>
                  </select>
                </div>
              </div>

              <Textarea
                rows={4}
                label={isUrdu ? 'تفصیلی پیغام یا مسئلہ (Message Details)' : 'Your Message / Explanation'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isUrdu ? 'اپنا مسئلہ یا سوال یہاں تحریر کریں...' : 'Provide specific details regarding your inquiry...'}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" icon={<Send size={16} />}>
                  {isUrdu ? 'پیغام ارسال کریں' : 'Send Message to Support'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* In-Article Ad Unit */}
        <AdSenseSlot format="rectangle" />
      </div>
    </div>
  );
};
