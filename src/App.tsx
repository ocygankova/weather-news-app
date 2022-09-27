import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Main, Page404 } from 'pages';
import { SearchBar } from 'components';

function App() {
  return (
    <Router>
      <CssBaseline />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
