import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import FormatChangedSnackbar from './FormatChangedSnackbar';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/SingleColorPaletteStyles';

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
    const { color, classes, id, emoji } = this.props;
    const SingleColorArr = this.getSingleColorArr(color);
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
      <div className={classes.root}>
        <Navbar
          singleColor={true}
          colors={SingleColorArr}
          selectChangedHandler={this.selectChangedHandler}
        />
        <div className={classes.boxContainer}>
          {colorBoxes}
          <div className={classes['back-box']}>
            <Link to={`/palette/${id}`} className={classes.backButton} role="button">Go Back</Link>
          </div>
        </div>
        <FormatChangedSnackbar
          snackbarOpen={this.state.snackbarOpen}
          format={this.state.format}
          close={this.snackbarClosedHandler}
        />
        <footer className={classes.PaletteFooter}>{color} {emoji}</footer>
      </div>
    )
  }
}
export default withStyles(styles)(SingleColorPalette);