import "./App.css";
import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./error";
import Season from "./pages/Season";

function App() {
  return (
    <div className="App base-100 p-0 m-0 overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="season/:year"
              element={<Season />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
