import React from 'react';

const Button = ({ 
  onClick, 
  disabled, 
  type = 'button', 
  variant = 'primary', 
  children,
  className = '',
  icon
}) => {
  const baseClass = 'custom-button';
  const variantClass = `${baseClass}--${variant}`;
  const disabledClass = disabled ? `${baseClass}--disabled` : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${disabledClass} ${className}`}
    >
      {icon && <span className={`${baseClass}__icon`}>{icon}</span>}
      <span className={`${baseClass}__text`}>{children}</span>
    </button>
  );
};

export default Button;