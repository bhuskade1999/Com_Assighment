import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Actions/User";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{ width: "180px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">SocialGram</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li
          className="nav-item"
          onClick={() => {
            setSelectedTab("/");
          }}
        >
          <Link
            to="/"
            className={`nav-link text-white ${selectedTab === "/" && "active"}`}
            aria-current="page"
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </Link>
        </li>
        <li
          onClick={() => {
            setSelectedTab("Create Post");
          }}
        >
          <Link
            to="/createPost"
            className={`nav-link text-white ${
              selectedTab === "Create Post" && "active"
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Create Post
          </Link>
        </li>
      </ul>

      <hr />
      <div className="text-end logout-btn">
        <button
          type="button"
          className="btn btn-outline-light me-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
