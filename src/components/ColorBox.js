import React, { Component } from 'react';
import './ColorBox.css';
import CopyOverlay from './CopyOverlay';
import { withRouter, Link } from 'react-router-dom';
import chroma from 'chroma-js';
  
class ColorBox extends Component {
  state = {
    copied: false
  }

  copyHandler = () => {
    navigator.clipboard.writeText(this.props.background);
    this.setState({copied: true}, () => setTimeout(() => this.setState({copied: false}), 1500));
  }
  
  render() {
    const { name, paletteName, background, id } = this.props;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.55;

    return (
      <div className="ColorBox" style={{background: background}}>
        <div className='copy-container'>
          <CopyOverlay color={background} show={this.state.copied} isdark={isDarkColor} islight={isLightColor}/>
          <div className='box-content'>
            <span className={isDarkColor ? 'dark-color' : null}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor ? 'light-color' : null}`} onClick={this.copyHandler}>Copy</button>
        </div>
        {this.props.singleColor ? null : <Link className={`see-more ${isLightColor ? 'light-color' : null}`} to={`/palette/${paletteName}/${id}`}>More</Link>}
      </div>
    )
  }
}

export default withRouter(ColorBox);