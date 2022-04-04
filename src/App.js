import React, { useState } from "react";
import Users from "./comopnents/users";
import SearchStatus from "./comopnents/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
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
      />
    </>
  );
}

export default App;
