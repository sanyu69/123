-- Feature Gating 및 권한 관리 스키마 설계 (R_Stability 기반)

-- 1. Feature Tiers (IAP 티어 정의)
CREATE TABLE feature_tiers (
    tier_id SERIAL PRIMARY KEY,
    tier_name VARCHAR(50) NOT NULL UNIQUE, -- 예: Basic, Pro, VIP
    price DECIMAL(10, 2) NOT NULL,         -- 가격 정보
    stability_level INT NOT NULL,           -- $R_{Stability}$ 수준 (예: 1=Basic, 3=VIP)
    feature_flags JSONB NOT NULL            -- 해당 티어에서 잠금 해제된 기능 플래그 저장 (JSONB 사용으로 유연성 확보)
);

-- 2. Feature Flags Mapping (기능 정의 및 매핑)
CREATE TABLE features (
    feature_id SERIAL PRIMARY KEY,
    feature_name VARCHAR(100) NOT NULL UNIQUE, -- 예: 'pro_level_unlock', 'vip_ad_removal'
    description TEXT,                          -- 기능 설명
    is_gated BOOLEAN DEFAULT FALSE             -- 기본 잠금 상태
);

-- 3. Feature Access Mapping (티어와 기능의 관계 정의)
CREATE TABLE feature_access (
    access_id SERIAL PRIMARY KEY,
    tier_id INT NOT NULL REFERENCES feature_tiers(tier_id),
    feature_id INT NOT NULL REFERENCES features(feature_id),
    access_level VARCHAR(50) NOT NULL,       -- 접근 레벨 (예: ENABLED, DISABLED)
    UNIQUE (tier_id, feature_id)              -- 티어와 기능의 매핑은 유일해야 함
);

-- 4. User Subscription (사용자 구독 정보)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Tier Mapping (사용자와 티어의 관계 정의)
CREATE TABLE user_tiers (
    user_tier_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    tier_id INT NOT NULL REFERENCES feature_tiers(tier_id),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL -- 예: active, expired, trial
);

-- 6. Index for fast lookups
CREATE INDEX idx_feature_access_tier ON feature_access (tier_id);
CREATE INDEX idx_user_tiers_user ON user_tiers (user_id);