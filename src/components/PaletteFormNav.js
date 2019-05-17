import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  state = {
    showMetaForm: false
  }

  goBackHandler = () => {
    this.props.history.push('/');
  }

  showMetaFormHandler = () => {
    this.setState({showMetaForm: true});
  };

  handleClose = () => {
    this.setState({showMetaForm: false})
  }

  render() {
    const { classes, open, handleDrawerOpen, savePaletteHandler, existingPalettes } = this.props;

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
          <Toolbar className={classes.toolBar}>
            <div className={classes.toolBarLeft}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="inherit" noWrap>
                Create A Palette
              </Typography>
            </div>
            <div className={classes.toolBarRight}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.goBackHandler}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.showMetaFormHandler}
              >
                Add Palette
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {this.state.showMetaForm && (<PaletteMetaForm
          savePaletteHandler={savePaletteHandler}
          existingPalettes={existingPalettes}
          handleClose={this.handleClose}
        />)
        }
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(PaletteFormNav));