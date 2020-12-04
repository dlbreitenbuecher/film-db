import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmApi from '../api/api';
import FilmDetail from './FilmDetail';

/**Container for Film Detail
 * Fetches data to display in FilmDetail component
 * 
 * State:
 *  - isLoading: (true/false)
 * 
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
  const defaultFilm = {
    "imdbID": "tt0073076",
      "title": "Grey Gardens",
      "director": "Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer",
      "year": "1975",
      "genre": "Documentary, Comedy, Drama",
      "description": "An old mother and her middle-aged daughter, the aunt and cousin of Jacqueline Kennedy, live their eccentric lives in a filthy, decaying mansion in East Hampton.",
      "rated": "PG",
      "runtime": "95 min",
      "poster": "https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      "thumbsUp": 0,
      "thumbsDown": 0
  }

  const { imdbID } = useParams();
  const [filmDetail, setFilmDetail] = useState(defaultFilm);
  const [isLoading, setIsLoading] = useState(false);


  // TODO Fix

  /** Fetch film details from backend */
  // useEffect(function fetchFilmDetailOnRender() {
  //   async function fetchFilmdetail() {
  //     setIsLoading(true);
  //     try {
  //       const film = await FilmApi.filmDetail(imdbID);
  //       setFilmDetail(film);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.error('Error in fetchFilmDetail!', err);
  //       setFilmDetail(null);
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchFilmdetail();
  // }, [imdbID]
  // );


  // TODO if there is time, refactor this logic into the API
  async function vote(direction) {
    if (direction === 'up') {
      try{
        const updatedThumbsUp = await FilmApi.thumbsUp(imdbID);
        setFilmDetail( filmDetail => (
          {...filmDetail, thumbsUp: updatedThumbsUp}
        ));
      } catch (err) {
        console.error('Error in handleVote!', err);
      }
    }

    if (direction === 'down') {
      try{
        const updatedThumbsDown = await FilmApi.thumbsDown(imdbID);
        setFilmDetail( filmDetail => (
          {...filmDetail, thumbsDown: updatedThumbsDown}
        ));
      } catch (err) {
        console.error('Error in handleVote!', err);
      }
    }
    }






  return (
    <div className='FilmDetailContainer'>
      <FilmDetail film={filmDetail} vote={vote} />
    </div>
  );
}

export default FilmDetailContainer