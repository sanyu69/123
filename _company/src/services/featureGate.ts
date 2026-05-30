/**
 * Feature Gating Service
 * $R_{Stability}$ 기반 접근 제어 로직 구현
 */

interface SubscriptionTier {
    tier: 'Basic' | 'Pro' | 'VIP';
}

// 가격 구조 매핑 (실제 DB 정책과 동기화 필요)
const TIER_MAPPING: Record<SubscriptionTier['tier'], { [key: string]: boolean }> = {
    Basic: {
        'Ad-free': false, // Pro 이상에서 true
        'Unlimited Saves': false, // Pro 이상에서 true
        'Exclusive Content': false // VIP 이상에서 true
    },
    Pro: {
        'Ad-free': true,
        'Unlimited Saves': true,
        'Exclusive Content': false // VIP 이상에서 true
    },
    VIP: {
        'Ad-free': true,
        'Unlimited Saves': true,
        'Exclusive Content': true
    }
};

/**
 * 사용자 권한을 기반으로 기능 접근을 검증합니다.
 * @param userId DB에서 조회된 사용자 ID
 * @param featureName 요청된 기능 이름 (예: 'ad_free', 'unlimited_saves')
 * @returns 기능 접근 가능 여부 (boolean)
 */
export async function checkFeatureAccess(userId: string, featureName: string): Promise<boolean> {
    // 1. 사용자 정보 조회 (DB 호출 시뮬레이션)
    const user = await db.getUser(userId); // 실제 DB 연결 로직 필요

    if (!user) {
        throw new Error("User not found.");
    }

    const tier = user.subscription_tier;

    // 2. 권한 매핑 확인
    const requiredAccess = TIER_MAPPING[tier];
    
    if (!requiredAccess) {
        // 알 수 없는 티어일 경우, 기본적으로 거부 (안정성 우선)
        console.warn(`Unknown tier for user ${userId}: ${tier}`);
        return false;
    }

    const isAllowed = requiredAccess[featureName];

    if (isAllowed === undefined) {
        // 정의되지 않은 기능에 대한 접근 시도 방지
        throw new Error(`Feature ${featureName} is not defined in the current plan.`);
    }

    return isAllowed;
}

// 테스트용 모듈 (실제 실행은 DB 연결 필요)
export { TIER_MAPPING };