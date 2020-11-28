'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const Film = require('./film');

beforeAll(async function() {
  await db.query('DELETE FROM films');

  // Adding Film Entry (Poirot)
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

// Beginning Transaction before each test
beforeEach(async function() {
  await db.query('BEGIN');
})

// Rolling Back Transaction after each test
afterEach(async function() {
  await db.query('ROLLBACK')
})

afterAll(async function() {
  db.end();
})


/** Tests Create Method */

describe('create', function() {

  test('Bad Request Error - Duplicate Entry', async function() {
    try {
      const poirotImdbID = 'tt0094525';
      await Film.create({
        imdbID: poirotImdbID,
        title: 'Poirot'
      });

      // avoid false positive - ensure try block does not continue executing
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test('successfully create new record', async function() {
    const newFilm = {
      imdbID: '123',
      title: 'New Film'
    }

    const result = await Film.create(newFilm);

    expect(result).toEqual({
      imdbID: '123',
      title: 'New Film',
      director: null,
      year: null,
      description: null,
      genre: null,
      rated: null,
      runtime: null,
      poster: null,
      thumbsUp: 0,
      thumbsDown: 0
    })
  });
})


/** Tests Get Method */

describe('get', function() {

  test('successfully get record in database', async function() {
    const result = await Film.get('tt0094525');

    // Item added in beforeAll
    expect(result).toEqual({
      'imdbID': 'tt0094525',
      'title': 'Poirot',
      'director': 'N/A',
      'year': '1989-2013',
      'genre': 'Crime, Drama, Mystery, Thriller',
      'description': null,
      'rated': 'TV-14',
      'runtime': '100 min',
      'poster': null,
      'thumbsUp': 0,
      'thumbsDown': 0
    })
  })

  test('undefined result (not in db)', async function() {
    const result = await Film.get(('not-present'));

    expect(result).toBe(undefined);
  })
})


/** Tests thumbsUp Method */

describe('thumbsUp', function() {

  test('successfully increase thumbsUp count by 1', async function() {
    const result = await Film.thumbsUp('tt0094525');

    expect(result).toEqual({ thumbsUp: 1 });
  })

  test('NotFoundError - film not in DB', async function() {
    try{
      await Film.thumbsUp('not-a-film');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
})

/** Tests thumbsDown Method */

describe('thumbsDown', function() {

  test('successfully increase thumbsDown count by 1', async function() {
    const result = await Film.thumbsDown('tt0094525');

    expect(result).toEqual({ thumbsDown: 1 });
  })

  test('NotFoundError - film not in DB', async function() {
    try{
      await Film.thumbsDown('not-a-film');
      fail();
    } catch  (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
})