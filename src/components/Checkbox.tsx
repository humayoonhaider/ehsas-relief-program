import React from 'react';

interface CheckboxProps {
  label: string | React.ReactNode;
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  error,
  hint,
  required,
}) => {
  const checkboxId = id || 'chk-' + Math.random().toString(36).substring(2, 7);

  return (
    <div className="form-group" style={{ marginBottom: '1rem' }}>
      <label htmlFor={checkboxId} className="option-item" style={{ alignItems: 'flex-start' }}>
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ marginTop: '0.2rem' }}
        />
        <span style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3469572139071472"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3469572139071472"
     data-ad-slot="8531903117"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
          {label}
          {required && <span className="required-star" style={{ color: 'var(--danger)', marginLeft: '4px' }}>*</span>}
        </span>
      </label>
      {hint && !error && <span className="form-hint" style={{ marginLeft: '1.75rem' }}>{hint}</span>}
      {error && <span className="form-error" style={{ marginLeft: '1.75rem' }}>{error}</span>}
    </div>
  );
};
