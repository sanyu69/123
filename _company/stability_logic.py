import math
from typing import Dict, Any

# 시스템 안정성 지표($R_{Stability}$) 기준 설정
STABILITY_THRESHOLDS = {
    "VIP": 0.90,  # VIP 전환을 위한 최소 안정성 기준 (90%)
    "Pro": 0.70,  # Pro 전환을 위한 최소 안정성 기준 (70%)
    "Basic": 0.50 # Basic 티어의 기본 안정성 기준 (50%)
}

def determine_tier(stability_score: float) -> str:
    """
    시스템 안정성 점수를 기반으로 사용자에게 적절한 구독 티어를 결정합니다.

    Args:
        stability_score: 현재 시스템 안정성 지표 ($R_{Stability}$) 값 (0.0 ~ 1.0).

    Returns:
        결정된 티어 문자열 ('VIP', 'Pro', 'Basic').
    """
    if stability_score >= STABILITY_THRESHOLDS["VIP"]:
        return "VIP"
    elif stability_score >= STABILITY_THRESHOLDS["Pro"]:
        return "Pro"
    else:
        return "Basic"

def calculate_stability_status(data: Dict[str, float]) -> Dict[str, str]:
    """
    다양한 데이터 소스에 대한 안정성 상태를 계산합니다.

    Args:
        data: 시스템 안정성 지표($R_{Stability}$)를 포함하는 딕셔너리 (예: {'cpu_load': 0.6, 'db_latency': 0.8})

    Returns:
        각 데이터 소스별로 결정된 티어 상태를 담은 딕셔너리.
    """
    results = {}

    # 각 지표에 대해 안정성 점수를 계산하고 티어를 매핑
    for metric, score in data.items():
        tier = determine_tier(score)
        results[metric] = tier

    return results

def process_api_response(raw_data: Dict[str, Any], stability_scores: Dict[str, float]) -> Dict[str, Any]:
    """
    API 응답을 받아 시스템 안정성 지표를 기반으로 최종 티어와 데이터를 매핑합니다.

    Args:
        raw_data: API로부터 받은 원본 데이터.
        stability_scores: 각 모듈(예: stability_monitor.py)에서 계산된 $R_{Stability}$ 점수 딕셔너리.

    Returns:
        최종적으로 클라이언트에게 전달할 가공된 응답 데이터.
    """
    final_result = {}

    # VIP/Pro 전환 로직 적용을 위한 핵심 지표 확인
    stability_metrics = {
        "R_Stability": stability_scores.get("R_Stability", 0.0) # 가장 중요한 지표
    }

    # API 응답 데이터와 안정성 점수를 통합하여 최종 티어 결정 및 정보 제공
    for key, value in raw_data.items():
        final_result[key] = value

    # VIP/Pro 티어 상태 추가 (백엔드 로직 완성)
    stability_status = calculate_stability_status(stability_metrics)
    final_result["tier_status"] = stability_status

    return final_result

if __name__ == '__main__':
    # 테스트 실행 예시
    print("--- VIP/Pro 티어 결정 함수 테스트 ---")
    
    # 테스트 1: 매우 높은 안정성 (VIP 예상)
    test_data_vip = {"R_Stability": 0.95, "cpu_load": 0.3}
    result_vip = process_api_response(test_data_vip, {"R_Stability": 0.95})
    print(f"VIP 테스트 결과: {result_vip}")

    # 테스트 2: 중간 안정성 (Pro 예상)
    test_data_pro = {"R_Stability": 0.75, "cpu_load": 0.6}
    result_pro = process_api_response(test_data_pro, {"R_Stability": 0.75})
    print(f"Pro 테스트 결과: {result_pro}")

    # 테스트 3: 낮은 안정성 (Basic 예상)
    test_data_basic = {"R_Stability": 0.40, "cpu_load": 0.9}
    result_basic = process_api_response(test_data_basic, {"R_Stability": 0.40})
    print(f"Basic 테스트 결과: {result_basic}")

    # 추가 검증: 다중 지표 통합 테스트
    print("\n--- 다중 지표 통합 테스트 ---")
    multi_data = {"R_Stability": 0.85, "db_latency": 0.6, "memory_leak_rate": 0.1}
    result_multi = process_api_response(multi_data, {"R_Stability": 0.85})
    print(f"다중 지표 테스트 결과: {result_multi}")