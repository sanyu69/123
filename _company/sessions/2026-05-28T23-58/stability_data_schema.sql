-- R_Stability 기반 IAP 안정성 데이터 스키마 (ACID 준수)
CREATE TABLE IF NOT EXISTS StabilityMetric (
    metric_id SERIAL PRIMARY KEY,
    iap_tier VARCHAR(50) NOT NULL CHECK (iap_tier IN ('Basic', 'Pro', 'VIP')), -- IAP 티어 명시
    stability_score DECIMAL(5, 2) NOT NULL CHECK (stability_score >= 0.00 AND stability_score <= 100.00), -- 시스템 안정성 지표 (R_Stability)
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_iap_tier FOREIGN KEY (iap_tier) REFERENCES IAP_Tiers(tier_name) -- IAP 티어 테이블 참조 가정
);

CREATE TABLE IF NOT EXISTS IAP_Tiers (
    tier_name VARCHAR(50) PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    access_level TEXT NOT NULL, -- 접근 권한 수준 정의 (예: 'Basic Access', 'Pro Access')
    stability_threshold DECIMAL(5, 2) NOT NULL -- 티어별 최소 안정성 기준
);

CREATE TABLE IF NOT EXISTS StabilityLog (
    log_id BIGSERIAL PRIMARY KEY,
    metric_id INTEGER NOT NULL REFERENCES StabilityMetric(metric_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL CHECK (status IN ('OK', 'Warning', 'Critical')), -- 안정성 상태 로그
    details TEXT -- 상세 설명 (예: "Latency exceeded threshold")
);

-- 성능 최적화를 위한 인덱스 설정
CREATE INDEX IF NOT EXISTS idx_stability_tier ON StabilityMetric(iap_tier);
CREATE INDEX IF NOT EXISTS idx_stability_log_time ON StabilityLog(timestamp);