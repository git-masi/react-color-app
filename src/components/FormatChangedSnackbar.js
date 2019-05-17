import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const FormatChangedSnackbar = ({ snackbarOpen, format, close}) => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        message={<span id="message-id" style={{fontSize: "1.6rem"}}>Format changed to {format}</span>}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={close}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={close}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Fragment>
  )
}

export default FormatChangedSnackbar;