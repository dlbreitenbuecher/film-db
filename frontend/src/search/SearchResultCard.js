import React from 'react';


/**Renders a card for each film that is a search result
 *    Each card serves as a link to the film detail page
 * 
 * Props: (All strings)
 *  - title 
 *  - year (release year)
 *  - imdbID (used to look up individual films)
 *  - poster (url)
 * 
 * SearchResultList -> SearchResultCard
 */
function SearchResultCard({ title, year, imdbID, poster}) {
  console.debug('SearchResultCard');

  return(
    <section className='SearchResultCard'>
      
    </section>
  )
}

export default SearchResultCard;