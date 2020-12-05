import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import SearchBar from '../common/SearchBar';
import FilmApi from '../api/api';
import SearchResultList from './SearchResultList';
import useQuery from '../hooks/useQuery';

/**Container for components related to searching for a film
 * 
 * State:
 *  - searchResults: array of film objects found by searching for a specific title
 *    [ { title, year, imdbID, poster },...]
 *        (If no results are found by the search, searchResults is an empty array)
 * 
 *  - isLoading: true/false
 * 
 *  - searchTerm: (title - string)
 *      initial (and subsequent) value derived from query string
 * 
 * Routed at: /films/search
 * 
 * Routes -> SearchContainer -> { SearchBar, SearchResultList }
 */
function SearchContainer() {
  console.debug('SearchContainer');

  console.log('In SearchContainer');

  // TODO - DELETE
  // const devProps = [
  //   {
  //     "title": "Grey Gardens",
  //     "year": "1975",
  //     "imdbID": "tt0073076",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "Grey Gardens",
  //     "year": "2009",
  //     "imdbID": "tt0758751",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BMTI0MDAzODM1Ml5BMl5BanBnXkFtZTcwODA1NzE0Mg@@._V1_SX300.jpg"
  //   },
  //   {
  //     "title": "The Beales of Grey Gardens",
  //     "year": "2006",
  //     "imdbID": "tt0839739",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BMTIzMjc3OTE3Nl5BMl5BanBnXkFtZTcwODY3MDA0MQ@@._V1_SX300.jpg"
  //   }
  // ];

  // const devTerm = 'Grey Gardens'

  const query = useQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query.get('title'));
  const [searchResults, setSearchResults] = useState(null);

  /**Call backend once user submits a search term */
  useEffect(function fetchFilmsOnSearch() {
    async function fetchFilms() {
      setIsLoading(true);
      try {
        const films = await FilmApi.searchFilms(searchTerm);
        setSearchResults(films);
        setIsLoading(false);
      } catch (err) {
        // NotFoundError thrown by backend if search term yields nothing from imdb API
        console.error('Error in fetchFilms!', err);
        setSearchResults([]);
        setIsLoading(false);
      }
    }

    fetchFilms();
  },
    [searchTerm]
  );

  /** Compares query string with current value for searchTerm. 
   *    sets searchTerm = current value of query string
   */
  useEffect(function checkQueryString() {
    const queryString = query.get('title');

    if (queryString !== searchTerm) {
      setSearchTerm(queryString);
    }
  })


  /** Custome styles for Material UI components */
  const useStyles = makeStyles({
    notFound: {
      color: 'turquoise'
    }
  });

  const classes = useStyles();

  // TODO Delete!
  /**Sets searchTerm state upon form submission in SearchBar */
  function searchFilms(term) {
    setSearchTerm(term);
  }

  /** Render SearchResultList
   * (if there are search results)
   * 
   * If searchResult is null: 
   *    renders nothing
   * 
   * If searchResult is [] (no results found):
   *    renders 'No Results Found' message
   */
  function renderSearchResults() {
    if (searchResults === null) return;

    if (searchResults.length === 0) {
      return (
        // TODO: Delete
        // h1 styled like h4
        <Typography variant='h4' component='h1' className={classes.notFound}>
          No Results Found!
        </Typography>
      )
    }

    return (
      <div>
        <SearchResultList films={searchResults} searchTerm={searchTerm} />
      </div>
    )
  }


return (
  <main>
    <SearchBar searchFor={searchFilms} />

    {isLoading &&
      <p>
        Loading...
        </p>
    }

  {!isLoading &&
    renderSearchResults()
  }
  </main>
)
}

export default SearchContainer;