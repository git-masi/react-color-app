import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  state = {
    format: "hex"
  } 

  changeLevel = (value) => {
    this.props.changeLevel(value);
  }

  cycleColors = () => {
    if (!this.props.colors) return;
    setInterval(() => {
      document.getElementById('cycle-colors').style.color = this.getColor();
    }, 1600);
  }

  getColor = (format = 'hex') => {
    let arr = this.props.colors;
    return arr[Math.floor(Math.random() * arr.length)][format];
  }
  
  selectChangedHandler = (e) => {
    this.setState({format: e.target.value}, 
      () => this.props.selectChangedHandler(this.state.format)
    );
  }
  
  render() {
    this.cycleColors();
    return (
      <nav className="Navbar">
        <Link to="/" className="logo">react<span id="cycle-colors">color</span>picker</Link>
        <div className="slider-container">
          <span>Level: {this.props.level}</span>
          <Slider
              defaultValue={this.props.level}
              min={100}
              max={900}
              step={100}
              trackStyle={{background: 'transparent'}}
              railStyle={{height: '8px'}}
              onAfterChange={this.changeLevel}
            />
        </div>
        <div className="Select-container">
          <Select
            value={this.state.format}
            onChange={this.selectChangedHandler}
          >
            <MenuItem value="hex">HEX - {this.getColor()}</MenuItem>
            <MenuItem value="rgb">RGB - {this.getColor('rgb')}</MenuItem>
            <MenuItem value="rgba">RGBA - {this.getColor('rgba')}</MenuItem>
          </Select>
        </div>
      </nav>
    )
  }
}

export default Navbar;