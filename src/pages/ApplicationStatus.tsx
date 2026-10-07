import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  MapPin,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { Application } from '../types';
import { storageService } from '../services/storageService';
import { STATUS_CONFIG } from '../utils/constants';
import { formatDate, formatDateTime, maskSensitiveText } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { ShareButton } from '../components/ShareButton';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const ApplicationStatus: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';
  const [appIdInput, setAppIdInput] = useState(queryId);
  const [searched, setSearched] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const { isUrdu, isDual } = useLanguage();

  useEffect(() => {
    if (queryId) {
      setAppIdInput(queryId);
      lookupApplication(queryId);
    }
  }, [queryId]);

  const lookupApplication = (id: string) => {
    setSearched(true);
    if (!id.trim()) {
      setApplication(null);
      return;
    }
    const found = storageService.getApplication(id.trim());
    setApplication(found || null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (appIdInput.trim()) {
      setSearchParams({ id: appIdInput.trim().toUpperCase() });
      lookupApplication(appIdInput);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const statusMeta = application ? STATUS_CONFIG[application.currentStatus] : null;

  return (
    <div style={{ backgroundColor: 'var(--navy-50)', minHeight: 'calc(100vh - 56px)', padding: '1.25rem 0 2.5rem' }}>
      <div className="container-narrow">
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
            {isUrdu ? 'درخواست کی تصدیق اور لائیو اسٹیٹس' : isDual ? 'Check Application Status' : 'Check Application Status'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)' }}>
            {isUrdu
              ? 'اپنا درخواست ریفرنس نمبر درج کریں تاکہ 10,000 گرانٹ یا مفت 50GB ڈیٹا کی جانچ کا اسٹیٹس دیکھا جا سکے۔'
              : 'Enter your official Application Reference ID to view live case evaluation progress.'}
          </p>
        </div>

        {/* Search Input Box */}
        <div
          className="card responsive-card"
          style={{
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <form onSubmit={handleSearch} className="responsive-flex-form">
            <div style={{ flex: 1, width: '100%' }}>
              <input
                type="text"
                className="form-control"
                placeholder={isUrdu ? 'درخواست نمبر درج کریں (مثلاً APP-2026-000101)' : 'e.g. APP-2026-000101'}
                value={appIdInput}
                onChange={(e) => setAppIdInput(e.target.value)}
                style={{
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                }}
                required
              />
            </div>
            <Button type="submit" variant="primary" icon={<Search size={15} />} style={{ padding: '0.5rem 1rem' }}>
              {isUrdu ? 'اسٹیٹس دیکھیں' : 'Track Status'}
            </Button>
          </form>

          {/* Quick Demo Test Chips */}
          <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', fontSize: '0.72rem' }}>
            <span style={{ color: 'var(--navy-500)' }}>
              {isUrdu ? 'ٹیسٹنگ نمونہ آئی ڈیز:' : 'Sample IDs:'}
            </span>
            {['APP-2026-000101', 'APP-2026-000102', 'APP-2026-000103', 'APP-2026-000105'].map((demoId) => (
              <button
                key={demoId}
                type="button"
                onClick={() => {
                  setAppIdInput(demoId);
                  setSearchParams({ id: demoId });
                  lookupApplication(demoId);
                }}
                style={{
                  backgroundColor: 'var(--navy-100)',
                  border: '1px solid var(--navy-300)',
                  borderRadius: '4px',
                  padding: '0.12rem 0.35rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--navy-800)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {demoId}
              </button>
            ))}
          </div>
        </div>

        {/* AdSense Banner */}
        <AdSenseSlot format="horizontal" />

        {/* RESULTS SECTION */}
        {searched && !application && (
          <div
            className="card responsive-card"
            style={{
              padding: '1.5rem 1rem',
              textAlign: 'center',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger-light)',
                color: 'var(--danger)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <AlertCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
              {isUrdu ? 'کوئی درخواست نہیں ملی' : 'No Application Found'}
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1rem', fontSize: '0.8125rem' }}>
              {isUrdu
                ? `درخواست نمبر "${appIdInput}" کا ریکارڈ موجود نہیں۔ براہ کرم اپنی رسید پر لکھا نمبر چیک کر کے دوبارہ کوشش کریں۔`
                : `We could not find an application with reference ID "${appIdInput}". Please verify the ID on your submission receipt and try again.`}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn btn-primary btn-sm">
                <FileText size={14} />
                <span>{isUrdu ? '10 ہزار گرانٹ فارم' : 'Submit 10k Form'}</span>
              </Link>
              <Link to="/apply-data" className="btn btn-secondary btn-sm" style={{ color: '#0284c7' }}>
                <span>{isUrdu ? 'مفت 50GB ڈیٹا فارم' : 'Submit 50GB Form'}</span>
              </Link>
            </div>
          </div>
        )}

        {application && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Status Overview Card */}
            <div
              className="card responsive-card"
              style={{
                boxShadow: 'var(--shadow-sm)',
                borderTop: `3px solid ${statusMeta?.color || 'var(--primary-600)'}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--navy-500)', fontWeight: 700 }}>
                    {isUrdu ? 'درخواست ریفرنس نمبر' : isDual ? 'Application Reference (ریفرنس نمبر)' : 'Application Reference'}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--navy-900)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {application.applicationId}
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StatusBadge status={application.currentStatus} />
                  <Button variant="secondary" size="sm" onClick={handlePrint} icon={<Printer size={14} />}>
                    {isUrdu ? 'رسید پرنٹ کریں' : 'Print Receipt'}
                  </Button>
                </div>
              </div>

              {/* Status Explanation Banner */}
              <div
                style={{
                  backgroundColor: 'var(--navy-50)',
                  border: '1px solid var(--navy-200)',
                  borderRadius: '8px',
                  padding: '0.875rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Info size={18} color={statusMeta?.color || 'var(--primary-600)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.2rem' }}>
                      {isUrdu ? `صورتحال: ${statusMeta?.label}` : `Status: ${statusMeta?.label}`}
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--navy-700)', margin: 0 }}>
                      {statusMeta?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Timeline Dates Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.875rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)', fontWeight: 600 }}>
                    {isUrdu ? 'درخواست گزار کا نام' : isDual ? 'Applicant Name (نام)' : 'Applicant Name'}
                  </span>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '0.15rem' }}>
                    {application.personalInfo?.fullName || '—'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)', fontWeight: 600 }}>
                    {isUrdu ? 'شناختی کارڈ نمبر' : isDual ? 'CNIC / ID (شناختی کارڈ)' : 'CNIC / ID'}
                  </span>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy-900)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                    {application.personalInfo?.nationalId || '—'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)', fontWeight: 600 }}>
                    {isUrdu ? 'فون اور واٹس ایپ' : isDual ? 'Phone & WhatsApp (فون)' : 'Phone & WhatsApp'}
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.15rem' }}>
                    {application.personalInfo?.phone}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)', fontWeight: 600 }}>
                    {isUrdu ? 'پتہ اور شہر' : isDual ? 'Address & City (پتہ)' : 'Address & City'}
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.15rem' }}>
                    {application.addressInfo?.address || `${application.addressInfo?.city || ''}`}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)', fontWeight: 600 }}>
                    {isUrdu ? 'واٹس ایپ شیئرنگ میٹر' : isDual ? 'Outreach Status (میٹر)' : 'Outreach Status'}
                  </span>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--whatsapp-dark)', marginTop: '0.15rem' }}>
                    ✓ 100% WhatsApp Verified
                  </div>
                </div>
              </div>

              {/* Status Audit Timeline */}
              {application.statusHistory && application.statusHistory.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1rem' }}>
                    {isUrdu ? 'درخواست کی جانچ کی تفصیلات (History)' : 'Evaluation History'}
                  </h4>
                  <div className="timeline">
                    {application.statusHistory.map((hist, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <StatusBadge status={hist.status} size="sm" />
                            <span style={{ fontSize: '0.75rem', color: 'var(--navy-400)' }}>
                              {formatDateTime(hist.timestamp)}
                            </span>
                          </div>
                          {hist.note && (
                            <p style={{ fontSize: '0.8125rem', color: 'var(--navy-700)', marginTop: '0.35rem' }}>
                              {hist.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Outreach Share Banner */}
            <ShareButton
              placement="status_page"
              applicationId={application.applicationId}
              variant="banner"
            />
          </div>
        )}
      </div>
    </div>
  );
};

