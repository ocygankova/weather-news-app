import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearLocationList, getLocationList } from 'redux/actions/location';
import { ILocation } from 'models';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { locationList } = useAppSelector((state) => state.locationReducer);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  console.log(locationList);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const clearInput = () => {
    setInputValue('');
    inputRef.current?.focus();
    dispatch(clearLocationList());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      dispatch(getLocationList(inputValue));
    } else inputRef.current?.focus();
  };

  return (
    <Box sx={{ p: 2, maxWidth: '340px', position: 'relative' }}>
      <Box component="form" sx={{ display: 'flex' }} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Search location"
          value={inputValue}
          autoComplete="off"
          inputRef={inputRef}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-root': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0'
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton edge="end" disableRipple onClick={clearInput}>
                <CloseIcon />
              </IconButton>
            )
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>
          <SearchIcon />
        </Button>
      </Box>

      {locationList.length ? (
        <Paper variant="outlined" sx={{ position: 'absolute', left: 0, right: 0, mx: 2, mt: 1 }}>
          <List>
            {locationList.map(({ name, state, country }: ILocation) => (
              <ListItemButton key={uuidv4()}>
                <ListItem>
                  <ListItemText primary={`${name}, ${country}`} secondary={state} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      ) : null}
    </Box>
  );
}

export default SearchBar;
