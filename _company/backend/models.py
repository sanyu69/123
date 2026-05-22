from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import ENUM
from datetime import datetime

# Base setup (re-importing necessary parts from main for completeness if needed, but keeping it modular)
Base = declarative_base()

class StabilityTier(enum.Enum):
    X = 1  # Basic Tier
    TwoX = 2  # Pro Tier
    ThreeX = 3  # VIP Tier

class UserRole(enum.Enum):
    BASIC = "Basic"
    PRO = "Pro"
    VIP = "VIP"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    subscription_tier = Column(ENUM(StabilityTier), default=StabilityTier.X, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING") # PENDING, COMPLETED, FAILED
    transaction_type = Column(String, default="SUBSCRIPTION")
    created_at = Column(DateTime, default=datetime.utcnow)

# Note: In a real application, these models would be imported by main.py