import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

const Navbar = props => {
  const changeLevel = (value) => {
    props.changeLevel(value);
  }

  const cycleColors = () => {
    if (!props.colors) return;
    setInterval(() => {
      document.getElementById('cycle-colors').style.color = getColor();
    }, 1600);
  }

  const getColor = () => {
    let arr = props.colors;
    return arr[Math.floor(Math.random() * arr.length)].hex;
  }

  cycleColors();

  return (
    <nav className="Navbar">
      <Link to="/" className="logo">react<span id="cycle-colors">color</span>picker</Link>
      <div className="slider-container">
        <span>Level: {props.level}</span>
        <Slider
            defaultValue={props.level}
            min={100}
            max={900}
            step={100}
            trackStyle={{background: 'transparent'}}
            railStyle={{height: '8px'}}
            onAfterChange={changeLevel}
          />
      </div>
    </nav>
  )
}

export default Navbar;