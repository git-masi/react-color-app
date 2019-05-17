import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import colorWheel from '../assets/images/color-wheel-solid.png';
import { withStyles } from '@material-ui/styles';
import sizes from '../styles/sizes';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
    
    [sizes.down('sm')]: {
      display: 'none',
    },
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

    [sizes.down('sm')]: {
      padding: '0 .5rem',
    },

    '& .rc-slider': {
      padding: '0 1rem',
      width: '400px',
      display: 'inline-block',

      [sizes.down('md')]: {
        width: '320px',
      },

      [sizes.down('sm')]: {
        padding: '0 .5rem',
        width: '280px',
      },

      [sizes.down('xs')]: {
        width: '200px',
      },
    },

    '& .rc-slider-rail': {
      marginTop: '4px',
      background: '#b3d8fb',
    },

    '& .rc-slider-handle': {
      marginTop: '-4px',
      width: '24px',
      height: '24px',
      border: 'none',
      background: `url(${colorWheel})`,
      
      '&:focus': {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },

  levelDisp: {
    [sizes.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  
  backButton: {
    display: 'none',

    [sizes.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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