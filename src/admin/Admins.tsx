import React, { useState, useEffect } from 'react';
import { Shield, UserPlus, Trash2, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { AdminUser } from '../types';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';
import { formatDateTime } from '../utils/formatters';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const AdminsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [admins, setAdmins] = useState<AdminUser[]>(storageService.getAdmins());
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Case Reviewer'>('Case Reviewer');
  const [modalError, setModalError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadData = () => {
    setAdmins(storageService.getAdmins());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setRole('Case Reviewer');
    setModalError(null);
    setModalOpen(true);
  };

  const handleSaveAdmin = () => {
    if (!name.trim() || !email.trim()) {
      setModalError('Name and Email are required.');
      return;
    }

    const existing = admins.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setModalError('An admin with this email address already exists.');
      return;
    }

    const newAdmin: AdminUser = {
      id: 'admin-' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim(),
      role,
      lastLogin: new Date().toISOString(),
    };

    const updated = [...admins, newAdmin];
    storageService.saveAdmins(updated);
    if (currentUser) {
      storageService.addAuditLog('ADMIN_CREATED', newAdmin.email, `Created admin ${newAdmin.name} with role ${newAdmin.role}`, currentUser.email, currentUser.name);
    }
    setAdmins(updated);
    setModalOpen(false);
    showToast(`Added ${newAdmin.name} to administrator team.`);
  };

  const handleDeleteAdmin = (id: string) => {
    const target = admins.find((a) => a.id === id);
    if (!target) return;

    if (admins.length <= 1) {
      showToast('Cannot delete the last remaining administrator.');
      setDeleteConfirmId(null);
      return;
    }

    const updated = admins.filter((a) => a.id !== id);
    storageService.saveAdmins(updated);
    if (currentUser) {
      storageService.addAuditLog('ADMIN_DELETED', target.email, `Deleted admin account ${target.name}`, currentUser.email, currentUser.name);
    }
    setAdmins(updated);
    setDeleteConfirmId(null);
    showToast(`Removed admin ${target.name}.`);
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
            Administrators & Access Roles
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Manage staff accounts and review privileges for the portal.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} icon={<UserPlus size={16} />}>
          Add Administrator
        </Button>
      </div>

      {/* Admins Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Role</th>
                <th>Email Address</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((adm) => (
                <tr key={adm.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-700)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                        }}
                      >
                        {adm.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{adm.name}</div>
                        {currentUser?.id === adm.id && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                            (Current Session)
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: adm.role === 'Super Admin' ? 'var(--primary-100)' : 'var(--navy-100)',
                        color: adm.role === 'Super Admin' ? 'var(--primary-800)' : 'var(--navy-700)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {adm.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--navy-700)' }}>{adm.email}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>
                      {formatDateTime(adm.lastLogin)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirmId(adm.id)}
                      disabled={currentUser?.id === adm.id || admins.length <= 1}
                      style={{ color: 'var(--danger)' }}
                      title={currentUser?.id === adm.id ? 'Cannot delete active account' : 'Delete Account'}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Administrator Account"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveAdmin}>
              Create Account
            </Button>
          </>
        }
      >
        {modalError && (
          <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={16} />
            <span>{modalError}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Full Name"
            placeholder="e.g. Elena Rostova"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="e.g. elena@citizengrantportal.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Select
            label="Administrative Role"
            options={[
              { label: 'Super Admin (Full Configuration & Delete Access)', value: 'Super Admin' },
              { label: 'Case Reviewer (Application Evaluation & Notes Only)', value: 'Case Reviewer' },
            ]}
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            required
          />
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDeleteAdmin(deleteConfirmId)}
        title="Remove Administrator?"
        message="Are you sure you want to remove this staff account from the administration portal?"
        confirmText="Remove Account"
        variant="danger"
      />
    </div>
  );
};
