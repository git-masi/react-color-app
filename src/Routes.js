import React from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';

const Routes = () => {
  const findPalette = (id) => {
    return seedPalettes.find(palette => palette.id === id);
  }

  return (
    <Switch>
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedPalettes} {...routeProps}/>} />
      <Route exact path="/palette/:id" render={routeProps => (
        <Palette {...generatePalette(findPalette(routeProps.match.params.id))}/>
      )} />
      <Route exact path="/palette/:paletteName/:colorID" render={routeProps => (
        <SingleColorPalette color={routeProps.match.params.colorID} {...generatePalette(findPalette(routeProps.match.params.paletteName.toLowerCase().replace(/\s/g, '-')))}/>
      )}/>
    </Switch>
  )
}

export default Routes;