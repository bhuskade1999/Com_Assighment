import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";

import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";

function App() {
  const [selectedTab, setSelectedTab] = useState("/");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div className="app-container">
        <Router>
          {isAuthenticated && (
            <Sidebar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
          <div className="content">
            {isAuthenticated && <Header />}
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <PostList /> : <Login />}
              />
              <Route
                path="/createPost"
                element={isAuthenticated ? <CreatePost /> : <Login />}
              />
              <Route
                path="/login"
                element={isAuthenticated ? <PostList /> : <Login />}
              />
              <Route
                path="/signup"
                element={isAuthenticated ? <PostList /> : <SignUp />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
