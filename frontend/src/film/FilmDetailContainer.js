import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**Container for Film Detail
 * Fetches data to display in FilmDetail component
 * 
 * State:
 *  - filmDetail:
 *     { imdbID, title, director, year, genre, description, rated, runtime, 
 *        poster, thumbsUp, thumbsDown } 
 * 
 * Routed at: /films/:imdbID
 * 
 * Routes -> FilmDetailContainer -> FilmDetail
 */
function FilmDetailContainer() {
  console.debug('FilmDetailContainer');

  const { imdbID } = useParams();
  const [filmDetail, setFilmDetail] = useState(null);

}