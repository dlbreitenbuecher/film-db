import React from 'react';
import { Link } from 'react-router-dom';
import SearchResultCard from './SearchResultCard';

/** Dispalys film search results
 *    Each film result is a film card that links to the film detail page
 * 
 * Props:
 *  films: array of film objects
 *    [ { title, year, imdbID, poster },...]
 * 
 * SearchContainer -> SearchResultList -> SearchResultCard
 */
function SearchResultList({ films }) {
  console.debug('SearchResultList');

  return(
    <article>
      {films.map( film => (
        <SearchResultCard 
          key={film.imdbID}
          title={film.title}
          year={film.year}
          imdbID={film.imdbID}
          poster={film.poster} 
        />
      ))}
    </article>
  )
}

export default SearchResultList;