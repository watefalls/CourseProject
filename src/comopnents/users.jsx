import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import SearchStatus from "./searchStatus";
import api from "../api";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import PropTypes from "prop-types";
import { isArray } from "lodash";

const Users = ({ allUsers, onPageChange, currentPage, pageSize, ...rest }) => {
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const itemsIsArray = isArray(professions);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    onPageChange(1);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => itemsIsArray ? user.profession.name === selectedProf : user.profession === selectedProf)
    : allUsers;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  if (count > 0) {
    return (
      <>
        <div className="searchStatus mb-10">
          <h1>
            <span className="badge bg-primary">{SearchStatus(count)}</span>
          </h1>
        </div>
        <div className="d-flex mt-2">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
                boolInprof={itemsIsArray}
              />
              <button
                className="btn btn-secondary me-3"
                style={{ width: "100%" }}
                onClick={clearFilter}
              >
                сброс
              </button>
            </div>
          )}
          <table className="table text-center" style={{ height: "fit-content" }}>
            <thead>
              <tr>
                <th scope="col" style={{ width: "15%" }}>
                  Имя
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Качества
                </th>
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
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </>
    );
  } else {
    return (
      <h1>
        <span className="badge bg-danger">{SearchStatus(count)}</span>
      </h1>
    );
  }
};

Users.propTypes = {
  allUsers: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Users;
