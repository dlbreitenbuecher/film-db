import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmApi from '../api/api';
import FilmDetail from './FilmDetail';
import Header from '../common/Header';



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

  const { imdbID } = useParams();
  const [filmDetail, setFilmDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  /** Fetch film details from backend */
  useEffect(function fetchFilmDetailOnRender() {
    async function fetchFilmdetail() {
      setIsLoading(true);
      try {
        const film = await FilmApi.filmDetail(imdbID);
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


  //  TODO: refactor this logic into the API when possible
  async function vote(direction) {
    if (direction === 'up') {
      try{
        const updatedThumbsUp = await FilmApi.thumbsUp(imdbID);
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
      <Header />
      <div>
        { filmDetail &&
          <FilmDetail film={filmDetail} vote={vote} />
        }
      </div>
    </div>
  );
}

export default FilmDetailContainer