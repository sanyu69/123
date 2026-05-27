import json
import time
from datetime import datetime

# --- Configuration & Data Loading ---
# 실제 데이터는 API를 통해 수신한다고 가정하고, 여기서는 임시로 JSON 파일에서 로드하는 구조를 정의합니다.
STABILITY_DATA_FILE = "stability_data.json"
REPORT_OUTPUT_FILE = "stability_report.jsonl" # JSON Lines 포맷으로 로그 저장

def load_stability_data(filepath: str) -> dict:
    """$R_{Stability}$ 데이터를 파일에서 로드합니다."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Data file not found at {filepath}")
        return {"R_Stability": 0.0, "timestamp": str(datetime.now())}
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {filepath}")
        return {"R_Stability": 0.0, "timestamp": str(datetime.now())}

def generate_action_recommendation(stability_score: float) -> str:
    """$R_{Stability}$ 점수에 따라 자동 행동 권고안을 생성합니다."""
    if stability_score >= 0.95:
        return "System is highly stable. Focus on feature expansion and monetization strategy."
    elif stability_score >= 0.70:
        return "Moderate stability detected. Review recent deployment logs and monitor resource usage closely."
    elif stability_score >= 0.40:
        return "Warning: Stability degradation detected. Immediate investigation into system stability monitoring module is required."
    else:
        return "CRITICAL: System instability detected. Initiate immediate environment reconfiguration and rollback procedure."

def run_stability_report():
    """시스템 안정성 보고서를 생성하고 로그에 기록합니다."""
    print("--- Starting Stability Report Generation ---")
    
    stability_data = load_stability_data(STABILITY_DATA_FILE)
    current_R_stability = stability_data.get("R_Stability", 0.0)
    timestamp = stability_data.get("timestamp", str(datetime.now()))

    # 1. 행동 권고안 생성
    recommendation = generate_action_recommendation(current_R_stability)

    # 2. 보고서 형식화 (JSON Lines 포맷)
    report_entry = {
        "timestamp": timestamp,
        "R_Stability": current_R_stability,
        "recommendation": recommendation,
        "status": "SUCCESS" if current_R_stability >= 0.7 else "WARNING"
    }

    # 3. 파일에 기록 (JSONL)
    with open(REPORT_OUTPUT_FILE, 'a') as outfile:
        outfile.write(json.dumps(report_entry) + "\n")

    print(f"Report generated successfully for {timestamp}. R_Stability: {current_R_stability:.4f}")


if __name__ == "__main__":
    # 테스트를 위해 임시 데이터 로드 (실제 환경에서는 API 호출로 대체됨)
    print("Running stability check simulation...")
    run_stability_report()

</create_file path="stability_reporter.py">

**2단계:** 데이터 파일 준비 및 초기 실행 검증.

시스템 안정성 지표를 저장할 JSON 파일을 생성하고, 구현된 스크립트를 실행하여 시스템이 예상대로 작동하는지 확인합니다.

<create_file path="stability_data.json">
{
    "R_Stability": 0.985,
    "timestamp": "2026-05-27T10:00:00Z"
}