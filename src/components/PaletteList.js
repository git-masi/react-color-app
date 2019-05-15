import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import backgroundSVG from '../assets/images/rainbow-vortex-blue-purple.svg';
// background by SVGBackgrounds.com
import sizes from '../styles/sizes';

const styles = {
  root: {
    padding: '2rem 0',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `url(${backgroundSVG})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    
    '& header': {
      marginBottom: '1rem',
      width: '60%',
      maxWidth: '900px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',

      [sizes.down('md')]: {
        width: '80%',
      },

      '& h1': {
        [sizes.down('sm')]: {
          fontSize: '2.8rem',
        },
      },

      '& h1, a': {
        color: 'white',
        lineHeight: '1',
      },
    }
  },
  
  miniPaletteContainer: {
    width: '60%',
    maxWidth: '900px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '.5rem .5rem',

    [sizes.down('md')]: {
      width: '80%',
    },

    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}

class PaletteList extends Component {
  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes } = this.props;
    const miniPalettes = palettes.map(p => <MiniPalette {...p} key={p.id} handleClick={this.goToPalette} deletePaletteHandler={this.props.deletePaletteHandler}/>)
    return (
      <div className={classes.root}>
        <header>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </header>
        <div className={classes.miniPaletteContainer}>
          {miniPalettes}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);