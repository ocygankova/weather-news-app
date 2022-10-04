import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearLocationList, getCurrentLocation, getLocationList } from 'redux/actions/location';
import { ILocation } from 'models';
import { flagIconUrl } from 'utils/url';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { locationList } = useAppSelector((state) => state.locationReducer);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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

  const handleClick = (location: ILocation) => () => {
    setInputValue('');
    dispatch(clearLocationList());
    dispatch(getCurrentLocation(location));
    navigate('weather');
  };

  return (
    <Box sx={{ p: 1, maxWidth: '380px', position: 'relative', mx: 'auto' }}>
      <Box component="form" sx={{ display: 'flex' }} noValidate onSubmit={handleSubmit}>
        <TextField
          placeholder="Search city"
          value={inputValue}
          autoComplete="off"
          inputRef={inputRef}
          onChange={handleChange}
          color="secondary"
          sx={{
            '& .MuiInputBase-root': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              borderTopLeftRadius: '99px',
              borderBottomLeftRadius: '99px',
              backgroundColor: 'common.white'
            },
            '& .MuiInputBase-input': {
              padding: '8px 14px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent'
              },
              '&:hover fieldset': {
                borderColor: 'secondary.main'
              }
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
          color="secondary"
          disableElevation
          sx={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '99px',
            borderBottomRightRadius: '99px'
          }}>
          <SearchIcon sx={{ color: 'common.white' }} />
        </Button>
      </Box>

      {locationList.length ? (
        <Paper sx={{ position: 'absolute', left: 0, right: 0, mx: 2, mt: 1 }}>
          <List
            sx={{
              '& .MuiListItemIcon-root': {
                minWidth: '30px'
              }
            }}>
            {locationList.map((item: ILocation) => (
              <ListItemButton key={uuidv4()} onClick={handleClick(item)}>
                <ListItemIcon>
                  <img src={`${flagIconUrl}${item.country.toLowerCase()}.png`} alt="" />
                </ListItemIcon>
                <ListItem>
                  <ListItemText primary={`${item.name}, ${item.country}`} secondary={item.state} />
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
