import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CopyOverlay from './CopyOverlay';
import chroma from 'chroma-js';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/ColorBoxStyles';
  
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