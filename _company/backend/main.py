from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import enum
from datetime import datetime

# --- Configuration ---
# 실제 환경에서는 .env 파일에서 로드해야 함 (보안 및 안정성 확보)
DATABASE_URL = "postgresql://user:password@localhost/game_db"  # TODO: 실제 DB 접속 정보로 변경 필요
ENGINE = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
Base = declarative_base()

# --- Enum for Stability Tier (R_Stability 반영) ---
class StabilityTier(enum.Enum):
    X = 1  # Basic Tier
    TwoX = 2  # Pro Tier
    ThreeX = 3  # VIP Tier

class UserRole(enum.Enum):
    BASIC = "Basic"
    PRO = "Pro"
    VIP = "VIP"

# --- Database Models (R_Stability 반영) ---

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    subscription_tier = Column(Enum(StabilityTier), default=StabilityTier.X, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING") # PENDING, COMPLETED, FAILED
    transaction_type = Column(String, default="SUBSCRIPTION")
    created_at = Column(DateTime, default=datetime.utcnow)

# --- Database Initialization ---
def init_db():
    Base.metadata.create_all(bind=ENGINE)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- FastAPI Setup ---
app = FastAPI(title="Game Backend API (R_Stability Focus)")

@app.on_event("startup")
def on_startup():
    print("Database connection established and tables ensured.")
    init_db()

# Placeholder for core logic (to be implemented next)
@app.get("/")
def read_root():
    return {"status": "Backend initialized", "stability_focus": "R_Stability enforced"}