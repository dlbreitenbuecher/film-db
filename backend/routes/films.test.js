'use strict';

const utils = require('../utils/movieDbAPI');
utils.searchFilmsWithAPI = jest.fn();
utils.getFilmDetailFromAPI = jest.fn();

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const { NotFoundError } = require('../expressError');


beforeAll( async function() {
  // Delete entries in films table
  await db.query('DELETE FROM films');

  // Adding film to films table (Poirot)
  await db.query(
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
      VALUES
        ('tt0094525',
        'Poirot',
        'N/A',
        '1989-2013',
        null,
        'Crime, Drama, Mystery, Thriller',
        'TV-14',
        '100 min',
        null)`);
});

afterAll(async function() {
  await db.end();
});


/** GET /films/ 
 * 
 * Returns: 
 *  { films: [ { title, year, imdbID, poster },...] }
*/
describe('GET /films/', function() {
  
  test('successfully search and receive list of films', async function() {
    
    utils.searchFilmsWithAPI.mockReturnValue([{
      "title": "Grey Gardens",
      "year": "1975",
      "imdbID": "tt0073076",
      "poster": null
    }])

    const response = await request(app)
      .get('/films/')
      .query({
        title: 'grey gardens'
      });

    expect(response.body).toEqual({
      films: [{
        "title": "Grey Gardens",
        "year": "1975",
        "imdbID": "tt0073076",
        "poster": null
      }]
    });
  });

  test('NotFoundError - no films match search term', async function() {

    utils.searchFilmsWithAPI.mockImplementation(() => {
      throw new NotFoundError('No film found with title: asdf');
    });

    const response = await request(app)
    .get('/films/')
    .query({
      title: 'asdf'
    });
    
    expect(response.body).toEqual(
      { error: 
        { message: 'No film found with title: asdf', status: 404 } 
      }
    );
  })
})


/** GET /films/:imdbID
 * 
 * Returns:
 *  { imdbID, title, director, year, genre, description, rated, runtime, 
 *    poster, thumbsUp, thumbsDown } 
 */
describe('GET /films/:imdbID', function() {

  test('successfully get film details not in DB. Save to DB before returning', async function() {

    utils.getFilmDetailFromAPI.mockReturnValue({
      imdbID: 'tt0073076',
      title: 'Grey Gardens',
      director: 'Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer',
      year: '1975',
      genre: 'Documentary, Comedy, Drama',
      description: undefined,
      rated: 'PG',
      runtime: '95 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    });

    const response = await request(app).get('/films/tt0073076');
    
    expect(response.body).toEqual({
      "imdbID": "tt0073076",
      "title": "Grey Gardens",
      "director": "Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer",
      "year": "1975",
      "genre": "Documentary, Comedy, Drama",
      "description": null,
      "rated": "PG",
      "runtime": "95 min",
      "poster": "https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      "thumbsUp": 0,
      "thumbsDown": 0
    });

    const filmInDB = await db.query('SELECT imdb_id FROM films WHERE imdb_id = $1', ['tt0073076'])
    
    expect(filmInDB.rows).toEqual([ { imdb_id: 'tt0073076' } ]);

    // Delete film record from database 
    // - a transaction  not used so we can test the film is successfully added to DB -
    await db.query("DELETE from films WHERE imdb_id = 'tt0073076'");
  })

  test('successfully get film details already in DB', async function() {
    const response = await request(app).get('/films/tt0094525');
    expect(response.body).toEqual({
      "imdbID": "tt0094525",
      "title": "Poirot",
      "director": "N/A",
      "year": "1989-2013",
      "genre": "Crime, Drama, Mystery, Thriller",
      "description": null,
      "rated": "TV-14",
      "runtime": "100 min",
      "poster": null,
      "thumbsUp": 0,
      "thumbsDown": 0
    })
  })

  test('NotFoundError - film not in IMDB', async function() {

    utils.getFilmDetailFromAPI.mockImplementation(() => {
      throw new NotFoundError('No film found with imdbID: asdf');
    });

    
    const response = await request(app).get('/films/asdf');
    
    expect(response.body).toEqual({ 
      error: { message: 'No film found with imdbID: asdf', status: 404 } 
    });
  });
})


/** POST /films/:imdbID/vote/:direction
 * 
 * Returns:
 *  { thumbsUp } (if direction === 'up')
 *  { thumbsDown } (if direction === 'down')
 */
describe('vote', function() {
  // utilize transactions so votes are not saved to DB
  beforeEach(async function() {
    await db.query('BEGIN');
  })
  afterEach(async function() {
    await db.query('ROLLBACK');
  })

  test('successful thumbsUp vote', async function() {
    
    // voting for poirot (added to db at beginning of test suite)
    const response = await request(app).post('/films/tt0094525/vote/up');
    
    expect(response.body).toEqual({ thumbsUp: 1 });
  })

  test('unsuccessful thumbsUp vote - film not found', async function() {
    
    const response = await request(app).post('/films/asdf/vote/up');

    expect(response.body).toEqual({
      error: { message: 'Film not in DataBase. imdbID: asdf', status: 404 }
    });
  })

  test('successful thumbsDown vote', async function() {

    // voting for poirot (added to db at beginning of test suite)
    const response = await request(app).post('/films/tt0094525/vote/down');

    expect(response.body).toEqual({ thumbsDown: 1 });
  });

  test('unsuccessful thumbsDown vote - film not found', async function() {

    const response = await request(app).post('/films/asdf/vote/down');

    expect(response.body).toEqual({
      error: { message: 'Film not in DataBase. imdbID: asdf', status: 404 }
    });
  })
})


