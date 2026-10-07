import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading data...',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        gap: '1rem',
      }}
    >
      <div
        className="loading-spinner"
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderColor: 'var(--navy-200)',
          borderTopColor: 'var(--primary-600)',
          borderWidth: '3px',
        }}
      />
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
};
