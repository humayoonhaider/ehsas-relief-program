import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {variant === 'danger' && (
          <div
            style={{
              padding: '0.65rem',
              backgroundColor: 'var(--danger-light)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--danger)',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={24} />
          </div>
        )}
        <p style={{ fontSize: '0.9375rem', color: 'var(--navy-700)', lineHeight: '1.5' }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};
