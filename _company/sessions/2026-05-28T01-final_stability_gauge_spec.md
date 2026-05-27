# Stability Gauge 최종 디자인 명세 (Pro Tier)

## 🎯 목표
Pro 티어의 $R_{Stability}$ 지표를 시각화하여 기술적 안정성을 프리미엄 가치로 전환한다.

## ✨ 미학 및 팔레트 준수
*   **전체 배경:** Deep Black (#0A0A0A).
*   **주요 강조 색상 (Neon Palette):**
    *   불안정: Warning Red (#FF4500)
    *   활성: Active Blue Glow (#00FFFF)
    *   안정: Secure Gold/Cyan (#00FF7F)

## 🖼️ Stability Gauge 컴포넌트 상세 명세
1.  **게이지 형태:** 원형 아날로그 스타일 (Gauge).
2.  **R_Stability 표시:** 중앙에 가장 크게 배치하며, 실시간 데이터에 따라 색상이 동적으로 변화한다.
3.  **안정성 레벨별 색상 매핑:**
    *   `<70%`: Warning Red (불안정 경고)
    *   `70% - 95%`: Active Blue Glow (활성 상태)
    *   `>95%`: Secure Gold/Cyan (최고 안정성, 프리미엄 강조)
4.  **텍스트 스타일:**
    *   제목: `R_Stability: [값]%` (폰트: Neo-Grotesk 계열의 네온 효과)
    *   보조 지표: Latency, Error Rate 등을 작은 크기로 네온 텍스트로 표시하여 데이터 밀도를 높인다.

## 🗣️ 마케팅 메시지 최종 확정
*   **Headline:** "Unwavering Stability. Uncompromised Performance."
*   **Value Proposition (핵심):** $R_{Stability}$는 단순한 수치가 아닌, 당신의 게임 경험이 100% 보장됨을 증명하는 신뢰의 척도이다.

## 🛠️ 개발 지침
모든 시각화 요소는 'Neon Vibe'와 'RED ALERT' 미학을 일관되게 유지해야 하며, 데이터에 따라 색상이 명확하게 변화하도록 구현한다.