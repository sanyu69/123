# 안정성 기반 수익 분석 대시보드 구축 계획 (Phase 1)

## 1. 목표 및 정의
본 프로젝트의 최종 목표는 시스템 안정성($R_{Stability}$) 지표가 비즈니스 수익($S$)에 미치는 영향을 정량화하여, 기술적 투자 우선순위를 재설정하는 것입니다.

**핵심 가정:** $R_{Stability}$이 일정 수준 이하로 유지될 때, 예상되는 잠재 손실액($\text{Potential Loss}$)을 계산할 수 있다.

## 2. 핵심 지표 정의
*   **수익 지표 ($S$):** 월별 순수익 (Derived from PayPal/Internal Logs)
*   **안정성 지표 ($R_{Stability}$):** 오류 발생률(Error Rate), 평균 응답 시간(Latency)

## 3. 손실 함수 모델링 (Business Logic)
시스템 불안정으로 인한 잠재적 손실을 다음 공식으로 정의합니다.
$$\text{Potential Loss}_t = \left[ (\text{Error Rate}_t \times \text{Transaction Volume}_t) + (\text{Avg Latency}_t \times \text{User Engagement Rate}_t) \right] \times \text{Risk Multiplier}$$

*   **$\text{Transaction Volume}_t$:** 해당 기간 동안 발생한 총 거래 수.
*   **$\text{User Engagement Rate}_t$:** 해당 기간 동안의 활성 사용자 수 또는 세션 수.
*   **$\text{Risk Multiplier}$:** 현빈이 설정할 위험 가중치 (예: $1.5 \sim 3.0$).

## 4. 데이터 연계 및 ETL 설계 (Action Item for Koda-ri)
데이터는 다음 두 가지 흐름을 통해 연결되어야 합니다.
1.  **수익 흐름:** `paypal_revenue` 실행 결과에서 추출된 수익 데이터를 시간별로 정규화.
2.  **안정성 흐름:** `stability_reporter.py`에서 산출된 $R_{Stability}$ 지표를 시간별로 매핑.

**요청 사항:** 코다리 에이전트는 위의 손실 함수 모델을 실제 데이터 파이프라인에 적용할 수 있도록, 시스템 안정성 데이터와 수익 데이터를 결합하는 ETL 스크립트의 **최소 요구사항(JSON Schema 확장안)**을 제시해야 합니다.