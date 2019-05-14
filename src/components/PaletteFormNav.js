import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import { withStyles, theme } from '@material-ui/core/styles';
import dWidth from '../drawerWidth';

const drawerWidth = dWidth;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  hide: {
    display: 'none',
  },
  toolBarLeft: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    
    '& button': {
      marginRight: '1rem',
      marginLeft: '-16px',
    },
  },
  toolBarRight: {
    '& > :first-child': {
      marginRight: '1rem',
    }
  },
})

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
          <Toolbar className={classes.toolBar}>
            <div className={classes.toolBarLeft}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.props.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
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
          savePaletteHandler={this.props.savePaletteHandler}
          existingPalettes={this.props.existingPalettes}
          handleClose={this.handleClose}
        />)
        }
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(PaletteFormNav));