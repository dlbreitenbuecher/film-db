'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');

/** Class for interacting with the films table in the database */

class Film {

  /** Create a film entry in the db and return new film data
   * 
   * Accepts: 
   *  { imdbID, title, director, year, genre, description, rated, runtime, poster }
   * 
   * Returns: 
   *  { imdbID, title, director, year, genre, description, rated, runtime,
   *    poster, thumbsUp, thumbsDown }
   */
  static async create(
      { imdbID, title, director, year, genre, description, rated, runtime, poster }) {
        debugger;
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
        rated,
        runtime,
        poster)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING imdb_id AS "imdbID", title, director, release_year AS year, description, genre,
                  rated, runtime, poster, thumbs_up AS "thumbsUp", thumbs_down AS "thumbsDown" `,
      [
        imdbID,
        title,
        director,
        year,
        description, 
        genre,
        rated,
        runtime,
        poster
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
     *    { imdbID, title, director, year, genre, description, rated, runtime,
     *        poster, thumbsUp, thumbsDown }
     * 
     *  if not in db:
     *    undefined
     */
    static async get(imdbID) {
      debugger;
      const result = await db.query(
        `SELECT imdb_id AS "imdbID",
                title,
                director,
                release_year AS year,
                genre, 
                description,
                rated,
                runtime,
                poster,
                thumbs_up AS "thumbsUp",
                thumbs_down AS "thumbsDown"
          FROM films
          WHERE imdb_id = $1`,
        [imdbID]
      );
      debugger;
      const filmDetail = result.rows[0]

      return filmDetail;
    }
}

module.exports = Film;