import pandas as pd
from typing import Dict, Any
import json

# --- 1. 가상 데이터 설정 (실제 구현 시 API/DB 연동으로 대체) ---

# 시스템 안정성 지표 ($R_{Stability}$) 데이터 (예시: 시간별 또는 일별 측정값)
stability_data = [
    {"timestamp": "2026-05-21T10:00:00Z", "R_Stability": 0.98},
    {"timestamp": "2026-05-21T11:00:00Z", "R_Stability": 0.97},
    {"timestamp": "2026-05-21T12:00:00Z", "R_Stability": 0.99},
    {"timestamp": "2026-05-21T13:00:00Z", "R_Stability": 0.96},
    {"timestamp": "2026-05-21T14:00:00Z", "R_Stability": 0.98},
]

# 수익 데이터 ($S_{Success}$) (예시: 일별 총수익)
revenue_data = [
    {"date": "2026-05-21", "TotalRevenue": 150000},
    {"date": "2026-05-22", "TotalRevenue": 165000},
    {"date": "2026-05-23", "TotalRevenue": 170000},
]

# --- 2. 데이터 로딩 및 전처리 ---

def load_and_prepare_data(stability: list, revenue: list) -> (pd.DataFrame, pd.DataFrame):
    """불러온 데이터를 Pandas DataFrame으로 변환하고 정제합니다."""
    df_stability = pd.DataFrame(stability)
    df_revenue = pd.DataFrame(revenue)

    # 시간 데이터는 timestamp를 기준으로 설정
    df_stability['timestamp'] = pd.to_datetime(df_stability['timestamp'])
    
    # 수익 데이터는 날짜를 기준으로 설정
    df_revenue['date'] = pd.to_datetime(df_revenue['date'])

    return df_stability, df_revenue

def join_data(df_stability: pd.DataFrame, df_revenue: pd.DataFrame) -> pd.DataFrame:
    """시스템 안정성 지표와 수익 데이터를 시간 기준으로 조인합니다."""
    # $R_{Stability}$는 시간 기반이므로, 수익 데이터의 날짜를 기준으로 병합을 시도합니다.
    # 실제 환경에서는 time-series 정렬 및 데이터 보간(Interpolation) 로직이 필요합니다.
    merged_df = pd.merge(
        df_stability,
        df_revenue,
        left_on=df_stability['timestamp'].dt.normalize(), # 시간 기준으로 날짜만 비교하여 조인 시도
        right_on=df_revenue['date'],
        how='left'
    )
    
    # $R_{Stability}$ 데이터가 수익 데이터보다 더 상세하므로, R_Stability를 기준으로 집계합니다.
    return merged_df

def calculate_kpis(df: pd.DataFrame) -> pd.DataFrame:
    """최종 KPI를 계산하고 대시보드 구조에 맞게 정리합니다."""
    if df.empty:
        return pd.DataFrame()
        
    # 핵심 KPI 정의
    # 1. 안정성 지표 (평균 $R_{Stability}$)
    df['Avg_R_Stability'] = df['R_Stability'].mean()
    
    # 2. 수익 대비 안정성 점수 (Stability-Adjusted Revenue Index)
    # R_Stability가 높을수록 수익의 질이 좋다고 가정하고 가중치를 부여합니다.
    df['Stability_Index'] = df['R_Stability'] * 100 

    # 3. 최종 지표 (KPI for Dashboard)
    final_kpis = df[[
        'timestamp', 
        'R_Stability', 
        'TotalRevenue', 
        'Stability_Index'
    ]].copy()
    
    return final_kpis

def create_dashboard_structure(kpis: pd.DataFrame) -> Dict[str, Any]:
    """KPI 결과를 대시보드에 반영하기 위한 JSON 구조를 정의합니다."""
    if kpis.empty:
        return {"status": "No Data", "metrics": {}}

    # 시간별 집계 (예시: 일별 요약)
    daily_summary = kpis.groupby(kpis['timestamp'].dt.date).agg({
        'Avg_R_Stability': 'mean',
        'TotalRevenue': 'sum',
        'Stability_Index': 'mean'
    }).reset_index()

    # 최종 구조 정의
    dashboard_data = {
        "status": "Success",
        "timestamp_generated": pd.Timestamp.now().isoformat(),
        "summary_by_day": daily_summary.to_dict('records'),
        "raw_data_link": "Full data available in pipeline_etl_draft.py results."
    }
    return dashboard_data

# --- 3. 메인 실행 흐름 ---

if __name__ == "__main__":
    print("💻 ETL 파이프라인 스크립트 시작: $R_{Stability}$와 수익 데이터 연계")
    
    # Step 1: 데이터 로딩 및 준비
    df_stability, df_revenue = load_and_prepare_data(stability_data, revenue_data)
    print("✅ 데이터 로딩 완료. 초기 데이터셋 확인.")

    # Step 2: 데이터 조인
    merged_df = join_data(df_stability, df_revenue)
    print("✅ 데이터 조인 완료. 시간 기반으로 두 데이터가 성공적으로 병합되었습니다.")
    print("\n--- 조인된 데이터 샘플 (상위 5줄) ---")
    print(merged_df.head())

    # Step 3: KPI 계산
    final_kpis = calculate_kpis(merged_df)
    print("\n✅ 핵심 KPI 계산 완료.")
    print("\n--- 최종 KPI 결과 샘플 ---")
    print(final_kpis.head())

    # Step 4: 대시보드 구조 정의 (JSON 포맷)
    dashboard_output = create_dashboard_structure(final_kpis)
    print("\n✅ 대시보드 반영 구조 JSON 생성 완료.")
    print("\n--- 최종 대시보드 구조 (JSON) ---")
    print(json.dumps(dashboard_output, indent=2))