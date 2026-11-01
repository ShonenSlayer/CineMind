from database import Base, engine, SessionLocal
from models import Movie

Base.metadata.create_all(bind=engine)

movies = [
    ("Inception", "Sci-Fi, Thriller", "A skilled thief enters dreams to steal secrets and attempts to plant an idea.", 2010, 8.8),
    ("Interstellar", "Sci-Fi, Drama", "Astronauts travel through a wormhole searching for a new home for humanity.", 2014, 8.7),
    ("The Dark Knight", "Action, Crime", "Batman faces the Joker, a criminal mastermind creating chaos in Gotham.", 2008, 9.0),
    ("The Matrix", "Sci-Fi, Action", "A hacker discovers reality is a simulation controlled by machines.", 1999, 8.7),
    ("Avatar", "Sci-Fi, Adventure", "A human soldier explores an alien world and becomes involved in its conflict.", 2009, 7.9),
    ("Titanic", "Romance, Drama", "Two young people from different backgrounds fall in love aboard a doomed ship.", 1997, 7.9),
    ("The Avengers", "Action, Adventure", "A team of superheroes joins forces to protect Earth from an alien threat.", 2012, 8.0),
    ("Iron Man", "Action, Sci-Fi", "A genius inventor builds an advanced suit of armor and becomes a superhero.", 2008, 7.9),
    ("Spider-Man: No Way Home", "Action, Adventure", "Spider-Man faces villains from different dimensions after his identity is revealed.", 2021, 8.2),
    ("Joker", "Crime, Drama", "A struggling comedian experiences rejection and transforms into a criminal figure.", 2019, 8.4),
    ("The Shawshank Redemption", "Drama", "Two prisoners develop a friendship while maintaining hope inside prison.", 1994, 9.3),
    ("Gladiator", "Action, Drama", "A betrayed Roman general seeks revenge in the gladiatorial arena.", 2000, 8.5),
    ("Jurassic Park", "Adventure, Sci-Fi", "Scientists create a dinosaur theme park that becomes dangerously uncontrollable.", 1993, 8.2),
    ("Finding Nemo", "Animation, Adventure", "A clownfish crosses the ocean to find his missing son.", 2003, 8.2),
    ("Toy Story", "Animation, Comedy", "Toys secretly come alive and experience friendship and adventure.", 1995, 8.3),
    ("Your Name", "Animation, Romance", "Two teenagers mysteriously exchange bodies and develop a connection across time.", 2016, 8.4),
    ("Spirited Away", "Animation, Fantasy", "A young girl enters a mysterious spirit world and searches for a way home.", 2001, 8.6),
    ("The Conjuring", "Horror, Mystery", "Paranormal investigators help a family experiencing terrifying supernatural events.", 2013, 7.5),
    ("A Quiet Place", "Horror, Thriller", "A family struggles to survive in a world where sound attracts deadly creatures.", 2018, 7.5),
    ("Mad Max: Fury Road", "Action, Adventure", "Survivors cross a dangerous wasteland in a high-speed pursuit for freedom.", 2015, 8.1)
]

db = SessionLocal()

try:
    if db.query(Movie).count() == 0:
        for title, genre, overview, year, rating in movies:
            db.add(Movie(
                title=title,
                genre=genre,
                overview=overview,
                release_year=year,
                rating=rating
            ))
        db.commit()
        print(f"Successfully added {len(movies)} movies!")
    else:
        print(f"Database already contains {db.query(Movie).count()} movies.")
finally:
    db.close()
