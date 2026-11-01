# CineMind – Project Report

## 1. Abstract

CineMind is a content-based movie recommendation system developed using React, TypeScript, Python, FastAPI, PostgreSQL and machine learning techniques.

The system recommends movies based on similarities in their titles, genres and descriptions. It uses TF-IDF for text feature extraction and cosine similarity to identify movies with similar content.

## 2. Introduction

With a large number of movies available across different platforms, users may find it difficult to discover movies that match their interests.

CineMind addresses this problem by providing a simple movie discovery platform with search, genre filtering and content-based recommendations.

## 3. Objectives

- Develop a user-friendly movie recommendation application.
- Store movie information in PostgreSQL.
- Build REST APIs using FastAPI.
- Apply machine learning for movie similarity.
- Display recommended movies through a React interface.
- Demonstrate the practical use of Python and machine learning.

## 4. Existing System

Traditional movie discovery methods often require users to browse through large catalogues manually.

## 5. Proposed System

CineMind provides a centralized movie catalogue with search, genre filtering and similar movie recommendations.

The recommendation engine analyzes movie information and identifies similar movies using text-based similarity.

## 6. Technologies Used

| Technology | Application |
|---|---|
| React | User interface |
| TypeScript | Frontend development |
| Python | Backend development |
| FastAPI | API development |
| PostgreSQL | Data storage |
| SQLAlchemy | Database interaction |
| Pandas | Data processing |
| Scikit-learn | Machine learning |
| TF-IDF | Text vectorization |
| Cosine Similarity | Similarity calculation |

## 7. System Modules

### 7.1 Frontend Module

Provides the movie catalogue, search, genre filtering, movie details and recommendation display.

### 7.2 Backend Module

Handles API requests and communicates with the database and recommendation engine.

### 7.3 Database Module

Stores movie information such as title, genre, overview, release year, rating and poster URL.

### 7.4 Recommendation Module

Uses TF-IDF and cosine similarity to identify movies with similar textual information.

### 7.5 Data Seeding Module

Inserts the initial movie dataset into PostgreSQL.

## 8. Methodology

1. Collect movie information.
2. Store movie records in PostgreSQL.
3. Retrieve movie information through FastAPI.
4. Combine title, genre and overview text.
5. Convert text into numerical vectors using TF-IDF.
6. Calculate cosine similarity between movie vectors.
7. Rank movies based on similarity scores.
8. Display recommendations in the frontend.

## 9. Implementation

The frontend is developed using React and TypeScript.

The backend is implemented using Python and FastAPI. SQLAlchemy manages database communication with PostgreSQL.

Scikit-learn provides the TF-IDF vectorization and cosine similarity functions used by the recommendation engine.

## 10. Testing

The following application functions were tested:

- Backend server startup.
- Database connection.
- Movie data insertion.
- Movie catalogue retrieval.
- Genre retrieval.
- Movie search.
- Movie details retrieval.
- Similar movie recommendations.
- Frontend and backend communication.

## 11. Results

The application successfully displays movie information and provides content-based recommendations using TF-IDF and cosine similarity.

The frontend communicates with the FastAPI backend, which retrieves movie information from PostgreSQL.

## 12. Limitations

- The initial dataset contains 20 movies.
- Recommendations are based on movie content rather than individual user preferences.
- User accounts and watch history are not implemented.
- Recommendation quality depends on the available movie descriptions and dataset.

## 13. Future Enhancements

- Add a larger movie dataset.
- Integrate movie poster services.
- Add user accounts and watchlists.
- Introduce collaborative filtering.
- Improve recommendation personalization.
- Deploy the application online.

## 14. Conclusion

CineMind demonstrates how machine learning techniques can be integrated into a full-stack web application.

The project combines React, FastAPI, PostgreSQL and Scikit-learn to build a functional content-based movie recommendation system.
