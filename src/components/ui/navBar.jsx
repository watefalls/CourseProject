import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const styled = {
  list: {
    listStyle: "none",
    display: "flex"
  },
  item: {
    marginRight: "20px"
  },
  link: {
    textDecoration: "none"
  }
};

const NavBar = () => {
  // const currentUser = useSelector(getCurrentUser());
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-dark mb-3">
      <div className="container-fluid">
        <ul className="nav" style={styled.list}>
          <li className="nav-item" style={styled.item}>
            <Link
              className="nav-link active"
              aria-current="page"
              style={styled.link}
              to="/main"
            >
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item" style={styled.item}>
              <Link className="nav-link" style={styled.link} to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" style={styled.link} to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
