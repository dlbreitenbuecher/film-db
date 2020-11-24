CREATE TABLE films (
  imdb_id PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INTEGER,
  description TEXT,
  logo_url TEXT,
  thumbs_up INTEGER DEFAULT 0,
  thumbs_down INTEGER DEFAULT 0
);