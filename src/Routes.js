import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';

class Routes extends Component {
  state = {
    palettes: seedPalettes
  }

  findPalette = (id) => {
    return this.state.palettes.find(palette => palette.id === id);
  }

  savePalette = (newPalette) => {
    this.setState({palettes: [...this.state.palettes, newPalette]});
    // localStorage.setItem('palettes', JSON.stringify(newPalette));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={routeProps => (
          <NewPaletteForm
            savePalette={this.savePalette}
            {...routeProps}
            existingPalettes={this.state.palettes}
          />
        )} />
        <Route exact path="/palette/:paletteName/:colorID" render={routeProps => (
          <SingleColorPalette color={routeProps.match.params.colorID} {...generatePalette(this.findPalette(routeProps.match.params.paletteName.toLowerCase().replace(/\s/g, '-')))}/>
          )}/>
        <Route exact path="/palette/:id" render={routeProps => (
          <Palette {...generatePalette(this.findPalette(routeProps.match.params.id))}/>
          )} />
        <Route exact path="/" render={routeProps => <PaletteList palettes={this.state.palettes} {...routeProps}/>} />
      </Switch>
    )
  }
}

export default Routes;