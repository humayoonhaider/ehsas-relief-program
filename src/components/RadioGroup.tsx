import React from 'react';

interface RadioGroupProps {
  label?: string;
  name: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  horizontal?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  horizontal = false,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className={horizontal ? 'options-group-horizontal' : 'options-group'}>
        {options.map((opt, idx) => {
          const id = `${name}-${idx}`;
          return (
            <label key={idx} htmlFor={id} className="option-item">
              <input
                type="radio"
                id={id}
                name={name}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
