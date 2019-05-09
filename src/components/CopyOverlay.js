import React, { Fragment } from 'react';
import './CopyOverlay.css';
import { withStyles } from '@material-ui/styles';

const styles = {
  'h2light-color': {
    background: 'rgba(0,0,0,.3) !Important'
  },
  
  'plight-color': {
    color: 'black'
  }
}

const CopyOverlay = props => {
  return (
    <Fragment>
      <div className={`CopyOverlay ${props.show ? "show": ''}`} style={{backgroundColor: props.color}}></div>
      <div className={`CopyOverlay--message ${props.show ? "show": ''}`}>
        <h2 className={props.islight ? props.classes['h2light-color'] : null}>copied!</h2>
        <p className={props.islight ? props.classes['plight-color'] : null}>{props.color}</p>
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(CopyOverlay);