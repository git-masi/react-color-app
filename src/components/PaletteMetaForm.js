import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends React.Component {
  state = {
    newPaletteName: '',
    open: 'form',
  };

  handleClose = () => {
    this.setState({ open: 'form' });
    this.props.handleClose();
  };

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormHandler = () => {
    this.setState({open: 'emoji'})
  }

  savePaletteHandler = (e) => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: e.native,
    };
    this.props.savePaletteHandler(newPalette);
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
    return (
      <Fragment>
        <Dialog
          open={this.state.open === 'form'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.submitFormHandler}>
            <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your palette, be sure to choose something unique!
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                fullWidth
                margin="normal"
                value={this.state.newPaletteName}
                onChange={this.inputChangedHandler}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={['Enter a palette name', 'Palette name taken']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
        <Dialog
          open={this.state.open === 'emoji'}
          onClose={this.handleClose}
        >
          <Picker
            title='Choose Your Emoji…'
            onSelect={this.savePaletteHandler}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default PaletteMetaForm;