import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@material-ui/core';

import defaultImage from '../assets/default-movie-poster.jpg'


/**Renders a card for each film that is a search result
 *    Each card serves as a link to the film detail page
 * 
 * Props: (All strings)
 *  - title 
 *  - year (release year)
 *  - imdbID (used to look up individual films)
 *  - poster (url)
 * 
 * State: 
 *  - raised:
 *      true or false. Used to raise or lower a card on hover 
 * 
 * SearchResultList -> SearchResultCard
 */
function SearchResultCard({ title, year, imdbID, poster}) {
  console.debug('SearchResultCard');

  const [raised, setRaised] = useState(false);
  
  // sets hover state for each card
  function toggleRaised() {
    setRaised( (raised) => !raised);
  }
  
  // default image for film
  if (poster === 'N/A' || poster === null) {
    poster = defaultImage;
  }
  
  const useStyles = makeStyles({
    root: {
      maxWidth: 300,
      margin: '1.5rem',
    },
    media: {
      width: 225,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    title: {
      width: 225,
    },
    link: {
      textDecoration: 'none',
      color: 'black'
    },
  });
  
  const classes = useStyles();

  return(
    <Card className={classes.root} onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised}>
      <Box component={RouterLink} to={`/film/${imdbID}`} className={classes.link}>
        <CardMedia
          component='img'
          className={classes.media}
          image={poster}
          title={title}
          border='2px solid black'
        />
        <CardContent>
        {/* <Box display='flex' flexDirection='column' justifyContent='flex-end'> */}
          <Typography gutterBottom variant='h6' component='h2' align='center' className={classes.title}>
            {title}
          </Typography>

          <Typography variant='body1' align='center'>
            {year}
          </Typography>
        {/* </Box> */}
        </CardContent>

        </Box>
    </Card>
  )
}

export default SearchResultCard;