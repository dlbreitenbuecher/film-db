import React, { useState } from 'react';


/**SearchBar
 * 
 * Used to search for films. On submission,
 * the searchFor function runs in the parent and calls the 
 * backend to retrieve a list of films matching the search term
 * 
 * Props:
 *  - searchFor: 
 *      fn that handles search submission. 
 * 
 * State:
 *  - searchTerm: 
 *      current value of form
 * 
 *  { HomePage, SearchResultContainer } -> SearchBar
 */
function SearchBar({ searchFor }) {
  console.debug('SearchForm');

  const [searchTerm, setSearchTerm] = useState('');

  /** parent will search for films */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm);
  };

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className='SearchBar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='searchTerm'>Search Films</label>
        <input
          name='searchTerm'
          placeholder='Search by film title'
          value={searchTerm}
          onChange={handleChange}
        />

        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar;