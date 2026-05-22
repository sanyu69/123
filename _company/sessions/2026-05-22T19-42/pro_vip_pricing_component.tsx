import React, { useState, useEffect } from 'react';

// --- Types ---
interface PricingTier {
  name: string;
  price: number;
  isPro: boolean;
}

interface PricingComponentProps {
  initialPlan: PricingTier;
  currentSubscription: string | null; // e.g., 'none', 'basic', 'pro', 'vip'
  updateSubscription: (newStatus: string) => void;
}

// --- Constants & Styles (Reliable Neon & Stability Focus 반영) ---
const NEON_COLOR = '#1A0A2C'; // Base background/text color
const ACCENT_COLOR = '#FF00FF'; // Highlight/Neon accent color

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: NEON_COLOR,
    color: '#FFFFFF',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    margin: '20px auto',
    boxShadow: `0 0 20px ${ACCENT_COLOR}40`, // Neon Glow Effect
    border: `2px solid ${ACCENT_COLOR}`,
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: `1px dashed ${ACCENT_COLOR}`,
    paddingBottom: '15px',
  },
  tierCard: {
    backgroundColor: '#2A1538', // Slightly darker for contrast
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    borderLeft: `4px solid ${ACCENT_COLOR}`,
  },
  tierTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  priceDisplay: {
    fontSize: '2.5em',
    fontWeight: 'extrabold',
    color: ACCENT_COLOR,
  },
  statusText: {
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: '600',
    color: '#90EE90', // Stable/Success Green for status
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    borderRadius: '6px',
    border: `none`,
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.1s',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonPro: {
    backgroundColor: ACCENT_COLOR,
    color: NEON_COLOR,
  },
  buttonVip: {
    backgroundColor: '#8A2BE2', // Deeper Purple for VIP
    color: '#FFFFFF',
  }
};

// --- Component ---
const ProVipPricingComponent: React.FC<PricingComponentProps> = ({ initialPlan, currentSubscription, updateSubscription }) => {
  const [selectedTierKey, setSelectedTierKey] = useState<keyof PricingTier>("basic");

  // State for dynamic pricing simulation (In a real app, this would fetch from API)
  const [dynamicPrice, setDynamicPrice] = useState(initialPlan.price);
  const [isSubscribed, setIsSubscribed] = useState(currentSubscription === 'pro' || currentSubscription === 'vip');

  // Effect to handle subscription status update when the component mounts or props change
  useEffect(() => {
    if (currentSubscription) {
      setIsSubscribed(currentSubscription === 'pro' || currentSubscription === 'vip');
    } else {
      setIsSubscribed(false);
    }
  }, [currentSubscription]);

  const handleSubscribe = (tier: keyof PricingTier) => {
    // Simulate API call delay for stability check
    console.log(`Attempting to subscribe to ${tier}...`);
    updateSubscription(tier);
    // In a real scenario, this would be an async operation with error handling.
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Premium Access</h1>

      {/* Current Status Display */}
      <p style={styles.statusText}>
        Current Status: {currentSubscription ? currentSubscription.toUpperCase() : 'No Plan'}
      </p>

      {/* Tier Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {Object.keys(initialPlan).map((key) => {
          const tier = initialPlan[key];
          const isSelected = selectedTierKey === key;

          return (
            <div key={key} style={{ ...styles.tierCard, borderLeft: isSelected ? `4px solid ${ACCENT_COLOR}` : `4px solid #555`, borderColor: isSelected ? ACCENT_COLOR : '#555' }}>
              <h2 style={styles.tierTitle}>{tier.name}</h2>
              <div style={styles.priceDisplay}>${tier.price.toFixed(2)}</div>
              {/* Dynamic/Subscription Logic */}
              {key === 'pro' && (
                <>
                  <p style={{ color: isSubscribed ? ACCENT_COLOR : '#FF6347', fontWeight: 'bold' }}>
                    Pro Access: {isSubscribed ? 'Active' : 'Locked'}
                  </p>
                  {/* Pro specific action */}
                  <button
                    style={{ ...styles.button, ...styles.buttonPro }}
                    onClick={() => handleSubscribe('pro')}
                    disabled={currentSubscription === 'pro'}
                  >
                    {currentSubscription === 'pro' ? 'Subscribed' : `Upgrade to Pro (${initialPlan.price.toFixed(2)})`}
                  </button>
                </>
              )}
              {key === 'vip' && (
                <>
                  <p style={{ color: isSubscribed ? ACCENT_COLOR : '#FF6347', fontWeight: 'bold' }}>
                    VIP Access: {isSubscribed ? 'Active' : 'Locked'}
                  </p>
                  {/* VIP specific action */}
                  <button
                    style={{ ...styles.button, ...styles.buttonVip }}
                    onClick={() => handleSubscribe('vip')}
                    disabled={currentSubscription === 'vip'}
                  >
                    {currentSubscription === 'vip' ? 'Subscribed' : `Upgrade to VIP (${initialPlan.price.toFixed(2)})`}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Price Simulation Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '15px', borderTop: `2px solid ${ACCENT_COLOR}` }}>
        <p>Current Effective Price: <span style={{ color: ACCENT_COLOR, fontSize: '1.8em' }}>${dynamicPrice.toFixed(2)}</span></p>
      </div>

    </div>
  );
};

export default ProVipPricingComponent;