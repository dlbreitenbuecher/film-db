import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Input, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

/**SearchBar
 * 
 * Used to search for films. 
 * On submission, the user is redirected to 
 * /film/search/?title=searchTerm
 * 
 * State:
 *  - searchTerm: 
 *      current value of form
 * 
 *  { HomePage, SearchResultContainer } -> SearchBar
 */
function SearchBar() {
  console.debug('SearchForm');

  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();
    history.push(`/films/search?title=${searchTerm}`);
  };

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className='SearchBar'>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='search'>Search</InputLabel>
        <OutlinedInput
          id='search'
          value={searchTerm}
          type='text'
          onChange={handleChange}
          placeholder='Search by film title'
          endAdornment={
            <InputAdornment position='end'>
              <Button type='submit'>
              <SearchIcon
                aria-label='submit search term'
                edge='end'
                ></SearchIcon>
                </Button>
            </InputAdornment>
          }
          labelWidth={60}
          />
      </FormControl>
      </form>
    
    </div>
  )
}

export default SearchBar;


/*

  <form onSubmit={handleSubmit}>
        <TextField
          label='Seach Films'
          name='searchTerm'
          placeholder='Search by film title'
          value={searchTerm}
          onChange={handleChange}
          color='primary'
          variant='outlined'
          size='small'
          width='50ch'
        />

        <button type='submit'>Search</button>
      </form>


*/