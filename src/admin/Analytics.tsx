import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  MessageSquare,
  Users,
  MapPin,
  Home,
  CheckCircle2,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { analyticsService, AnalyticsMetrics } from '../services/analyticsService';
import { storageService } from '../services/storageService';
import { STATUS_CONFIG } from '../utils/constants';
import { ApplicationStatus } from '../types';

export const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>(analyticsService.getMetrics());

  useEffect(() => {
    const load = () => setMetrics(analyticsService.getMetrics());
    load();
    window.addEventListener('citizengrant_storage_change', load);
    return () => window.removeEventListener('citizengrant_storage_change', load);
  }, []);

  const hasData = metrics.totalApplications > 0;
  const maxDaily = Math.max(1, ...metrics.dailySubmissions.map((d) => d.count));

  return (
    <div>
      {/* Top Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Program Analytics & Insights
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Real-time metrics computed directly from stored applicant cases and outreach interactions.
        </p>
      </div>

      {!hasData ? (
        <div className="card" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <BarChart3 size={48} color="var(--navy-300)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
            No Data Available
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
            Analytics will populate automatically as applicants submit grant applications and initiate WhatsApp shares.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Total Submissions</span>
                <span className="stat-value">{metrics.totalApplications}</span>
                <span className="stat-subtext">100% verified case files</span>
              </div>
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)' }}>
                <Users size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">WhatsApp Shares Initiated</span>
                <span className="stat-value" style={{ color: 'var(--whatsapp-dark)' }}>
                  {metrics.totalSharesInitiated}
                </span>
                <span className="stat-subtext">{metrics.sharesPerApplicationRate}% share rate per case</span>
              </div>
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--whatsapp-light)', color: 'var(--whatsapp-dark)' }}>
                <MessageSquare size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Approval Ratio</span>
                <span className="stat-value" style={{ color: '#15803d' }}>
                  {metrics.totalApplications > 0
                    ? Math.round((metrics.statusCounts.APPROVED / metrics.totalApplications) * 100)
                    : 0}
                  %
                </span>
                <span className="stat-subtext">{metrics.statusCounts.APPROVED} total approvals</span>
              </div>
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>

          {/* Section: Status Distribution Chart & Daily Trend */}
          <div className="case-grid">
            {/* Status Breakdown */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
                Application Status Distribution
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(Object.keys(STATUS_CONFIG) as ApplicationStatus[]).map((st) => {
                  const count = metrics.statusCounts[st] || 0;
                  const pct = metrics.totalApplications > 0 ? Math.round((count / metrics.totalApplications) * 100) : 0;
                  const meta = STATUS_CONFIG[st];

                  return (
                    <div key={st} className="chart-bar-row">
                      <div className="chart-bar-label">{meta.label}</div>
                      <div className="chart-bar-track">
                        <div
                          className="chart-bar-fill"
                          style={{
                            width: `${Math.max(8, pct)}%`,
                            backgroundColor: meta.color,
                          }}
                        >
                          {count} ({pct}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Submission Activity */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
                Submission Activity by Date
              </h3>

              {metrics.dailySubmissions.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                  No submission date records.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {metrics.dailySubmissions.map((d) => {
                    const barWidth = Math.round((d.count / maxDaily) * 100);
                    return (
                      <div key={d.date} className="chart-bar-row">
                        <div className="chart-bar-label" style={{ fontFamily: 'var(--font-mono)' }}>
                          {d.date}
                        </div>
                        <div className="chart-bar-track">
                          <div
                            className="chart-bar-fill"
                            style={{
                              width: `${Math.max(12, barWidth)}%`,
                              backgroundColor: 'var(--primary-600)',
                            }}
                          >
                            {d.count} apps
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Section: Household Income & Regional Breakdown */}
          <div className="case-grid">
            {/* Income Brackets */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <DollarSign size={18} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  Household Income Distribution
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {metrics.incomeBreakdown.map((b) => {
                  const pct = metrics.totalApplications > 0 ? Math.round((b.count / metrics.totalApplications) * 100) : 0;
                  return (
                    <div key={b.bracket} className="chart-bar-row">
                      <div className="chart-bar-label">{b.bracket}</div>
                      <div className="chart-bar-track">
                        <div
                          className="chart-bar-fill"
                          style={{
                            width: `${Math.max(10, pct)}%`,
                            backgroundColor: '#0284c7',
                          }}
                        >
                          {b.count} cases ({pct}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regional / Province Breakdown */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <MapPin size={18} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  Regional / Province Breakdown
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {metrics.provinceBreakdown.map((p) => {
                  const pct = metrics.totalApplications > 0 ? Math.round((p.count / metrics.totalApplications) * 100) : 0;
                  return (
                    <div key={p.province} className="chart-bar-row">
                      <div className="chart-bar-label">{p.province}</div>
                      <div className="chart-bar-track">
                        <div
                          className="chart-bar-fill"
                          style={{
                            width: `${Math.max(10, pct)}%`,
                            backgroundColor: '#6366f1',
                          }}
                        >
                          {p.count} cases ({pct}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
