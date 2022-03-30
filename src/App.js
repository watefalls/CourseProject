import React, {useState} from "react";
import Users from './comopnents/users';
import SearchStatus from './comopnents/searchStatus';
import api from './api';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId));
  }
  
  const handleToggleBookmark = (id) => {
    let currentUser = users.find(user => user._id === id);
    if(!currentUser.bookmark){
      currentUser.bookmark = true;
      let newUsers = [...users];
      setUsers(newUsers)
    }else {
      currentUser.bookmark = false;
      let newUsers = [...users];
      setUsers(newUsers)
    }
    
  }

  return (
    <>
      <Users users={users} onDelete={handleDelete} renderPhrase={SearchStatus} toggleBookmark={handleToggleBookmark}/>
    </>
  )
}

export default App;