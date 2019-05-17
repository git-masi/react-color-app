import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import seedPalettes from '../seedPalettes';
import classNames from 'classnames';
import { withStyles, theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import dWidth from '../drawerWidth';
import styles from '../styles/NewPaletteFormStyles';

const drawerWidth = dWidth;
const arrayMove = require('array-move');
  
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
    smallScreen: document.documentElement.clientWidth < 767.98
  }

  state = {
    open: this.props.smallScreen ? false : true,
    paletteColors: seedPalettes[0].colors
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  formSubmitHandler = (newColor) => {
    this.setState({paletteColors: [...this.state.paletteColors, newColor]})
  }

  savePaletteHandler = (newPaletteObj) => {
    const newPalette = {
      ...newPaletteObj,
      id: newPaletteObj.paletteName.toLowerCase().replace(/\s/g,'-'),
      colors: this.state.paletteColors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  deleteBoxHandler = (name) => {
    this.setState({paletteColors: this.state.paletteColors.filter(c => c.name !== name)})
  }

  clearColorsHandler = () => {
    this.setState({paletteColors: []});
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({ paletteColors }) => ({
      paletteColors: arrayMove(paletteColors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, existingPalettes, maxColors } = this.props;
    const { open } = this.state;
    const paletteFull = this.state.paletteColors.length >= maxColors;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PaletteFormNav
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
          savePaletteHandler={this.savePaletteHandler}
          inputChangedHandler={this.inputChangedHandler}
          existingPalettes={existingPalettes}
          drawerWidth={drawerWidth}
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
          <div className={classes.drawerContent}>
            <Typography variant="h4">
              Choose Your Colors
            </Typography>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.clearColorsHandler}>
              Clear Palette
            </Button>
            <ColorPickerForm
              paletteFull={paletteFull}
              formSubmitHandler={this.formSubmitHandler}
              color={this.addRandomColorHandler}
              paletteColors={this.state.paletteColors}
              existingPalettes={existingPalettes}
            />
          </div>
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
            distance={20}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);