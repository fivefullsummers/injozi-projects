import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

const Layout = () => {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="w-full h-max bg-secondary">
        <div className="flex flex-row ">
          <Navigation />
          <div className="p-5 flex-col">
            <h1 className="text-2xl font-semibold text-primary">
              Race to find the champions
            </h1>
            <h2 className="text-xl font-normal text-neutral-600">
              select a season to see who the best champions are!
            </h2>
            <p className="text-lg">🏎️🏎️🏎️🏎️ 💨</p>
            <div className="pt-5">
              <Link to="/" className="btn btn-primary">
                Home
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
