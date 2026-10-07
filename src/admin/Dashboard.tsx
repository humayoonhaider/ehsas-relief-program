import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Award,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Share2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { analyticsService } from '../services/analyticsService';
import { Application, ShareInteraction } from '../types';
import { ApplicationTable } from '../components/ApplicationTable';
import { StatusBadge } from '../components/StatusBadge';
import { formatDateTime, formatDate } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(analyticsService.getMetrics());
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [recentShares, setRecentShares] = useState<ShareInteraction[]>([]);

  const loadData = () => {
    setMetrics(analyticsService.getMetrics());
    const allApps = storageService.getApplications();
    setRecentApps(allApps.slice(0, 5));
    const allShares = storageService.getShareInteractions();
    setRecentShares(allShares.slice(0, 6));
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('citizengrant_storage_change', handleStorage);
    return () => window.removeEventListener('citizengrant_storage_change', handleStorage);
  }, []);

  return (
    <div>
      {/* Page Title & Quick Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Program Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Overview of grant applications, case evaluations, and WhatsApp community outreach.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/applications" className="btn btn-primary btn-sm">
            <Users size={16} />
            <span>Manage All Applications</span>
          </Link>
          <Link to="/admin/whatsapp" className="btn btn-whatsapp btn-sm">
            <MessageSquare size={16} />
            <span>Outreach Settings</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div
        className="stat-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {/* Total Applications */}
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Applications</span>
            <span className="stat-value">{metrics.totalApplications}</span>
            <span className="stat-subtext">{metrics.recentApplicationsCount} in past 7 days</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)' }}>
            <Users size={24} />
          </div>
        </div>

        {/* Under Review */}
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Under Review</span>
            <span className="stat-value" style={{ color: '#a16207' }}>
              {metrics.statusCounts.UNDER_REVIEW}
            </span>
            <span className="stat-subtext">Active evaluation queue</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fefce8', color: '#a16207' }}>
            <Clock size={24} />
          </div>
        </div>

        {/* Approved */}
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Approved</span>
            <span className="stat-value" style={{ color: '#15803d' }}>
              {metrics.statusCounts.APPROVED}
            </span>
            <span className="stat-subtext">Qualified for grant release</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>

        {/* WhatsApp Shares */}
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">WhatsApp Shares</span>
            <span className="stat-value" style={{ color: 'var(--whatsapp-dark)' }}>
              {metrics.totalSharesInitiated}
            </span>
            <span className="stat-subtext">{metrics.sharesPerApplicationRate}% share rate</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--whatsapp-light)', color: 'var(--whatsapp-dark)' }}>
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      {/* Secondary Status Counts Bar */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--navy-500)', marginBottom: '0.75rem' }}>
          Detailed Status Breakdown
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ borderLeft: '3px solid var(--status-submitted-text)', paddingLeft: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>Submitted</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-submitted-text)' }}>
              {metrics.statusCounts.SUBMITTED}
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--status-inforeq-text)', paddingLeft: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>Info Required</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-inforeq-text)' }}>
              {metrics.statusCounts.ADDITIONAL_INFO_REQUIRED}
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--status-rejected-text)', paddingLeft: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>Rejected</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-rejected-text)' }}>
              {metrics.statusCounts.REJECTED}
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--status-completed-text)', paddingLeft: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>Completed</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-completed-text)' }}>
              {metrics.statusCounts.COMPLETED}
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Recent Applications & Outreach Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="case-grid">
        {/* Left Column: Recent Applications */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Recent Applications
            </h3>
            <Link to="/admin/applications" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
              View All ({metrics.totalApplications})
            </Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <ApplicationTable applications={recentApps} />
          </div>
        </div>

        {/* Right Column: Outreach Activity Feed */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={18} color="var(--whatsapp-dark)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                Outreach Activity
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>
              {recentShares.length} logged
            </span>
          </div>

          <div className="card-body" style={{ padding: '1rem' }}>
            {recentShares.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No WhatsApp share interactions initiated yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentShares.map((share) => (
                  <div
                    key={share.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span
                        style={{
                          fontWeight: 700,
                          color: 'var(--whatsapp-dark)',
                          textTransform: 'uppercase',
                          fontSize: '0.7rem',
                        }}
                      >
                        {share.placement.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--navy-400)' }}>
                        {formatDateTime(share.timestamp)}
                      </span>
                    </div>

                    <div style={{ color: 'var(--navy-800)' }}>
                      {share.applicationId ? (
                        <span>
                          Shared with Case{' '}
                          <Link
                            to={`/admin/applications/${share.applicationId}`}
                            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                          >
                            {share.applicationId}
                          </Link>
                        </span>
                      ) : (
                        <span>General Program Share initiated</span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.7rem', color: 'var(--navy-500)', marginTop: '0.25rem' }}>
                      Session ID: {share.sessionId}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
