import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/NavbarStyles.js';

class Navbar extends Component {
  state = {
    format: "hex"
  } 

  changeLevel = (value) => {
    this.props.changeLevel(value);
  }

  getColor = (format = 'hex') => {
    let arr = this.props.colors;
    return arr[Math.floor(Math.random() * arr.length)][format];
  }
  
  cycleColors = () => {
    document.getElementById('cycle-colors').style.color = this.getColor();
  }
  
  intervalID = null;
  
  componentDidMount() {
    if (document.documentElement.clientWidth > 575.98) this.intervalID = setInterval(this.cycleColors, 1600);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  
  selectChangedHandler = (e) => {
    this.setState({format: e.target.value}, 
      () => this.props.selectChangedHandler(this.state.format)
    );
  }
  
  render() {
    const { classes, level, singleColor } = this.props

    return (
      <nav className={classes.root}>
        <Link to="/" className={classes.logo}>React<span id="cycle-colors" className={classes.cycleColors}> Colors</span></Link>
        <Link to="/" className={classes.backButton}><ChevronLeftIcon size="small"/></Link>
        {singleColor ?
          null :
          <div className={classes.sliderContainer}>
            <span className={classes.levelDisp}>Level: {level}</span>
            <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                trackStyle={{background: 'transparent'}}
                railStyle={{height: '8px'}}
                onAfterChange={this.changeLevel}
              />
          </div>
        }
        <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar);