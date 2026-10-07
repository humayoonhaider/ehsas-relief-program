import React from 'react';
import { ApplicationStatus } from '../types';
import { STATUS_CONFIG } from '../utils/constants';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
}) => {
  const config = STATUS_CONFIG[status] || {
    label: status,
    badgeClass: 'badge-neutral',
    color: '#64748b',
    description: '',
  };

  const sizeStyle = size === 'sm' ? { fontSize: '0.7rem', padding: '0.15rem 0.5rem' } : {};

  return (
    <span
      className={`badge ${config.badgeClass}`}
      style={sizeStyle}
      title={config.description}
    >
      {showDot && <span className="badge-dot" />}
      {config.label}
    </span>
  );
};
