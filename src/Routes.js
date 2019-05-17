import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page';

class Routes extends Component {
  static defaultProps = {
    initStorage: JSON.parse(localStorage.getItem('palettes'))
  }

  state = {
    palettes: this.props.initStorage || seedPalettes,
    path: null,
  }

  savePalette = (newPalette) => {
    const updatePalettes = [...this.state.palettes, newPalette];
    this.setState({palettes: updatePalettes});
    this.syncStorage(updatePalettes);
  }

  syncStorage = (p) => {
    localStorage.setItem('palettes', JSON.stringify(p));
  }

  findPalette = (id) => {
    return this.state.palettes.find(palette => palette.id === id);
  }

  deletePaletteHandler = (id) => {
    const p = this.findPalette(id);
    const updatePalettes = this.state.palettes.filter(palette => palette.id !== p.id);
    this.setState({palettes: updatePalettes});
    this.syncStorage(updatePalettes);
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="page"
            timeout={500}
          >
            <Switch location={location}>
              <Route exact path="/palette/new" render={routeProps => (
                <Page>
                  <NewPaletteForm
                    savePalette={this.savePalette}
                    {...routeProps}
                    existingPalettes={this.state.palettes}
                  />
                </Page>
              )}/>
              <Route exact path="/palette/:paletteName/:colorID" render={routeProps => (
                <Page>
                  <SingleColorPalette
                    color={routeProps.match.params.colorID}
                    {...generatePalette(this.findPalette(routeProps.match.params.paletteName.toLowerCase().replace(/\s/g, '-')))}
                  />
                </Page>
              )}/>
              <Route exact path="/palette/:id" render={routeProps => (
                <Page>
                  <Palette {...generatePalette(this.findPalette(routeProps.match.params.id))}/>
                </Page>
              )}/>
              <Route exact path="/" render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={this.state.palettes}
                    {...routeProps}
                    deletePaletteHandler={this.deletePaletteHandler}
                  />
                </Page>
              )}/>
              <Route render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={this.state.palettes}
                    {...routeProps}
                    deletePaletteHandler={this.deletePaletteHandler}
                  />
                </Page>
              )}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    )
  }
}

export default Routes;