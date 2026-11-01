# CineMind – Movie Recommendation System

CineMind is a content-based movie recommendation system developed using React, TypeScript, Python, FastAPI, PostgreSQL and Machine Learning.

It helps users discover movies, search by title or description, filter by genre and receive recommendations based on movie content.

## Features

- Movie catalogue
- Movie search
- Genre-based filtering
- Movie details
- Similar movie recommendations
- TF-IDF feature extraction
- Cosine similarity calculation
- PostgreSQL database integration
- REST API using FastAPI
- Responsive dark-themed interface

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend interface |
| TypeScript | Frontend programming |
| Vite | Development server and build tool |
| Python | Backend programming |
| FastAPI | REST API |
| PostgreSQL | Database |
| SQLAlchemy | Database ORM |
| Pandas | Data processing |
| Scikit-learn | Machine learning |
| TF-IDF | Text feature extraction |
| Cosine Similarity | Movie similarity calculation |
| Git | Version control |

## Project Architecture

React Frontend → FastAPI Backend → Recommendation Engine → PostgreSQL Database

## Project Structure

```text
CineMind/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── recommender.py
│   ├── seed.py
│   ├── requirements.txt
│   └── .env
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   └── ALGORITHM.md
├── README.md
├── PROJECT_REPORT.md
└── .gitignore
