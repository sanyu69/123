import asyncio
import json
import pytest
from datetime import datetime
from typing import Dict, Any
import requests
import logging

# 환경 변수 및 설정 로드 (보안을 위해 .env 파일 사용 권장)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("Warning: python-dotenv not installed. Running without environment loading.")

# 데이터 스키마 정의 (data_schema.json 참조 가정)
with open("c:\\Users\\ksy04\\OneDrive\\바탕 화면\\123\\_company\\data_schema.json", "r") as f:
    SCHEMA = json.load(f)

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- 핵심 테스트 함수 정의 ---

async def collect_stability_data(api_endpoint: str, auth_token: str) -> Dict[str, Any]:
    """
    $R_{Stability}$ 지표를 측정하기 위해 API로부터 데이터를 비동기적으로 수집합니다.
    HTTP 401/5xx 오류 발생 시 예외를 발생시켜 안정성 실패를 감지합니다.
    """
    logging.info(f"Attempting to fetch data from: {api_endpoint}")
    try:
        # 실제 API 호출 로직 (예시)
        response = await asyncio.to_thread(requests.get, api_endpoint, headers={"Authorization": f"Bearer {auth_token}"})

        if response.status_code == 401:
            raise PermissionError("Authentication Failed: HTTP 401 received.")
        if response.status_code >= 500:
            raise ConnectionError(f"Server Error: HTTP {response.status_code} received.")

        data = response.json()
        logging.info("Data collection successful.")
        return data

    except requests.exceptions.RequestException as e:
        logging.error(f"Network or Request Exception during data collection: {e}")
        raise RuntimeError(f"API Communication Error: {e}") from e
    except json.JSONDecodeError:
        logging.error("Failed to decode JSON response.")
        raise RuntimeError("JSON Parsing Error.") from None
    except PermissionError as e:
        logging.error(f"Authentication Failure detected: {e}")
        raise RuntimeError("Authorization Error.") from e


async def validate_data_schema(data: Dict[str, Any], schema: Dict[str, Any]) -> bool:
    """
    수집된 데이터가 정의된 JSON Schema를 준수하는지 검증합니다.
    $R_{Stability}$ 지표의 구조적 안정성을 확인합니다.
    """
    logging.info("Starting data schema validation...")
    is_valid = True
    for field, expected_type in schema.get("properties", {}).items():
        actual_value = data.get(field)
        # 타입 검증 (간략화)
        if actual_value is not None:
            # 실제 복잡한 타입 검증 로직은 더 정교하게 구현되어야 함
            if not isinstance(actual_value, expected_type):
                logging.warning(f"Schema Violation: Field '{field}' has wrong type. Expected {expected_type.__name__}, got {type(actual_value).__name__}.")
                is_valid = False
        elif expected_type != "type" or not isinstance(actual_value, expected_type):
            # 필수 필드 누락 검증 (실제로는 JSON Schema의 required 필드 체크가 더 중요)
            logging.warning(f"Schema Violation: Required field '{field}' is missing.")
            is_valid = False

    if is_valid:
        logging.info("Data structure successfully validated against schema.")
    else:
        logging.error("Data structure validation FAILED.")

    return is_valid

# --- Pytest Fixtures 및 테스트 실행 ---

@pytest.fixture(scope="module")
def api_config():
    """테스트에 필요한 API 설정 (실제 환경 변수에서 로드되어야 함)"""
    return {
        "endpoint": "https://api.example.com/stability",  # 실제 엔드포인트로 교체 필요
        "token": "YOUR_DUMMY_TOKEN" # 실제 토큰으로 교체 필요
    }

@pytest.mark.asyncio
async def test_e2e_stability_pipeline(api_config):
    """
    End-to-End 데이터 수집 및 스키마 유효성 검증 테스트를 실행합니다.
    """
    logging.info("--- Starting E2E Stability Test Run ---")
    endpoint = api_config["endpoint"]
    token = api_config["token"]

    # 1. 데이터 수집 단계 테스트 (API 안정성 검증)
    try:
        stability_data = await collect_stability_data(endpoint, token)
        logging.info("Data Collection Phase Passed.")

        # 2. 스키마 유효성 검증 단계 테스트 (데이터 무결성 검증)
        is_schema_valid = await validate_data_schema(stability_data, SCHEMA)

        # 최종 안정성 확인
        assert is_schema_valid, "Data structure failed validation. Stability check failed."

        logging.info("✅ E2E Stability Test PASSED successfully.")

    except RuntimeError as e:
        logging.error(f"❌ E2E Stability Test FAILED due to Runtime Error: {e}")
        pytest.fail(f"Pipeline failure: {e}")


if __name__ == "__main__":
    # 실제 실행 시, API_ENDPOINT와 TOKEN을 환경 변수에서 로드해야 합니다.
    print("Note: Please configure environment variables (API_ENDPOINT, AUTH_TOKEN) before running.")
    pytest.main(["tests/e2e_stability_test.py"])