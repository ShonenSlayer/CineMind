from sqlalchemy import Column, Integer, String, Float, Text
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    genre = Column(String(200), nullable=False)
    overview = Column(Text, nullable=False)
    release_year = Column(Integer)
    rating = Column(Float, default=0.0)
    poster = Column(String(500), default="")
