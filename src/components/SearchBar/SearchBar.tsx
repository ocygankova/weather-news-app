import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearLocationList, getLocationList, getSelectedLocation } from 'redux/actions/location';
import { ILocation } from 'models';
import LocationList from './LocationList';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { isLoading, locationList, statusMessage } = useAppSelector((state) => state.location);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [displayStatusMessage, setDisplayStatusMessage] = useState<boolean>(true);

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
      setDisplayStatusMessage(true);
    } else inputRef.current?.focus();
  };

  const handleSelectedLocation = (location: ILocation) => () => {
    setInputValue('');
    dispatch(clearLocationList());

    dispatch(getSelectedLocation(location));
    navigate('/weather');
  };

  const closeStatusMessage = () => {
    setDisplayStatusMessage(false);
  };

  const renderSearchResult = () => {
    return locationList.length ? (
      <LocationList list={locationList} onItemClick={handleSelectedLocation} />
    ) : null;
  };

  const renderStatusMessage = () => {
    return (
      statusMessage && (
        <Collapse in={displayStatusMessage}>
          <Paper
            sx={{ position: 'absolute', left: 0, right: 0, mx: 2, mt: 1, pl: 2, pr: 1, py: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography>{statusMessage}</Typography>
              <IconButton color="inherit" onClick={closeStatusMessage}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Collapse>
      )
    );
  };

  const textFieldSX = {
    '& .MuiInputBase-root': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      backgroundColor: 'common.white'
    },
    '& .MuiInputBase-input': {
      padding: '8px 14px',
      '&::placeholder': {
        opacity: 0.8
      }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'common.white'
      },
      '&:hover fieldset': {
        borderColor: 'secondary.main'
      }
    }
  };

  return (
    <Box sx={{ py: 1, maxWidth: '380px', position: 'relative' }}>
      <Box component="form" noValidate display="flex" width="100%" onSubmit={handleSubmit}>
        <TextField
          placeholder="Search for a place"
          value={inputValue}
          autoComplete="off"
          inputRef={inputRef}
          onChange={handleChange}
          color="secondary"
          sx={textFieldSX}
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
          color="secondary"
          sx={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            padding: '8px 14px'
          }}>
          <SearchIcon sx={{ color: 'common.white' }} />
        </Button>
      </Box>

      {isLoading && (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {renderSearchResult()}
      {renderStatusMessage()}
    </Box>
  );
}

export default SearchBar;
