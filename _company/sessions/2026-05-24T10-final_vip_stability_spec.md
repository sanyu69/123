# VIP Stability Dashboard Design Specification (Final)

## 1. Visual System Summary
- **Theme:** Stabilized Neon
- **Core Focus:** $R_{Stability}$ Visualization for $S_{VIP}$
- **Aesthetic Goal:** 신뢰감, 프리미엄, 기술적 안정성 강조.

## 2. Color Palette
| Role | Name | HEX Code | Usage Context |
| :--- | :--- | :--- | :--- |
| Primary (Stability) | Deep Cyan / Stable Blue | `#007AFF` | Core data, main metrics, stable state indicators. |
| Secondary (Premium Accent) | Electric Violet | `#A349FF` | VIP Tier differentiation, premium highlights. |
| Background (Base) | Deep Space Black | `#0A0A0A` | Overall background for maximum neon effect. |
| Success Indicator | Mint Glow | `#33FF99` | Stability achieved state. |
| Alert Indicator | Warning Amber | `#FFC107` | Stability risk/degradation state. |

## 3. Typography
- **Headings:** Orbitron (Bold) - For VIP titles and key metric labels.
- **Body Text:** Inter (Regular) - For detailed data and descriptions.

## 4. Layout & $S_{VIP}$ Visualization Rules
1.  **Central Metric ($S_{VIP}$):** 대시보드 중앙 상단에 배치하며, Primary Color(`#007AFF`)와 최대 크기의 글로우 효과를 적용하여 시각적 계층을 최상위로 설정한다.
2.  **Stability Bar:** $R_{Stability}$ 상태는 상단에 **Progress Bar** 형태로 표시한다.
    *   **Stable ($R_{Stability} \ge 95\%$):** Mint Glow (`#33FF99`) 채우기.
    *   **Warning ($70\% \le R_{Stability} < 95\%$):** Warning Amber (`#FFC107`) 채우기 및 경고 텍스트 표시.
3.  **Data Presentation:** 모든 데이터 포인트는 Deep Space Black 배경 위에서 Primary Color 또는 Accent Color로 표현하며, 데이터의 신뢰성을 위해 명확한 구분선(Separator)을 사용한다.

## 5. Action for Developer (Code Implementation)
코다리는 위의 색상 코드, 폰트 이름, 레이아웃 규칙을 기반으로 VIP 안정성 대시보드의 UI/UX 프론트엔드 컴포넌트를 즉시 구현하라. 특히 $S_{VIP}$ 지표와 $R_{Stability}$ 바의 동적 색상 변화 로직에 집중할 것.