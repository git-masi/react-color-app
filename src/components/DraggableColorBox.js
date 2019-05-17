import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import chroma from 'chroma-js';
import sizes from '../styles/sizes';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    cursor: 'grab',
  },

  boxContent: {
    padding: '.7rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    textTransform: 'uppercase',
    color: '#555',
    fontSize: '1.2rem',

    [sizes.down('xs')]: {
      padding: '.3rem',
    },
  },

  deleteIcon: {
    padding: '.2rem',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 200ms ease-in-out',

    '&:hover': {
      color: 'white',
      background: 'rgba(255,255,255,0.0)',
      transform: 'scale(1.5)',
    },

    [sizes.down('xs')]: {
      transform: 'scale(.9)',
    },
  },

  darkColor: {
    color: 'white',
  }
}


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