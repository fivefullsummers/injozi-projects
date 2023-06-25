import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

const Layout = () => {
  return (
    <>
      <div className="flex flex-row">
        <Navigation />
      </div>
      <Outlet />
    </>
  );
}

export default Layout;