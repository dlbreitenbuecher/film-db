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
 * 
 * Throws a NotFoundError if movie is not present in IMDB (see fn getFilmDetailFromAPI)
 */
router.get('/:imdbID', async function (req, res, next) {
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


/**POST /:imdbID/vote/:direction
 * 
 * Add 1 thumbs-up or thumbs-down vote for a film
 * 
 * Accepts:
 *   req.params = { imdbID, direction }
 *      where direction is either 'up' or 'down'
 * 
 * Returns:
 *    if direction is 'up', returns updated thumbsUp count
 *        { thumbsUP }
 *    otherwise returns updated thumbsDown count
 *        { thumbsDown }
 */
router.post('/:imdbID/vote/:direction', async function (req, res, next) {
  const { imdbID, direction } = req.params;

  try {
    if (direction.toLowerCase() === 'up') {
      const updatedVote = await Film.thumbsUp(imdbID);
      console.log('updatedVote in Post Vote:', updatedVote);
      return res.json(updatedVote);
    } else if (direction.toLowerCase() === 'down') {
      const updatedVote = await Film.thumbsDown(imdbID);
      return res.json(updatedVote);
    }
  } catch (err) {
    return next(err);
  }
})

 

module.exports = router;