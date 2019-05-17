import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/DraggableColorBoxStyles';

const DraggableColorBox = ({ classes, color, name, id, deleteBoxHandler }) => {
  const deleteHandler = () => {
    deleteBoxHandler(id);
  }

  const isDarkColor = chroma(color).luminance() <= 0.117;

  return (
    <div
      className={classes.root}
      style={{background: color}}
    >
      <div className={classes.boxContent}>
        <span className={isDarkColor ? classes.darkColor : null}>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={deleteHandler} aria-label="Delete"/>
      </div>
    </div>
  )
}

export default SortableElement(withStyles(styles)(DraggableColorBox));