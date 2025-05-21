# backend/models.py
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class InternetArchiveRecording(Base):
    __tablename__ = 'ia_recordings'
    id = Column(Integer, primary_key=True)
    identifier = Column(String)
    title = Column(String)
    creator = Column(String)
    date = Column(String)
    audio_url = Column(String, unique=True)
