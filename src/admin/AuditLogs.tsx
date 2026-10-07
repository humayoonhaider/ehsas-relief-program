import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Shield,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { AuditLog } from '../types';
import { storageService } from '../services/storageService';
import { formatDateTime } from '../utils/formatters';
import { exportToJSON } from '../utils/generators';
import { Button } from '../components/Button';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const loadData = () => {
    setLogs(storageService.getAuditLogs());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('citizengrant_storage_change', loadData);
    return () => window.removeEventListener('citizengrant_storage_change', loadData);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !searchQuery ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.target && log.target.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const handleExportLogs = () => {
    exportToJSON(filteredLogs, `audit_logs_${Date.now()}.json`);
  };

  return (
    <div>
      {/* Top Header */}
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
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Administrative Audit History
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Client-side chronological record of case modifications, logins, settings updates, and status transitions.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={handleExportLogs} icon={<Download size={16} />}>
          Export Logs (JSON)
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              Search Log Entries
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by action, target ID, admin name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              Filter by Action Type
            </label>
            <select
              className="form-select"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <option value="ALL">All Logged Actions</option>
              <option value="LOGIN">Admin Sign-in (LOGIN)</option>
              <option value="APPLICATION_SUBMITTED">Application Submitted</option>
              <option value="STATUS_CHANGED">Status Changed</option>
              <option value="NOTE_ADDED">Note Added</option>
              <option value="SETTINGS_UPDATED">Settings Updated</option>
              <option value="FORM_UPDATED">Form Builder Updated</option>
              <option value="WHATSAPP_SETTINGS_UPDATED">WhatsApp Settings Updated</option>
              <option value="APPLICATION_DELETED">Application Deleted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Target Reference</th>
                <th>Details</th>
                <th>Staff / Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No audit records match your filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--navy-600)', whiteSpace: 'nowrap' }}>
                        {formatDateTime(log.timestamp)}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          backgroundColor: 'var(--navy-100)',
                          color: 'var(--navy-800)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-xs)',
                          display: 'inline-block',
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>
                      {log.target ? (
                        <code style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{log.target}</code>
                      ) : (
                        <span style={{ color: 'var(--navy-400)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--navy-800)' }}>{log.details}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--navy-900)' }}>
                        {log.adminName}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--navy-500)' }}>{log.adminEmail}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
