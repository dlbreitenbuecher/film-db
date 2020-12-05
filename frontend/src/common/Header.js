import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import SearchBar from '../common/SearchBar';


/**Renders common header with SearchBar
 * 
 * 
 * { SearchContainer, FilmDetailContain } -> Header
 */
function Header() { 
  console.debug('Header');

  const useStyles = makeStyles({
    root: {
      border: '1px solid black',
      backgroundColor: '#ECEAEB'
    },
    title: {
      marginRight: '8rem'
    },
  });

  const classes = useStyles();


  return (
    <header>
      <Box className={classes.root} height='8rem' display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h2' component='h1' className={classes.title}>
          Film-DB
        </Typography>

        <SearchBar />

      </Box>
    </header>
  )
}

export default Header;