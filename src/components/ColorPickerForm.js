import React, { Component, Fragment } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles, theme } from '@material-ui/core/styles';

const styles = theme => ({
  colorNameInput: {
    // padding: '1rem !important',
    marginBottom: '1rem',
  },
  submitButton: {
    padding: '1.8rem !important',
    width: '100%',
    fontSize: '2rem',
  },
})
  
class ColorPickerForm extends Component {
  state = {
    curColor: '#0abde3',
    newColorName: '',
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  changeColorHandler = value => {
    this.setState({curColor: value.hex});
  }

  formSubmitHandler = () => {
    const newColor = {color: this.state.curColor, name: this.state.newColorName, id: this.state.newColorName};
    this.props.formSubmitHandler(newColor);
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

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => (
      this.props.paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    ));

    ValidatorForm.addValidationRule("isColorUnique", () => (
      this.props.paletteColors.every(
        ({ color }) => color !== this.state.curColor
      )
    ));
  }

  render() {
    const { classes, paletteFull } = this.props

    return (
      <Fragment>
        <ChromePicker
          className={classes.chromePicker}
          color={this.state.curColor}
          onChangeComplete={this.changeColorHandler}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.randColorButton}
          onClick={this.addRandomColorHandler}
        >
          Random Color
        </Button>
        <ValidatorForm onSubmit={this.formSubmitHandler} ref='form'>
          <TextValidator
            fullWidth
            margin="dense"
            name="newColorName"
            placeholder="Color Name"
            className={classes.colorNameInput}
            value={this.state.newColorName}
            onChange={this.inputChangedHandler}
            validators={["required", "isColorUnique", "isColorNameUnique"]}
            errorMessages={['this field is required', 'color must be unique', 'names must be unique']}
          />
          <Button
            type="submit"
            variant="contained"
            style={{background: paletteFull ? 'gray' : this.state.curColor}}
            className={classes.submitButton}
            disabled={paletteFull}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);