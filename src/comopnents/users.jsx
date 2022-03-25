import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import API from '../api';

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  let [countUsers, setCountUsers] = useState(users.length);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(user => user._id !== userId));
    setCountUsers(countUsers -= 1);
  }

  const renderPhrase = () => {
    if(countUsers >= 5 || countUsers === 1){
      return `${countUsers} человек тусанет с тобой сегодня`;
    }else if(countUsers < 5 && countUsers > 1){
      return `${countUsers} человека тусанут с тобой сегодня`;
    }else if (countUsers === 0) {
      return 'Ни кто сегодня с тобой не тусанет';
    }
  }

  const badgesClassName = (currentColor) => {
    return `badge bg-${currentColor} m-2 p-2`;
  }

  const renderUsers = (id, userName, qoulities, userProf, userRate, userCompletedMeeting) => {
    return (
      <tr key={id} className="table-success">
        <td>{userName}</td>
        <td>{qoulities.map(qouliti => <span className={badgesClassName(qouliti.color)} key={qouliti._id}>{qouliti.name}</span>)}</td>
        <td>{userProf}</td>
        <td>{userCompletedMeeting}</td>
        <td>{userRate}</td>
        <td><button className='btn btn-danger' onClick={() => handleDelete(id)}>Delete</button></td>
      </tr>
    )
  }

  if(countUsers > 0){
    return (
      <>
        <h1><span className='badge bg-primary'>{renderPhrase()}</span></h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Удалить</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => renderUsers(user._id, user.name, user.qualities, user.profession.name,  user.completedMeetings, user.rate))}
          </tbody>
        </table>
      </>
    )
  }else {
    return <h1><span className='badge bg-danger'>{renderPhrase()}</span></h1>
  }
}

export default Users;