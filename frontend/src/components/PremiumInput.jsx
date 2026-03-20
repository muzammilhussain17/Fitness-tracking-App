import React, { useState } from 'react';
import './PremiumInput.css';

const PremiumInput = ({
  label,
  type = 'text',
  value,
  onChange,
  name,
  placeholder = '',
  icon = null,
  error = '',
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'has-error' : ''} ${hasValue ? 'has-value' : ''}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`premium-input ${icon ? 'has-icon' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={name}
      />
      <label htmlFor={name} className={`input-label ${icon ? 'with-icon' : ''}`}>
        {label}
      </label>
      <div className="input-border-gradient" />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default PremiumInput;
