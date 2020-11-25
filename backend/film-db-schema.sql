CREATE TABLE films (
  id SERIAL INTEGER PRIMARY KEY,
  imdb_id TEXT NOT NULL 
  title TEXT NOT NULL,
  director TEXT,
  release_year INTEGER,
  description TEXT,
  genre TEXT,
  rating TEXT,
  runtime TEXT,
  logo_url TEXT,
  thumbs_up INTEGER DEFAULT 0,
  thumbs_down INTEGER DEFAULT 0
);

CREATE INDEX imdb_id_idx ON films (imdb_id);