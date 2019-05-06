import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

class Palette extends Component {
  state = {
    level: 500
  }

  changeLevel = (value) => {
    this.setState({level: value});
  }
  
  render() {
    const colorBoxes = this.props.colors[this.state.level].map(clr => <ColorBox background={clr.hex} name={clr.name} key={clr.hex}/>);
    return (
      <div className="Palette">
        <Navbar changeLevel={this.changeLevel} level={this.state.level} colors={this.props.colors[500]}/>
        <div className="Palette--colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default Palette;