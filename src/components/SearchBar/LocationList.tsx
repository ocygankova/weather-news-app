import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { ILocation } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { flagIconUrl } from 'utils/url';
import CloseIcon from '@mui/icons-material/Close';

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
    <>
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
    </>
  );
}

export default LocationList;
