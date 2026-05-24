from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any
import json
from stability_logic import calculate_stability_score, get_user_data # 가정: stability_logic.py에서 함수 임포트

router = APIRouter(prefix="/api/stability", tags=["Stability Logic"])

# Mock 데이터베이스 또는 외부 서비스 의존성 (실제 환경에서는 DB 연결 필요)
DUMMY_USER_DB = {
    "user_id_123": {"tier": "Basic", "data_points": 10},
    "user_id_456": {"tier": "Pro", "data_points": 50},
}

def get_user_tier(user_id: str) -> str:
    """사용자 ID에 따른 티어를 조회하는 Mock 함수."""
    if user_id == "user_id_456":
        return "Pro"
    return "Basic"

@router.get("/score/{user_id}", response_model=Dict[str, Any])
async def get_stability_score(user_id: str):
    """특정 사용자의 시스템 안정성 점수를 조회합니다."""
    if user_id not in DUMMY_USER_DB:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = DUMMY_USER_DB[user_id]
    
    # 1. 안정성 점수 계산 (stability_logic.py 로직 통합)
    stability_score = calculate_stability_score(user_data["data_points"])
    
    # 2. 티어 기반 추가 정보 제공
    tier = get_user_tier(user_id)
    
    return {
        "user_id": user_id,
        "stability_score": stability_score,
        "tier": tier,
        "message": f"Stability score calculated based on {user_data['data_points']} data points."
    }

@router.post("/transition/{user_id}", response_model=Dict[str, Any])
async def transition_tier(user_id: str):
    """사용자의 티어를 전환하는 로직을 실행합니다 (VIP/Pro 전환)."""
    if user_id not in DUMMY_USER_DB:
        raise HTTPException(status_code=404, detail="User not found")

    current_user = DUMMY_USER_DB[user_id]
    current_tier = current_user["tier"]
    
    # R_Stability 기준 확인 (stability_logic.py의 핵심 로직 호출)
    stability_threshold = 70  # 예시 임계값, 실제로는 DB나 설정에서 가져와야 함
    current_score = calculate_stability_score(current_user["data_points"])

    new_tier = current_tier
    transition_result = {"status": "No transition", "reason": "Stability threshold not met."}
    
    # VIP/Pro 전환 로직 실행 (R_Stability 기반)
    if current_tier == "Basic" and current_score >= stability_threshold:
        new_tier = "Pro"
        transition_result = {"status": "Transition successful", "new_tier": "Pro", "reason": f"Achieved $R_{Stability}$ threshold of {stability_threshold}%."}
    elif current_tier == "Pro":
         transition_result = {"status": "Already Pro", "new_tier": "Pro", "reason": "User is already at Pro tier."}
    else:
        # 추가적인 비즈니스 규칙 적용 가능
        transition_result = {"status": "Failed", "new_tier": current_tier, "reason": "Conditions not met for transition."}

    # 데이터베이스 업데이트 (Mock)
    DUMMY_USER_DB[user_id]["tier"] = new_tier
    
    return transition_result

# FastAPI 앱 실행 부분은 별도 파일에서 처리한다고 가정합니다.
# 예: main.py에서 router를 포함시켜 실행