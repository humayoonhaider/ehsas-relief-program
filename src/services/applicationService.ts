import { Application, ApplicationStatus, FormField } from '../types';
import { storageService } from './storageService';
import { generateApplicationId } from '../utils/generators';
import { validateRequired } from '../utils/validation';

export interface ApplicationFilterOptions {
  searchQuery?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  hasOutreach?: 'all' | 'with_outreach' | 'without_outreach';
  sortBy?: 'newest' | 'oldest' | 'name' | 'status';
}

export const applicationService = {
  getAll(): Application[] {
    return storageService.getApplications();
  },

  getById(id: string): Application | undefined {
    return storageService.getApplication(id);
  },

  submitApplication(formData: {
    personalInfo: any;
    addressInfo: any;
    householdInfo?: any;
    reasonForApplication?: string;
    additionalInfo?: string;
    customFields?: Record<string, any>;
    whatsappVerifiedBeforeSubmit?: boolean;
  }): Application {
    const existing = storageService.getApplications();
    const newId = generateApplicationId(existing);
    const now = new Date().toISOString();

    const application: Application = {
      applicationId: newId,
      personalInfo: {
        fullName: formData.personalInfo.fullName || '',
        nationalId: formData.personalInfo.nationalId || '',
        phone: formData.personalInfo.phone || '',
        whatsappNumber: formData.personalInfo.whatsappNumber || formData.personalInfo.phone || '',
        email: formData.personalInfo.email || '',
        guardianName: formData.personalInfo.guardianName || '',
        dateOfBirth: formData.personalInfo.dateOfBirth || '',
        gender: formData.personalInfo.gender || '',
      },
      addressInfo: {
        address: formData.addressInfo.address || '',
        city: formData.addressInfo.city || formData.addressInfo.address || '',
        province: formData.addressInfo.province || '',
        district: formData.addressInfo.district || '',
        area: formData.addressInfo.area || '',
      },
      householdInfo: formData.householdInfo || {
        familyMembers: 1,
        dependents: 0,
        employmentStatus: 'Not specified',
        monthlyIncome: 0,
        housingStatus: 'Not specified',
      },
      reasonForApplication: formData.reasonForApplication || 'Financial / Livelihood Grant Application',
      additionalInfo: formData.additionalInfo || '',
      customFields: formData.customFields || {},
      whatsappVerifiedBeforeSubmit: formData.whatsappVerifiedBeforeSubmit ?? true,
      submissionDate: now,
      currentStatus: 'SUBMITTED',
      lastUpdated: now,
      statusHistory: [
        {
          status: 'SUBMITTED',
          timestamp: now,
          changedBy: 'Applicant (Public Portal)',
          note: formData.whatsappVerifiedBeforeSubmit
            ? 'Application submitted (WhatsApp outreach criteria verified)'
            : 'Application submitted',
        },
      ],
      notes: [],
      outreachHistory: formData.whatsappVerifiedBeforeSubmit
        ? [
            {
              id: 'share-pre-' + Math.random().toString(36).substring(2, 8),
              applicationId: newId,
              placement: 'pre_submission_criteria',
              timestamp: now,
              sessionId: sessionStorage.getItem('citizengrant_sess_id') || 'sess_portal',
              userAgent: navigator.userAgent || 'unknown',
            },
          ]
        : [],
    };

    storageService.saveApplication(application);
    storageService.addAuditLog(
      'APPLICATION_SUBMITTED',
      newId,
      `New application submitted by ${application.personalInfo.fullName} (${application.personalInfo.phone})`,
      'portal@citizengrantportal.org',
      'Public Portal'
    );

    return application;
  },

  updateStatus(
    applicationId: string,
    newStatus: ApplicationStatus,
    adminEmail: string,
    adminName: string,
    note?: string
  ): Application | undefined {
    const app = storageService.getApplication(applicationId);
    if (!app) return undefined;

    const history = app.statusHistory || [];
    history.unshift({
      status: newStatus,
      timestamp: new Date().toISOString(),
      changedBy: `${adminName} (${adminEmail})`,
      note: note || undefined,
    });

    const updated = storageService.updateApplication(applicationId, {
      currentStatus: newStatus,
      statusHistory: history,
    });

    storageService.addAuditLog(
      'STATUS_CHANGED',
      applicationId,
      `Status changed from ${app.currentStatus} to ${newStatus}${note ? ` (Note: ${note})` : ''}`,
      adminEmail,
      adminName
    );

    return updated;
  },

  addCaseNote(applicationId: string, text: string, adminEmail: string, adminName: string): Application | undefined {
    const app = storageService.getApplication(applicationId);
    if (!app) return undefined;

    const notes = app.notes || [];
    notes.unshift({
      id: 'note-' + Math.random().toString(36).substring(2, 8),
      author: adminName,
      timestamp: new Date().toISOString(),
      text,
    });

    const updated = storageService.updateApplication(applicationId, { notes });
    storageService.addAuditLog('NOTE_ADDED', applicationId, `Internal note added by ${adminName}`, adminEmail, adminName);
    return updated;
  },

  deleteApplication(applicationId: string, adminEmail: string, adminName: string): boolean {
    const success = storageService.deleteApplication(applicationId);
    if (success) {
      storageService.addAuditLog('APPLICATION_DELETED', applicationId, `Application deleted`, adminEmail, adminName);
    }
    return success;
  },

  filterApplications(applications: Application[], options: ApplicationFilterOptions): Application[] {
    let result = [...applications];

    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.applicationId.toLowerCase().includes(q) ||
          a.personalInfo?.fullName?.toLowerCase().includes(q) ||
          a.personalInfo?.email?.toLowerCase().includes(q) ||
          a.personalInfo?.phone?.toLowerCase().includes(q) ||
          a.personalInfo?.nationalId?.toLowerCase().includes(q) ||
          a.addressInfo?.city?.toLowerCase().includes(q)
      );
    }

    if (options.status && options.status !== 'ALL') {
      result = result.filter((a) => a.currentStatus === options.status);
    }

    if (options.startDate) {
      const start = new Date(options.startDate).getTime();
      result = result.filter((a) => new Date(a.submissionDate).getTime() >= start);
    }

    if (options.endDate) {
      const end = new Date(options.endDate).getTime() + 86400000; // End of day
      result = result.filter((a) => new Date(a.submissionDate).getTime() <= end);
    }

    if (options.hasOutreach && options.hasOutreach !== 'all') {
      if (options.hasOutreach === 'with_outreach') {
        result = result.filter((a) => (a.outreachHistory?.length || 0) > 0);
      } else if (options.hasOutreach === 'without_outreach') {
        result = result.filter((a) => (a.outreachHistory?.length || 0) === 0);
      }
    }

    // Sorting
    result.sort((a, b) => {
      switch (options.sortBy) {
        case 'oldest':
          return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
        case 'name':
          return (a.personalInfo?.fullName || '').localeCompare(b.personalInfo?.fullName || '');
        case 'status':
          return a.currentStatus.localeCompare(b.currentStatus);
        case 'newest':
        default:
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      }
    });

    return result;
  },

  /**
   * Calculates actual form completion percentage based on active required fields filled
   */
  calculateActualProgress(
    formData: {
      personalInfo: any;
      addressInfo: any;
      householdInfo: any;
      reasonForApplication: string;
      additionalInfo?: string;
      customFields?: Record<string, any>;
    },
    formFields: FormField[]
  ): number {
    const activeRequired = formFields.filter((f) => f.isActive && f.required);
    if (activeRequired.length === 0) return 100;

    let filledRequiredCount = 0;

    activeRequired.forEach((field) => {
      let val: any;
      if (field.section === 'personal') {
        val = formData.personalInfo?.[field.name];
      } else if (field.section === 'address') {
        val = formData.addressInfo?.[field.name];
      } else if (field.section === 'household') {
        val = formData.householdInfo?.[field.name];
      } else if (field.name === 'reasonForApplication') {
        val = formData.reasonForApplication;
      } else if (field.name === 'additionalInfo') {
        val = formData.additionalInfo;
      } else {
        val = formData.customFields?.[field.name];
      }

      if (validateRequired(val)) {
        filledRequiredCount++;
      }
    });

    return Math.round((filledRequiredCount / activeRequired.length) * 100);
  },
};
