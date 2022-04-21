import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  toggleBookmark,
  onDelete,
  count
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: { name: "Качества", component: (user) => <QualitiesList qualities={user.qualities} /> },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark status={user.bookmark} onChangeIcon={() => toggleBookmark(user._id)} />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      count={count}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

export default UserTable;