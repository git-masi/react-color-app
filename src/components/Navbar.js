import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
// import './Navbar.css';
import colorWheel from '../assets/images/color-wheel-solid.png';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    height: '6vh',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',

  },

  logo: {
    padding: '0 1rem',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: '2rem',
    background: 'lightgray',
  },
  
  cycleColors: {
    transition: 'all 1.6s ease-in-out',
  },
  
  sliderContainer: {
    padding: '0 1rem',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',

    '& rc-slider': {
      padding: '2rem 1rem',
      width: '400px',
      display: 'inline-block',
    },

    '& rc-slider-handle': {
      marginTop: '-8px',
      width: '24px',
      height: '24px',
      border: 'none',
      background: `url(${colorWheel})`,
      
      '& :focus': {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
  
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
}

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
    this.intervalID = setInterval(this.cycleColors, 1600);
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
    const { classes, level } = this.props

    return (
      <nav className={classes.root}>
        <Link to="/" className={classes.logo}>react<span id="cycle-colors" className={classes.cycleColors}>colors</span></Link>
        {this.props.singleColor ?
          null :
          <div className={classes.sliderContainer}>
            <span>Level: {level}</span>
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