import React from "react";
import PropTypes from "prop-types";
import Loader from "./loader";
import { useSelector } from "react-redux";
import {
  getLoadingProfessionsState,
  getProfessionById
} from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getLoadingProfessionsState());
  const prof = useSelector(getProfessionById(id));
  if (!isLoading) return <p>{prof.name}</p>;
  return <Loader />;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
