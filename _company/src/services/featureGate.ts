import { Pool } from 'pg'; // PostgreSQL 환경 가정
import { SQLQueryRunner } from './db/queryRunner'; // 데이터베이스 연결 및 쿼리 실행을 위한 추상화된 모듈 가정

// DB 연결 정보는 환경 변수에서 로드한다고 가정합니다.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://user:password@host:port/dbname'
});

/**
 * 사용자의 현재 구독 티어를 기반으로 특정 기능에 대한 접근 권한을 검증합니다.
 * @param userId 검증할 사용자 ID
 * @param featureName 검증할 기능 이름 (예: 'pro_level_unlock')
 * @returns FeatureAccessResult - 접근 가능 여부 및 관련 안정성 정보
 */
export async function checkFeatureAccess(userId: number, featureName: string): Promise<{ isAccessible: boolean; stabilityScore: number }> {
    // 1. 사용자 티어 ID 조회
    const userTierResult = await pool.query(
        `SELECT tier_id FROM user_tiers WHERE user_id = $1 AND status = 'active'`,
        [userId]
    );

    if (userTierResult.rows.length === 0) {
        // 사용자 구독 정보가 없으면 기본적으로 접근 불가 처리 ($R_{Stability}$ 우선)
        console.error(`[ERROR] User ID ${userId} has no active subscription.`);
        return { isAccessible: false, stabilityScore: 0 };
    }

    const userTierId = userTierResult.rows[0].tier_id;

    // 2. 기능 접근 권한 조회 (JOIN을 통해 티어와 기능을 연결)
    const accessResult = await pool.query(
        `SELECT fa.access_level, ft.stability_level
         FROM feature_access fa
         JOIN feature_tiers ft ON fa.tier_id = ft.tier_id
         WHERE fa.tier_id = $1 AND fa.feature_id = (SELECT feature_id FROM features WHERE feature_name = $2)`,
        [userTierId, featureName]
    );

    if (accessResult.rows.length === 0) {
        // 해당 기능에 대한 명시적인 매핑이 없으면 기본적으로 잠금 처리
        console.warn(`[WARNING] Feature ${featureName} access mapping not found for Tier ID ${userTierId}. Defaulting to restricted.`);
        return { isAccessible: false, stabilityScore: 0 };
    }

    const accessRecord = accessResult.rows[0];

    // 3. $R_{Stability}$ 기반 최종 결정
    const isAccessible = accessRecord.access_level === 'ENABLED';
    const stabilityScore = accessRecord.stability_level; // 티어의 안정성 레벨 반환

    return { isAccessible, stabilityScore };
}

// DB 풀 종료 (필요한 경우)
// pool.end();