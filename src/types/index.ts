export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ADDITIONAL_INFO_REQUIRED'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED';

export type FormFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'textarea';

export type FormSection = 'personal' | 'address' | 'household' | 'application';

export interface FormField {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type: FormFieldType;
  section: FormSection;
  required: boolean;
  options?: string[]; // for select, radio, checkbox
  order: number;
  isActive: boolean;
  hint?: string;
}

export interface PersonalInfo {
  fullName: string;
  guardianName: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  phone: string;
  whatsappNumber: string;
  email: string;
}

export interface AddressInfo {
  province: string;
  district: string;
  city: string;
  area: string;
  address: string;
}

export interface HouseholdInfo {
  familyMembers: number | string;
  dependents: number | string;
  employmentStatus: string;
  monthlyIncome: number | string;
  housingStatus: string;
}

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  timestamp: string;
  changedBy: string;
  note?: string;
}

export interface AdminNote {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface ShareInteraction {
  id: string;
  applicationId?: string;
  placement: 'landing_hero' | 'pre_submission_criteria' | 'submission_success' | 'status_page' | 'admin_preview' | 'general';
  timestamp: string;
  sessionId: string;
  userAgent: string;
}

export interface PaymentAccountInfo {
  accountType: string; // 'Easypaisa' | 'JazzCash' | 'Bank Account' | 'SadaPay' | 'NayaPay'
  accountNumber: string;
  accountTitle: string;
  bankName?: string;
}

export interface VerifiedShareContact {
  index: number;
  recipientPhone: string;
  recipientName?: string;
  verifiedAt: string;
  timeSpentSeconds: number;
  verificationCode: string;
}

export interface ShareMeterStats {
  contactsSharedCount: number; // 0 to 10
  groupsSharedCount: number; // 0 to 1
  meterPercentage: number; // 0 to 100
  isFullyQualified: boolean;
  verifiedRecipients?: VerifiedShareContact[];
  groupNameOrProof?: string;
  screenshotProofUrl?: string;
}

export interface Application {
  applicationId: string;
  personalInfo: Partial<PersonalInfo> & {
    fullName: string;
    nationalId: string;
    phone: string;
    whatsappNumber?: string;
    email?: string;
    guardianName?: string;
    dateOfBirth?: string;
    gender?: string;
  };
  addressInfo: Partial<AddressInfo> & {
    address: string;
    city?: string;
    province?: string;
    district?: string;
    area?: string;
  };
  paymentAccount?: PaymentAccountInfo;
  householdInfo?: Partial<HouseholdInfo>;
  reasonForApplication?: string;
  additionalInfo?: string;
  customFields: Record<string, any>;
  whatsappVerifiedBeforeSubmit?: boolean;
  shareMeter?: ShareMeterStats;
  submissionDate: string;
  currentStatus: ApplicationStatus;
  lastUpdated: string;
  statusHistory: StatusHistoryEntry[];
  notes: AdminNote[];
  outreachHistory: ShareInteraction[];
}

export interface ProgramSettings {
  orgName: string;
  programName: string;
  grantAmountText: string;
  description: string;
  logoText: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  instructions: string;
  privacyNotice: string;
  termsText: string;
  footerText: string;
  primaryCtaText: string;
  adsenseEnabled?: boolean;
  adsenseClientId?: string;
  adsenseHeaderSlotId?: string;
  adsenseInArticleSlotId?: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  campaignUrl: string;
  grantAmountText: string;
  shareMessageTemplate: string;
  groupShareMessageTemplate?: string;
  targetContactsCount: number;
  targetGroupsCount: number;
  buttonText: string;
  descriptionText: string;
  helplineNumber: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Case Reviewer';
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  action:
    | 'LOGIN'
    | 'LOGOUT'
    | 'APPLICATION_VIEWED'
    | 'APPLICATION_SUBMITTED'
    | 'APPLICATION_UPDATED'
    | 'STATUS_CHANGED'
    | 'NOTE_ADDED'
    | 'APPLICATION_DELETED'
    | 'SETTINGS_UPDATED'
    | 'FORM_UPDATED'
    | 'WHATSAPP_SETTINGS_UPDATED'
    | 'DATA_EXPORTED'
    | 'DATA_RESET'
    | 'DATA_IMPORTED'
    | 'ADMIN_CREATED'
    | 'ADMIN_DELETED';
  timestamp: string;
  target?: string;
  details: string;
  adminEmail: string;
  adminName: string;
}
