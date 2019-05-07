import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const FormatChangedSnackbar = props => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.snackbarOpen}
        autoHideDuration={3000}
        message={<span id="message-id" style={{fontSize: "1.6rem"}}>Format changed to {props.format}</span>}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={props.close}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.close}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Fragment>
  )
}

export default FormatChangedSnackbar;