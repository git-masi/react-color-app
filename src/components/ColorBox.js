import React, { Component } from 'react';
import './ColorBox.css';
import CopyOverlay from './CopyOverlay';
import { withRouter, Link } from 'react-router-dom';
  
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
    return (
      <div className="ColorBox" style={{background: background}}>
        <div className='copy-container'>
          <CopyOverlay color={background} show={this.state.copied}/>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button' onClick={this.copyHandler}>Copy</button>
        </div>
        {this.props.singleColor ? null : <Link className="see-more" to={`/palette/${paletteName}/${id}`}>More</Link>}
      </div>
    )
  }
}

export default withRouter(ColorBox);