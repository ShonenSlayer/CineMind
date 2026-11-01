# CineMind – System Architecture

## 1. Overview

CineMind follows a three-part application architecture:

1. Frontend – React and TypeScript.
2. Backend – Python and FastAPI.
3. Database – PostgreSQL.

The recommendation engine operates within the backend.

## 2. Architecture Diagram

    +---------------------------+
    |     React Frontend        |
    |       TypeScript          |
    |                           |
    | Movie Search              |
    | Genre Filtering           |
    | Movie Details             |
    | Recommendations           |
    +-------------+-------------+
                  |
                  | HTTP REST API
                  v
    +---------------------------+
    |      FastAPI Backend      |
    |                           |
    | Movie API                 |
    | Genre API                 |
    | Recommendation API        |
    +-------------+-------------+
                  |
           +------+------+
           |             |
           v             v
    +-------------+  +------------------+
    | PostgreSQL  |  | Recommendation   |
    | Database    |  | Engine           |
    | Movie Data  |  | TF-IDF           |
    |             |  | Cosine Similarity|
    +-------------+  +------------------+

## 3. Frontend Layer

The frontend is developed using React and TypeScript.

Responsibilities:
- Display the movie catalogue.
- Search movies.
- Filter movies by genre.
- Display movie details.
- Show similar movie recommendations.

## 4. Backend Layer

FastAPI handles communication between the frontend, database and recommendation engine.

Responsibilities:
- Process HTTP requests.
- Retrieve movie records.
- Provide genre information.
- Generate movie recommendations.
- Return JSON responses.

## 5. Database Layer

PostgreSQL stores movie information.

SQLAlchemy is used as the Object Relational Mapper (ORM) to communicate with the database.

## 6. Recommendation Engine

The recommendation engine uses Scikit-learn.

It combines movie titles, genres and descriptions, converts the text into TF-IDF vectors and calculates cosine similarity.

## 7. Communication Flow

1. The user opens CineMind.
2. React sends an HTTP request to FastAPI.
3. FastAPI retrieves movie data from PostgreSQL.
4. When recommendations are requested, the recommendation engine calculates similarity.
5. FastAPI returns the results as JSON.
6. React displays the recommended movies.
