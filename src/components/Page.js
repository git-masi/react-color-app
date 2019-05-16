import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  page: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    transition: 'all 500ms ease-in-out',
  },

  '@global': {
    '.page-enter': {
      opacity: 0,
      transform: 'translateX(100%)',
    },

    '.page-enter-active': {
      opacity: 1,
      transform: 'translateX(0)',
    },

    '.page-exit-active': {
      opacity: 0,
      transform: 'translateX(-100%)',
    },

    '.pageReverse-enter': {
      transform: 'translateX(-100%)',
    },

    '.pageReverse-enter-active': {
      transform: 'translateX(0)',
    },

    '.pageReverse-exit-active': {
      transform: 'translateX(100%)',
    },
  },
}

const Page = props => {
  return (
    <section className={props.classes.page}>
      {props.children}
    </section>
  )
}

export default withStyles(styles)(Page);