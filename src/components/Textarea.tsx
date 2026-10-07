import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  hint,
  required,
  id,
  className = '',
  rows = 3,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`form-textarea ${error ? 'has-error' : ''} ${className}`}
        required={required}
        {...props}
      />
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
