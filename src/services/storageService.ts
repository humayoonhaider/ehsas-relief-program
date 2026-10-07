import {
  Application,
  ProgramSettings,
  WhatsAppSettings,
  FormField,
  ShareInteraction,
  AuditLog,
  AdminUser,
} from '../types';
import {
  DEFAULT_PROGRAM_SETTINGS,
  DEFAULT_WHATSAPP_SETTINGS,
  DEFAULT_FORM_FIELDS,
  INITIAL_DEMO_APPLICATIONS,
  INITIAL_ADMINS,
  INITIAL_AUDIT_LOGS,
} from '../utils/constants';

const STORAGE_KEYS = {
  APPLICATIONS: 'citizengrant_applications_v1',
  SETTINGS: 'citizengrant_settings_v1',
  WHATSAPP: 'citizengrant_whatsapp_v1',
  FORM_FIELDS: 'citizengrant_form_fields_v1',
  SHARE_INTERACTIONS: 'citizengrant_shares_v1',
  AUDIT_LOGS: 'citizengrant_audit_logs_v1',
  ADMINS: 'citizengrant_admins_v1',
  ACTIVE_SESSION: 'citizengrant_active_session_v1',
};

// Safe Local Storage reader with fallback
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`[storageService] Error reading key "${key}":`, err);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cross-tab or component sync
    window.dispatchEvent(new Event('citizengrant_storage_change'));
  } catch (err) {
    console.error(`[storageService] Error setting key "${key}":`, err);
  }
}

export const storageService = {
  // --- Applications ---
  getApplications(): Application[] {
    return getStoredItem<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_DEMO_APPLICATIONS);
  },

  getApplication(applicationId: string): Application | undefined {
    const apps = this.getApplications();
    return apps.find((a) => a.applicationId.toUpperCase() === applicationId.trim().toUpperCase());
  },

  saveApplication(application: Application): Application {
    const apps = this.getApplications();
    const existingIndex = apps.findIndex((a) => a.applicationId === application.applicationId);
    if (existingIndex >= 0) {
      apps[existingIndex] = application;
    } else {
      apps.unshift(application);
    }
    setStoredItem(STORAGE_KEYS.APPLICATIONS, apps);
    return application;
  },

  updateApplication(applicationId: string, updates: Partial<Application>): Application | undefined {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.applicationId === applicationId);
    if (index === -1) return undefined;

    const updated: Application = {
      ...apps[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    apps[index] = updated;
    setStoredItem(STORAGE_KEYS.APPLICATIONS, apps);
    return updated;
  },

  deleteApplication(applicationId: string): boolean {
    const apps = this.getApplications();
    const filtered = apps.filter((a) => a.applicationId !== applicationId);
    if (filtered.length !== apps.length) {
      setStoredItem(STORAGE_KEYS.APPLICATIONS, filtered);
      return true;
    }
    return false;
  },

  // --- Program Settings ---
  getSettings(): ProgramSettings {
    const settings = getStoredItem<ProgramSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_PROGRAM_SETTINGS);
    if (!settings || settings.logoText === 'CitizenConnect' || settings.orgName?.includes('Citizen Welfare') || !settings.logoText) {
      const upgraded: ProgramSettings = {
        ...DEFAULT_PROGRAM_SETTINGS,
        ...settings,
        orgName: 'احساس پبلک ویلفیئر و قومی امداد پورٹل (Ehsaas Relief)',
        programName: 'احساس 10,000 روپے نقد امداد و 50GB مفت انٹرنیٹ ریلیف پیکیج 2026',
        logoText: 'احساس ریلیف (Ehsaas Relief)',
        footerText: 'احساس قومی ریلیف پورٹل 2026 • Ehsaas Qaumi Relief Program',
        contactPhone: '0800-24624',
      };
      setStoredItem(STORAGE_KEYS.SETTINGS, upgraded);
      return upgraded;
    }
    return settings;
  },

  saveSettings(settings: ProgramSettings): ProgramSettings {
    setStoredItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // --- WhatsApp Settings ---
  getWhatsAppSettings(): WhatsAppSettings {
    return getStoredItem<WhatsAppSettings>(STORAGE_KEYS.WHATSAPP, DEFAULT_WHATSAPP_SETTINGS);
  },

  saveWhatsAppSettings(settings: WhatsAppSettings): WhatsAppSettings {
    setStoredItem(STORAGE_KEYS.WHATSAPP, settings);
    return settings;
  },

  // --- Form Builder Fields ---
  getFormFields(): FormField[] {
    return getStoredItem<FormField[]>(STORAGE_KEYS.FORM_FIELDS, DEFAULT_FORM_FIELDS);
  },

  saveFormFields(fields: FormField[]): FormField[] {
    setStoredItem(STORAGE_KEYS.FORM_FIELDS, fields);
    return fields;
  },

  // --- Share / Outreach Tracking ---
  getShareInteractions(): ShareInteraction[] {
    return getStoredItem<ShareInteraction[]>(STORAGE_KEYS.SHARE_INTERACTIONS, []);
  },

  saveShareInteraction(interaction: ShareInteraction): void {
    const interactions = this.getShareInteractions();
    interactions.unshift(interaction);
    setStoredItem(STORAGE_KEYS.SHARE_INTERACTIONS, interactions);

    // If linked to an application, update that application's outreach history
    if (interaction.applicationId) {
      const app = this.getApplication(interaction.applicationId);
      if (app) {
        const history = app.outreachHistory || [];
        history.unshift(interaction);
        this.updateApplication(app.applicationId, { outreachHistory: history });
      }
    }
  },

  // --- Audit Logs ---
  getAuditLogs(): AuditLog[] {
    return getStoredItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(
    action: AuditLog['action'],
    target: string | undefined,
    details: string,
    adminEmail = 'admin@citizengrantportal.org',
    adminName = 'Super Admin'
  ): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: 'audit-' + Math.random().toString(36).substring(2, 9),
      action,
      timestamp: new Date().toISOString(),
      target,
      details,
      adminEmail,
      adminName,
    };
    logs.unshift(newLog);
    // Keep max 500 logs locally
    if (logs.length > 500) logs.length = 500;
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, logs);
  },

  // --- Admin Users ---
  getAdmins(): AdminUser[] {
    return getStoredItem<AdminUser[]>(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
  },

  saveAdmins(admins: AdminUser[]): void {
    setStoredItem(STORAGE_KEYS.ADMINS, admins);
  },

  // --- Reset & Import/Export Data ---
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.WHATSAPP);
    localStorage.removeItem(STORAGE_KEYS.FORM_FIELDS);
    localStorage.removeItem(STORAGE_KEYS.SHARE_INTERACTIONS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.ADMINS);

    // Re-seed initial demo dataset
    setStoredItem(STORAGE_KEYS.APPLICATIONS, INITIAL_DEMO_APPLICATIONS);
    setStoredItem(STORAGE_KEYS.SETTINGS, DEFAULT_PROGRAM_SETTINGS);
    setStoredItem(STORAGE_KEYS.WHATSAPP, DEFAULT_WHATSAPP_SETTINGS);
    setStoredItem(STORAGE_KEYS.FORM_FIELDS, DEFAULT_FORM_FIELDS);
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    setStoredItem(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
  },

  exportAllData(): Record<string, any> {
    return {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      applications: this.getApplications(),
      settings: this.getSettings(),
      whatsAppSettings: this.getWhatsAppSettings(),
      formFields: this.getFormFields(),
      shareInteractions: this.getShareInteractions(),
      auditLogs: this.getAuditLogs(),
      admins: this.getAdmins(),
    };
  },

  importData(data: any): boolean {
    try {
      if (!data || typeof data !== 'object') return false;
      if (Array.isArray(data.applications)) setStoredItem(STORAGE_KEYS.APPLICATIONS, data.applications);
      if (data.settings) setStoredItem(STORAGE_KEYS.SETTINGS, data.settings);
      if (data.whatsAppSettings) setStoredItem(STORAGE_KEYS.WHATSAPP, data.whatsAppSettings);
      if (Array.isArray(data.formFields)) setStoredItem(STORAGE_KEYS.FORM_FIELDS, data.formFields);
      if (Array.isArray(data.shareInteractions)) setStoredItem(STORAGE_KEYS.SHARE_INTERACTIONS, data.shareInteractions);
      if (Array.isArray(data.auditLogs)) setStoredItem(STORAGE_KEYS.AUDIT_LOGS, data.auditLogs);
      if (Array.isArray(data.admins)) setStoredItem(STORAGE_KEYS.ADMINS, data.admins);
      return true;
    } catch (err) {
      console.error('[storageService] Import failed:', err);
      return false;
    }
  },
};
