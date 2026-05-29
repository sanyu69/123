import React, { useState, useEffect, useCallback } from 'react';

// --- Type Definitions based on Designer Spec ---
interface VisualizerProps {
  initialDeltaT: number;
  stabilityScore: number; // R_Stability related data
  updateIntervalMs?: number;
}

// --- Color Palette Definition (from Designer's spec) ---
const Colors = {
  PrimaryAccent: '#00FFFF', // Cyan/Neon Blue for DeltaT
  SecondaryGlow: '#FFD700', // Gold for Stability/Premium
  BackgroundBase: '#1A1A2E', // Deep Navy/Dark Blue
  TextUI: '#E0FFFF', // Light Cyan for text
};

/**
 * RealTimeDeltaTVisualizer Component
 * R_Stability 기반 실시간 변화량 시각화 컴포넌트.
 */
const RealTimeDeltaTVisualizer: React.FC<VisualizerProps> = ({
  initialDeltaT,
  stabilityScore,
  updateIntervalMs = 1000, // Default update interval
}) => {
  const [currentDeltaT, setCurrentDeltaT] = useState(initialDeltaT);
  const [isStable, setIsStable] = useState(false);

  // Simulate real-time data fetching/update for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate dynamic change based on stability score
      const change = (Math.random() * 5 - 2.5) * (100 / stabilityScore); // Less stable -> larger fluctuation
      setCurrentDeltaT(prev => Math.max(0, prev + change));

      // Check stability threshold
      if (stabilityScore > 0.8 && currentDeltaT < 1) {
        setIsStable(true);
      } else {
        setIsStable(false);
      }

    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs, stabilityScore]);


  // Determine dynamic styles based on data for visual feedback
  const deltaTStyle: React.CSSProperties = {
    color: Colors.PrimaryAccent,
    transition: 'color 0.5s ease-in-out',
    textShadow: `0 0 10px ${Colors.PrimaryAccent}, 0 0 20px rgba(0, 255, 255, 0.6)`, // Neon Glow Effect
  };

  const stabilityStyle: React.CSSProperties = {
    boxShadow: `0 0 15px ${Colors.SecondaryGlow}`, // Gold Glow for Stability
    transition: 'box-shadow 0.5s ease-in-out',
  };


  return (
    <div style={{
      backgroundColor: Colors.BackgroundBase,
      padding: '20px',
      borderRadius: '10px',
      border: `2px solid ${Colors.PrimaryAccent}`,
      color: Colors.TextUI,
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto'
    }}>
      <h2 style={{ color: Colors.TextUI, borderBottom: `1px solid ${Colors.PrimaryAccent}`, paddingBottom: '10px' }}>
        RealTime DeltaT Visualizer
      </h2>

      {/* Stability Score Display */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: Colors.SecondaryGlow, fontSize: '1.2em', fontWeight: 'bold' }}>
          Stability Score ($R_{Stability}$): {stabilityScore.toFixed(2)}
        </span>
        {isStable && (
            <span style={{ color: Colors.SecondaryGlow, marginLeft: '10px', fontSize: '1.2em', fontWeight: 'bold' }}>
                PRO Tier Achieved! ✅
            </span>
        )}
      </div>

      {/* DeltaT Visualization Area */}
      <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '15px',
          border: `1px solid ${Colors.PrimaryAccent}`,
          borderRadius: '8px'
      }}>
        <span style={{ color: Colors.TextUI, fontSize: '1.2em' }}>
            Current $\Delta T$:
        </span>
        <div style={{ 
            fontSize: '3em', 
            fontWeight: '900', 
            color: Colors.PrimaryAccent,
            transition: 'transform 0.5s ease-in-out',
            // Dynamic transformation based on value for visual impact
            transform: `scale(${1 + (currentDeltaT / 10)})`,
            textShadow: `0 0 20px ${Colors.PrimaryAccent}`
        }}>
          {currentDeltaT.toFixed(3)}
        </div>
      </div>

      <p style={{ marginTop: '20px', color: Colors.TextUI, fontSize: '0.9em' }}>
        Data updates every {updateIntervalMs / 1000} seconds. Stability is paramount.
      </p>
    </div>
  );
};

export default RealTimeDeltaTVisualizer;