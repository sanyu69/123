import { VipProLogic } from './vip_pro_logic';
import { DifferentiatorConfig, QualityData } from './data_model';

// 1. 설정 로드 (실제로는 JSON에서 동적으로 로드되어야 함)
const configData = {
    colors: {
        background: "#1A1A2E",
        cyan: "#00FFFF",
        magenta: "#FF00FF",
        white: "#FFFFFF"
    }
};

// 2. 데이터 시뮬레이션 (실제로는 API 호출로 로드됨)
const qualityData: QualityData = { tier: 'VIP', ADS: 85, CR: 15, RR: 60 };


/**
 * Mockup 시각화 함수 예시
 * 실제 웹 환경에서는 이 값이 CSS 변수로 직접 적용되어야 합니다.
 */
function renderMockup(quality: QualityData) {
    const logic = new VipProLogic(configData);
    const result = logic.calculateAestheticScore(quality);

    console.log("--- Mockup Rendering Report ---");
    console.log(`Calculated Aesthetic Score (0-100): ${result.score}`);
    console.log(`Applied Theme Accent Color: ${result.theme.accentColor}`);
    console.log(`VIP/Pro Logic Applied: ${quality.tier} | ADS=${quality.ADS}, CR=${quality.CR}, RR=${quality.RR}`);

    // 실제 프론트엔드에서는 result.theme.accentColor를 CSS 변수로 전달합니다.
}

renderMockup(qualityData);