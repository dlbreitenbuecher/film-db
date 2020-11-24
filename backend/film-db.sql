\echo 'Delete and recreate film_db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE film_db;
CREATE DATABASE film_db;
\connect film_db

\i film_db-schema.sql

\echo 'Delete and recreate film_db_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE film_db_test;
CREATE DATABASE film_db_test;
\connect film_db_test

\i film_db-schema.sql