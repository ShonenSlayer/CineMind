import { useEffect, useState } from "react";
import { Search, Film, Star, Sparkles, X, Clapperboard } from "lucide-react";
import "./App.css";

interface Movie {
  id: number;
  title: string;
  genre: string;
  overview: string;
  release_year: number;
  rating: number;
  poster: string;
  similarity?: number;
}

const API = "http://127.0.0.1:8000/api";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API}/movies`).then((r) => r.json()),
      fetch(`${API}/genres`).then((r) => r.json()),
    ])
      .then(([movieData, genreData]) => {
        setMovies(movieData);
        setGenres(genreData);
      })
      .catch(() => setError("Unable to connect to CineMind API."))
      .finally(() => setLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.overview.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  });

  async function openMovie(movie: Movie) {
    setSelectedMovie(movie);
    setRecommendations([]);

    try {
      const response = await fetch(`${API}/recommendations/${movie.id}`);
      if (!response.ok) throw new Error("Recommendation request failed");
      const data = await response.json();
      setRecommendations(data);
    } catch {
      setRecommendations([]);
    }
  }

  function closeMovie() {
    setSelectedMovie(null);
    setRecommendations([]);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon"><Clapperboard size={24} /></span>
          <span>CINE<span className="accent">MIND</span></span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#discover">Discover</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-label">
          <Sparkles size={15} /> Smart Recommendations
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL MOVIE GUIDE</span>
            <h1>Find your next<br /><span>favorite movie.</span></h1>
            <p>Discover movies you'll love with intelligent, content-based recommendations.</p>
            <a href="#discover" className="hero-button">Explore Movies <span>?</span></a>
          </div>
          <div className="hero-decoration">
            <div className="hero-circle circle-one"></div>
            <div className="hero-circle circle-two"></div>
            <Film className="hero-film" size={150} strokeWidth={0.8} />
            <div className="floating-card">
              <Sparkles size={18} />
              <div><strong>Discover more</strong><small>Powered by machine learning</small></div>
            </div>
          </div>
        </section>

        <section className="discover" id="discover">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE COLLECTION</span>
              <h2>Explore movies<span>.</span></h2>
              <p>Find something worth watching.</p>
            </div>
            <div className="movie-count"><Film size={17} /> {movies.length} Movies</div>
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies or descriptions..."
            />
            {search && <button onClick={() => setSearch("")}><X size={18} /></button>}
          </div>

          <div className="genre-list">
            {["All", ...genres].map((genre) => (
              <button
                key={genre}
                className={selectedGenre === genre ? "genre active" : "genre"}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {loading && <div className="message">Loading your movie collection...</div>}
          {error && <div className="message error">{error}</div>}

          {!loading && !error && (
            <>
              <div className="results-label">
                Showing <strong>{filteredMovies.length}</strong> movies
              </div>
              <div className="movie-grid">
                {filteredMovies.map((movie, index) => (
                  <article
                    className="movie-card"
                    key={movie.id}
                    onClick={() => openMovie(movie)}
                  >
                    <div className={`poster poster-${index % 6}`}>
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} />
                      ) : (
                        <div className="poster-placeholder">
                          <Film size={42} />
                          <span>CINEMIND</span>
                        </div>
                      )}
                      <span className="year">{movie.release_year}</span>
                      <span className="rating"><Star size={13} fill="currentColor" /> {movie.rating}</span>
                      <div className="poster-overlay"><span>View Details ?</span></div>
                    </div>
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p>{movie.genre}</p>
                    </div>
                  </article>
                ))}
              </div>
              {filteredMovies.length === 0 && (
                <div className="message">No movies found. Try another search.</div>
              )}
            </>
          )}
        </section>

        <section className="about" id="about">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Recommendations with intelligence<span>.</span></h2>
          <p>CineMind analyzes movie genres, titles and descriptions to find movies with similar content.</p>
          <div className="feature-grid">
            <div className="feature"><span>01</span><h3>TF-IDF</h3><p>Converts movie descriptions into numerical representations.</p></div>
            <div className="feature"><span>02</span><h3>Cosine Similarity</h3><p>Measures similarity between movie content vectors.</p></div>
            <div className="feature"><span>03</span><h3>Smart Discovery</h3><p>Ranks and recommends movies based on content similarity.</p></div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#"><Clapperboard size={20} /> CINE<span className="accent">MIND</span></a>
        <p>Discover stories. Find your next favorite.</p>
        <small>Mini Project · React · FastAPI · PostgreSQL · Scikit-learn</small>
      </footer>

      {selectedMovie && (
        <div className="modal-backdrop" onClick={closeMovie}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeMovie}><X /></button>
            <span className="eyebrow">MOVIE DETAILS</span>
            <h2>{selectedMovie.title}</h2>
            <div className="modal-meta">
              <span>{selectedMovie.release_year}</span>
              <span><Star size={15} fill="currentColor" /> {selectedMovie.rating}</span>
              <span>{selectedMovie.genre}</span>
            </div>
            <p className="overview">{selectedMovie.overview}</p>

            <div className="recommendation-heading">
              <Sparkles size={19} />
              <h3>Because you selected this</h3>
            </div>
            <p className="recommendation-subtitle">Movies with similar content, powered by our recommendation algorithm.</p>

            <div className="recommendation-list">
              {recommendations.map((movie) => (
                <button className="recommendation-item" key={movie.id} onClick={() => openMovie(movie)}>
                  <div><strong>{movie.title}</strong><small>{movie.genre} · {movie.release_year}</small></div>
                  <span>{Math.round((movie.similarity || 0) * 100)}% match ?</span>
                </button>
              ))}
              {recommendations.length === 0 && <p className="empty-recommendations">Finding similar movies...</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
