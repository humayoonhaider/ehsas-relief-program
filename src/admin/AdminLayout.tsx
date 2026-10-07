import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  Sliders,
  MessageSquare,
  BarChart3,
  Shield,
  FileText,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Info,
  Layers,
} from 'lucide-react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentUser = authService.getCurrentUser();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Applications', path: '/admin/applications', icon: <Users size={18} /> },
    { label: 'Form Builder', path: '/admin/form-builder', icon: <Sliders size={18} /> },
    { label: 'Program Settings', path: '/admin/settings', icon: <Layers size={18} /> },
    { label: 'WhatsApp Outreach', path: '/admin/whatsapp', icon: <MessageSquare size={18} /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Admins & Roles', path: '/admin/admins', icon: <Shield size={18} /> },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: <FileText size={18} /> },
    { label: 'Data Management', path: '/admin/data', icon: <Database size={18} /> },
  ];

  const isActive = (path: string) =>
    location.pathname === path || (path === '/admin/dashboard' && location.pathname === '/admin');

  return (
    <div className="admin-wrapper">
      {/* Mobile Backdrop */}
      {mobileNavOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileNavOpen ? 'is-open' : ''}`}>
        {/* Brand */}
        <div className="admin-brand">
          <div className="admin-brand-icon">ER</div>
          <div>
            <div className="admin-brand-text">احساس ایڈمن پورٹل</div>
            <div className="admin-brand-badge">Ehsaas Relief Control</div>
          </div>
        </div>

        {/* Nav list */}
        <nav className="admin-nav">
          <div className="admin-nav-section-title">Case Management</div>
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="admin-nav-section-title">Configuration</div>
          {navItems.slice(3, 6).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="admin-nav-section-title">System & Security</div>
          {navItems.slice(6).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--navy-800)' }}>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="admin-nav-item"
              style={{ color: 'var(--primary-300)' }}
            >
              <ExternalLink size={16} />
              <span>Open Public Portal</span>
            </Link>
          </div>
        </nav>

        {/* User profile footer */}
        <div className="admin-user-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="admin-user-name">{currentUser?.name || 'Administrator'}</div>
              <div className="admin-user-role">{currentUser?.role || 'Super Admin'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm"
            style={{ color: '#ef4444', padding: '0.35rem' }}
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="btn btn-ghost btn-icon nav-menu-mobile-btn"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Admin Sidebar"
            >
              <Menu size={22} />
            </button>
            <h2 className="admin-topbar-title">Case Administration & Outreach</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-800)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span className="badge-dot" style={{ backgroundColor: 'var(--primary-600)' }} />
              Local Storage Mode
            </span>
          </div>
        </header>

        {/* Content View */}
        <main className="admin-content">
          {/* Architecture Transparency Banner */}
          <div className="arch-notice-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} color="var(--accent-600)" />
              <span>
                <strong>Frontend Architecture:</strong> All applications, settings, form fields, and WhatsApp interactions are persisted locally in the browser storage service layer for Vercel deployment without requiring backend servers.
              </span>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};
