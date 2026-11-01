from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_similar_movies(target, movies, limit=5):
    if not movies or len(movies) < 2:
        return []

    descriptions = [
        f"{movie.title} {movie.genre} {movie.overview}"
        for movie in movies
    ]

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(descriptions)
    similarities = cosine_similarity(matrix[target], matrix).flatten()

    ranked = similarities.argsort()[::-1]
    results = []

    for index in ranked:
        if index == target:
            continue

        movie = movies[index]
        results.append({
            "id": movie.id,
            "title": movie.title,
            "genre": movie.genre,
            "overview": movie.overview,
            "release_year": movie.release_year,
            "rating": movie.rating,
            "poster": movie.poster,
            "similarity": round(float(similarities[index]), 3)
        })

        if len(results) >= limit:
            break

    return results
