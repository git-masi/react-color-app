import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import backgroundSVG from '../assets/images/rainbow-vortex-blue-purple.svg';
// background by SVGBackgrounds.com
import sizes from '../styles/sizes';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const styles = {
  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 300ms ease-in-out',
    },
  },

  root: {
    padding: '2rem 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `url(${backgroundSVG})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    
    '& header': {
      marginBottom: '1rem',
      width: '60%',
      maxWidth: '900px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',

      [sizes.down('md')]: {
        width: '80%',
      },

      '& h1': {
        [sizes.down('sm')]: {
          fontSize: '2.8rem',
        },
      },

      '& h1, a': {
        color: 'white',
        lineHeight: '1',
      },
    }
  },
  
  miniPaletteContainer: {
    width: '60%',
    maxWidth: '900px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '.5rem .5rem',

    [sizes.down('md')]: {
      width: '80%',
    },

    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}

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