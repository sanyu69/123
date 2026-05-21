# 웹사이트 메인 페이지 최종 디자인 스펙 (Neon Vibe + R_Stability 통합)

## 1. 디자인 시스템 재확인 (Foundation)
**브랜드 스타일:** Neon Vibe
*   **Primary Color (Accent):** `#00FFFF` (Cyan/Neon Blue) - 핵심 CTA 및 안정성 지표 강조
*   **Secondary Color (Background/Contrast):** `#1A1A2E` (Deep Violet/Dark Navy) - 전체 배경, 네온 효과의 대비를 극대화.
*   **Text Color:** `#FFFFFF` (Pure White) 또는 `#B0C4DE` (Light Cyan for secondary text).
*   **Typography:**
    *   **Headlines (H1/H2):** `Orbitron` 또는 유사한 산세리프 계열의 네온 느낌 폰트.
    *   **Body Text:** `Inter` 또는 `Roboto` (가독성 확보).

## 2. 메인 페이지 와이어프레임 및 스펙 상세화

### A. Hero Section (안정성 강조 영역)
| 요소 | 레이아웃/구조 | 디자인 스펙 | $R_{Stability}$ 통합 방식 |
| :--- | :--- | :--- | :--- |
| **H1 (메인 슬로건)** | 중앙 상단, 크고 굵게 배치 | `Orbitron`, 색상: `#FFFFFF` 또는 `#00FFFF` (네온 효과) | 없음 |
| **$R_{Stability}$ 지표 박스** | 화면 중앙 상단에 강조하여 배치 (가장 눈에 띄게) | 직경 최대화, 배경: 투명한 네온 블러 효과 (`#00FFFF` 오버레이), 숫자(`R_Stability`)는 매우 크게 표시. | **핵심 시각화:** $R_{Stability}$ 값을 동적인 게이지(Gauge) 형태로 중앙에 배치하며, 현재 상태(`OK`/`WARNING`/`CRITICAL`)를 색상으로 즉시 표현. |
| **Sub-Headline** | $R_{Stability}$ 지표 아래에 배치 | `Inter`, 밝은 회색 계열 (`#B0C4DE`). "안정성이 곧 수익입니다." 등 명확한 메시지. | 안정성 $\rightarrow$ 신뢰도 연결 강조 |
| **Primary CTA (Call to Action)** | 중앙 하단, 가장 눈에 띄는 버튼 | 배경: `#FF00FF` (Magenta/Pink), 테두리 네온 효과 적용. | $R_{Stability}$가 높을 경우만 활성화되거나, '안정성 보장된 시작하기' 등으로 문구 변경 가능. |

### B. Value Proposition Section (핵심 가치 제시)
*   **레이아웃:** 3~4개의 카드형 섹션으로 구성. 각 카드는 `Neon Vibe` 테두리 스타일 적용.
*   **내용:** 게임의 핵심 매력과 **안정적인 운영 환경**을 연결하여 제시합니다.
*   **디자인 팁:** 카드 배경은 어두운 색(`#1A1A2E`)을 유지하되, 아이콘이나 구분선에 `#00FFFF` 네온 효과를 사용하여 시선을 유도합니다.

### C. Monetization Gate Section (Dynamic Pricing Gate 연동 영역)
*   **구조:** 사용자에게 현재 접근 가능한 기능 수준을 명확히 알려줍니다.
*   **시각화:** 현재 $R_{Stability}$ 상태에 따라 표시되는 텍스트와 버튼 색상이 동적으로 변경되어야 합니다.

| $R_{Stability}$ 상태 | 표시 텍스트 (Gate Decision) | CTA 버튼 스타일 | 설명 텍스트 예시 |
| :--- | :--- | :--- | :--- |
| **ALLOW** ($R_{Stability} \ge T_{warning}$) | **프리미엄 기능 접근 가능** | `#00FFFF` 네온 버튼 (활성화) | "Pro 기능 잠금 해제" |
| **RESTRICTED** ($T_{warning} \le R_{Stability} < T_{critical}$) | **안정성 점검 필요** | `#FFA500` 오렌지색 경고 박스 + `RESTRICTED` 텍스트 (비활성화) | "시스템 안정성 $R_{Stability}$ 보장 중. 가격 조정이 일시적으로 제한됩니다." |
| **DENY** ($R_{Stability} \ge T_{critical}$) | **서비스 일시 중단** | `#FF0000` 레드 경고 박스 (비활성화) | "시스템 안정성 $R_{Stability}$ 임계값 초과. 서비스가 잠정 중단되었습니다. 관리자에게 알림." |

## 3. 개발팀 전달 최종 스펙 요약
1.  **디자인 시스템:** `Neon Vibe` 고정 적용 (`#00FFFF`, `#1A1A2E`).
2.  **핵심 UI:** Hero Section에 $R_{Stability}$ 게이지를 최상단 중앙에 배치하여 **신뢰도**를 즉각적으로 전달.
3.  **동적 제어:** Monetization Gate 섹션은 백엔드 API(`GET /api/stability/status`)의 응답 값에 따라 CTA 버튼 색상과 텍스트가 **실시간으로 변경**되도록 프론트엔드 로직을 설계해야 함.
4.  **레이아웃 우선순위:** $R_{Stability}$ > 핵심 게임 플레이 > 수익화 옵션 순서로 정보 계층 구조를 설정하여, 사용자가 가장 중요한 정보를 먼저 인식하도록 설계한다.