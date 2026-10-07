import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  FileCode,
  ArrowUpDown,
  RefreshCw,
  MessageSquare,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import { storageService } from '../services/storageService';
import { applicationService, ApplicationFilterOptions } from '../services/applicationService';
import { ApplicationTable } from '../components/ApplicationTable';
import { ApplicationCard } from '../components/ApplicationCard';
import { Button } from '../components/Button';
import { exportToCSV, exportToJSON } from '../utils/generators';
import { EmptyState } from '../components/EmptyState';

const ITEMS_PER_PAGE = 10;

export const Applications: React.FC = () => {
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [outreachFilter, setOutreachFilter] = useState<'all' | 'with_outreach' | 'without_outreach'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'status'>('newest');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadData = () => {
    const apps = storageService.getApplications();
    setAllApplications(apps);
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('citizengrant_storage_change', handleStorage);
    return () => window.removeEventListener('citizengrant_storage_change', handleStorage);
  }, []);

  useEffect(() => {
    const filtered = applicationService.filterApplications(allApplications, {
      searchQuery,
      status: statusFilter,
      hasOutreach: outreachFilter,
      sortBy,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [allApplications, searchQuery, statusFilter, outreachFilter, sortBy, startDate, endDate]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE) || 1;
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedApplications.map((a) => a.applicationId));
    }
  };

  const handleExportCSV = (onlyFiltered = true) => {
    const dataToExport = onlyFiltered ? filteredApplications : allApplications;
    exportToCSV(dataToExport, `applications_${onlyFiltered ? 'filtered' : 'all'}_${Date.now()}.csv`);
  };

  const handleExportJSON = (onlyFiltered = true) => {
    const dataToExport = onlyFiltered ? filteredApplications : allApplications;
    exportToJSON(dataToExport, `applications_${onlyFiltered ? 'filtered' : 'all'}_${Date.now()}.json`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setOutreachFilter('all');
    setSortBy('newest');
    setStartDate('');
    setEndDate('');
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
            Applications Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Search, filter, evaluate cases, and export application records.
          </p>
        </div>

        {/* Export Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExportCSV(true)}
            icon={<FileSpreadsheet size={16} />}
          >
            Export CSV ({filteredApplications.length})
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExportJSON(true)}
            icon={<FileCode size={16} />}
          >
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div
        className="card"
        style={{
          padding: '1.25rem',
          marginBottom: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-end',
          }}
        >
          {/* Search Box */}
          <div style={{ gridColumn: 'span 2' }}>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              Search Application
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, applicant name, phone, email, CNIC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Search
                size={16}
                color="var(--navy-400)"
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              Case Status
            </label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ADDITIONAL_INFO_REQUIRED">Additional Info Required</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* WhatsApp Outreach Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              WhatsApp Outreach
            </label>
            <select
              className="form-select"
              value={outreachFilter}
              onChange={(e) => setOutreachFilter(e.target.value as any)}
            >
              <option value="all">All Applications</option>
              <option value="with_outreach">With WhatsApp Share Logged</option>
              <option value="without_outreach">No WhatsApp Share</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8125rem' }}>
              Sort Order
            </label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Submission: Newest First</option>
              <option value="oldest">Submission: Oldest First</option>
              <option value="name">Applicant Name (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button variant="ghost" size="md" onClick={clearFilters} icon={<RefreshCw size={14} />}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Applications Table / Cards List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          className="card-header"
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Showing {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--navy-500)' }}>
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <EmptyState
            title="No matching applications found"
            description="Try adjusting your search criteria, dates, or status filters."
            actionLabel="Reset Filters"
            onAction={clearFilters}
          />
        ) : (
          <div className="card-body" style={{ padding: 0 }}>
            <ApplicationTable
              applications={paginatedApplications}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
            />
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="card-footer" style={{ justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--navy-600)' }}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredApplications.length)} of{' '}
              {filteredApplications.length} entries
            </span>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                icon={<ChevronLeft size={16} />}
              >
                Previous
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
