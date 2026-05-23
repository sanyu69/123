import React, { FC } from 'react';

// 시스템 안정성($R_{Stability}$)을 반영한 기본 스타일 정의
const theme = {
  background: '#0d1117', // 딥 배경색 (Stability Focus)
  surface: '#161b22',    // 컴포넌트 표면
  primaryNeon: '#00ffff', // 핵심 네온 색상 (Reliable Neon)
  secondaryNeon: '#ff00ff', // 보조 네온 색상
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#30363d',
};

interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 시스템 안정성($R_{Stability}$)을 반영한 기본 UI 컴포넌트.
 * 모든 컴포넌트는 이 기반 스타일을 상속받아 일관성을 유지합니다.
 */
const BaseComponent: FC<BaseComponentProps> = ({ children, className = '', style }) => {
  return (
    <div 
      style={{ 
        backgroundColor: theme.surface, 
        color: theme.textPrimary, 
        border: `1px solid ${theme.border}`,
        padding: '16px',
        borderRadius: '8px',
        boxShadow: `0 4px 12px rgba(0, 255, 255, 0.1)`, // 안정성을 시각적으로 표현하는 은은한 네온 그림자
      }}
      className={`transition-all duration-300 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default BaseComponent;