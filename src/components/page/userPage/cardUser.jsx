import React from "react";
import Avatar from "./avatar";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const CardUser = ({ _id, profession, rate, name }) => {
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`${id}/edit`);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={() => handleEdit(_id)}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <Avatar size="150" />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">
              {"Профессия: " + profession.name}
            </p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{"Рэйтинг :" + rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardUser.propTypes = {
  _id: PropTypes.string,
  profession: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  rate: PropTypes.number,
  name: PropTypes.string
};

export default CardUser;
