import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PaletteFormNav from './PaletteFormNav';

const arrayMove = require('array-move');

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
});
  
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }

  state = {
    open: true,
    curColor: '#0abde3',
    newColorName: '',
    // newPaletteName: '',
    paletteColors: [...this.props.existingPalettes[0].colors]
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
    const newColor = {color: this.state.curColor, name: this.state.newColorName, id: this.state.newColorName}
    this.setState({paletteColors: [...this.state.paletteColors, newColor], newColorName: ''})
  }

  savePaletteHandler = (newPaletteName) => {
    // const newPaletteName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/\s/g,'-'),
      colors: this.state.paletteColors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  // goBackHandler = () => {
  //   this.props.history.push('/');
  // }

  deleteBoxHandler = (name) => {
    this.setState({paletteColors: this.state.paletteColors.filter(c => c.name !== name)})
  }

  clearColorsHandler = () => {
    this.setState({paletteColors: []});
  }

  addRandomColorHandler = () => {
    const palettes = this.props.existingPalettes;
    const randPalette = palettes[this.getRandomNum(palettes.length)];
    const colors = randPalette.colors;
    const color = colors[this.getRandomNum(colors.length)].color;
    this.setState({curColor: color});
  }

  getRandomNum = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({ paletteColors }) => ({
      paletteColors: arrayMove(paletteColors, oldIndex, newIndex),
    }));
  };

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

    // ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
    //   const newPaletteName = this.state.newPaletteName.toLowerCase().replace(/\s/g, '')
    //   return this.props.existingPalettes.every(
    //     ({ paletteName }) => paletteName.toLowerCase().replace(/\s/g, '') !== newPaletteName
    //   )
    // });
  }

  render() {
    const { classes, existingPalettes } = this.props;
    const { open } = this.state;
    const paletteFull = this.state.paletteColors.length >= this.props.maxColors;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PaletteFormNav
          open={this.state.open}
          classes={ classes }
          handleDrawerOpen={this.handleDrawerOpen}
          savePaletteHandler={this.savePaletteHandler}
          inputChangedHandler={this.inputChangedHandler}
          existingPalettes={existingPalettes}
        />
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
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addRandomColorHandler}
            >
              Random Color
            </Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.clearColorsHandler}>
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
              style={{background: paletteFull ? 'gray' : this.state.curColor}}
              className={classes.button}
              disabled={paletteFull}
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
            <DraggableColorList
              paletteColors={this.state.paletteColors}
              deleteBoxHandler={this.deleteBoxHandler}
              axis="xy"
              onSortEnd={this.onSortEnd}
            />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);