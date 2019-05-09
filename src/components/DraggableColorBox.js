import React from 'react';

const DraggableColorBox = props => {
  return (
    <div style={{background: props.color}}><p>{props.name}</p></div>
  )
}

export default DraggableColorBox;