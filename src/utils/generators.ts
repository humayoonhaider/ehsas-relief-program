import { Application } from '../types';

export function generateApplicationId(existingApps: Application[]): string {
  const currentYear = new Date().getFullYear();
  const count = existingApps.length + 1;
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const paddedIndex = String(count).padStart(3, '0');
  return `APP-${currentYear}-${paddedIndex}${randomSuffix.toString().slice(-2)}`;
}

export function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 10);
}

export function exportToCSV(applications: Application[], filename = 'applications_export.csv'): void {
  if (!applications || applications.length === 0) return;

  const headers = [
    'Application ID',
    'Full Name',
    'Guardian Name',
    'Gender',
    'Date of Birth',
    'National ID',
    'Phone',
    'WhatsApp Number',
    'Email',
    'Province',
    'District',
    'City',
    'Address',
    'Family Members',
    'Dependents',
    'Employment Status',
    'Monthly Income',
    'Housing Status',
    'Current Status',
    'Submission Date',
    'Last Updated',
    'Reason for Application',
  ];

  const rows = applications.map((app) => [
    app.applicationId,
    `"${(app.personalInfo?.fullName || '').replace(/"/g, '""')}"`,
    `"${(app.personalInfo?.guardianName || '').replace(/"/g, '""')}"`,
    app.personalInfo?.gender || '',
    app.personalInfo?.dateOfBirth || '',
    `"${app.personalInfo?.nationalId || ''}"`,
    `"${app.personalInfo?.phone || ''}"`,
    `"${app.personalInfo?.whatsappNumber || ''}"`,
    `"${app.personalInfo?.email || ''}"`,
    `"${(app.addressInfo?.province || '').replace(/"/g, '""')}"`,
    `"${(app.addressInfo?.district || '').replace(/"/g, '""')}"`,
    `"${(app.addressInfo?.city || '').replace(/"/g, '""')}"`,
    `"${(app.addressInfo?.address || '').replace(/"/g, '""')}"`,
    app.householdInfo?.familyMembers || '',
    app.householdInfo?.dependents || '',
    `"${(app.householdInfo?.employmentStatus || '').replace(/"/g, '""')}"`,
    app.householdInfo?.monthlyIncome || '',
    `"${(app.householdInfo?.housingStatus || '').replace(/"/g, '""')}"`,
    app.currentStatus,
    app.submissionDate,
    app.lastUpdated,
    `"${(app.reasonForApplication || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data: any, filename = 'citizengrant_export.json'): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
