import React from 'react';

const Bookmark = ({ status, ...rest }) => {
  if(!status){
    return (
      <div className="bookmark" onClick={rest.onChangeIcon}>
        <i className="bi bi-bookmark"></i>
      </div>
    )
  }else {
    return (
      <div className="bookmark" onClick={rest.onChangeIcon}>
        <i className="bi bi-bookmark-heart"></i>
      </div>
    )
  }
}

export default Bookmark;