import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**FilmApi Class
 * 
 * Used to consolidate logic to make requests to our backend
 */

class FilmApi {

  /**Creates and sends an axios request
   * 
   * params - url parameters
   */
  static async request(endpoint, params = {}, method = 'get') {
    console.debug('API Call:', endpoint, params, method);

    const url = `${BASE_URL}/${endpoint}`

    try {
      return (await axios({ url, method, params })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      // Control returned to first catch block in callstack
      throw Array.isArray(message) ? message : [message];
    }
  }


  /** Search films by title */
  static async searchFilms(title) {
    const response = await this.request('films/', { title });

    // Todo delete:
    console.log('response in FilmApi.searchFilms:', response);
    // Todo: why does the error thrown on line 26 immediately stop searchFilms from executing, 
    // todo cont.: when removing lines 25 and 26, but using a try/catch block in searchFilms, does not immediately stop the function from executing (console.log still runs);
    // TODO: this is why: when an error is thrown, control passed back to the first catch block in the call stack. Catch will just execute whatever you want when an error is encountered. 
    /* When an error was encountered in request, the error was printed. Without throwing another error though, control went back to searchFilms, which then began executing the next line*/

    return response.films;
  }

  // TODO: DELETE:
  /**TEST */
  // static async searchFilms(title) {
  //   try {
  //     const response = await this.request('films/', { title });

  //     console.log('response in FilmApi.searchFilms:', response);

  //     return response.films;
  //   } catch (err) {
  //     console.log('*****HERE in searchFilms');
  //     console.error('Error in FilmApi.searchFilms!', err);
  //   }
  // }


  /** Get film detail by imdbID */
  static async filmDetail(imdbID) {
    const response = await this.request(`films/${imdbID}`);

    return response;
  }

  /** Increase thumbsUp rating for film by 1 */
  static async thumbsUp(imdbID) {
    const response = await this.request(`films/${imdbID}/vote/up`, {}, 'post');

    return response;
  }

  /** Increase thumbsDown rating for film by 1 */
  static async thumbsDown(imdbID) {
    const response = await this.request(`films/${imdbID}/vote/down`, {}, 'post');

    return response;
  }
}

export default FilmApi;