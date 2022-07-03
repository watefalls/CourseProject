import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getUsersStatus,
  loadUsersList
} from "../../store/users";
import Loader from "../ui/loader";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../store/qualities";
import { loadProfessionList } from "../../store/professions";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const usersStatusLoading = useSelector(getUsersStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionList());
    if (isLoggedIn) dispatch(loadUsersList());
  }, [isLoggedIn]);

  if (usersStatusLoading) return <Loader />;
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
