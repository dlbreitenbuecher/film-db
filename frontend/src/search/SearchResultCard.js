import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper
} from '@material-ui/core';

import defaultImage from '../assets/default-movie-poster.jpg'


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
  }
});

// TODO Images need to all be the same width - Font size needs to fit container

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
  const classes = useStyles();

  // sets hover state for each card
  function toggleRaised() {
    setRaised( (raised) => !raised);
  }

  // default image for film
  if (poster === 'N/A' || poster === null) {
    poster = defaultImage;
  }

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
          <Typography gutterBottom variant='h5' component='h2' align='center' className={classes.title}>
            {title}
          </Typography>

          <Typography variant='body1' align='center'>
            {year}
          </Typography>
        </CardContent>
        </Box>
    </Card>
  )
}

export default SearchResultCard;