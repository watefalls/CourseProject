import React from "react";
import Qualities from "../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";

const UserCardQualities = (user) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <Qualities {...user} />
        </p>
      </div>
    </div>
  );
};

UserCardQualities.propTypes = {
  user: PropTypes.object
};

export default UserCardQualities;
