import React from 'react';
import Qualitie from './qualitie';
import Bookmark from './bookmark';

const User = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.qualities.map(qualitie => <Qualitie key={qualitie._id} {...qualitie}/>)}</td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}</td>
      <td><Bookmark status={props.bookmark} onChangeIcon={() => props.bookmarkChange(props._id)}/></td>
      <td><button className='btn btn-danger' onClick={() => props.onDelete(props._id)}>Delete</button></td>
    </tr>
  )
}

export default User;