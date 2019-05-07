import React from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';

const Routes = () => {
  const findPalette = (id) => {
    return seedPalettes.find(palette => palette.id === id);
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <h1>palettes go here</h1>} />
      <Route exact path="/palette/:id" render={routeProps => (
        <Palette {...generatePalette(findPalette(routeProps.match.params.id))}/>
      )} />
    </Switch>
  )
}

export default Routes;