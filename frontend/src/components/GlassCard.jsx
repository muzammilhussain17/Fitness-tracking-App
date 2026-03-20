import React from 'react';
import './GlassCard.css'; // Optional specific styles can go here

/**
 * A highly reusable glassmorphism card component with optional hover effects.
 */
const GlassCard = ({ children, className = '', hoverEffect = true, delay = 0, style = {} }) => {
  const baseClasses = 'glass-card animate-fade-in-up';
  const hoverClass = hoverEffect ? 'hoverable' : '';
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClass} ${delayClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
