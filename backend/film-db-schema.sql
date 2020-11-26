CREATE TABLE films (
  id SERIAL PRIMARY KEY,
  imdb_id TEXT UNIQUE NOT NULL, 
  title TEXT NOT NULL,
  director TEXT,
  release_year TEXT,
  description TEXT,
  genre TEXT,
  rated TEXT,
  runtime TEXT,
  poster TEXT,
  thumbs_up INTEGER DEFAULT 0,
  thumbs_down INTEGER DEFAULT 0
);

CREATE INDEX imdb_id_idx ON films (imdb_id);