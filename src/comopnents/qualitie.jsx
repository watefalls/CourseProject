import React from 'react';

const Qualitie = ({ color, name }) => {

  const badgesClassName = (currentColor) => {
    return `badge bg-${currentColor} m-2 p-2`;
  }

  return (
    <>
      <span className={badgesClassName(color)}> {name} </span>
    </>
  )
}

export default Qualitie;