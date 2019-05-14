import React, { Component } from 'react';
import ColorBox from './ColorBox';
import FormatChangedSnackbar from './FormatChangedSnackbar';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import sizes from '../styles/sizes';

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

    [sizes.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(5%, 1fr))',
    },
  },

  'back-box': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'black',
  },

  backButton: {
    width: '100px',
    height: '30px',
    display: 'inline-block',
  
    fontSize: '1rem',
    lineHeight: '30px',
    textAlign: 'center',
    
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    border: 'none',

    textTransform: 'uppercase'
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

class SingleColorPalette extends Component {
  state = {
    format: 'hex',
    snackbarOpen: false
  }

  getSingleColorArr = (color) => {
    let output = [];
    for (let key in this.props.colors) {
      output.push(this.props.colors[key].find(idx => idx.id === color));
    }
    return output.slice(1);
  }

  selectChangedHandler = colorFormat => {
    this.setState({format: colorFormat, snackbarOpen: true});
  }

  snackbarClosedHandler = () => {
    this.setState({snackbarOpen: false});
  }
  
  render() {
    const SingleColorArr = this.getSingleColorArr(this.props.color);
    const colorBoxes = SingleColorArr.map(clr => (
      <ColorBox
        background={clr[this.state.format]}
        name={clr.name}
        key={clr.name}
        id={clr.id}
        singleColor={true}
      />
    ));

    return (
      <div className={this.props.classes.root}>
        <Navbar
          singleColor={true}
          colors={SingleColorArr}
          selectChangedHandler={this.selectChangedHandler}
        />
        <div className={this.props.classes.boxContainer}>
          {colorBoxes}
          <div className={this.props.classes['back-box']}>
            <Link to={`/palette/${this.props.id}`} className={this.props.classes.backButton} role="button">Go Back</Link>
          </div>
        </div>
        <FormatChangedSnackbar
          snackbarOpen={this.state.snackbarOpen}
          format={this.state.format}
          close={this.snackbarClosedHandler}
        />
        <footer className={this.props.classes.PaletteFooter}>{this.props.color} {this.props.emoji}</footer>
      </div>
    )
  }
}
export default withStyles(styles)(SingleColorPalette);