import React from 'react';
import { StabilityIndicator } from './StabilityIndicator'; // 추후 구현될 안정성 표시 컴포넌트 경로 가정

interface LayoutProps {
  children: React.ReactNode;
  stabilityData: {
    stabilityScore: number;
    status: 'Stable' | 'Warning' | 'Critical';
    message: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, stabilityData }) => {
  // Reliable Neon & Stability Focus에 맞춘 기본 스타일 정의 (색상 및 폰트 설정 가정)
  const neonBackground = '#1A0A2C'; // 다크 네온 배경
  const accentColor = '#FF00FF'; // 강조 색상 (마젠타/핑크 계열)
  const textColor = '#FFFFFF';

  return (
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: neonBackground, 
        color: textColor,
        fontFamily: 'monospace', // 네온 느낌을 위한 모노스페이스 계열 폰트 가정
        padding: '20px'
    }}>
      {/* 헤더 영역 - 안정성 지표 통합 */}
      <header style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: '15px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>System Stability Dashboard</h1>
        {/* $R_{Stability}$ 지표 시각화 영역 */}
        <div style={{ 
            backgroundColor: '#330066', 
            padding: '10px 20px', 
            borderRadius: '5px',
            border: `1px solid ${accentColor}`,
            display: 'flex',
            alignItems: 'center'
        }}>
          <span style={{ color: accentColor, marginRight: '10px', fontSize: '1.2em' }}>⚙️ Stability:</span>
          <span style={{ fontWeight: 'bold' }}>{stabilityData.status}</span>
          <span style={{ marginLeft: '15px' }}>{stabilityData.message}</span>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main style={{ flexGrow: 1, padding: '0 20px' }}>
        {children}
      </main>

      {/* 푸터 영역 - 안정성 정보 재강조 */}
      <footer style={{ marginTop: '40px', borderTop: `1px solid ${accentColor}`, paddingTop: '10px', textAlign: 'center', fontSize: '0.8em' }}>
        Powered by Reliable Neon System | $R_{Stability}$ Monitoring Active
      </footer>
    </div>
  );
};

export default Layout;