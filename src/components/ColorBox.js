import React, { Component } from 'react';
import './ColorBox.css';
import CopyOverlay from './CopyOverlay';
import { withRouter } from 'react-router-dom';
  
class ColorBox extends Component {
  state = {
    copied: false
  }

  copyHandler = () => {
    navigator.clipboard.writeText(this.props.background);
    this.setState({copied: true}, () => setTimeout(() => this.setState({copied: false}), 1500));
  }

  moreHandler = () => {
    this.props.history.push('/');
  }

  render() {
    const { name, background } = this.props;
    return (
      <div className="ColorBox" style={{background: background}}>
        <div className='copy-container'>
          <CopyOverlay color={background} show={this.state.copied}/>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button' onClick={this.copyHandler}>Copy</button>
        </div>
        <button className='see-more' onClick={this.moreHandler}>More</button>
      </div>
    )
  }
}

export default withRouter(ColorBox);