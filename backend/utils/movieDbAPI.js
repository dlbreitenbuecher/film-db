'use strict';

const axios = require('axios');

const MOVIE_API_URL = 'https://movie-database-imdb-alternative.p.rapidapi.com/'
const { API_SECRET_KEY } = require('../config');
const RAPID_API_HOST = 'movie-database-imdb-alternative.p.rapidapi.com'
const { NotFoundError } = require('../expressError');


/** Search for films by title
 * 
 * Accepts: 
 *  title
 * 
 * Returns: 
 *  [ { title, year, imdbID, poster },...]
 */
async function searchFilmsWithAPI(title) {
  console.warn('Calling the movie api with searchFilmsWithAPI')

  const res = await axios({
    method: 'GET',
    url: MOVIE_API_URL,
    params: {s: title, r: 'json'},
    headers: {
      'x-rapidapi-key': API_SECRET_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  })

  const searchResults = res.data.Search.map(film => ({
    title: film.Title,
    year: film.Year,
    imdbID: film.imdbID,
    poster: film.Poster 
  }))

  return searchResults;
}


/** Retrieve details about a specific film
 * 
 * Accepts:
 *  imdbID
 * 
 * Returns:
 *  { imdbID, title, director, year, genre, description, rated, runtime, poster } 
 */
async function getFilmDetailFromAPI(imdbIDFromRoute) {
  console.warn('Calling the movie api with getFilmDetailFromAPI')

  const response = await axios({
    method: 'GET',
    url: MOVIE_API_URL,
    params: {i: imdbIDFromRoute, r: 'json'},
    headers: {
      'x-rapidapi-key': API_SECRET_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  })

  if (response.data.Response === 'False') {
    throw new NotFoundError(`No film found with imdbID: ${imdbIDFromRoute}`)
  }

  const { imdbID, Title, Director, Year, Genre, Description, Rated, Runtime, Poster } = response.data;

  const filmDetail = {
    imdbID,
    Title,
    Director,
    Year,
    Genre,
    Description,
    Rated,
    Runtime,
    Poster
  }

  // Making the keys lowercase. 
  // Object.fromEntries -> Creates an objects from an array where each item is key-value pair sub-array
  const formattedFilmDetail = Object.fromEntries(
    Object.entries(filmDetail).map(([key, value]) => [key.charAt(0).toLowerCase()+key.slice(1), value])
  );

  return formattedFilmDetail;
}


module.exports = { 
  searchFilmsWithAPI,
  getFilmDetailFromAPI
};