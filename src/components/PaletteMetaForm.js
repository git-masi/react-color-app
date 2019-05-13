import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteMetaForm extends React.Component {
  state = {
    newPaletteName: '',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Palette
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Your Palette Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your palette and choose an emoji.
            </DialogContentText>
            <ValidatorForm onSubmit={this.savePaletteHandler}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.inputChangedHandler}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={['Enter a palette name', 'Palette name taken']}
              />
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </ValidatorForm>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add Palette
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;