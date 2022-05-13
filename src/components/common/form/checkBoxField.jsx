import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = (params) => {
    onChange({ name: name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-label" + (error ? " is-invalid" : " is-valid");
  };
  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className={getInputClasses()} htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
};

export default CheckBoxField;
