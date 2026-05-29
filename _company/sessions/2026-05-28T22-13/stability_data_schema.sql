-- R_Stability 데이터 모델 (SQL)
-- 목표: 시스템 안정성 지표($R_{Stability}$)의 저장 및 조회에 필요한 구조 설계.

-- 1. Stability Metrics 테이블: 실제 측정된 지표 값과 시간 기록
CREATE TABLE stability_metrics (
    metric_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 측정 시점 (ACID 준수)
    stability_score NUMERIC(5, 4) NOT NULL, -- R_Stability 지표 값 (예: 0.0001 ~ 1.0)
    component_id VARCHAR(100) NOT NULL, -- 어떤 시스템/모듈의 안정성을 측정했는지 식별자 (예: 'IAP_Logic', 'DB_Transaction')
    context_data JSONB -- 추가적인 맥락 데이터 저장 (환경 변수, API 호출 성공률 등)
);

-- 2. Stability Components 테이블: 분석 대상이 되는 시스템/모듈 정의
CREATE TABLE stability_components (
    component_id VARCHAR(100) PRIMARY KEY,
    component_name VARCHAR(255) NOT NULL, -- 컴포넌트의 이름 (예: 'Payment Gateway', 'User Auth Service')
    description TEXT, -- 컴포넌트에 대한 설명
    criticality_level VARCHAR(50) DEFAULT 'Medium' -- 중요도 레벨 (High, Medium, Low)
);

-- 3. Stability Rules 테이블: 안정성 기준 및 임계값 정의
CREATE TABLE stability_rules (
    rule_id SERIAL PRIMARY KEY,
    component_id VARCHAR(100) REFERENCES stability_components(component_id), -- 어떤 컴포넌트에 적용되는지
    metric_name VARCHAR(255) NOT NULL, -- 측정 대상 지표 이름 (예: 'Transaction Success Rate', 'Latency P95')
    threshold_value NUMERIC(10, 4) NOT NULL, -- 안정성 임계값 (이 값 이하로 떨어지면 경고)
    severity VARCHAR(50) NOT NULL, -- 임계값 초과 시 심각도 (Critical, Warning, Info)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 설정: 빠른 조회를 위해 중요 컬럼에 인덱스 추가
CREATE INDEX idx_stability_metrics_timestamp ON stability_metrics (timestamp);
CREATE INDEX idx_stability_components_id ON stability_components (component_id);
CREATE INDEX idx_stability_rules_component_id ON stability_rules (component_id);

-- 초기 데이터 예시 삽입 (테스트용)
INSERT INTO stability_components (component_id, component_name, description, criticality_level) VALUES
('IAP_Logic', 'In-App Purchase Logic', '인앱 결제 로직 및 트랜잭션 처리 부분', 'High'),
('DB_Transaction', 'Database Transaction Layer', '결제 정보 저장 및 업데이트를 담당하는 DB 계층', 'High'),
('API_Gateway', 'API Endpoint Layer', '외부 요청을 받고 응답하는 게이트웨이', 'Medium');

INSERT INTO stability_rules (component_id, metric_name, threshold_value, severity) VALUES
('IAP_Logic', 'Transaction Success Rate', 0.9995, 'Critical'), -- 결제 성공률 99.95% 이상 요구
('DB_Transaction', 'Latency P95', 50, 'Warning'); -- DB 지연 시간 50ms 이하 요구

COMMIT;