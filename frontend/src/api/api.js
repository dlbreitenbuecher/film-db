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

    return response.films;
  }

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