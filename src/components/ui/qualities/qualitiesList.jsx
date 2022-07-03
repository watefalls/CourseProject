import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList);
  }, []);
  return (
    <>
      {qualities &&
        qualities.map((qualitie) => <Qualitie key={qualitie} id={qualitie} />)}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
