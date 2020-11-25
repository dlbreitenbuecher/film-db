'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');

/** Class for interacting with the films table in the database */

class Film {

  /** Create a film entry in the db and return new film data
   * 
   * Accepts: 
   *  { imdbID, title, director, releaseYear, genre, rating, runtime,
   *    logoUrl, thumbsUp, thumbsDown }
   * 
   * Returns: 
   *  { imdbID, title, director, releaseYear, genre, rating, runtime,
   *    logoUrl, thumbsUp, thumbsDown }
   */
  static async create(
      { imdbID, title, director, releasseYear, genre, rating, runtime, logoUrl }) {
    // Check for duplicate entries
    const duplicateCheck = await db.query(
      `SELECT imdb_id
       FROM films
       WHERE imdb_id = $1`,
      [imdbID]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Film record already in database! IMDB ID: ${imdbID}`);
    }

    const result = await db.query(
      `INSERT INTO films
        (imdb_id,
        title,
        director,
        release_year,
        description,
        genre,
        rating,
        runtime,
        logo_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING imdb_id AS 'imdbID', title, director, release_year AS 'releaseYear',
                  description, genre, rating, runtime, logo_url AS 'logoURL'`,
      [
        imdbID,
        title,
        director,
        releasseYear,
        description, 
        genre,
        rating,
        runtime,
        logoUrl
      ]
    )

      const filmDetail = result.rows[0];

      return filmDetail;
    }


    /** Returns film data if in DB, otherwise returns undefined
     * 
     * Accepts:
     *  imdbID
     * 
     * Returns:
     *  if in db:
     *    { imdbID, title, director, releaseYear, genre, rating, runtime,
     *        logoUrl, thumbsUp, thumbsDown }
     * 
     *  if not in db:
     *    undefined
     */
    static async get(imdbID) {
      const result = await db.query(
        `SELECT imdb_id AS 'imdbID,
                title,
                director,
                release_year AS 'releaseYear,
                description,
                genre, 
                rating,
                runtime,
                logo_url AS logoURL
          FROM films
          WHERE imdb_id = $1`,
        [imdbID]
      );

      const filmDetail = result.rows[0]

      return filmDetail;
    }
}

module.exports = Film;