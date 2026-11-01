# CineMind – Database Documentation

## 1. Database Overview

CineMind uses PostgreSQL as its relational database management system.

The database stores movie information used by the frontend and recommendation engine.

## 2. Database Name

cinemind

## 3. Database Table

The project uses a table named `movies`.

## 4. Movies Table Structure

| Column | Data Type | Description |
|---|---|---|
| id | Integer | Primary key |
| title | VARCHAR(200) | Movie title |
| genre | VARCHAR(200) | Movie genre |
| overview | TEXT | Movie description |
| release_year | Integer | Release year |
| rating | Float | Movie rating |
| poster | VARCHAR(500) | Movie poster URL |

## 5. Primary Key

The `id` column uniquely identifies each movie record.

It is configured as the primary key and uses an automatically generated integer value.

## 6. Database Integration

SQLAlchemy is used as the ORM to connect Python with PostgreSQL.

The `database.py` file manages:
- Database connection.
- SQLAlchemy engine.
- Database sessions.
- Declarative model base.

## 7. Data Seeding

The `seed.py` file inserts the initial dataset into the database.

The current dataset contains 20 movies from different genres.

The seed script checks whether movie records already exist before inserting the initial dataset.

## 8. Database Workflow

1. FastAPI receives a request.
2. The backend creates a database session.
3. SQLAlchemy communicates with PostgreSQL.
4. Movie records are retrieved or processed.
5. The backend returns the requested information as JSON.

## 9. Security

Database credentials are stored in the backend `.env` file.

The `.env` file must not be uploaded to a public GitHub repository.
