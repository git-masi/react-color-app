import React, { Component } from 'react';
  
class Palette extends Component {
  render() {
    console.log(this.props.colors);
    return (
      <h1>color palettes!</h1>
    )
  }
}

export default Palette;