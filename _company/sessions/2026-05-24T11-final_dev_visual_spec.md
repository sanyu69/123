# 최종 디자인 시스템 스펙 (Visual Specification) - API 및 UI/UX 구현용

## 1. 브랜드 비주얼 방향성 (Brand Visual Direction)
**핵심 미학:** Neon Vibe (네온 스타일, 사이버펑크적 감각 강조)

## 2. 컬러 팔레트 (Color Palette)
| 역할 | 이름 | HEX 코드 | RGB | 사용 용도 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Neon Blue | `#00FFFF` | (0, 255, 255) | 주요 CTA, 활성화 상태, 핵심 요소 |
| **Secondary** | Deep Violet | `#8A2BE2` | (138, 43, 226) | 배경 강조, 프리미엄 티어 강조 |
| **Accent** | Cyber Pink | `#FF1493` | (255, 20, 147) | 경고, 특별 보상, 하이라이트 |
| **Background** | Deep Black | `#1A1A1A` | (26, 26, 26) | 기본 배경색, 어두운 모드 UI |
| **Text/Base** | Neon White | `#FFFFFF` | (255, 255, 255) | 본문 텍스트, 주요 정보 표시 |

## 3. 타이포그래피 시스템 (Typography System)
**Font Family:** Orbitron / Montserrat (두꺼운 산세리프 계열 선호)

| 레벨 | 사용처 | Font Size (px) | Weight | Line Height (px) | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Title)** | 메인 제목, 대형 타이틀 | 36px | Bold (700) | 42px | Neon White |
| **H2 (Section)** | 섹션 제목 | 24px | SemiBold (600) | 30px | Neon Blue |
| **Body Large** | 주요 지표, 금액 표시 | 18px | Medium (500) | 26px | Neon White |
| **Body Regular** | 일반 설명, 텍스트 | 14px | Regular (400) | 20px | Neon White |

## 4. 컴포넌트 및 레이아웃 스펙 (Component & Layout Specs)

### 4.1. IAP 티어별 시각 차별화 요구사항
| 티어 | 배경색 | 테두리/그림자 효과 | Primary Color 사용 | Key Visual Element |
| :--- | :--- | :--- | :--- | :--- |
| **Basic** | Deep Black (`#1A1A1A`) | 미세한 네온 블루 그림자 | Neon Blue | 기본 기능 강조 |
| **Pro** | Deep Violet (`#8A2BE2`) | 두꺼운 네온 보더 (Neon Blue) | Neon Blue + Deep Violet | 고급 기능 및 안정성 강조 |
| **VIP** | Cyber Pink (`#FF1493`) | 강한 네온 글로우 효과 (Cyber Pink) | Cyber Pink + Neon Blue | 최고 등급, 독점 콘텐츠 강조 |

### 4.2. 핵심 UI/UX 흐름 및 레이아웃 좌표 (Monetization Flow Focus)
**목표:** Basic $\rightarrow$ Pro $\rightarrow$ VIP 전환 시 명확한 시각적 피드백 제공.

**A. 구독 플랜 선택 화면 (Pricing Screen)**
*   **레이아웃:** 중앙 정렬 기반의 3단 카드 레이아웃.
*   **좌표/요소:**
    *   각 티어 카드는 가로 폭 90%를 차지하며, 수직 간격(Margin)은 24px을 유지.
    *   선택된 플랜에는 `Primary (Neon Blue)` 색상을 테두리 및 선택 박스에 적용한다.
    *   **Pro 티어:** 배경색으로 Deep Violet(`#8A2BE2`)를 사용하며, 그 위에 Neon Blue(`#00FFFF`)로 하이라이트 텍스트를 오버레이 한다.

**B. 대시보드 지표 시각화 (Dashboard Metrics)**
*   **KPI 카드:** 모든 KPI 카드는 Deep Black 배경에 Neon White 텍스트를 사용한다.
*   **Tier Indicator:** 각 티어별 사용자 상태는 좌측 상단에 작은 아이콘으로 표시되며, **VIP** 상태일 경우 Cyber Pink(`#FF1493`)의 미묘한 글로우 효과를 적용하여 시각적 우선순위를 부여한다.

### 4.3. API 명세서 연계 요구사항 (API Spec Linkage)
*   **$R_{Revenue}$ 지표 반영:** 모든 수익화 관련 엔드포인트(예: `/api/tier_upgrade`)의 응답에는 `$R_{Revenue}$` 지표와 시각적 차별화를 위한 **IAP 아트 에셋 명세(`sessions/2026-05-17T09-final_iap_asset_spec.md`)**에 정의된 색상 코드를 필수로 포함해야 한다.
*   **UI/UX 요구사항:** API 응답 시, 클라이언트(프론트엔드)는 서버에서 제공하는 이 비주얼 스펙을 기반으로 동적으로 UI를 렌더링하여 **Neon Vibe** 일관성을 유지해야 한다.

## 5. 최종 검증 지침 (Final Verification Guideline)
1.  모든 시각적 요소(색상, 타이포그래피)는 위에서 정의된 팔레트와 시스템을 엄격하게 준수한다.
2.  API 명세서 작성 시, 각 엔드포인트가 어떤 시각적 상태를 유발하는지 (예: 성공/실패/업그레이드)에 대한 비주얼 매핑을 필수로 포함한다.
3.  개발팀은 본 스펙을 기반으로 실제 게임 및 웹사이트 UI 구현에 필요한 모든 고해상도 에셋을 제작해야 한다.