import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { ILocation } from 'models';
import { flagIconUrl } from 'utils/url';

interface LocationListProps {
  list?: ILocation[];
  onItemClick: (item: ILocation) => () => void;
}

function LocationList({ list, onItemClick }: LocationListProps) {
  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  return (
    <Paper
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        mx: 2,
        mt: 1,
        maxHeight: { xs: '210px', sm: 'none' },
        overflowY: 'auto',
        zIndex: (theme) => theme.zIndex.drawer - 1
      }}>
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
