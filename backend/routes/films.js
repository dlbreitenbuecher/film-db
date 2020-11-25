'use strict';

/** Routes for films */

const express = require("express");
const { searchFilms } = require('../utils/movieDbAPI');

const router = new express.Router();

/** GET / 
 *    query parameter: 
 *        title (film title)
 *    
 *    Returns 
 *        { films: [ { title, year, imdbID, posterURL },...] }
 */
router.get('/', async function (req, res, next) {
  const title = req.query.title;

  try {
    const films = await searchFilms(title);
    return res.json({ films });
  } catch (err) {
    return next(err)
  }
})

module.exports = router;