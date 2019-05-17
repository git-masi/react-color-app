import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  page: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    transition: 'all 500ms ease-in-out',
  },

  '@global': {
    '.page-enter': {
      transform: 'translateX(100%)',
    },

    '.page-enter-active': {
      transform: 'translateX(0)',
    },

    '.page-exit-active': {
      transform: 'translateX(-100%)',
    },
  },
}

const Page = ({ classes, children }) => {
  return (
    <section className={classes.page}>
      {children}
    </section>
  )
}

export default withStyles(styles)(Page);