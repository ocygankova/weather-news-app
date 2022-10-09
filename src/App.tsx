import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Main, Page404, Weather } from 'pages';
import { Footer, Navbar } from 'components';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="weather" element={<Weather />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
