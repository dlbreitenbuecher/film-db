import React from 'react';
import { Link } from 'react-router-dom';
import SearchResultCard from './SearchResultCard';
import { Typography, Box } from '@material-ui/core';

/** Dispalys film search results
 *    Each film result is a film card that links to the film detail page
 * 
 * Props:
 *  - films: array of film objects
 *    [ { title, year, imdbID, poster },...]
 * 
 *  - searchTerm:
 *    string that determined search results
 * 
 * SearchContainer -> SearchResultList -> SearchResultCard
 */
function SearchResultList({ films, searchTerm }) {
  console.debug('SearchResultList');

  return(
    <article>
      <Typography variant='h3' component='h1'>
        Showing results for {searchTerm}
      </Typography>

      <Box 
        display='flex' 
        flexDirection='row' 
        flexWrap='wrap' 
        justifyContent='center'
        alignItems='stretch'
      >
        {films.map( film => (
          <SearchResultCard 
            key={film.imdbID}
            title={film.title}
            year={film.year}
            imdbID={film.imdbID}
            poster={film.poster} 
          />
        ))}
      </Box>
    </article>
  )
}

export default SearchResultList;