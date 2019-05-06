import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import './Palette.css';
import 'rc-slider/assets/index.css';

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
        <Slider
          defaultValue={this.state.level}
          min={100}
          max={900}
          step={100}
          onAfterChange={this.changeLevel}
        />
        <div className="Palette--colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default Palette;