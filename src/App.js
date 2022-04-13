import React, { useState, useEffect } from "react";
import Users from "./comopnents/users";
import api from "./api";
import loaderImg from "./img/loading.png";

function App() {
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [countOnDelete, setCountOnDelete] = useState(1);
  const pageSize = 4;
  const itemsCount = allUsers ? Math.ceil(allUsers.length / pageSize) : 0;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleDelete = (userId) => {
    setCountOnDelete((prevState) => prevState + 1);
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    if (countOnDelete === pageSize && currentPage !== currentPage - 1) {
      handlePageChange(currentPage - 1);
      setCountOnDelete(1);
      setCurrentPage(itemsCount - 1);
    }
  };

  const handleToggleBookmark = (id) => {
    const currentUser = allUsers.find((user) => user._id === id);
    if (!currentUser.bookmark) {
      currentUser.bookmark = true;
      const newUsers = [...allUsers];
      setUsers(newUsers);
    } else {
      currentUser.bookmark = false;
      const newUsers = [...allUsers];
      setUsers(newUsers);
    }
  };

  return (
    <>
      {
        allUsers
          ? <Users
            allUsers={allUsers}
            onDelete={handleDelete}
            toggleBookmark={handleToggleBookmark}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
          : <div className="loader">
            <img src={loaderImg} style={{ width: "50px" }} />
          </div>
      }
    </>
  );
}

export default App;
