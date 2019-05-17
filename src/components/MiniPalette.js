import React, { memo } from 'react';
import { withStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    position: 'relative',
    height: '100%',
    minHeight: '160px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    border: '.1rem solid rgba(0,0,0,0.3)',
    borderRadius: '.5rem',
    cursor: 'pointer',

    '&:hover > $fab': {
      opacity: 1,
    }
  },
  
  miniBoxes: {
    width: '100%',
    flex: '5',
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateColumns: 'repeat(5, 1fr)',
    borderRadius: '.5rem',
    overflow: 'hidden',
  },

  paletteText: {
    width: '100%',
    flex: '1',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  fab: {
    position: 'absolute !important',
    top: '.2rem',
    right: '.2rem',
    opacity: 0,
    transition: 'all 180ms ease-in-out !important',
  },
};

const MiniPalette = ({ classes, colors, emoji, paletteName, id, handleClick, deletePaletteHandler }) => {
  const clickHandler = () => {
    handleClick(id);
  }

  const deleteHandler = (e) => {
    e.stopPropagation();
    deletePaletteHandler(id);
  }

  const colorBoxes = colors.map(c => <div style={{background: c.color}} key={c.color}></div>)
  
  return (
    <div className={classes.root} onClick={clickHandler}>
      <Fab size="small" color="secondary" aria-label="Delete" className={classes.fab}>
        <DeleteIcon onClick={deleteHandler} />
      </Fab>
      <div className={classes.miniBoxes}>
        {colorBoxes}
      </div>
      <div className={classes.paletteText}>
        <h4>{paletteName}</h4>
        <span>{emoji}</span>
      </div>
    </div>
  )
}

export default memo(withStyles(styles)(MiniPalette));