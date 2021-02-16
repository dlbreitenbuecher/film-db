import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Box, Typography } from '@material-ui/core';

import SearchBar from '../common/SearchBar';
import './HomePage.css';


const useStyles = makeStyles({
  card: {
    marginTop: 200,
    textAlign: 'center',
    backgroundColor: '#fafaf7'
  },
  cardContent: {
    paddingTop: '0',
    paddingBottom: '0'
  }
});


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

  const classes = useStyles();

  return (
    <div>
      <div className='HomePage-BG'>
      </div>
      <div className='HomePage'>
        <Box display='flex' justifyContent='center'>
          <Box width={5 / 10} maxWidth={700}>
            <Card className={classes.card}>
              <Box mt='60px'>
                <CardHeader
                  title='Welcome to Film-DB!'
                  titleTypographyProps={{
                    component: 'h1',
                    variant: 'h3',
                    paragraph: 'true'
                  }}
                  subheader='Search For, Read About, and Rate your Favorite Films!'
                />
              </Box>
              <CardContent className={classes.cardContent}>
                {/* <Box mb={4}>
                  <Typography variant='subtitle1'>
                    Search For, Read About, and Rate your Favorite Films!
                  </Typography>
                </Box> */}
                <Box mt='60px' mb='120px'>
                  <SearchBar />
                </Box>
              </CardContent>

            </Card>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default HomePage;