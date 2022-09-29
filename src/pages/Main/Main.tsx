import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div>
      <h1>Main</h1>
      <Outlet />
    </div>
  );
}

export default Main;
