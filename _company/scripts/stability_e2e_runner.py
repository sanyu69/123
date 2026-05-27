import asyncio
import httpx
import json
from stability_monitor import fetch_stability_data # 가정: 이전 단계에서 정의된 모듈
from api_client import get_stability_metrics # 가정: API 통신을 위한 클라이언트

# $R_{Stability}$ 데이터 수집 및 검증을 위한 E2E 러너 스크립트
async def run_e2e_stability_check(endpoint: str, auth_token: str):
    """
    특정 엔드포인트에서 $R_{Stability}$ 데이터를 비동기적으로 수집하고 검증하는 함수.
    HTTP 401 인증 오류 해결을 반영하여 안정적인 데이터 접근을 시도합니다.
    """
    print(f"🚀 Starting E2E check for endpoint: {endpoint}")
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # $R_{Stability}$ 데이터를 요청하는 API 호출 (인증 포함)
            response = await client.get(
                f"{endpoint}/stability_data",
                headers={"Authorization": f"Bearer {auth_token}"}
            )

            if response.status_code == 200:
                data = response.json()
                print("✅ Data successfully retrieved.")
                # 데이터 무결성 검증 로직 추가 (예시)
                if 'R_Stability' in data and isinstance(data['R_Stability'], float):
                    print(f"📊 $R_{Stability}$ Data Acquired: {data['R_Stability']}")
                    return True, data
                else:
                    raise ValueError("Response structure invalid: R_Stability missing or wrong type.")
            elif response.status_code == 401:
                print("❌ Authentication Error (401). Token validity check needed.")
                # 실제 환경에서는 토큰 재발급 로직을 여기에 추가해야 합니다.
                return False, {"error": "Authentication Failed"}
            else:
                response.raise_for_status() # 4xx 또는 5xx 에러 발생 시 예외 발생
    except httpx.HTTPStatusError as e:
        print(f"❌ HTTP Error occurred: {e}")
        return False, {"error": f"HTTP Error: {e.response.status_code}"}
    except Exception as e:
        print(f"💥 Unexpected error during E2E check: {e}")
        return False, {"error": str(e)}

async def main():
    # 환경 변수에서 인증 정보 로드 (절대 경로 사용 금지)
    auth_token = "YOUR_SECURE_TOKEN_PLACEHOLDER" # 실제로는 환경 변수에서 로드해야 함.
    stability_endpoint = "https://api.example.com/v1" # API 엔드포인트 가정

    print("--- E2E Stability Data Collection Initiated ---")
    
    # $R_{Stability}$ 데이터 수집 재개 루프 (5회 반복 시도)
    for i in range(5):
        print(f"\n--- Run {i+1}/5 ---")
        success, result = await run_e2e_stability_check(stability_endpoint, auth_token)
        
        if success:
            # 데이터 확보 성공 시, 이 데이터를 DB 또는 파일에 저장하는 로직을 추가해야 합니다.
            print("💾 $R_{Stability}$ Data saved successfully.")
            break # 성공하면 루프 종료
        else:
            print(f"⚠️ Run {i+1} failed. Retrying in 5 seconds...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(main())