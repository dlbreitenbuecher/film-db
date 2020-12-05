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
 * Routed at: /film/:imdbID
 * 
 * Routes -> FilmDetailContainer -> FilmDetail
 */
function FilmDetailContainer() {
  console.debug('FilmDetailContainer');
  // const defaultFilm = {
  //   "imdbID": "tt0073076",
  //     "title": "Grey Gardens",
  //     "director": "Ellen Hovde, Albert Maysles, David Maysles, Muffie Meyer",
  //     "year": "1975",
  //     "genre": "Documentary, Comedy, Drama",
  //     "description": "An old mother and her middle-aged daughter, the aunt and cousin of Jacqueline Kennedy, live their eccentric lives in a filthy, decaying mansion in East Hampton.",
  //     "rated": "PG",
  //     "runtime": "95 min",
  //     "poster": "https://m.media-amazon.com/images/M/MV5BNjQ0YzYwMzUtZjc5NS00OGQ3LWJjMmUtYmY5N2M3ZTA0NTY2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //     "thumbsUp": 0,
  //     "thumbsDown": 0
  // }

  const { imdbID } = useParams();
  const [filmDetail, setFilmDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // TODO Fix

  /** Fetch film details from backend */
  useEffect(function fetchFilmDetailOnRender() {
    async function fetchFilmdetail() {
      setIsLoading(true);
      try {
        console.log('in useEffect')
        const film = await FilmApi.filmDetail(imdbID);
        console.log('in useEffect film:', film);
        setFilmDetail(film);
        setIsLoading(false);
      } catch (err) {
        console.error('Error in fetchFilmDetail!', err);
        setFilmDetail(null);
        setIsLoading(false);
      }
    }

    fetchFilmdetail();
  }, [imdbID]
  );


  // TODO if there is time, refactor this logic into the API
  async function vote(direction) {
    if (direction === 'up') {
      try{
        const updatedThumbsUp = await FilmApi.thumbsUp(imdbID);
        console.log('updatedThubsUp:', updatedThumbsUp.thumbsUp);
        setFilmDetail( filmDetail => (
          {...filmDetail, thumbsUp: updatedThumbsUp.thumbsUp}
        ));
      } catch (err) {
        console.error('Error in handleVote!', err);
      }
    }

    if (direction === 'down') {
      try{
        const updatedThumbsDown = await FilmApi.thumbsDown(imdbID);
        setFilmDetail( filmDetail => (
          {...filmDetail, thumbsDown: updatedThumbsDown.thumbsDown}
        ));
      } catch (err) {
        console.error('Error in handleVote!', err);
      }
    }
    }






  return (
    <div className='FilmDetailContainer'>
      { filmDetail &&
        <FilmDetail film={filmDetail} vote={vote} />
      }
    </div>
  );
}

export default FilmDetailContainer