# Risk-Focused Clarity Dashboard Mockup (Neon Vibe)

## 🎨 Style Guide
*   **Background:** Deep Dark Blue (#0A0A1A)
*   **Primary Accent (Neon):** Electric Cyan (#00FFFF), Hot Pink (#FF00FF), Neon Purple (#AA00FF)
*   **Text Color:** Light Gray (#E0E0FF)
*   **Font:** Monospace/Sans-serif (예: Orbitron 또는 Space Mono 계열, 고대비 강조)

## 🖥️ Layout Structure
### 1. Header Area
*   **Title:** Risk-Focused Clarity Dashboard
*   **Status Bar:** 현재 위험도 요약 표시 (가장 큰 Neon 색상으로 표시)

### 2. KPI Summary Card (Top Row)
*   **Card 1: System Stability ($R_{Stability}$)**
    *   **Value:** [실시간 $R_{Stability}$ 값]
    *   **Status:** [GREEN/YELLOW/RED] (배경색 및 테두리 적용)
    *   **Trend:** (지난 24시간 변화율 표시)
*   **Card 2: Loss Exposure ($S_{Loss}$)**
    *   **Value:** [실시간 $S_{Loss}$ 값]
    *   **Status:** [GREEN/YELLOW/RED]
    *   **Trend:** (지난 24시간 변화율 표시)

### 3. Correlation Visualization (Main Focus Area)
*   **Visualization Type:** Scatter Plot / Heatmap Hybrid
*   **Title:** Stability vs. Loss Correlation
*   **X-Axis:** $R_{Stability}$ (0 ~ 100%)
*   **Y-Axis:** $S_{Loss}$ (0 ~ Max Loss Value)
*   **Data Points:** 각 데이터 포인트는 해당 지점의 위험도(Risk Level)에 따라 색칠됩니다. (예: RED 포인트는 가장 강한 경고색으로 강조)

### 4. Risk Breakdown & Action Plan (Actionable Insights)
*   **Section Title:** Risk Analysis & Recommended Actions
*   **Card A: RED Risk (Critical)**
    *   **Metric:** [RED로 분류된 구체적인 실패 지표]
    *   **Action:** **MITIGATE IMMEDIATELY** - [구체적 개발/모듈 개선 항목]
*   **Card B: YELLOW Risk (Warning)**
    *   **Metric:** [YELLOW로 분류된 경고 지표]
    *   **Action:** **OPTIMIZE** - [최적화 권고 사항 및 리소스 재분배 계획]
*   **Card C: GREEN Risk (Stable)**
    *   **Metric:** [GREEN으로 분류된 안정 지표]
    *   **Action:** **SCALE-UP** - [다음 단계 확장 계획]

### 5. System Health Log (Footer)
*   **Content:** 최근 $R_{Stability}$ 측정 이벤트 및 모듈 상태 로그 리스트.
*   **Style:** 미니멀한 텍스트 기반의 시간 순서 목록.