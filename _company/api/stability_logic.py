<![CDATA[
import json
from typing import Dict, Any

# 가정: 이 함수는 $R_{Stability}$ 데이터를 받아 API 응답에 반영할 검증 로직을 수행합니다.

def verify_stability(data: Dict[str, Any], stability_threshold: float = 0.8) -> bool:
    """
    제공된 데이터의 시스템 안정성($R_{Stability}$) 지표가 설정된 임계값을 충족하는지 검증합니다.
    $R_{Stability}$는 외부에서 주입되어야 합니다.
    """
    if 'stability_score' not in data:
        # $R_{Stability}$ 데이터가 누락된 경우, 기본적으로 실패 처리하거나 경고를 발생시킬 수 있습니다.
        print("Warning: stability_score missing in data. Assuming failure.")
        return False

    current_stability = data['stability_score']
    
    if current_stability >= stability_threshold:
        # 안정성 기준을 통과함
        return True
    else:
        # 안정성 기준 미달
        return False

def process_events_with_stability(event_data: list, stability_data: Dict[str, float]) -> list:
    """
    이벤트 로그를 시스템 안정성 데이터와 연동하여 필터링하고 요약합니다.
    """
    stable_score = stability_data.get('R_Stability', 0.0)
    filtered_events = []

    for event in event_data:
        # 실제 $R_{Stability}$ 검증 로직 통합
        if verify_stability(event, stable_score):
            filtered_events.append(event)
            
    return filtered_events

def process_transactions_with_stability(transaction_data: list, stability_data: Dict[str, float]) -> list:
    """
    IAP 트랜잭션 데이터를 시스템 안정성 데이터와 연동하여 집계합니다.
    """
    stable_score = stability_data.get('R_Stability', 0.0)
    aggregated_transactions = []

    for transaction in transaction_data:
        # 실제 $R_{Stability}$ 검증 로직 통합 (가중치 적용 예시)
        stability_factor = stable_score # 단순화를 위해 현재 안정성 점수를 가중치로 사용
        
        # 안정성이 높을수록 긍정적인 가중치를 부여하여 집계에 반영
        weighted_value = transaction.get('amount', 0) * (1 + stability_factor * 0.1)
        
        aggregated_transactions.append({
            "transaction_id": transaction['id'],
            "amount": transaction['amount'],
            "stability_weighted_value": round(weighted_value, 2),
            "is_stable": verify_stability(transaction, stable_score)
        })
        
    return aggregated_transactions

# 테스트용 더미 데이터 생성 (실제 환경에서는 DB/API에서 데이터를 받아올 것임)
if __name__ == '__main__':
    print("Stability Logic Module Loaded.")
    
    dummy_stability = {'R_Stability': 0.95} # 높은 안정성 가정
    
    dummy_events = [
        {"id": 1, "type": "login", "timestamp": "2026-05-20T10:00:00", "stability_score": 0.9},
        {"id": 2, "type": "purchase", "timestamp": "2026-05-20T11:00:00", "stability_score": 0.85},
        {"id": 3, "type": "error", "timestamp": "2026-05-20T12:00:00", "stability_score": 0.5}, # 불안정한 이벤트 예시
    ]
    
    print("\n--- Event Processing Test ---")
    processed_events = process_events_with_stability(dummy_events, dummy_stability)
    print(f"Original Events: {len(dummy_events)}")
    print(f"Filtered Stable Events (Threshold 0.8): {len(processed_events)}")
    print(json.dumps(processed_events, indent=2))

    dummy_transactions = [
        {"id": "T100", "amount": 9.99},
        {"id": "T101", "amount": 19.99},
    ]
    
    print("\n--- Transaction Processing Test ---")
    processed_transactions = process_transactions_with_stability(dummy_transactions, dummy_stability)
    print(json.dumps(processed_transactions, indent=2))
    ]]>