import { ShareInteraction } from '../types';
import { storageService } from './storageService';
import { generateSessionId } from '../utils/generators';

export const whatsappService = {
  getSettings() {
    return storageService.getWhatsAppSettings();
  },

  /**
   * Build the formatted message replacing dynamic tokens
   */
  formatShareMessage(
    template: string,
    params: {
      programName?: string;
      orgName?: string;
      url?: string;
      applicationId?: string;
    }
  ): string {
    const settings = storageService.getSettings();
    const waSettings = storageService.getWhatsAppSettings();

    const programName = params.programName || settings.programName;
    const orgName = params.orgName || settings.orgName;
    const url = params.url || waSettings.campaignUrl || window.location.origin;
    const appId = params.applicationId || '';
    const grantAmount = waSettings.grantAmountText || settings.grantAmountText || 'Rs. 10,000';

    let msg = template || waSettings.shareMessageTemplate;
    msg = msg.replace(/\{PROGRAM_NAME\}/g, programName);
    msg = msg.replace(/\{ORG_NAME\}/g, orgName);
    msg = msg.replace(/\{URL\}/g, url);
    msg = msg.replace(/\{APP_ID\}/g, appId);
    msg = msg.replace(/\{GRANT_AMOUNT\}/g, grantAmount);

    return msg.trim();
  },

  /**
   * Generates WhatsApp web / universal intent link
   */
  generateShareUrl(message: string, customPhone?: string): string {
    const encoded = encodeURIComponent(message);
    if (customPhone && customPhone.trim()) {
      const cleanPhone = customPhone.replace(/\D/g, '');
      return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
    }
    return `https://api.whatsapp.com/send?text=${encoded}`;
  },

  /**
   * Record a WhatsApp share initiation event.
   * Note: This measures client click/intent only, never pretends to confirm server delivery.
   */
  trackShareInteraction(
    placement: ShareInteraction['placement'],
    applicationId?: string
  ): ShareInteraction {
    let sessId = sessionStorage.getItem('citizengrant_sess_id');
    if (!sessId) {
      sessId = generateSessionId();
      sessionStorage.setItem('citizengrant_sess_id', sessId);
    }

    const interaction: ShareInteraction = {
      id: 'share-' + Math.random().toString(36).substring(2, 9),
      applicationId,
      placement,
      timestamp: new Date().toISOString(),
      sessionId: sessId,
      userAgent: navigator.userAgent || 'unknown',
    };

    storageService.saveShareInteraction(interaction);
    return interaction;
  },

  /**
   * Execute the share: records interaction and opens WhatsApp link safely
   */
  executeShare(params: {
    placement: ShareInteraction['placement'];
    applicationId?: string;
    customMessage?: string;
    targetUrl?: string;
  }): { shareUrl: string; interaction: ShareInteraction } {
    const waSettings = storageService.getWhatsAppSettings();
    const msg = this.formatShareMessage(params.customMessage || waSettings.shareMessageTemplate, {
      applicationId: params.applicationId,
      url: params.targetUrl,
    });

    const shareUrl = this.generateShareUrl(msg);
    const interaction = this.trackShareInteraction(params.placement, params.applicationId);

    // Open WhatsApp in new tab / app intent
    window.open(shareUrl, '_blank', 'noopener,noreferrer');

    return { shareUrl, interaction };
  },
};
