import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

const Layout = () => {
  return (
    <>
      <div className="flex flex-row gap-5">
        <Navigation />
        <Outlet />
      </div>
      
    </>
  );
}

export default Layout;