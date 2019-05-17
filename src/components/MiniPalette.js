import React, { memo } from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/MiniPaletteStyles';

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