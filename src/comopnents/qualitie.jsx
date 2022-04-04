import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
  const badgesClassName = (currentColor) => {
    return `badge bg-${currentColor} m-2 p-2`;
  };

  return (
    <>
      <span className={badgesClassName(color)}> {name} </span>
    </>
  );
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
