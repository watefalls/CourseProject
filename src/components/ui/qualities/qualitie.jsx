import React from "react";
import PropTypes from "prop-types";
import badgesClassName from "../../../utils/badgeClassName";
import Loader from "../loader";
import { useSelector } from "react-redux";
import {
  getLoadingQualitiesState,
  getQualityById
} from "../../../store/qualities";

const Qualitie = ({ id }) => {
  const isLoading = useSelector(getLoadingQualitiesState());
  const qual = useSelector(getQualityById(id));
  if (!isLoading) {
    return <span className={badgesClassName(qual.color)}>{qual.name}</span>;
  }
  return <Loader />;
};

Qualitie.propTypes = {
  id: PropTypes.string
};

export default Qualitie;
