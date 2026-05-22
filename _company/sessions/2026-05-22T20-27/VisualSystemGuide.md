# 💡 Visual System Guide: Reliable Neon & Stability Focus

## 1. 디자인 철학 (Design Philosophy)
**핵심 원칙:** Reliable Neon & Stability Focus
*   **Neon Vibe:** 깊고 어두운 배경 위에서 강렬하고 명확한 네온 색상으로 시각적 흥미를 유발한다.
*   **Stability Focus:** 모든 정보와 인터페이스는 안정성($R_{Stability}$)에 기반하여 직관적이고 오류 없는 흐름을 제공해야 한다.

## 2. 컬러 팔레트 (Color Palette)
| 역할 | 색상 코드 | HEX | 설명 |
| :--- | :--- | :--- | :--- |
| **Primary Background** | Dark Neon Base | `#1A0A2C` | 깊고 안정적인 네온 배경 |
| **Accent Color** | Neon Glow | `#FF00FF` | 핵심 액션 및 강조 요소 (마젠타/핑크 계열) |
| **Text & Primary UI** | Bright White | `#FFFFFF` | 주요 텍스트 및 기본 UI 요소 |
| **Secondary Accent** | Subtle Blue | `#00FFFF` | 보조 정보, 안정성 지표(Stability Indicator)에 사용 |

## 3. 타이포그래피 (Typography)
*   **Font Family:** `monospace` 계열 (예: 'Space Mono', 'VT323', 또는 시스템 기본 Monospace)
*   **Usage:** 모든 UI 요소는 시각적 명확성을 위해 고정폭(Monospace) 폰트를 사용하며, 정보의 중요도에 따라 굵기와 크기를 차등 적용한다.

## 4. 컴포넌트 규칙 (Component Rules)
1.  **레이아웃 우선:** 모든 레이아웃은 `layout_structure.tsx`를 기반으로 하며, 안정성 지표는 항상 화면의 특정 영역(예: 하단 바 또는 사이드바)에 고정되어야 한다.
2.  **네온 적용:** 버튼, 링크, 경계선 등 상호작용 요소에는 Accent Color (`#FF00FF`)를 사용하여 네온 효과를 극대화한다.
3.  **안정성 표시:** 시스템 안정성($R_{Stability}$) 데이터는 `Secondary Accent` 색상(`#00FFFF`)을 사용하여 시각적으로 강조하고, 상태(Stable, Warning, Critical)에 따라 색상 변화를 명확히 한다.

## 5. 최종 승인 및 배포 준비 (Final Approval & Deployment Prep)
이 가이드라인은 웹사이트의 모든 UI/UX 요소가 'Reliable Neon & Stability Focus' 기준을 충족하도록 보장하며, 즉시 개발팀에 전달하여 나머지 UI 구현을 진행할 수 있도록 한다.

**승인:** 이 디자인 시스템은 최종 배포를 위한 시각적 일관성의 기준이 됩니다.