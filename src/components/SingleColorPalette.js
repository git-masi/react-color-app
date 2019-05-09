import React, { Component } from 'react';
import ColorBox from './ColorBox';
import FormatChangedSnackbar from './FormatChangedSnackbar';
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