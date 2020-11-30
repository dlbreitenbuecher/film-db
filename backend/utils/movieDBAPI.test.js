'use strict';

const AxiosMockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const axiosMock = new AxiosMockAdapter(axios);

const { NotFoundError } = require('../expressError');
const { searchFilmsWithAPI, getFilmDetailFromAPI, MOVIE_API_URL } = require('./movieDbAPI');


// Silences console.warn messages that normally fire when API is called
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(jest.fn());
});


// Stop mocking axios after all tests are finished
afterAll(function () {
  axiosMock.reset();
})


/** Tests searching for film via API */

describe('search', function () {

  test('successfully search', async function () {
    axiosMock.onGet(`${MOVIE_API_URL}`, {
      params: { s: 'grey gardens', r: 'json' },
      // headers: {
      //   'x-rapidapi-key': 'API_SECRET_KEY',
      //   'x-rapidapi-host': 'RAPID_API_HOST'
      // }
    })
      .reply(200, {
        "Search": [
          {
            "Title": "Grey Gardens",
            "Year": "1975",
            "imdbID": "tt0073076",
            "Type": "movie",
            "Poster": null
          }]
      });

    const response = await searchFilmsWithAPI('grey gardens');
    expect(response).toEqual(
      [{
        "title": "Grey Gardens",
        "year": "1975",
        "imdbID": "tt0073076",
        "poster": null
      }]
    )
  })

  test('NotFoundError - no titles for search term', async function () {
    axiosMock.onGet(`${MOVIE_API_URL}`, {
      params: { s: 'asdf', r: 'json' },
    })
      .reply(200, {
        "Response": "False",
        "Error": "Movie not found!"
      });

    try {
      await searchFilmsWithAPI('asdf');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
      expect(err.status).toEqual(404);
      expect(err.message).toEqual('No film found with title: asdf');
    }
  })
})



/** Tests for retrieving details about a specific film */

describe('get film detail', function () {

  test('successfuly get film detail', async function () {
    axiosMock.onGet(`${MOVIE_API_URL}`, {
      params: { i: 'tt0073076', r: 'json' },
    })
      .reply(200, {
        "Title": "Grey Gardens",
        "Year": "1975",
        "Rated": "PG",
        "Runtime": "95 min",
        "Genre": "Documentary, Comedy, Drama",
        "Director": "Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer",
        "Actors": "Edith 'Little Edie' Bouvier Beale, Edith Bouvier Beale, Brooks Hyers, Norman Vincent Peale",
        "Plot": "An old mother and her middle-aged daughter, the aunt and cousin of Jacqueline Kennedy, live their eccentric lives in a filthy, decaying mansion in East Hampton.",
        "Language": "English",
        "Country": "USA",
        "Awards": "5 wins & 2 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        "imdbID": "tt0073076",
      })

    const response = await getFilmDetailFromAPI('tt0073076');
    expect(response).toEqual({
      imdbID: 'tt0073076',
      title: 'Grey Gardens',
      director: 'Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer',
      year: '1975',
      genre: 'Documentary, Comedy, Drama',
      description: undefined,
      rated: 'PG',
      runtime: '95 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    })
  })

  test('NotFoundError - no film found', async function() {
    axiosMock.onGet(`${MOVIE_API_URL}`, {
      params: { i: 'aaaa', r: 'json' },
    })
      .reply(200, {
        "Response": "False",
        "Error": "Incorrect IMDb ID."
      });


    try {
      await getFilmDetailFromAPI('aaaa');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
      expect(err.message).toEqual('No film found with imdbID: aaaa');
      expect(err.status).toEqual(404);
    }
  })
})