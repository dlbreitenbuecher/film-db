'use strict';

/** Routes for films */

const express = require('express');
const { searchFilmsWithAPI, getFilmDetailFromAPI } = require('../utils/movieDbAPI');
const Film = require('../models/film');

const router = new express.Router();

/** GET / 
 * 
 * Search for films by title
 * 
 * Accepts: 
 *   req.query = { title }
 *    
 * Returns 
 *   { films: [ { title, year, imdbID, poster },...] }
 */
router.get('/', async function (req, res, next) {
  const title = req.query.title;

  try {
    const films = await searchFilmsWithAPI(title);
    return res.json({ films });
  } catch (err) {
    return next(err)
  }
});


/** GET /:imdbID
 * 
 * Get details on a particular film
 * 
 * Accepts: 
 *   req.params = { imdbID }
 * 
 * Returns: 
 *   { imdbID, title, director, year, genre, description, rated, runtime, 
 *     poster, thumbsUp, thumbsDown } 
 */
router.get('/:imdbID', async function (req, res, next) {
  debugger;
  const imdbID = req.params.imdbID;

  // First see if the film is already in the database. If it is, query the database and return it
  try {
    const filmDetail = await Film.get(imdbID);
    if (filmDetail !== undefined) {
      return res.json({ filmDetail });
    }
  } catch (err) {
    return next(err)
  }

  // If film is not in the DB, make call the external API, put the results in the DB, then return the results
  try {
    const filmDetail = await getFilmDetailFromAPI(imdbID);
    const storedFilmDetail = await Film.create(filmDetail);
    
    return res.json(storedFilmDetail);
  } catch (err) {
    return next(err);
  }
});


 

module.exports = router;