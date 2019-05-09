import React from 'react';

const DraggableColorBox = props => {
  return (
    <div style={{background: props.color}}>{props.color}</div>
  )
}

export default DraggableColorBox;