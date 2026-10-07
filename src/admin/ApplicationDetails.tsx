import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  MapPin,
  Home,
  FileCheck,
  Clock,
  MessageSquare,
  Plus,
  Trash2,
  Printer,
  Shield,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import { storageService } from '../services/storageService';
import { applicationService } from '../services/applicationService';
import { authService } from '../services/authService';
import { STATUS_CONFIG } from '../utils/constants';
import { formatDate, formatDateTime } from '../utils/formatters';
import { exportToCSV, exportToJSON } from '../utils/generators';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';

export const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const [application, setApplication] = useState<Application | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('UNDER_REVIEW');
  const [statusNote, setStatusNote] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const loadData = () => {
    if (id) {
      const app = storageService.getApplication(id);
      if (app) {
        setApplication(app);
        setSelectedStatus(app.currentStatus);
      } else {
        setApplication(null);
      }
    }
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('citizengrant_storage_change', handleStorage);
    return () => window.removeEventListener('citizengrant_storage_change', handleStorage);
  }, [id]);

  if (!application) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
          Application Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          The requested application ID "{id}" could not be located in local storage.
        </p>
        <Link to="/admin/applications" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Applications List</span>
        </Link>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentUser) return;

    applicationService.addCaseNote(
      application.applicationId,
      newNoteText.trim(),
      currentUser.email,
      currentUser.name
    );
    setNewNoteText('');
    loadData();
  };

  const handleStatusUpdate = () => {
    if (!currentUser) return;
    applicationService.updateStatus(
      application.applicationId,
      selectedStatus,
      currentUser.email,
      currentUser.name,
      statusNote.trim() || undefined
    );
    setStatusModalOpen(false);
    setStatusNote('');
    loadData();
  };

  const handleDelete = () => {
    if (!currentUser) return;
    applicationService.deleteApplication(application.applicationId, currentUser.email, currentUser.name);
    setDeleteConfirmOpen(false);
    navigate('/admin/applications');
  };

  const handleExportSingle = () => {
    exportToJSON(application, `application_${application.applicationId}.json`);
  };

  return (
    <div>
      {/* Top Breadcrumb & Actions Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/admin/applications" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            <span>Applications</span>
          </Link>
          <span style={{ color: 'var(--navy-300)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--navy-900)' }}>
            {application.applicationId}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setStatusModalOpen(true)}
            icon={<CheckCircle2 size={16} />}
          >
            Change Status
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            icon={<Printer size={16} />}
          >
            Print Case
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportSingle}
            icon={<Download size={16} />}
          >
            Export JSON
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteConfirmOpen(true)}
            icon={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Case Management Header Card */}
      <div
        className="card"
        style={{
          padding: '1.75rem',
          marginBottom: '1.5rem',
          borderLeft: `6px solid ${STATUS_CONFIG[application.currentStatus]?.color || 'var(--primary-600)'}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-mono)' }}>
                {application.applicationId}
              </h2>
              <StatusBadge status={application.currentStatus} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-800)' }}>
              {application.personalInfo?.fullName}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--navy-500)', marginTop: '0.2rem' }}>
              Submitted {formatDateTime(application.submissionDate)} • Last Updated {formatDateTime(application.lastUpdated)}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              backgroundColor: 'var(--surface-subtle)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-700)' }}>
              <Phone size={15} color="var(--primary-600)" />
              <span>{application.personalInfo?.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-700)' }}>
              <Mail size={15} color="var(--primary-600)" />
              <span>{application.personalInfo?.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-700)' }}>
              <MapPin size={15} color="var(--primary-600)" />
              <span>
                {application.addressInfo?.city}, {application.addressInfo?.province}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Case Data & Internal Logs */}
      <div className="case-grid">
        {/* Left Column: Complete Submitted Form Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. Core 5 Submitted Fields */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                Core Applicant Information (5 Fields)
              </h3>
              <span
                style={{
                  backgroundColor: 'var(--whatsapp-light)',
                  color: 'var(--whatsapp-dark)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                ✓ WhatsApp Meter: {application.shareMeter?.meterPercentage || 100}%
              </span>
            </div>
            <div className="card-body">
              <div className="data-pair-grid">
                <div className="data-pair">
                  <span className="data-pair-label">1. Full Name (پورا نام)</span>
                  <span className="data-pair-value font-bold" style={{ fontSize: '1.05rem' }}>
                    {application.personalInfo?.fullName || '—'}
                  </span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">2. CNIC / National ID (شناختی کارڈ)</span>
                  <span className="data-pair-value font-bold" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>
                    {application.personalInfo?.nationalId || '—'}
                  </span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">3. Phone Number (فون نمبر)</span>
                  <span className="data-pair-value">{application.personalInfo?.phone || '—'}</span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">4. WhatsApp Number (واٹس ایپ نمبر)</span>
                  <span className="data-pair-value">{application.personalInfo?.whatsappNumber || application.personalInfo?.phone || '—'}</span>
                </div>
                <div className="data-pair" style={{ gridColumn: 'span 2' }}>
                  <span className="data-pair-label">5. Complete Address & City (مکمل پتہ اور شہر)</span>
                  <span className="data-pair-value" style={{ lineHeight: '1.5' }}>
                    {application.addressInfo?.address || '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Direct Rs. 10,000 Disbursement Account Information */}
          <div className="card" style={{ border: '2px solid #a7f3d0' }}>
            <div className="card-header" style={{ backgroundColor: '#f0fdf4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  DISBURSEMENT ACCOUNT
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#064e3b' }}>
                  Payment Details for Rs. 10,000 Transfer
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="data-pair-grid">
                <div className="data-pair">
                  <span className="data-pair-label">Account / Wallet Type</span>
                  <span className="data-pair-value font-bold" style={{ color: '#059669', fontSize: '1.05rem' }}>
                    {application.paymentAccount?.accountType || application.customFields?.accountType || 'Easypaisa / JazzCash'}
                  </span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">Account Number / Mobile Wallet</span>
                  <span className="data-pair-value font-bold" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--navy-900)' }}>
                    {application.paymentAccount?.accountNumber || application.customFields?.accountNumber || application.personalInfo?.phone || '—'}
                  </span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">Account Title / Beneficiary Name</span>
                  <span className="data-pair-value font-bold">
                    {application.paymentAccount?.accountTitle || application.customFields?.accountTitle || application.personalInfo?.fullName || '—'}
                  </span>
                </div>
                {application.paymentAccount?.bankName && (
                  <div className="data-pair">
                    <span className="data-pair-label">Bank Name</span>
                    <span className="data-pair-value">{application.paymentAccount.bankName}</span>
                  </div>
                )}
                <div className="data-pair" style={{ gridColumn: 'span 2' }}>
                  <span className="data-pair-label">WhatsApp Outreach Meter Audit</span>
                  <span className="data-pair-value" style={{ color: 'var(--whatsapp-dark)', fontWeight: 600 }}>
                    ✓ 10 Contacts + 1 Group Logged (100% Qualified)
                  </span>
                </div>
              </div>

              {/* Verified WhatsApp Recipients Ledger Table */}
              {application.shareMeter?.verifiedRecipients && application.shareMeter.verifiedRecipients.length > 0 && (
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
                    Verified Recipient WhatsApp Numbers (10 Friends Log):
                  </h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--navy-50)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                          <th style={{ padding: '0.4rem 0.5rem' }}>Slot</th>
                          <th style={{ padding: '0.4rem 0.5rem' }}>Recipient Name</th>
                          <th style={{ padding: '0.4rem 0.5rem' }}>WhatsApp Phone</th>
                          <th style={{ padding: '0.4rem 0.5rem' }}>Security Token</th>
                          <th style={{ padding: '0.4rem 0.5rem' }}>Verified At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {application.shareMeter.verifiedRecipients.map((rec) => (
                          <tr key={rec.index} style={{ borderBottom: '1px solid var(--navy-100)' }}>
                            <td style={{ padding: '0.4rem 0.5rem', fontWeight: 700 }}>#{rec.index}</td>
                            <td style={{ padding: '0.4rem 0.5rem' }}>{rec.recipientName || 'Friend'}</td>
                            <td style={{ padding: '0.4rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{rec.recipientPhone}</td>
                            <td style={{ padding: '0.4rem 0.5rem', color: 'var(--primary-700)', fontFamily: 'var(--font-mono)' }}>{rec.verificationCode}</td>
                            <td style={{ padding: '0.4rem 0.5rem', color: 'var(--navy-500)' }}>{formatDateTime(rec.verifiedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {application.shareMeter.groupNameOrProof && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--navy-800)' }}>
                      <strong>Group Target:</strong> {application.shareMeter.groupNameOrProof}
                      {application.shareMeter.screenshotProofUrl && (
                        <span style={{ marginLeft: '0.5rem', color: '#059669', fontWeight: 600 }}>
                          (Attachment: {application.shareMeter.screenshotProofUrl})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3. Household & Socio-Economic */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                3. Household & Financial Information
              </h3>
            </div>
            <div className="card-body">
              <div className="data-pair-grid">
                <div className="data-pair">
                  <span className="data-pair-label">Total Family Members</span>
                  <span className="data-pair-value">{application.householdInfo?.familyMembers || 1}</span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">Number of Dependents</span>
                  <span className="data-pair-value">{application.householdInfo?.dependents || 0}</span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">Primary Employment</span>
                  <span className="data-pair-value">{application.householdInfo?.employmentStatus || '—'}</span>
                </div>
                <div className="data-pair">
                  <span className="data-pair-label">Monthly Household Income</span>
                  <span className="data-pair-value font-bold" style={{ color: 'var(--primary-700)' }}>
                    ${application.householdInfo?.monthlyIncome || 0} / month
                  </span>
                </div>
                <div className="data-pair" style={{ gridColumn: 'span 2' }}>
                  <span className="data-pair-label">Housing Tenancy Status</span>
                  <span className="data-pair-value">{application.householdInfo?.housingStatus || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Reason for Application */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                4. Application Statement
              </h3>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="data-pair-label">Reason for Application</span>
                <p style={{ fontSize: '0.9375rem', color: 'var(--navy-900)', marginTop: '0.35rem', lineHeight: '1.6' }}>
                  {application.reasonForApplication || '—'}
                </p>
              </div>

              {application.additionalInfo && (
                <div>
                  <span className="data-pair-label">Additional Information / References</span>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--navy-800)', marginTop: '0.35rem', lineHeight: '1.6' }}>
                    {application.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 5. Custom Dynamic Fields (if any filled) */}
          {application.customFields && Object.keys(application.customFields).length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  5. Additional Configured Fields
                </h3>
              </div>
              <div className="card-body">
                <div className="data-pair-grid">
                  {Object.entries(application.customFields).map(([key, val]) => (
                    <div key={key} className="data-pair">
                      <span className="data-pair-label">{key}</span>
                      <span className="data-pair-value">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Case Worker Notes, Status History, & Outreach Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Internal Case Worker Notes */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                Internal Case Notes
              </h3>
            </div>
            <div className="card-body">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={{ marginBottom: '1.25rem' }}>
                <Textarea
                  rows={2}
                  placeholder="Add confidential caseworker note or verification log..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  style={{ fontSize: '0.875rem' }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!newNoteText.trim()}
                  icon={<Plus size={14} />}
                  style={{ marginTop: '0.5rem', width: '100%' }}
                >
                  Add Case Note
                </Button>
              </form>

              {/* Notes List */}
              {application.notes && application.notes.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {application.notes.map((note) => (
                    <div
                      key={note.id}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: 'var(--surface-subtle)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        fontSize: '0.8125rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <strong style={{ color: 'var(--navy-900)' }}>{note.author}</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--navy-400)' }}>
                          {formatDateTime(note.timestamp)}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--navy-800)', lineHeight: '1.45' }}>
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  No internal notes recorded for this case yet.
                </div>
              )}
            </div>
          </div>

          {/* Status Progression Timeline */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                Evaluation Timeline
              </h3>
            </div>
            <div className="card-body">
              <div className="timeline">
                {application.statusHistory?.map((hist, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <StatusBadge status={hist.status} size="sm" />
                        <span style={{ fontSize: '0.7rem', color: 'var(--navy-400)' }}>
                          {formatDateTime(hist.timestamp)}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)', marginTop: '0.2rem' }}>
                        By: {hist.changedBy}
                      </div>
                      {hist.note && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--navy-700)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                          "{hist.note}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Outreach Interactions Linked to Case */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={16} color="var(--whatsapp-dark)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  WhatsApp Outreach Activity
                </h3>
              </div>
            </div>
            <div className="card-body">
              {application.outreachHistory && application.outreachHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {application.outreachHistory.map((share) => (
                    <div
                      key={share.id}
                      style={{
                        padding: '0.65rem 0.75rem',
                        backgroundColor: 'var(--whatsapp-light)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(37, 211, 102, 0.2)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--whatsapp-dark)' }}>
                        <span>Share Initiated ({share.placement})</span>
                        <span>{formatDateTime(share.timestamp)}</span>
                      </div>
                      <div style={{ color: 'var(--navy-600)', marginTop: '0.2rem' }}>
                        Session: {share.sessionId}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  No WhatsApp outreach interactions logged for this applicant.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Status Modal */}
      <Modal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title="Update Case Status"
        footer={
          <>
            <Button variant="secondary" onClick={() => setStatusModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleStatusUpdate}>
              Save Status Update
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">New Application Status</label>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
            >
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ADDITIONAL_INFO_REQUIRED">Additional Information Required</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <Textarea
            label="Evaluation / Status Change Note (Optional)"
            placeholder="e.g. Income documents verified. Case assigned to grant disbursement tranche 1."
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Application Record?"
        message={`Are you sure you want to permanently delete application ${application.applicationId}? This will remove all case notes, status history, and applicant details from local storage.`}
        confirmText="Delete Case"
        variant="danger"
      />
    </div>
  );
};
