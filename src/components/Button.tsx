import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;
  const blockClass = fullWidth ? 'btn-block' : '';

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${blockClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loading-spinner" aria-hidden="true" />
      ) : icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
