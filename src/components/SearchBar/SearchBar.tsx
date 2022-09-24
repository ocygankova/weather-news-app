import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLocationList } from '../../redux/actions/location';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { locationList } = useAppSelector((state) => state.locationReducer);

  useEffect(() => {
    dispatch(getLocationList());
  }, [dispatch]);

  console.log(locationList);

  return <div>SearchBar</div>;
}

export default SearchBar;
