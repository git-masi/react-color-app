import React from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';

const Routes = () => {
  const findPalette = (id) => {
    return seedPalettes.find(palette => palette.id === id);
  }

  const savePalette = () => {

  }

  return (
    <Switch>
      <Route exact path="/palette/new" render={routeProps => <NewPaletteForm savePalette={savePalette} {...routeProps}/>} />
      <Route exact path="/palette/:paletteName/:colorID" render={routeProps => (
        <SingleColorPalette color={routeProps.match.params.colorID} {...generatePalette(findPalette(routeProps.match.params.paletteName.toLowerCase().replace(/\s/g, '-')))}/>
        )}/>
      <Route exact path="/palette/:id" render={routeProps => (
        <Palette {...generatePalette(findPalette(routeProps.match.params.id))}/>
        )} />
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedPalettes} {...routeProps}/>} />
    </Switch>
  )
}

export default Routes;