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
      <Box pt={8} pb={4}>
        <Typography variant='h4' component='h1' align='center'>
          Showing results for <em>{searchTerm}</em>
        </Typography>
      </Box>  

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