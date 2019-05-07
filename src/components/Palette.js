import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import FormatChangedSnackbar from './FormatChangedSnackbar';
import './Palette.css';

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
    const colorBoxes = this.props.colors[this.state.level].map(clr => (
      <ColorBox
        background={clr[this.state.format]}
        name={clr.name}
        key={clr.id}
      />
    ));

    return (
      <div className="Palette">
        <Navbar
          changeLevel={this.changeLevel}
          level={this.state.level}
          colors={this.props.colors[500]}
          selectChangedHandler={this.selectChangedHandler}
        />
        <div className="Palette--colors">
          {colorBoxes}
        </div>
        <FormatChangedSnackbar
          snackbarOpen={this.state.snackbarOpen}
          format={this.state.format}
          close={this.snackbarClosedHandler}
        />
        <footer className="Palette--footer">{this.props.paletteName} {this.props.emoji}</footer>
      </div>
    )
  }
}

export default Palette;