import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns, count }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  if (count > 0) {
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {Object.keys(columns).map((column) => (
              <td key={column}>{renderContent(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  } else {
    return (
      <tbody>
        <tr>
          <td>
            <h1>
              <span className="badge bg-danger">
                {/* Ни кто из этой категории с тобой не тусанет */}
              </span>
            </h1>
          </td>
        </tr>
      </tbody>
    );
  }
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
};

export default TableBody;
