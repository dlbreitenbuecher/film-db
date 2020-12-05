import { useLocation } from 'react-router-dom';


/** Custom hook taht uses useLocaiton to parse the query string */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default useQuery;