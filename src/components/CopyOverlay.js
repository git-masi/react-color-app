import React, { Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/CopyOverlayStyles';

const CopyOverlay = ({ show, color, islight, classes}) => {
  return (
    <Fragment>
      <div
        style={{backgroundColor: color}}
        className={classNames(classes.copyOverlay, {
            [classes.copyOverlayShow]: show,
        })}
      >
      </div>
      <div className={classNames(classes.message, {
        [classes.messageShow]: show,
      })}>
        <h2 className={classNames({[classes['h2light-color']]: islight})}>copied!</h2>
        <p className={classNames({[classes['plight-color']]: islight})}>{color}</p>
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(CopyOverlay);