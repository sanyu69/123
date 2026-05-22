import { StabilityData } from './types'; // 데이터 타입 정의 파일 가정 (추후 생성 필요)

/**
 * 시스템 안정성 지표($R_{Stability}$) 데이터의 무결성을 검증하는 인터페이스.
 */
interface StabilityTestInterface {
  validateDataIntegrity(data: StabilityData): boolean;
  checkApiAccess(token: string): boolean; // API 인증 문제 해결 확인
}

/**
 * 시스템 안정성 모니터링 및 검증 엔진.
 */
class StabilityMonitor {
  private stabilityTest: StabilityTestInterface;

  constructor(testEngine: StabilityTestInterface) {
    this.stabilityTest = testEngine;
  }

  /**
   * 데이터의 논리적 일관성을 검증합니다. (예: 점수 범위, 상태 정의)
   * @param data 시스템 안정성 지표 데이터
   * @returns 데이터가 기준을 만족하는지 여부
   */
  public validate(data: StabilityData): boolean {
    // TODO: 실제 $R_{Stability}$의 임계값 및 논리 규칙을 여기에 구현해야 함. (예: 0~100점 범위 확인)
    const integrity = this.stabilityTest.validateDataIntegrity(data);
    console.log(`[StabilityMonitor] Data Integrity Check: ${integrity ? 'PASS' : 'FAIL'}`);
    return integrity;
  }

  /**
   * API 접근 및 인증 안정성을 검증합니다.
   * @param token 사용된 인증 토큰
   * @returns API 접근 성공 여부
   */
  public checkAccess(token: string): boolean {
    const access = this.stabilityTest.checkApiAccess(token);
    console.log(`[StabilityMonitor] API Access Check: ${access ? 'SUCCESS' : 'FAIL'}`);
    return access;
  }

  /**
   * 통합 안정성 검사 실행
   */
  public runFullCheck(data: StabilityData, token: string): boolean {
    const dataValid = this.validate(data);
    const accessValid = this.checkAccess(token);
    return dataValid && accessValid;
  }
}

export { StabilityMonitor };