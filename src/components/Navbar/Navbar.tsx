import { AppBar, Toolbar } from '@mui/material';
import { SearchBar } from 'components/SearchBar';

function Navbar() {
  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: 'text.primary' }}>
        <Toolbar>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
