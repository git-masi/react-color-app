import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import backgroundSVG from '../assets/images/rainbow-vortex-blue-purple.svg';
// background by SVGBackgrounds.com

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `url(${backgroundSVG})`,
    backgroundSize: 'cover',

    '& h1': {
      color: 'white'
    }
  },
  
  miniPaletteContainer: {
    width: '60%',
    height: '80%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
  }
}

class PaletteList extends Component {
  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes } = this.props;
    const miniPalettes = palettes.map(p => <MiniPalette {...p} key={p.id} handleClick={this.goToPalette}/>)
    return (
      <div className={classes.root}>
        <h1>React Colors</h1>
        <div className={classes.miniPaletteContainer}>
          {miniPalettes}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);