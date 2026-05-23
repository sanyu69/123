import React from 'react';
import BaseComponent from './BaseComponent';

interface NeonButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

/**
 * 네온 스타일을 적용한 버튼 컴포넌트.
 */
const NeonButton: React.FC<NeonButtonProps> = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const baseStyle: React.CSSProperties = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    display: 'inline-block',
    padding: '12px 20px',
    borderRadius: '6px',
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'white',
  };

  const variantStyle: React.CSSProperties = {
    ...(variant === 'primary' ? {
      backgroundColor: '#00ffff', // Primary Neon
      boxShadow: '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.5)',
    } : {
      backgroundColor: '#ff00ff', // Secondary Neon
      boxShadow: '0 0 10px #ff00ff, 0 0 20px rgba(255, 0, 255, 0.5)',
    }),
  };

  const disabledStyle: React.CSSProperties = {
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  };

  return (
    <BaseComponent style={baseStyle} disabled={disabled}>
      <button
        onClick={onClick}
        style={{ ...variantStyle, ...(disabled ? disabledStyle : {}) }}
      >
        {label}
      </button>
    </BaseComponent>
  );
};

export default NeonButton;