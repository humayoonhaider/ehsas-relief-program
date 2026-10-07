import React, { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';
import { exportToCSV, exportToJSON } from '../utils/generators';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const DataManagementPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleExportFullBackup = () => {
    const backup = storageService.exportAllData();
    exportToJSON(backup, `citizengrant_full_backup_${Date.now()}.json`);
    if (currentUser) {
      storageService.addAuditLog('DATA_EXPORTED', undefined, 'Full database JSON backup exported', currentUser.email, currentUser.name);
    }
    showToast('Full system backup JSON exported successfully.');
  };

  const handleExportCSV = () => {
    const apps = storageService.getApplications();
    exportToCSV(apps, `applications_full_${Date.now()}.csv`);
    showToast(`Exported ${apps.length} application records to CSV.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const success = storageService.importData(parsed);
        if (success) {
          if (currentUser) {
            storageService.addAuditLog('DATA_IMPORTED', undefined, 'Imported database backup from JSON file', currentUser.email, currentUser.name);
          }
          showToast('Database backup successfully restored!');
          setImportStatus('Backup restored successfully.');
        } else {
          setImportStatus('Failed to restore data: invalid structure.');
        }
      } catch (err) {
        setImportStatus('Error reading file: invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDemo = () => {
    storageService.resetToDefaults();
    if (currentUser) {
      storageService.addAuditLog('DATA_RESET', undefined, 'Database re-seeded with initial demo dataset', currentUser.email, currentUser.name);
    }
    setResetConfirmOpen(false);
    showToast('Re-seeded portal with rich demo cases and settings.');
  };

  return (
    <div>
      {toastMsg && (
        <div
          className="alert alert-success"
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 100,
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <CheckCircle size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Data Management & Backups
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Export local datasets, restore JSON backups, manage storage persistence, and reset sample cases.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Export Card */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <Download size={22} color="var(--primary-600)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Export Data
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Download a portable copy of all applications, outreach history, form builder configurations, and audit logs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button variant="primary" onClick={handleExportFullBackup} icon={<FileCode size={18} />}>
              Download Full JSON Backup
            </Button>

            <Button variant="secondary" onClick={handleExportCSV} icon={<FileSpreadsheet size={18} />}>
              Download Applications (CSV Spreadsheet)
            </Button>
          </div>
        </div>

        {/* Restore Backup Card */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <Upload size={22} color="var(--accent-600)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Restore from Backup
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Import a previously exported JSON backup file to overwrite current local storage state.
          </p>

          <div>
            <label className="btn btn-secondary btn-block" style={{ cursor: 'pointer', textAlign: 'center' }}>
              <Upload size={18} />
              <span>Select JSON Backup File</span>
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
            {importStatus && (
              <div style={{ fontSize: '0.8125rem', color: 'var(--navy-700)', marginTop: '0.75rem', textAlign: 'center' }}>
                {importStatus}
              </div>
            )}
          </div>
        </div>

        {/* Re-seed Sample Data Card */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <RotateCcw size={22} color="var(--primary-700)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Seed / Reset Demo Dataset
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Restores initial realistic demo applicant cases, statuses, internal notes, and WhatsApp outreach interactions.
          </p>

          <Button variant="outline" onClick={() => setResetConfirmOpen(true)} icon={<RotateCcw size={18} />}>
            Restore Demo Applications & Schema
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        onConfirm={handleResetToDemo}
        title="Reset Portal to Demo Dataset?"
        message="This will replace current applications with the 5 curated sample cases and default program settings."
        confirmText="Reset to Demo"
        variant="primary"
      />
    </div>
  );
};
