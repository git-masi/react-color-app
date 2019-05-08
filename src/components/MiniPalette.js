import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    border: '.1rem solid rgba(0,0,0,0.3)',
    borderRadius: '.5rem'
  },
  
  miniBoxes: {
    width: '100%',
    flex: '5',
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateColumns: 'repeat(5, 1fr)',

    '& :first-child': {
      borderTopLeftRadius: '.5rem'
    },

    '& :last-child': {
      borderBottomRightRadius: '.5rem'
    },

    '& :nth-of-type(5)': {
      borderTopRightRadius: '.5rem'
    },

    '& :nth-last-of-type(5)': {
      borderBottomLeftRadius: '.5rem'
    }
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
  const { classes, colors, emoji, paletteName } = props;
  const colorBoxes = colors.map(c => <div style={{background: c.color}} key={c.color}></div>)
  return (
    <div className={classes.root}>
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