import React from 'react';
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
    open: this.props.open,
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.handleClose();
  };

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  savePaletteHandler = () => {
    this.props.savePaletteHandler(this.state.newPaletteName);
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
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <ValidatorForm onSubmit={this.savePaletteHandler}>
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
            <Picker />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;