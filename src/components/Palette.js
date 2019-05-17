import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import FormatChangedSnackbar from './FormatChangedSnackbar';
import { withStyles } from '@material-ui/styles';
import sizes from '../styles/sizes';

const styles = {
  palette: {
    height: '100vh',
    overflow: 'hidden',
  },
  
  paletteColors: {
    height: '90vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    
    [sizes.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },
  },
  
  paletteFooter: {
    paddingRight: '1rem',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}

class Palette extends Component {
  state = {
    level: 500,
    format: 'hex',
    snackbarOpen: false
  }

  changeLevel = value => {
    this.setState({level: value});
  }

  selectChangedHandler = colorFormat => {
    this.setState({format: colorFormat, snackbarOpen: true});
  }

  snackbarClosedHandler = () => {
    this.setState({snackbarOpen: false});
  }

  render() {
    const { classes, paletteName, colors, emoji } = this.props;

    const colorBoxes = colors[this.state.level].map(clr => (
      <ColorBox
        background={clr[this.state.format]}
        name={clr.name}
        key={clr.id}
        id={clr.id}
        paletteName={paletteName}
      />
    ));

    return (
      <div className={classes.palette}>
        <Navbar
          changeLevel={this.changeLevel}
          level={this.state.level}
          colors={colors[500]}
          selectChangedHandler={this.selectChangedHandler}
        />
        <div className={classes.paletteColors}>
          {colorBoxes}
        </div>
        <FormatChangedSnackbar
          snackbarOpen={this.state.snackbarOpen}
          format={this.state.format}
          close={this.snackbarClosedHandler}
        />
        <footer className={classes.paletteFooter}>{paletteName} {emoji}</footer>
      </div>
    )
  }
}

export default withStyles(styles)(Palette);