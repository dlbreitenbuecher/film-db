import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SearchContainer from '../search/SearchContainer';

/**Site-wide routes
 * 
 * Visiting a non-existent route redirects to the homepage
 */

 function Routes() {

  return(
    <div>
      <Switch>

        {/* <Route exact path='/'>
          <HomePage />
        </Route> */}

        <Route exact path='/films/:imdbID'>
          <FilmDetailContainer />
        </Route>

        <Route exact path='/films'>
          <SearchContainer />
        </Route>


        <Redirect to='/' />

      </Switch>
    </div>
  )
 }

 export default Routes;