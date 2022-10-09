import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';

import { ILocation } from 'models';
import { flagIconUrl } from 'utils/url';

interface LocationListProps {
  list?: ILocation[];
  title?: string | null;
  onItemClick: (item: ILocation) => () => void;
  onCloseButtonClick?: () => void;
}

function LocationList(props: LocationListProps) {
  const { list, onItemClick, title, onCloseButtonClick } = props;
  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  return (
    <Paper
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        mx: 2,
        mt: 1,
        maxHeight: { xs: '290px', sm: 'none' },
        overflowY: 'auto'
      }}>
      {title && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1} px={2}>
          <Typography variant="h6">{title}</Typography>

          <IconButton edge="end" onClick={onCloseButtonClick}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}

      <List
        dense
        sx={{
          '& .MuiListItemIcon-root': {
            minWidth: '30px'
          }
        }}>
        {list?.map((location: ILocation) => (
          <ListItemButton key={uuidv4()} onClick={onItemClick(location)}>
            <ListItemIcon>
              <img src={`${flagIconUrl}${location.country.toLowerCase()}.png`} alt="" />
            </ListItemIcon>
            <ListItem>
              <ListItemText
                primary={`${location.name}, ${regionName.of(location.country)}`}
                secondary={location.state}
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

export default LocationList;
