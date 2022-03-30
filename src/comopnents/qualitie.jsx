import React from 'react';

const Qualitie = (props) => {

  const badgesClassName = (currentColor) => {
    return `badge bg-${currentColor} m-2 p-2`;
  }

  return (
    <>
      <span className={badgesClassName(props.color)}> {props.name} </span>
    </>
  )
}

export default Qualitie;