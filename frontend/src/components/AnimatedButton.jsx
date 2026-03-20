import React from 'react';
import './AnimatedButton.css';

/**
 * A premium animated button with gradient border and glow effects.
 */
const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', // primary, secondary, outline, text
  className = '', 
  type = 'button',
  icon = null,
  disabled = false,
  fullWidth = false
}) => {
  const baseClasses = `animated-btn btn-${variant} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button 
      type={type} 
      className={baseClasses} 
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-content">
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </span>
      {variant === 'primary' && <div className="btn-glow"></div>}
    </button>
  );
};

export default AnimatedButton;
