import React, { Component } from 'react';
import './ColorBox.css';
  
class ColorBox extends Component {
  copyHandler = () =>{
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(this.props.background);
      }
    });
  }

  render() {
    const { name, background } = this.props;
    return (
      <div className="ColorBox" style={{background: background}}>
        <div className='copy-container'>
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