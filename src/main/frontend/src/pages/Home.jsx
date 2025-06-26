import "./Home.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./report/Index";
import New from "./report/New";
import Edit from "./report/Edit";
import Detail from "./report/Detail";
import Notfound from "./report/Notfound";
import Profile from "./report/Profile";
import LeftMenu from "./LeftMenu";

function Home({ onLogout, currentUser }) {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <LeftMenu currentUser={currentUser} />
      <div className="main-content">
        <div className="content-area">
          <Routes>
            <Route
              path="/"
              element={<Index currentUser={currentUser} onLogout={onLogout} />}
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile currentUser={currentUser} onLogout={onLogout} />
              }
            ></Route>

            <Route path="/new" element={<New />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
            <Route path="/:id" element={<Detail />}></Route>
            {/* <Route path="*" element={<Notfound />}></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
