# $R_{Stability}$-Compliant Interaction Specs: Real-Time Data Visualization
## 1. 핵심 지표 매핑 및 색상 팔레트 정의 (Visual Mapping & Color Palette)
| $R_{Stability}$ 상태 | $\Delta T_{\text{latency}}$ | $\Delta T_{\text{error}}$ | UI 색상 (Primary) | 보조 효과 (Accent) | 설명 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stable** | $\le C_{min} \times 1.2$ | $\le C_{min} \times 0.1$ | `#4CAF50` (Green) | `#8BC34A` (Light Green Pulse) | 시스템이 안정적으로 작동 중. |
| **Warning** | $> C_{min} \times 1.2$ | $C_{min} \times 0.1 < \Delta T_{\text{error}} \le C_{min} \times 0.5$ | `#FFC107` (Amber) | `#FF9800` (Orange Pulse) | 지연 또는 오류가 감지됨. 즉각적인 주의 필요. |
| **Critical** | $> C_{min} \times 1.2$ | $> C_{min} \times 0.5$ | `#F44336` (Red) | `#F44336` (Strong Flash) | 시스템 안정성 임계치 위반. 즉각적인 개입 필요. |

## 2. 핵심 컴포넌트 요구사항: Real-Time Stability Gauge
*   **컴포넌트 이름**: `StabilityGauge`
*   **레이아웃 좌표**: 화면 우측 상단, 헤더 영역에 배치 (X: 90% 시작).
*   **구성 요소**:
    1.  **Gauge Bar**: 전체 안정성 상태($R_{Stability}$ 값)를 막대 형태로 표현합니다. 색상은 위 표의 Primary 색상을 따릅니다.
    2.  **Metric Display**: 현재 $\Delta T_{\text{latency}}$와 $\Delta T_{\text{error}}$ 값을 실시간으로 표시합니다. (예: `[X.XX ms]`, `[Y.YY %]`)
    3.  **Status Indicator**: 현재 $R_{Stability}$ 상태를 명확히 나타내는 텍스트 레이블을 중앙에 배치.

## 3. 인터랙션 요구사항 ($R_{Stability}$-Compliant Interaction Specs)
1.  **Hover/Focus Interaction**: 마우스 오버 시, 지표별 상세 분석 툴팁(`Latency: [X ms] / Error Rate: [Y %]. R_Stability Score: [Z]`)을 표시합니다.
2.  **Critical State Feedback**: `Critical` 상태 발생 시, 게이지 바 전체에 대해 **1초 간격으로 붉은색 깜박임(Blink)** 애니메이션을 적용하여 즉각적인 경고를 제공합니다.
3.  **Drill-down**: `Warning` 상태일 경우, 클릭 시 최근 5건의 트랜잭션 로그(Latency/Error 기록)를 모달 창으로 호출하여 상세 원인을 제공합니다.