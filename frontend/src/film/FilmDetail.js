import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Button, Typography, Box } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

/**Render details about a film
 * Users can vote a film up or down
 * 
//  * TODO Edit/DELETE!
 * State:
 *  - isLoading (true/false)
 * 
 *  - thumbsUp:
 *    # of thumbsUp votes
 * 
 *  - thumbsDown
 *    # of thumbsDown votes
 * (intiail values for thumbsUp/thumbsDown supplied by props.film)
 * 
 * 
 * Props:
 *  - film:
 *      { imdbID, title, director, year, genre, description, rated, runtime, 
 *          poster, thumbsUp, thumbsDown } 
 * 
 *  - vote:
 *      fn called in parent
 * 
 * FilmDetailContainer -> FilmDetail
 */
function FilmDetail({ film, vote }) {
  console.debug('FilmDetail');

  console.log('film', film);

  const { title, director, year, genre, description, rated, runtime,
    poster, thumbsUp, thumbsDown } = film;

  const useStyles = makeStyles({
    dataType: {
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    border: {
      border: '2px solid black'
    }
  })

  const classes = useStyles();
  
  return (
    <div className='FilmDetail'>
      <Box my={3}>
        <Typography variant='h3' component='h1'>
          Search Results for {title}
        </Typography>
      </Box>

      <Paper>
        <Grid container spacing={2}>
          <Grid item>
            <img src={poster} alt='Movie Poster' />
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs>
              <Typography variant='h5' component='h2'>
                {title}
              </Typography>
            </Grid>
            {/* Container for film details like rating, plot, etc... */}
            <Grid item xs={12} container direction='column' spacing={2}>
              {/* Each detail is its own container, with the two items being the data type and data */}
              <Grid item container spacing={1} alignItems='baseline'>
                <Grid item>
                  <Typography variant='h6' component='h3'>
                    Director:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    {director}
                  </Typography>
                </Grid>
              </Grid>



              {/* Year, Rating, Genre, Runtime Box */}
              <Grid item container className={classes.border}>

                <Grid item container alignItems='baseline' xs>
                  <Grid item>
                    <Typography variant='h6' component='h3'>
                      Year:
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1'>
                      {year}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container spacing={1} alignItems='baseline' className={classes.border} xs>
                  <Grid item>
                    <Typography variant='h6' component='h3'>
                      Rating:
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1'>
                      {rated}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container spacing={1} alignItems='baseline' xs>
                  <Grid item>
                    <Typography variant='h6' component='h3'>
                      Genre:
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1'>
                      {genre}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container spacing={1} alignItems='baseline' xs>
                  <Grid item>
                    <Typography variant='h6' component='h3'>
                      Runtime:
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1'>
                      {runtime}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item container spacing={1} alignItems='baseline'>
                <Grid item>
                  <Typography variant='h6' component='h3'>
                    Description:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    {description}
                  </Typography>
                </Grid>
              </Grid>

              {/* User Ratings and Voting*/}
              <Grid item container>

              {/* User Ratings */}
              <Grid item container direction='column'>
                
                <Grid item>
                  <Typography variant='h6' component='h3'>
                    User Ratings: 
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant='subtitle1'>
                    Postive: {thumbsUp}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant='subtitle1'>
                    Negative: {thumbsDown}
                  </Typography>
                </Grid>
              </Grid>

              {/* Vote */}
              <Grid item container spacing={2} alignItems='baseline' alignItems='center'>
                <Grid item>
                  <Typography variant='h6' component='h3'>
                    Vote!
                  </Typography>
                </Grid>

                <Grid item>
                  <Button onClick={() => vote('up')}>
                    <ThumbUp color='primary' />
                  </Button>
                </Grid>

                <Grid item>
                  <Button onClick={() => vote('down')}>
                    <ThumbDown color='secondary' />
                  </Button>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          </Grid>
          </Grid>
      </Paper>
    </div>
  )
}

export default FilmDetail;