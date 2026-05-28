# 최종 비주얼 시스템 및 디자인 명세 (Final Visual System & Design Specification)

## 1. 브랜드 톤앤매너 (Tone & Manner)

*   **핵심 미학:** **Neon Vibe & System Integrity**
    *   **Neon Vibe:** 사이버펑크적인 네온 색상과 깊은 어두운 배경을 사용하여 몰입감과 미래지향적인 느낌을 극대화합니다. 역동성과 에너지(Dynamic Effects)를 강조합니다.
    *   **System Integrity:** 모든 디자인 요소는 안정적이고 정교해야 합니다. 혼란스러운 네온 효과가 아닌, 시스템의 견고함과 신뢰성을 시각적으로 전달하는 데 중점을 둡니다.

## 2. 컬러 팔레트 (Color Palette)

$R_{Stability}$와 프리미엄 가치를 강조하기 위해 대비가 강하고 에너지 넘치는 색상을 사용합니다.

| 용도 | 이름 | HEX 코드 | RGB 값 | 역할 및 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary (Background)** | Deep Void Black | `#0A0A14` | (10, 10, 20) | 깊은 어둠을 표현하여 네온 효과를 극대화하고 몰입도를 높임. |
| **Accent (Neon Blue)** | System Glow | `#00FFFF` | (0, 255, 255) | 핵심적인 시스템 안정성($R_{Stability}$) 지표 및 CTA에 사용되는 주 색상. 신뢰와 기술력을 상징. |
| **Secondary (Highlight)** | Data Red | `#FF4500` | (255, 69, 0) | 경고, 중요 데이터, VIP 티어의 프리미엄을 강조하는 포인트 색상. 긴급성과 가치를 표현. |
| **Tertiary (Text)** | Ghost White | `#F0F8FF` | (240, 248, 255) | 모든 본문 및 주요 텍스트에 사용되어 대비를 극대화함. |

## 3. 타이포그래피 시스템 (Typography System)

가독성과 네온 미학을 동시에 충족시키는 폰트를 선택합니다.

*   **Headlines/Titles:** **Orbitron** 또는 **Bebas Neue**
    *   (용도: 메인 배너 제목, IAP 티어 이름 등. 기하학적이고 미래적인 느낌 강조)
*   **Body Text:** **Roboto Mono** 또는 **Inter**
    *   (용도: 설명 텍스트, 데이터 표, 상세 정보. 코딩/시스템 느낌을 주면서 높은 가독성 확보)

## 4. 웹사이트 주요 섹션 디자인 명세

### A. 메인 배너 (Homepage Banner)

**목표:** 방문자에게 즉각적으로 $R_{Stability}$의 존재와 프리미엄 경험을 인지시킨다.

*   **레이아웃:** 전체 화면 배경은 **Deep Void Black (`#0A0A14`)**으로 설정한다.
*   **시각 요소:** 중앙에 'The System Gauge MAX' 로고를 네온 블루(`#00FFFF`)로 크게 배치하고, 그 주변에 미세하게 움직이는 그리드 라인 또는 데이터 흐름 애니메이션(Dynamic Effects)을 적용하여 역동성을 부여한다.
*   **텍스트:** 핵심 문구는 **Ghost White (`#F0F8FF`)**를 사용하며, 시스템 안정성($R_{Stability}$)이라는 단어가 가장 강조되도록 배치한다.
*   **CTA 버튼:** 'Pro Upgrade' 및 'VIP Access' 버튼은 **System Glow (`#00FFFF`)** 배경에 Data Red(`#FF4500`) 테두리를 사용하여 시각적 계층 구조를 명확히 한다.

### B. IAP 페이지 (Pricing Page)

**목표:** 각 티어의 가치 차이($R_{Stability}$ 기반)를 명확하게 비교하여 프리미엄 가격에 대한 정당성을 부여한다.

*   **레이아웃:** 3단 카드형 레이아웃을 사용하며, 배경은 **Deep Void Black**을 유지한다.
*   **티어 디자인:** 각 티어 카드(Basic, Pro, VIP)는 테두리가 없는 플랫한 형태로 디자인하되, 선택된 티어의 경계선과 강조 요소에만 **System Glow**를 적용하여 시각적 계층 구조를 만든다.
*   **$R_{Stability}$ 표시:** 각 티어 옆에는 해당 티어가 제공하는 핵심 시스템 안정성 지표(예: Pro는 '광고 제거 활성화', VIP는 '실시간 데이터 리포트 접근')를 아이콘과 함께 명확히 표시한다.
*   **가격 표시:** 가격은 **Data Red (`#FF4500`)** 계열로 강조하여, 비용 이상의 가치(Value)를 지불한다는 느낌을 시각화한다.