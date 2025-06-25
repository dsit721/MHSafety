import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import New from "./pages/New";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import LeftMenu from "./LeftMenu";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <LeftMenu />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/new" element={<New />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/:id" element={<Detail />}></Route>
          {/* <Route path="*" element={<Notfound />}></Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
