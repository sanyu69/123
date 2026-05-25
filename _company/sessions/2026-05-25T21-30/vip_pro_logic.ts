import { DifferentiatorConfig } from './data_model';

/**
 * VIP/Pro 티어에 따른 시각적 차별화를 관리하는 로직 모듈.
 * 디자인 명세(Cyan/Magenta)와 데이터 포맷을 기반으로 UI 상태를 결정합니다.
 */

export class VipProLogic {
    private config: DifferentiatorConfig;

    constructor(config: DifferentiatorConfig) {
        this.config = config;
    }

    /**
     * 현재 사용자 티어를 기반으로 적용할 시각적 테마를 결정합니다.
     * @param tier 'VIP' 또는 'Pro'
     * @returns 적용할 컬러 설정 객체
     */
    getVisualTheme(tier: 'VIP' | 'Pro'): { [key: string]: string } {
        switch (tier) {
            case 'VIP':
                // VIP는 더 높은 미학적 경험을 강조 (Magenta 집중)
                return {
                    background: this.config.colors.background,
                    accentColor: this.config.colors.magenta, // Magenta 강조
                    ctaBorder: this.config.colors.magenta,
                };
            case 'Pro':
                // Pro는 안정성과 프리미엄함을 강조 (Cyan 집중)
                return {
                    background: this.config.colors.background,
                    accentColor: this.config.colors.cyan, // Cyan 강조
                    ctaBorder: this.config.colors.cyan,
                };
            default:
                // 기본값 또는 미정 상태
                return {
                    background: this.config.colors.background,
                    accentColor: this.config.colors.cyan, 
                    ctaBorder: this.config.colors.cyan,
                };
        }
    }

    /**
     * 데이터 포맷에 따라 최종 UI 요소를 계산합니다.
     * @param data JSON 데이터 (ADS, CR, RR 포함)
     * @returns 시각적 차별화 점수 및 적용할 색상 정보
     */
    calculateAestheticScore(data: any): { score: number; theme: { accentColor: string } } {
        // 이 부분은 Designer가 정의한 Optimal ADS와 데이터 포맷을 연동하여 미학적 경험의 독점성을 정량화합니다.
        const ads = data.ADS || 0;
        const cr = data.CR || 0;
        const rr = data.RR || 0;

        // 예시 로직: ADS가 높고 CR/RR이 적절할 때 최고 미학적 경험을 부여
        let score = ads * (1 + cr / 10) - rr / 5;
        
        // 점수를 기반으로 최종 강조 색상을 결정 (실제로는 이 값을 바탕으로 동적 CSS 변수 조정 필요)
        const theme = this.getVisualTheme(data.tier || 'Pro');

        return { score: Math.min(100, Math.max(0, score)), theme };
    }
}

// 데이터 모델 정의 (JSON에서 로드될 것으로 가정)
// 이 파일은 실제 JSON 구조에 따라 수정되어야 합니다.
<create_file path="sessions/2026-05-25T21-30/data_model.ts">export interface DifferentiatorConfig {
    colors: {
        background: string; // #1A1A2E
        cyan: string;      // #00FFFF
        magenta: string;   // #FF00FF
        white: string;     // #FFFFFF
    };
}

export interface QualityData {
    tier: 'VIP' | 'Pro';
    ADS: number; // Aesthetic Differentiator Score
    CR: number;  // Conversion Rate
    RR: number;  // Retention Rate
}