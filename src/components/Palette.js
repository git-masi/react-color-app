import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
  
class Palette extends Component {
  render() {
    // console.log(this.props.colors);
    const colorBoxes = this.props.colors.map(clr => <ColorBox background={clr.color} name={clr.name} key={clr.color}/>);
    return (
      <div className="Palette">
        <div className="Palette--colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default Palette;