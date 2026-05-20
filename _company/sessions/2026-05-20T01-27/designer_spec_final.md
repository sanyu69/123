# IAP 전환 프로토타입 최종 디자인 명세 (Designer Final Spec)

## 🎨 비주얼 시스템 정의
*   **테마:** Neon\_Vibe\_Stability
*   **기본 배경색 (`--color-base`):** `#1A1A2E` (Dark Navy/Deep Space Blue)
*   **GLOW 강도 변수 (`--glow-intensity`):** 0.1 ~ 3.0

## ✒️ 타이포그래피 정의
*   **헤드라인:** `font-family: 'Orbitron', sans-serif; color: var(--color-base); text-shadow: var(--glow-color, #00FFFF);`
*   **버튼 텍스트:** `font-family: 'Inter', sans-serif; color: white;`

## 📊 $R_{Stability}$ 기반 컬러 매핑
| $R_{Stability}$ 범위 | `--glow-intensity` | `--glow-color` | 배경색 (`--color-base`) | 버튼 색상 (`--action-color`) | 메시지 톤 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0% - 60% (Basic) | 0.5 | `#00FFFF` (Cyan) | `#1A1A2E` | `#FFD700` (Gold) | "안정성 확보 필요" |
| 61% - 80% (Pro Unlock) | 1.5 | `#00FF7F` (Green) | `#1A1A2E` | `#00FF7F` (Bright Green) | "시스템 안정성 확보! Pro로 전환하세요." |
| 81% - 100% (VIP Unlock) | 3.0 (Pulsing) | `#FF00FF` (Magenta) | `#1A1A2E` | `#FF00FF` (Magenta) | "최고의 안정성 달성! VIP 혜택을 경험하세요." |

## ⚙️ Dynamic Effects 구현 규칙
*   **Trust Bar:** $R_{Stability}$에 비례하여 선의 밝기(Glow Intensity)와 색상(`--glow-color`)이 실시간으로 변화한다.
*   **Transition Effect:** 버튼 클릭 시, `--glow-intensity`가 목표 값까지 부드럽게 증가하는 애니메이션을 적용한다.

## 💻 Coder 지시사항 (Implementation Mandate)
코다리는 위 명세(특히 섹션 B와 C)를 기반으로, $R_{Stability}$ 데이터 흐름과 GLOW/Dynamic Effects 구현 코드를 작성해야 한다.