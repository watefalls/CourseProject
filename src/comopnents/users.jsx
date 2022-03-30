import React from 'react';
import User from './user';

const Users = ({users, ...rest}) => {

  if(users.length > 0){
    return (
      <>
        <h1><span className='badge bg-primary'>{rest.renderPhrase(users.length)}</span></h1>
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
            {users.map(user => <User {...user} key={user._id} onDelete={rest.onDelete} bookmarkChange={rest.bookmark}/>)}
          </tbody>
        </table>
      </>
    )
  }else {
    return <h1><span className='badge bg-danger'>{rest.renderPhrase(users.length)}</span></h1>
  }
}

export default Users;