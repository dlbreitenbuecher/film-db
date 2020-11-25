'use strict';

const axios = require("axios");

const MOVIE_API_URL = 'https://movie-database-imdb-alternative.p.rapidapi.com/'
const { API_SECRET_KEY } = require('../config');
const RAPID_API_HOST = 'movie-database-imdb-alternative.p.rapidapi.com'


/** Search for films by title
 * 
 * Accepts a title (string)
 * 
 * Returns [ { title, year, imdbID, posterURL },...]
 */
async function searchFilms(title) {
  console.warn('Calling the movie db with searchFilms')

  const response = await axios({
    method: 'GET',
    url: MOVIE_API_URL,
    params: {s: title, r: 'json'},
    headers: {
      'x-rapidapi-key': API_SECRET_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  })

  const searchResults = response.data.Search.map(film => ({
    title: film.Title,
    year: film.Year,
    imdbID: film.imdbID,
    posterURL: film.Poster 
  }))

  return searchResults;
}

module.exports = { searchFilms };