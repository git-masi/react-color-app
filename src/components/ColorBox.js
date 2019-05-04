import React, { Component } from 'react';
import './ColorBox.css';
import CopyOverlay from './CopyOverlay';
  
class ColorBox extends Component {
  state = {
    copied: false
  }

  copyHandler = () =>{
    navigator.clipboard.writeText(this.props.background);
    // console.log(this.state.copied);
    this.setState({copied: true}, () => setTimeout(() => this.setState({copied: false}), 1500));
  }

  render() {
    const { name, background } = this.props;
    // const overlay = this.state.copied ? <CopyOverlay color={background} show={this.state.copied}/> : null;
    return (
      <div className="ColorBox" style={{background: background}}>
        <div className='copy-container'>
          {/* {overlay} */}
          <CopyOverlay color={background} show={this.state.copied}/>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button' onClick={this.copyHandler}>Copy</button>
        </div>
        <span className='see-more'>More</span>
      </div>
    )
  }
}

export default ColorBox;