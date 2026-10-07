import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | { label: string; value: string })[];
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder = 'Select an option...',
  error,
  hint,
  required,
  id,
  className = '',
  value,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${error ? 'has-error' : ''} ${className}`}
        value={value}
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt, idx) => {
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={idx} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
