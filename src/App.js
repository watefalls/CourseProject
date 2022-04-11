import React, { useState } from "react";
import Users from "./comopnents/users";
import SearchStatus from "./comopnents/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);
  const [countOnDelete, setCountOnDelete] = useState(1);
  const itemsCount = Math.ceil(users.length / 4);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleDelete = (userId) => {
    setCountOnDelete(prevState => prevState + 1);
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    if (countOnDelete === 4 && currentPage !== currentPage - 1) {
      handlePageChange(currentPage - 1);
      setCountOnDelete(1);
      setCurrentPage(itemsCount - 1);
    }
  };

  const handleToggleBookmark = (id) => {
    const currentUser = users.find((user) => user._id === id);
    if (!currentUser.bookmark) {
      currentUser.bookmark = true;
      const newUsers = [...users];
      setUsers(newUsers);
    } else {
      currentUser.bookmark = false;
      const newUsers = [...users];
      setUsers(newUsers);
    }
  };

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        renderPhrase={SearchStatus}
        toggleBookmark={handleToggleBookmark}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}

export default App;
