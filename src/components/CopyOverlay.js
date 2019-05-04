import React, { Fragment } from 'react';
import './CopyOverlay.css';

const CopyOverlay = props => {
  return (
    <Fragment>
      <div className={`CopyOverlay ${props.show ? "show": ''}`} style={{backgroundColor: props.color}}></div>
      <div className={`CopyOverlay--message ${props.show ? "show": ''}`}>
        <h2>copied!</h2>
        <p>{props.color}</p>
      </div>
    </Fragment>
  )
}

export default CopyOverlay;