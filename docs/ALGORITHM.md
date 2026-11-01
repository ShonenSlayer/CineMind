# CineMind – Recommendation Algorithm

## 1. Overview

CineMind uses a content-based filtering approach to recommend movies.

The recommendation engine analyzes movie titles, genres and descriptions to identify movies with similar content.

## 2. Content-Based Filtering

Content-based filtering recommends items based on their features.

In CineMind, the features include:
- Movie title.
- Movie genre.
- Movie overview.

Movies with similar textual information receive higher similarity scores.

## 3. TF-IDF (Term Frequency–Inverse Document Frequency)

TF-IDF converts textual information into numerical vectors.

It evaluates the importance of words in a movie description relative to the complete movie dataset.

Common words receive less importance, while more distinctive words can receive higher importance.

CineMind uses Scikit-learn's `TfidfVectorizer` with English stop-word removal.

## 4. Cosine Similarity

Cosine similarity measures the similarity between two numerical vectors.

Its values generally range from 0 to 1 for the non-negative TF-IDF vectors used here.

- 1 indicates identical vector direction.
- 0 indicates no shared vector direction.

## 5. Recommendation Process

1. Retrieve movie records from PostgreSQL.
2. Combine each movie's title, genre and overview.
3. Convert the combined text into TF-IDF vectors.
4. Calculate cosine similarity between movie vectors.
5. Select the similarity scores for the chosen movie.
6. Exclude the selected movie itself.
7. Sort the remaining movies by similarity.
8. Return the highest-ranked movies.

## 6. Example

Suppose the user selects the movie `Interstellar`.

The recommendation engine compares its textual features with other movies in the dataset.

Movies with similar descriptions or genres may receive higher similarity scores.

The system then returns the highest-ranked matching movies.

## 7. Python Libraries

| Library | Purpose |
|---|---|
| Pandas | Data processing |
| Scikit-learn | Machine learning |
| TfidfVectorizer | Text vectorization |
| cosine_similarity | Similarity calculation |

## 8. Advantages

- Simple to implement.
- Does not require user ratings or watch history.
- Uses movie descriptions and genres.
- Can recommend movies based on content similarity.

## 9. Limitations

- Recommendations depend on the quality of movie descriptions.
- It does not learn individual user preferences.
- A small dataset limits recommendation variety.
- Similarity does not necessarily mean that a user will enjoy a movie.

## 10. Conclusion

TF-IDF and cosine similarity provide a straightforward method for identifying movies with similar textual content.

CineMind uses these techniques to generate content-based movie recommendations.
