// StabilityDataModel.ts

/**
 * 시스템 안정성 지표(R_Stability)와 관련된 데이터 모델 정의
 */

export interface StabilityMetric {
    metricId: number;
    timestamp: string; // ISO 8601 형식의 타임스탬프
    stabilityScore: number; // R_Stability 값
    componentId: string; // 측정 대상 컴포넌트 ID
    contextData: Record<string, any>; // 추가 맥락 데이터 (JSONB 매핑)
}

export interface StabilityComponent {
    componentId: string;
    componentName: string;
    description: string;
    criticalityLevel: 'High' | 'Medium' | 'Low';
}

export interface StabilityRule {
    ruleId: number;
    componentId: string;
    metricName: string; // 측정 지표 이름
    thresholdValue: number; // 안정성 임계값
    severity: 'Critical' | 'Warning' | 'Info'; // 경고 심각도
}

/**
 * 데이터 조회 및 관리 인터페이스 (API 응답 또는 서비스 레이어용)
 */
export interface StabilityDataService {
    getMetricsByComponent(componentId: string): Promise<StabilityMetric[]>;
    getRulesForComponent(componentId: string): Promise<StabilityRule[]>;
    recordNewMetric(metric: Omit<StabilityMetric, 'metricId'>): Promise<void>;
}