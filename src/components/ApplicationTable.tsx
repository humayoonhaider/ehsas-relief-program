import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatters';

interface ApplicationTableProps {
  applications: Application[];
  onStatusChange?: (id: string, newStatus: ApplicationStatus) => void;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  onSelectAll?: () => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
}) => {
  const isAllSelected = applications.length > 0 && selectedIds.length === applications.length;

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {onToggleSelect && onSelectAll && (
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  aria-label="Select all applications"
                />
              </th>
            )}
            <th>Application ID</th>
            <th>Applicant & CNIC</th>
            <th>Contact Number</th>
            <th>Disbursement Account</th>
            <th>Location</th>
            <th>Status</th>
            <th>Outreach Meter</th>
            <th>Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => {
            const isSelected = selectedIds.includes(app.applicationId);
            const shareMeterScore = app.shareMeter?.meterPercentage || 100;

            return (
              <tr key={app.applicationId} style={{ backgroundColor: isSelected ? 'var(--primary-50)' : undefined }}>
                {onToggleSelect && (
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(app.applicationId)}
                      aria-label={`Select ${app.applicationId}`}
                    />
                  </td>
                )}
                <td>
                  <Link
                    to={`/admin/applications/${app.applicationId}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: 'var(--primary-700)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    {app.applicationId}
                  </Link>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>
                    {app.personalInfo?.fullName || '—'}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--navy-600)' }}>
                    CNIC: {app.personalInfo?.nationalId || '—'}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--navy-800)', fontWeight: 600 }}>
                    {app.personalInfo?.phone || '—'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--whatsapp-dark)' }}>
                    WA: {app.personalInfo?.whatsappNumber || app.personalInfo?.phone || '—'}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#059669' }}>
                    {app.paymentAccount?.accountType || app.customFields?.accountType || 'Easypaisa / JazzCash'}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--navy-600)' }}>
                    {app.paymentAccount?.accountNumber || app.customFields?.accountNumber || app.personalInfo?.phone || '—'}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8125rem' }}>{app.addressInfo?.city || app.addressInfo?.address || '—'}</div>
                </td>
                <td>
                  <StatusBadge status={app.currentStatus} size="sm" />
                </td>
                <td>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--whatsapp-dark)',
                      backgroundColor: 'var(--whatsapp-light)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <MessageSquare size={12} /> {shareMeterScore}% Done
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.75rem', color: 'var(--navy-600)' }}>
                    {formatDate(app.submissionDate)}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    to={`/admin/applications/${app.applicationId}`}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <span>Open Case</span>
                    <ExternalLink size={13} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
