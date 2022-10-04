import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearLocationList, getLocationList, getSelectedLocation } from 'redux/actions/location';
import { ILocation } from 'models';
import { flagIconUrl } from 'utils/url';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { locationList, errorMessage } = useAppSelector((state) => state.locationReducer);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState<boolean>(true);

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
      setDisplayErrorMessage(true);
    } else inputRef.current?.focus();
  };

  const handleSelectedLocation = (location: ILocation) => () => {
    setInputValue('');
    dispatch(clearLocationList());
    dispatch(getSelectedLocation(location));
    navigate('weather');
  };

  const closeErrorMessage = () => {
    setDisplayErrorMessage(false);
  };

  const renderLocationList = () => {
    return locationList.length ? (
      <Paper sx={{ position: 'absolute', left: 0, right: 0, mx: 2, mt: 1 }}>
        <List
          sx={{
            '& .MuiListItemIcon-root': {
              minWidth: '30px'
            }
          }}>
          {locationList.map((item: ILocation) => (
            <ListItemButton key={uuidv4()} onClick={handleSelectedLocation(item)}>
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
    ) : null;
  };

  const renderErrorMessage = () => {
    return (
      errorMessage && (
        <Collapse in={displayErrorMessage}>
          <Paper
            sx={{ position: 'absolute', left: 0, right: 0, mx: 2, mt: 1, pl: 2, pr: 1, py: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography>{errorMessage}</Typography>
              <IconButton color="inherit" onClick={closeErrorMessage}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Collapse>
      )
    );
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

      {renderLocationList()}
      {renderErrorMessage()}
    </Box>
  );
}

export default SearchBar;
