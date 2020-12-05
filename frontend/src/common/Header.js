import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

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
      backgroundColor: '#163650'
    },
    title: {
      color: 'white',
      marginRight: '5rem'
    },
    search: {
      backgroundColor: 'white',
      padding: '.75rem',
      borderRadius: 5,
    },
    link: {
      textDecoration: 'none',
    },
  });

  const classes = useStyles();


  return (
    <header>
      <Box className={classes.root} height='8rem' display='flex' alignItems='center' justifyContent='center'>
        <Box component={RouterLink} to={`/`} className={classes.link}>
          <Typography variant='h2' component='h1' className={classes.title}>
            Film-DB
          </Typography>
        </Box>
        <Box className={classes.search} width={1/4} minWidth={200} maxWidth={450}>
          <SearchBar />
        </Box>

      </Box>
    </header>
  )
}

export default Header;