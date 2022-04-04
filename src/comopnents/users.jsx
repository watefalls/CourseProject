import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  if (count > 0) {
    return (
      <>
        <h1>
          <span className="badge bg-primary">
            {rest.renderPhrase(users.length)}
          </span>
        </h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  } else {
    return (
      <h1>
        <span className="badge bg-danger">
          {rest.renderPhrase(users.length)}
        </span>
      </h1>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
