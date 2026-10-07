import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  required,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`form-control ${error ? 'has-error' : ''} ${className}`}
        required={required}
        {...props}
      />
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
