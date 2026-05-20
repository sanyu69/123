import React, { useState, useEffect } from 'react';

// Type definitions based on Designer spec
type StabilityLevel = 'Basic' | 'Pro' | 'VIP';

interface IAPStabilityModuleProps {
    stabilityData: number; // R_Stability value (0.0 to 1.0)
}

const StabilityIndicator: React.FC<IAPStabilityModuleProps> = ({ stabilityData }) => {
    // Determine the tier based on the stability data
    let level: StabilityLevel;
    let baseColor: string;
    let dynamicEffect: string;

    if (stabilityData < 0.5) {
        level = 'Basic';
        baseColor = '#FF3366'; // Neon Pink
        dynamicEffect = 'Flicker';   // 미세한 깜박임
    } else if (stabilityData < 0.8) {
        level = 'Pro';
        baseColor = '#33FF99'; // Neon Green
        dynamicEffect = 'Smooth Wave'; // 부드러운 파동
    } else {
        level = 'VIP';
        baseColor = '#33FFFF'; // Cyan
        dynamicEffect = 'Intense Glow/Pulse'; // 강한 발광 및 깜박임
    }

    // Simulate dynamic effect based on a simple state change (for demonstration)
    const [effect, setEffect] = useState(dynamicEffect);

    useEffect(() => {
        // In a real application, this would react to live R_Stability stream
        setEffect(dynamicEffect);
    }, [dynamicEffect]);

    return (
        <div className={`trust-bar-container ${level.toLowerCase()}-bar`}>
            <div 
                className={`stability-bar ${baseColor}`} 
                style={{ 
                    width: `${Math.min(100, stabilityData * 100)}%`,
                    animation: `glow-${dynamicEffect}`, // Apply dynamic class for visual effect
                }}
            >
                {level} Tier: {stabilityData.toFixed(2)}
            </div>
            <div className={`dynamic-effect ${dynamicEffect}`}>
                {/* Placeholder for dynamic visual element */}
                {dynamicEffect === 'Flicker' && <span className="flicker">⚡</span>}
                {dynamicEffect === 'Smooth Wave' && <span className="wave">🌊</span>}
                {dynamicEffect === 'Intense Glow/Pulse' && <span className="glow">✨</span>}
            </div>
        </div>
    );
};

export default StabilityIndicator;

// Mock CSS for demonstration (In a real project, this would be in global styles)
/*
.trust-bar-container {
    padding: 10px;
    border: 2px solid #333;
    margin-bottom: 15px;
}
.basic-bar { background-color: #FF3366; }
.pro-bar { background-color: #33FF99; }
.vip-bar { background-color: #33FFFF; }
@keyframes glow-Flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}
@keyframes glow-SmoothWave {
    0%, 100% { box-shadow: 0 0 5px #33FF99, 0 0 10px #33FF99; }
    50% { box-shadow: 0 0 15px #33FF99, 0 0 20px #33FF99; }
}
@keyframes glow-IntenseGlowPulse {
    0%, 100% { box-shadow: 0 0 10px #33FFFF, 0 0 20px #33FFFF; }
    50% { box-shadow: 0 0 25px #33FFFF, 0 0 40px #33FFFF; }
}
*/
<create_file path="c:\Users\ksy04\OneDrive\바탕 화면\123\_company\sessions\2026-05-20T18-03\iap_stability_module.ts">
import React, { useState, useEffect } from 'react';

// Type definitions based on Designer spec
type StabilityLevel = 'Basic' | 'Pro' | 'VIP';

interface IAPStabilityModuleProps {
    stabilityData: number; // R_Stability value (0.0 to 1.0)
}

const StabilityIndicator: React.FC<IAPStabilityModuleProps> = ({ stabilityData }) => {
    // Determine the tier based on the stability data
    let level: StabilityLevel;
    let baseColor: string;
    let dynamicEffect: string;

    if (stabilityData < 0.5) {
        level = 'Basic';
        baseColor = '#FF3366'; // Neon Pink
        dynamicEffect = 'Flicker';   // 미세한 깜박임
    } else if (stabilityData < 0.8) {
        level = 'Pro';
        baseColor = '#33FF99'; // Neon Green
        dynamicEffect = 'Smooth Wave'; // 부드러운 파동
    } else {
        level = 'VIP';
        baseColor = '#33FFFF'; // Cyan
        dynamicEffect = 'Intense Glow/Pulse'; // 강한 발광 및 깜박임
    }

    // Simulate dynamic effect based on a simple state change (for demonstration)
    const [effect, setEffect] = useState(dynamicEffect);

    useEffect(() => {
        // In a real application, this would react to live R_Stability stream
        setEffect(dynamicEffect);
    }, [dynamicEffect]);

    return (
        <div className={`trust-bar-container ${level.toLowerCase()}-bar`}>
            <div 
                className={`stability-bar ${baseColor}`} 
                style={{ 
                    width: `${Math.min(100, stabilityData * 100)}%`,
                    animation: `glow-${dynamicEffect}`, // Apply dynamic class for visual effect
                }}
            >
                {level} Tier: {stabilityData.toFixed(2)}
            </div>
            <div className={`dynamic-effect ${dynamicEffect}`}>
                {/* Placeholder for dynamic visual element */}
                {dynamicEffect === 'Flicker' && <span className="flicker">⚡</span>}
                {dynamicEffect === 'Smooth Wave' && <span className="wave">🌊</span>}
                {dynamicEffect === 'Intense Glow/Pulse' && <span className="glow">✨</span>}
            </div>
        </div>
    );
};

export default StabilityIndicator;