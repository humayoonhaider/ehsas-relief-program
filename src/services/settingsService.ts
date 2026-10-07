import { ProgramSettings, WhatsAppSettings, FormField } from '../types';
import { storageService } from './storageService';

export const settingsService = {
  getProgramSettings(): ProgramSettings {
    return storageService.getSettings();
  },

  updateProgramSettings(settings: ProgramSettings, adminEmail: string, adminName: string): ProgramSettings {
    const saved = storageService.saveSettings(settings);
    storageService.addAuditLog('SETTINGS_UPDATED', undefined, 'Program general settings updated', adminEmail, adminName);
    return saved;
  },

  getWhatsAppSettings(): WhatsAppSettings {
    return storageService.getWhatsAppSettings();
  },

  updateWhatsAppSettings(settings: WhatsAppSettings, adminEmail: string, adminName: string): WhatsAppSettings {
    const saved = storageService.saveWhatsAppSettings(settings);
    storageService.addAuditLog('WHATSAPP_SETTINGS_UPDATED', undefined, 'WhatsApp outreach settings updated', adminEmail, adminName);
    return saved;
  },

  getFormFields(): FormField[] {
    return storageService.getFormFields();
  },

  updateFormFields(fields: FormField[], adminEmail: string, adminName: string): FormField[] {
    const saved = storageService.saveFormFields(fields);
    storageService.addAuditLog('FORM_UPDATED', undefined, `Form schema updated (${fields.length} fields total)`, adminEmail, adminName);
    return saved;
  },
};
