import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from '../homepage/HomePage';
import SearchContainer from '../search/SearchContainer';
import FilmDetailContainer from '../film/FilmDetailContainer';

/**Site-wide routes
 * 
 * Visiting a non-existent route redirects to the homepage
 */

 function Routes() {

  return(
    <div>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route path='/films/search'>
          <SearchContainer />
        </Route>

        <Route exact path='/film/:imdbID'>
          <FilmDetailContainer />
        </Route>

        <Redirect to='/' />

      </Switch>
    </div>
  )
 }

 export default Routes;