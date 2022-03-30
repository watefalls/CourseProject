import React from 'react';
import Qualitie from './qualitie';
import Bookmark from './bookmark';

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    bookmark,
    completedMeetings,
    rate,
    toggleBookmark,
    onDelete} = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{qualities.map(qualitie => <Qualitie key={qualitie._id} {...qualitie}/>)}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td><Bookmark status={bookmark} onChangeIcon={() => toggleBookmark(_id)}/></td>
      <td><button className='btn btn-danger' onClick={() => onDelete(_id)}>Delete</button></td>
    </tr>
  )
}

export default User;