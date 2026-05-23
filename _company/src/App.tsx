import React, { useState } from 'react';
import NeonButton from './components/ui/NeonButton';

// 시스템 안정성($R_{Stability}$)을 반영한 메인 애플리케이션 컴포넌트
const App: React.FC = () => {
  const [tier, setTier] = useState<'Basic' | 'Pro' | 'VIP'>('Basic');
  const [balance, setBalance] = useState(100);

  const handleUpgrade = (newTier: 'Pro' | 'VIP') => {
    // 시스템 안정성을 위해 전환 로직을 명확히 하고 상태를 업데이트합니다.
    if (tier === 'Basic' && newTier === 'Pro') {
      setBalance(150); // Pro로 업그레이드 시 기본 금액 설정
    } else if (tier === 'Pro' && newTier === 'VIP') {
      setBalance(300); // VIP로 업그레이드 시 기본 금액 설정
    } else {
      setBalance(newTier === 'VIP' ? 500 : 100);
    }
    setTier(newTier);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#0d1117' }}>
      <h1 style={{ color: '#00ffff', textAlign: 'center', marginBottom: '40px' }}>
        Neon Survivor Core
      </h1>

      {/* 시스템 안정성($R_{Stability}$) 강조 섹션 */}
      <div style={{ 
          border: '2px solid #ff00ff', 
          padding: '15px', 
          marginBottom: '30px',
          textAlign: 'center',
          backgroundColor: '#1a0d1f' // 안정성 강조를 위한 색상 대비
      }}>
        <h2 style={{ color: '#ff00ff' }}>Stability Focus: {tier} Tier</h2>
        <p style={{ color: '#ffffff', marginTop: '5px' }}>
          $R_{Stability}$ 확보. 모든 기능은 안정성을 기반으로 설계되었습니다.
        </p>
      </div>

      {/* 인앱 결제/티어 전환 섹션 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
        <NeonButton 
          label={`Upgrade to Pro (${balance} Credits)`} 
          onClick={() => handleUpgrade('Pro')}
          variant="primary"
          disabled={tier === 'Pro'}
        />
        <NeonButton 
          label={`Upgrade to VIP (${balance} Credits)`} 
          onClick={() => handleUpgrade('VIP')}
          variant="secondary"
          disabled={tier === 'VIP'}
        />
      </div>

      {/* 게임 핵심 루프 자리 표시자 */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#00ffff' }}>Game Core Loop Placeholder</h3>
        <p style={{ color: '#a0a0a0', marginTop: '15px' }}>
          [핵심 게임 로직 및 Canvas 렌더링 영역 구현 예정]
        </p>
      </div>
    </div>
  );
};

export default App;