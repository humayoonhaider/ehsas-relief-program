import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Phone, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { Application } from '../types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatters';

interface ApplicationCardProps {
  application: Application;
  onStatusChange?: (id: string, newStatus: any) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const shareCount = application.outreachHistory?.length || 0;

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-header" style={{ padding: '1rem 1.25rem' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--navy-900)',
            }}
          >
            {application.applicationId}
          </span>
          <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)', marginTop: '0.15rem' }}>
            Submitted {formatDate(application.submissionDate)}
          </div>
        </div>
        <StatusBadge status={application.currentStatus} />
      </div>

      <div className="card-body" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            <User size={16} color="var(--primary-600)" />
            <span>{application.personalInfo?.fullName || 'Anonymous Applicant'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-600)' }}>
            <Phone size={15} color="var(--navy-400)" />
            <span>{application.personalInfo?.phone || '—'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-600)' }}>
            <MapPin size={15} color="var(--navy-400)" />
            <span>
              {application.addressInfo?.city}, {application.addressInfo?.province}
            </span>
          </div>

          {shareCount > 0 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                color: 'var(--whatsapp-dark)',
                backgroundColor: 'var(--whatsapp-light)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                width: 'fit-content',
                marginTop: '0.25rem',
                fontWeight: 600,
              }}
            >
              <MessageSquare size={13} /> {shareCount} WhatsApp Share{shareCount > 1 ? 's' : ''} logged
            </div>
          )}
        </div>
      </div>

      <div className="card-footer" style={{ padding: '0.75rem 1.25rem' }}>
        <Link
          to={`/admin/applications/${application.applicationId}`}
          className="btn btn-outline btn-sm"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <span>View Case Details</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};
