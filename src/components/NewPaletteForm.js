import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
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
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  boxContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
  }
});
  
class NewPaletteForm extends Component {
  state = {
    open: true,
    curColor: '#0abde3',
    newColorName: '',
    newPaletteName: '',
    paletteColors: []
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changeColorHandler = value => {
    this.setState({curColor: value.hex});
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  formSubmitHandler = () => {
    const newColor = {color: this.state.curColor, name: this.state.newColorName}
    this.setState({paletteColors: [...this.state.paletteColors, newColor], newColorName: ''})
  }

  savePaletteHandler = () => {
    const newPaletteName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/\s/g,'-'),
      colors: this.state.paletteColors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  goBackHandler = () => {
    this.props.history.push('/');
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => (
      this.state.paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    ));

    ValidatorForm.addValidationRule("isColorUnique", () => (
      this.state.paletteColors.every(
        ({ color }) => color !== this.state.curColor
      )
    ));

    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      const newPaletteName = this.state.newPaletteName.toLowerCase().replace(/\s/g, '')
      return this.props.existingPalettes.every(
        ({ paletteName }) => paletteName.toLowerCase().replace(/\s/g, '') !== newPaletteName
      )
    });
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
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
              onClick={this.handleDrawerOpen}
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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">
            Choose Your Colors
          </Typography>
          <div>
            <Button variant="contained" color="primary" className={classes.button}>
              Random Color
            </Button>
            <Button variant="contained" color="secondary" className={classes.button}>
              Clear Palette
            </Button>
          </div>
          <ChromePicker
            color={this.state.curColor}
            onChangeComplete={this.changeColorHandler}
          />
          <ValidatorForm onSubmit={this.formSubmitHandler} ref='form'>
            <TextValidator
              name="newColorName"
              value={this.state.newColorName}
              onChange={this.inputChangedHandler}
              validators={["required", "isColorUnique", "isColorNameUnique"]}
              errorMessages={['this field is required', 'color must be unique', 'names must be unique']}
            />
            <Button
              type="submit"
              variant="contained"
              style={{background: this.state.curColor}}
              className={classes.button}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.boxContainer}>
            {this.state.paletteColors.map(c => <DraggableColorBox color={c.color} name={c.name}/>)}
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);