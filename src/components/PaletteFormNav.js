import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from 'react-router-dom';

class PaletteFormNav extends Component {
  state = {
    newPaletteName: ''
  }

  savePaletteHandler = () => {
    this.props.savePaletteHandler(this.state.newPaletteName);
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  goBackHandler = () => {
    this.props.history.push('/');
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      const newPaletteName = this.state.newPaletteName.toLowerCase().replace(/\s/g, '')
      return this.props.existingPalettes.every(
        ({ paletteName }) => paletteName.toLowerCase().replace(/\s/g, '') !== newPaletteName
      )
    });
  }

  render() {
    const { classes, open } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolBar} disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
            <div>
              <Button variant="contained" color="secondary" onClick={this.goBackHandler}>Go Back</Button>
              <ValidatorForm onSubmit={this.savePaletteHandler}>
                <TextValidator
                  label="Palette Name"
                  name="newPaletteName"
                  value={this.state.newPaletteName}
                  onChange={this.inputChangedHandler}
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={['Enter a palette name', 'Palette name taken']}
                />
                <Button type="submit" variant="contained" color="primary">Save Palette</Button>
              </ValidatorForm>
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

export default withRouter(PaletteFormNav);