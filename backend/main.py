from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import Base, engine, get_db
from models import Movie
from recommender import get_similar_movies

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="CineMind API",
    description="Movie discovery and content-based recommendation system",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def movie_to_dict(movie):
    return {
        "id": movie.id,
        "title": movie.title,
        "genre": movie.genre,
        "overview": movie.overview,
        "release_year": movie.release_year,
        "rating": movie.rating,
        "poster": movie.poster
    }

@app.get("/")
def home():
    return {"message": "Welcome to CineMind API", "status": "running"}

@app.get("/api/movies")
def get_movies(
    genre: str = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Movie)

    if genre and genre.lower() != "all":
        query = query.filter(Movie.genre.ilike(f"%{genre}%"))

    if search:
        query = query.filter(
            or_(
                Movie.title.ilike(f"%{search}%"),
                Movie.overview.ilike(f"%{search}%")
            )
        )

    return [movie_to_dict(movie) for movie in query.order_by(Movie.title).all()]

@app.get("/api/movies/{movie_id}")
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie_to_dict(movie)

@app.get("/api/genres")
def get_genres(db: Session = Depends(get_db)):
    movies = db.query(Movie.genre).all()
    genres = set()

    for row in movies:
        for genre in row[0].split(","):
            genres.add(genre.strip())

    return sorted(genres)

@app.get("/api/recommendations/{movie_id}")
def recommend(movie_id: int, limit: int = 5, db: Session = Depends(get_db)):
    movies = db.query(Movie).order_by(Movie.id).all()

    target_index = next(
        (i for i, movie in enumerate(movies) if movie.id == movie_id),
        None
    )

    if target_index is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    return get_similar_movies(
        target_index,
        movies,
        max(1, min(limit, 20))
    )
