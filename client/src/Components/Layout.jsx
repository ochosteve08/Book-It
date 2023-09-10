import { Outlet } from "react-router-dom";
import Header from './Header'

const Layout = () => {
  return (
    <div className="p-4 max-w-8xl">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
