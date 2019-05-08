import React from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'grid'
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

  const colorBoxes = getSingleColorArr(props.color).map(clr => (
    <ColorBox
      background={clr.hex}
      name={clr.name}
      key={clr.name}
      id={clr.id}
    />
  ));

  return (
    <div className={props.classes.root}>
      {colorBoxes}
    </div>
  )
}

export default withStyles(styles)(SingleColorPalette);