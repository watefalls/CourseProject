import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../store/users";
import Avatar from "../page/userPage/avatar";
import Loader from "./loader";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUser());
  const toggleMenu = () => {
    setOpen((prevstate) => !prevstate);
  };

  if (!currentUser) return <Loader />;

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center  bg-white">
        <div className="me-2 d-flex align-items-center">
          <h3 style={{ color: "#0d6efd", marginTop: "10px", fontSize: "15px" }}>
            {currentUser.name}
          </h3>
        </div>
        <Avatar size="40" src={currentUser.image} />
      </div>
      <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
        <Link
          to={`/users/${currentUser._id}`}
          className="dropdown-item fw-bold"
        >
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item fw-bold">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
