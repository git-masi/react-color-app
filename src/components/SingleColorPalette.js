import React from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  
  boxContainer: { 
    height: '90vh',  
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: 'repeat(5, 1fr)',
  },

  PaletteFooter: {
    paddingRight: '1rem',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textTransform: 'uppercase'
  }
}

const SingleColorPalette = props => {
  const getSingleColorArr = (color) => {
    let output = [];
    for (let key in props.colors) {
      output.push(props.colors[key].find(idx => idx.id === color));
    }
    return output.slice(1);
  }

  const SingleColorArr = getSingleColorArr(props.color);

  const colorBoxes = SingleColorArr.map(clr => (
    <ColorBox
      background={clr.hex}
      name={clr.name}
      key={clr.name}
      id={clr.id}
      singleColor={true}
    />
  ));

  return (
    <div className={props.classes.root}>
      <Navbar
        singleColor={true}
        colors={SingleColorArr}
      />
      <div className={props.classes.boxContainer}>
        {colorBoxes}
      </div>
      <footer className={props.classes.PaletteFooter}>{props.color} {props.emoji}</footer>
    </div>
  )
}
export default withStyles(styles)(SingleColorPalette);