import React, { Component } from 'react';
import CopyOverlay from './CopyOverlay';
import { withRouter, Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

const styles = {
  colorBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover $copyButton': {
      opacity: 1,
      transition: '0.5s',
    },
  },
  
  copyButton: {
    width: '100px',
    height: '25px',
    display: 'inline-block',
    zIndex: 9,
  
    fontSize: '1rem',
    lineHeight: '25px',
    textAlign: 'center',
    
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    border: 'none',
    opacity: 0,
    
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  
  boxContent: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    padding: '3px 10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    color: 'white',
    width: '60px',
    height: '25px',
    textAlign: 'center',
    lineHeight: '25px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  
  darkColor: {
    color: 'white',
  },
  
  lightColor: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
}
  
class ColorBox extends Component {
  state = {
    copied: false
  }

  copyHandler = () => {
    navigator.clipboard.writeText(this.props.background);
    this.setState({copied: true}, () => setTimeout(() => this.setState({copied: false}), 1500));
  }
  
  render() {
    const { name, paletteName, background, id, classes } = this.props;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.55;

    return (
      <div className={classes.colorBox} style={{background: background}}>
        <CopyOverlay
          color={background}
          show={this.state.copied}
          isdark={isDarkColor}
          islight={isLightColor}
        />
        <div className={classes.boxContent}>
          <span
            className={classNames({
              [classes.darkColor]: isDarkColor,
            })}
          >
            {name}
          </span>
        </div>
        <button
          className={classNames(classes.copyButton, {
            [classes.lightColor]: isLightColor,
          })}
          onClick={this.copyHandler}
        >
          Copy
        </button>
        {this.props.singleColor ?
          null :
          <Link
            className={classNames(classes.seeMore, {
              [classes.lightColor]: isLightColor,
            })}
            to={`/palette/${paletteName}/${id}`}
          >
            More
          </Link>
        }
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(ColorBox));