import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/styles';
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
  state = {
    deleteDialogOpen: false,
    deletePaletteID: null
  }

  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  }

  openDialogHandler = (id) => {
    this.setState({deleteDialogOpen: true, deletePaletteID: id});
  }

  closeDialogHandler = () => {
    this.setState({deleteDialogOpen: false, deletePaletteID: null});
  }

  confirmDeleteHandler = () => {
    this.props.deletePaletteHandler(this.state.deletePaletteID);
    this.setState({deleteDialogOpen: false});
  }

  render() {
    const { palettes, classes } = this.props;
    const miniPalettes = palettes.map(p => (
      <CSSTransition key={p.id} classNames='fade' timeout={300}>
        <MiniPalette
          {...p}
          key={p.id}
          handleClick={this.goToPalette}
          deletePaletteHandler={this.openDialogHandler}
        />
      </CSSTransition>))

    return (
      <div className={classes.root}>
        <header>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </header>
        <TransitionGroup className={classes.miniPaletteContainer}>
            {miniPalettes}
        </TransitionGroup>

        <Dialog
          open={this.state.deleteDialogOpen}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialogHandler}
        >
          <DialogTitle id='delete-dialog-title'>
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.confirmDeleteHandler}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialogHandler}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);