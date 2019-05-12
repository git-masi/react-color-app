import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  boxContent: {
    padding: '.7rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    textTransform: 'uppercase',
    color: '#555',
    fontSize: '1.2rem',
  },

  deleteIcon: {
    cursor: 'pointer',
    transform: 'scale(.9)',
    transition: 'all 200ms ease-in-out',

    '&:hover': {
      color: 'white',
      transform: 'scale(1.4)',
    },
  }
}


const DraggableColorBox = props => {
  const { classes, color, name, id } = props

  const deleteHandler = () => {
    props.deleteBoxHandler(id);
  }

  return (
    <div
      className={classes.root}
      style={{background: color}}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={deleteHandler} aria-label="Delete"/>
      </div>
    </div>
  )
}

export default SortableElement(withStyles(styles)(DraggableColorBox));