import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    height: '100%',
    minHeight: '160px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    border: '.1rem solid rgba(0,0,0,0.3)',
    borderRadius: '.5rem',
    cursor: 'pointer'
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
  }
};

const MiniPalette = props => {
  const { classes, colors, emoji, paletteName, id } = props;

  const handleClick = () => {
    props.handleClick(id)
  }

  const colorBoxes = colors.map(c => <div style={{background: c.color}} key={c.color}></div>)
  return (
    <div className={classes.root} onClick={handleClick}>
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

export default withStyles(styles)(MiniPalette);