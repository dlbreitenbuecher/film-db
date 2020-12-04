import React from 'react';
import SearchBar from '../common/SearchBar';

/**Homepage of site
 * 
 * Show welcome message and search bar
 * 
 * Routed at /
 * 
 * Routes -> HomePage -> SearchBar
 */
function HomePage() {
  console.debug('HomePage');

  return (
    <div className='HomePage'>
      <div>
        <h1>Welcome to Film-DB!</h1>
      </div>

    <SearchBar />
    </div>
  )
}