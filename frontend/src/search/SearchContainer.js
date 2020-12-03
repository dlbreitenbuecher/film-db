import React, { useEffect, useState } from 'react';
import SearchBar from '../common/SearchBar';
import FilmApi from '../api/api';
import SearchResultList from './SearchResultList';


/**Container for components related to searching for a film
 * 
 * State:
 *  searchResults: array of film objects found by searching for a specific title
 *    [ { title, year, imdbID, poster },...]
 *        (If no results are found by the search, searchResults is an empty array)
 * 
 * Routed at: /films
 * 
 * Routes -> SearchContainer -> { SearchBar, SearchResultList }
 */
function SearchContainer() {
  console.debug('SearchContainer');

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

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

    if (searchTerm !== null) {
      fetchFilms();
    }
  },
    [searchTerm]
  );

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
        <p>No Results Found!</p>
      )
    }

    return (
      <div>
        <SearchResultList films={searchResults} />
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

    {renderSearchResults()}
  </main>
)
}

export default SearchContainer;