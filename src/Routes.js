import React from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList';

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
      <Route exact path="/palette/:paletteID/:colorID" render={() => <h1>it works</h1>}/>
    </Switch>
  )
}

export default Routes;