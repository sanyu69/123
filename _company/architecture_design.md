# 웹사이트 백엔드 아키텍처 설계 (Stability-First)\n\n## 1. 핵심 철학: 안정성 기반 프리미엄 포지셔닝\n모든 엔드포인트와 데이터 모델은 시스템 안정성($R_{Stability}$)과 수익화 성공률($S_{Success}$)을 최우선으로 고려하여 설계되어야 합니다.\n\n## 2. 아키텍처 패턴\n**Microservices with Event Sourcing & CQRS**: 각 기능(결제, 사용자 관리, 안정성 모니터링)을 독립적인 서비스로 분리하고, 이벤트 소싱을 통해 트랜잭션의 무결성을 보장하며, 읽기/쓰기 모델을 분리하여 확장성을 확보합니다.\n\n## 3. 기술 스택 제안 (Stability & Scalability Focus)\n*   **백엔드 프레임워크**: Python (FastAPI) 또는 Node.js (NestJS) - 높은 동시성 처리 및 빠른 프로토타입 구현을 위해 선택합니다.\n*   **데이터베이스**: PostgreSQL - 강력한 트랜잭션 보장(ACID), 복잡한 데이터 관계 모델링에 유리하며, JSONB 지원으로 유연성을 확보합니다.\n*   **메시징/이벤트**: Kafka 또는 RabbitMQ - 비동기 통신 및 이벤트 기반의 시스템 안정성 모니터링 로직 구현을 위해 필수적입니다.\n*   **인증/인가**: JWT 기반의 세분화된 역할 접근 제어(RBAC)를 적용합니다. (Stability Tier에 따른 접근 권한 차등 부여)\n\n## 4. 데이터 모델 초안 (핵심 엔티티)\n### Entity: StabilityTier (시스템 안정성 레벨)\n| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `tier_id` | UUID | 고유 식별자 |
| `name` | String | 티어 이름 (Basic, Pro, VIP) |
| `stability_score` | Float | 시스템 안정성 지표 ($R_{Stability}$) 값 |
| `feature_flags` | JSONB | 해당 티어에 부여된 기능 플래그\n| `pro_access` | Boolean | Pro 기능 접근 권한\n| `vip_access` | Boolean | VIP 기능 접근 권한\n| `pricing_model` | String | 적용된 가격 모델 ($X, 2X, 3X$ 등)\n| `created_at` | Timestamp | 생성 시각\n\n### Entity: TransactionLog (트랜잭션 로그)\n| 필드명 | 타입 | 설명 |
| `log_id` | UUID | 고유 식별자 |
| `user_id` | UUID | 사용자 ID |
| `transaction_type` | Enum | 결제, 구독, 설정 변경 등 |
| `status` | Enum | 성공(SUCCESS), 실패(FAILED), 보류(PENDING) |
| `payment_gateway_ref` | String | PayPal/Stripe 참조 ID |
| `stability_at_time` | Float | 트랜잭션 발생 시점의 $R_{Stability}$ 값\n| `error_details` | JSONB | 실패 시 상세 오류 정보\n| `processed_at` | Timestamp | 처리 시각\n\n## 5. API 엔드포인트 구조 (초안)\n*   `/api/v1/user/stability`: 사용자의 현재 안정성 티어 조회 ($R_{Stability}$ 기반)\n*   `/api/v1/transaction/process`: 인앱 결제 트랜잭션 처리 (PayPal 통합 지점)\n*   `/api/v1/system/monitor`: 시스템 안정성 데이터($R_{Stability}$) 스트리밍 엔드포인트\n\n**검토**: 이 아키텍처 설계는 $R_{Stability}$를 핵심 제어 변수로 사용하여, 모든 비즈니스 로직이 안정성의 측정 및 반영을 중심으로 구성되도록 유도합니다. 이제 디버깅 결과를 바탕으로 실제 코드로 전환하겠습니다."