import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Box, Typography } from '@material-ui/core';

import SearchBar from '../common/SearchBar';
import filmBackground from '../assets/film-background.jpg';
import './HomePage.css';

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

  const useStyles = makeStyles({
    root: {
      marginTop: 200,
      textAlign: 'center'
    },
  });


  const classes = useStyles();




  return (
    <div>
     <div className='HomePage-BG'>
     </div>
    <div className='HomePage'>
      <Box display='flex' justifyContent='center'>
        <Box width={5/10} maxWidth={700}>
          <Card className={classes.root}>
            <CardHeader title='Welcome to Film-DB!'>
            </CardHeader>
              <CardContent>
                <Box mb={4}>
                  <Typography variant='subtitle1'>
                    Search For, Read About, and Rate your Favorite Films!
                  </Typography>
                </Box>
                <SearchBar />
              </CardContent>

          </Card>
        </Box>
      </Box>
    </div>
    </div>
  )
}

export default HomePage;